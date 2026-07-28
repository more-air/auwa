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

    // Resend's contacts.create is an UPSERT: for an address already in the
    // audience it returns that contact's id with error === null. So we cannot
    // infer "new contact" from the create call — doing that sent 22 duplicate
    // welcomes during the 28 Jul 2026 Meta lead import. Check existence first.
    // Verified against the live API: an existing contact returns data.id with
    // no error; an unknown one returns data:null + error "Contact not found".
    // Neither throws, so data?.id is the discriminator.
    let existingId: string | undefined;
    try {
      const existing = await resend.contacts.get({ email, audienceId });
      existingId = existing.data?.id;
      if (existing.error && !/not found/i.test(existing.error.message ?? "")) {
        // Anything other than not-found means we couldn't actually verify.
        // We fall through and create (better a rare duplicate than a real
        // signup silently getting no welcome), but log it so it's traceable.
        console.error("Contact lookup inconclusive, treating as new:", existing.error);
      }
    } catch (err) {
      console.error("Contact lookup threw, treating as new:", err);
    }

    if (existingId) {
      // Already on the list: don't re-create (that would overwrite their
      // original `source`, and would resubscribe anyone who had opted out)
      // and don't re-send the welcome.
      return NextResponse.json({ success: true, id: existingId, created: false });
    }

    // Create the contact
    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
      properties: { source: sourceTag },
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send the single unified welcome. Only new contacts reach this point —
    // existing ones returned above.
    try {
      // Hosted one-click unsubscribe for this contact (transactional emails
      // can't use the Broadcast-only {{{RESEND_UNSUBSCRIBE_URL}}}). The contact
      // id is a UUID, so the link needs no signed token. See /api/unsubscribe.
      const contactId = data?.id;
      const unsubscribeUrl = contactId
        ? `https://auwa.life/api/unsubscribe?c=${contactId}`
        : undefined;

      const { render } = await import("@react-email/render");
      const html = await render(WelcomeEmail({ source: "newsletter", unsubscribeUrl }));
      await resend.emails.send({
        from: "Auwa <hello@auwa.life>",
        to: email,
        subject: WELCOME_SUBJECT,
        html,
        // Native one-click unsubscribe in Gmail/Apple Mail (RFC 8058).
        ...(unsubscribeUrl
          ? {
              headers: {
                "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:hello@auwa.life?subject=Unsubscribe>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              },
            }
          : {}),
      });
    } catch (err) {
      console.error("Welcome email failed:", err);
    }

    return NextResponse.json({ success: true, id: data?.id, created: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
