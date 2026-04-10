import { NextResponse } from "next/server";
import Newsletter from "@/emails/newsletter";

// Simple auth token to prevent accidental sends
// Set NEWSLETTER_SECRET in .env.local
export async function POST(request: Request) {
  try {
    const { secret, subject, previewText, heroImage, heroAlt, heading, intro, articles, closingNote } = await request.json();

    // Auth check
    const expectedSecret = process.env.NEWSLETTER_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json({ error: "Missing API key or audience ID" }, { status: 500 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "AUWA <hello@auwa.life>",
      to: `audience:${audienceId}`,
      subject: subject || "A letter from AUWA",
      react: Newsletter({
        previewText,
        heroImage,
        heroAlt,
        heading,
        intro,
        articles,
        closingNote,
      }),
    });

    if (error) {
      console.error("Newsletter send error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send";
    console.error("Newsletter error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
