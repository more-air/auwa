import { NextResponse } from "next/server";
import MonthlyEmail from "@/emails/monthly";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Sends the monthly Auwa letter as a Resend Broadcast, so
// {{{RESEND_UNSUBSCRIBE_URL}}} is substituted and the List-Unsubscribe
// header is attached. Mirrors the newsletter send route; gated by the
// same NEWSLETTER_SECRET.
export async function POST(request: Request) {
  try {
    const limit = rateLimit({
      key: `monthly:${clientIp(request)}`,
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

    const { secret, subject, preview, intro, season, updates, horizon, dryRun } = await request.json();

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
      subject: subject || "A note from Auwa",
      name: subject || `Auwa monthly letter ${new Date().toISOString()}`,
      react: MonthlyEmail({ preview, intro, season, updates, horizon }),
    });

    if (createError || !created?.id) {
      console.error("Monthly letter broadcast create error:", createError);
      return NextResponse.json({ error: createError?.message || "Failed to create broadcast" }, { status: 500 });
    }

    // Dry run: creating the broadcast already validated the secret, the Resend
    // API key, the audience, and the template render. Don't send — remove the
    // draft and return. Use this to confirm the endpoint is wired correctly
    // without emailing the list.
    if (dryRun) {
      try { await resend.broadcasts.remove(created.id); } catch {}
      return NextResponse.json({ success: true, dryRun: true, id: created.id });
    }

    const { data: sent, error: sendError } = await resend.broadcasts.send(created.id);

    if (sendError) {
      console.error("Monthly letter broadcast send error:", sendError);
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sent?.id || created.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send";
    console.error("Monthly letter error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
