import { NextResponse } from "next/server";
import Newsletter from "@/emails/newsletter";

// Sends the newsletter as a Resend Broadcast (not a transactional email).
// Broadcasts substitute {{{RESEND_UNSUBSCRIBE_URL}}} and attach the
// List-Unsubscribe header, so subscribers can actually opt out.
export async function POST(request: Request) {
  try {
    const { secret, subject, previewText, heroImage, heroAlt, heading, intro, articles, closingNote } = await request.json();

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

    const { data: created, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: "AUWA <hello@auwa.life>",
      subject: subject || "A letter from AUWA",
      name: subject || `AUWA newsletter ${new Date().toISOString()}`,
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

    if (createError || !created?.id) {
      console.error("Broadcast create error:", createError);
      return NextResponse.json({ error: createError?.message || "Failed to create broadcast" }, { status: 500 });
    }

    const { data: sent, error: sendError } = await resend.broadcasts.send(created.id);

    if (sendError) {
      console.error("Broadcast send error:", sendError);
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sent?.id || created.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send";
    console.error("Newsletter error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
