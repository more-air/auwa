import { NextResponse } from "next/server";
import Newsletter from "@/emails/newsletter";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Sends the newsletter as a Resend Broadcast (not a transactional email).
// Broadcasts substitute {{{RESEND_UNSUBSCRIBE_URL}}} and attach the
// List-Unsubscribe header, so subscribers can actually opt out.
export async function POST(request: Request) {
  try {
    // Belt + braces: the secret already gates access, but a strict per-IP
    // limit prevents a leaked secret from becoming a send-storm.
    const limit = rateLimit({
      key: `newsletter:${clientIp(request)}`,
      limit: 3,
      windowMs: 60_000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many newsletter send attempts. Try again in a minute." },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil((limit.resetAt - Date.now()) / 1000).toString() },
        }
      );
    }

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
      from: "Auwa <hello@auwa.life>",
      subject: subject || "A letter from Auwa",
      name: subject || `Auwa newsletter ${new Date().toISOString()}`,
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
