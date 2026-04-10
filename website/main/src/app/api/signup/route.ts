import { NextResponse } from "next/server";

const SOURCE_MAP: Record<string, string> = {
  "app-waitlist": "app_waitlist",
  "store-waitlist": "store_waitlist",
  "book-waitlist": "book_waitlist",
  "newsletter": "newsletter",
};

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const propertyKey = SOURCE_MAP[source] || "newsletter";

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
      properties: {
        [propertyKey]: "true",
      },
    });

    if (error) {
      if (error.message?.includes("already exists")) {
        return NextResponse.json({ success: true });
      }
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
