import { NextResponse } from "next/server";
import QuietLetter from "@/emails/quiet-letter";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Sends the Quiet Letter (the every-5-days micro-season note) as a Resend
// Broadcast, so {{{RESEND_UNSUBSCRIBE_URL}}} is substituted and the
// List-Unsubscribe header is attached. Mirrors the newsletter send route;
// gated by the same NEWSLETTER_SECRET.
export async function POST(request: Request) {
  try {
    const limit = rateLimit({
      key: `quiet-letter:${clientIp(request)}`,
      limit: 3,
      windowMs: 60_000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many send attempts. Try again in a minute." },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil((limit.resetAt - Date.now()) / 1000).toString() },
        }
      );
    }

    const {
      secret,
      subject,
      previewText,
      kanji,
      romaji,
      translation,
      image,
      imageAlt,
      paragraphs,
      link,
      signOff,
    } = await request.json();

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
      from: "Auwa <hello@auwa.life>",
      subject: subject || "A quiet letter from Auwa",
      name: subject || `Auwa quiet letter ${new Date().toISOString()}`,
      react: QuietLetter({
        previewText,
        kanji,
        romaji,
        translation,
        image,
        imageAlt,
        paragraphs,
        link,
        signOff,
      }),
    });

    if (createError || !created?.id) {
      console.error("Quiet letter broadcast create error:", createError);
      return NextResponse.json({ error: createError?.message || "Failed to create broadcast" }, { status: 500 });
    }

    const { data: sent, error: sendError } = await resend.broadcasts.send(created.id);

    if (sendError) {
      console.error("Quiet letter broadcast send error:", sendError);
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sent?.id || created.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send";
    console.error("Quiet letter error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
