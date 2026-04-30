import { NextResponse } from "next/server";
import WelcomeEmail from "@/emails/welcome";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const SUBJECT_MAP: Record<string, string> = {
  newsletter: "Welcome to Auwa",
  "app-waitlist": "You're on the Auwa App waitlist",
  "store-waitlist": "A note from Auwa.",
  "book-waitlist": "A note from Auwa.",
};

export async function POST(request: Request) {
  try {
    // 5 signups per IP per minute is plenty for a human; bots that hit harder
    // get a 429 so they stop polluting the Resend audience.
    const limit = rateLimit({
      key: `signup:${clientIp(request)}`,
      limit: 5,
      windowMs: 60_000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many signups. Try again in a minute." },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil((limit.resetAt - Date.now()) / 1000).toString() },
        }
      );
    }

    const { email, source } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Determine which audience to add the contact to
    // Free plan: 3 audiences max. We use the source-specific audience when available,
    // and fall back to App Waitlist as the default audience for newsletter subscribers.
    const audienceForSource: Record<string, string> = {
      "app-waitlist": "1924598e-56f8-478e-a0c9-cd896e612953",
      "store-waitlist": "53ca6dff-01c3-4728-838a-5bac584294a1",
      "book-waitlist": "117496ae-3d14-46b5-b17c-d95a97f0ab35",
      "newsletter": "1924598e-56f8-478e-a0c9-cd896e612953",
    };
    const audienceId = audienceForSource[source] || "1924598e-56f8-478e-a0c9-cd896e612953";

    // Create the contact
    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    const alreadyExists = error?.message?.includes("already exists");

    if (error && !alreadyExists) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send welcome email to all new signups (skip for existing contacts)
    if (!alreadyExists) {
      const validSource = source as "newsletter" | "app-waitlist" | "store-waitlist" | "book-waitlist";
      try {
        const { render } = await import("@react-email/render");
        const html = await render(WelcomeEmail({ source: validSource }));
        await resend.emails.send({
          from: "Auwa <hello@auwa.life>",
          to: email,
          subject: SUBJECT_MAP[source] || "Welcome to Auwa",
          html,
        });
      } catch (err) {
        console.error("Welcome email failed:", err);
      }
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
