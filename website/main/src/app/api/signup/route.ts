import { NextResponse } from "next/server";
import WelcomeEmail from "@/emails/welcome";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Every form now sends the single, unified welcome (the `newsletter` variant in
// src/emails/welcome.tsx), whatever page the person signed up on. The `source`
// still decides which Resend audience they land in — that's how we know where
// they came from — but the email they receive is identical for all five forms.
const WELCOME_SUBJECT = "A note from Auwa.";

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

    // Single consolidated "Auwa" list (this ID is the audience formerly named
    // "App Waitlist"; rename is cosmetic and doesn't change the ID). As of
    // 23 Jul 2026 all five forms feed this one list — Resend has no per-contact
    // tags, and the old per-pillar counts only reflected where the forms sat, so
    // we dropped source-based routing. The dormant Store/Book audiences remain
    // as a backup but nothing new is written to them.
    const audienceId = "1924598e-56f8-478e-a0c9-cd896e612953";

    // Record where they signed up as the contact's `source` property (one list,
    // still tagged by origin). Anything unrecognised falls back to "web".
    const KNOWN_SOURCES = ["store", "app", "book", "footer", "article", "meta"];
    const sourceTag = KNOWN_SOURCES.includes(source) ? source : "web";

    // Create the contact
    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
      properties: { source: sourceTag },
    });

    const alreadyExists = error?.message?.includes("already exists");

    if (error && !alreadyExists) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send the single unified welcome to all new signups, regardless of which
    // form/source they used (skip for existing contacts).
    if (!alreadyExists) {
      try {
        const { render } = await import("@react-email/render");
        const html = await render(WelcomeEmail({ source: "newsletter" }));
        await resend.emails.send({
          from: "Auwa <hello@auwa.life>",
          to: email,
          subject: WELCOME_SUBJECT,
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
