import { NextResponse } from "next/server";

// Hosted one-click unsubscribe for transactional emails (e.g. the welcome).
// Broadcasts get Resend's managed unsubscribe automatically; transactional
// emails.send does not, so we host our own. The link carries the Resend
// contact id (`c`) — a UUID, unguessable, so no signed token is needed.
//
// GET  → unsubscribe + show a branded confirmation page (human click).
// POST → unsubscribe + 200, no body (RFC 8058 List-Unsubscribe-Post one-click).

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "1924598e-56f8-478e-a0c9-cd896e612953";

async function unsubscribe(contactId: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !contactId) return false;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.update({
      audienceId: AUDIENCE_ID,
      id: contactId,
      unsubscribed: true,
    });
    if (error) {
      console.error("Unsubscribe error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unsubscribe threw:", err);
    return false;
  }
}

export async function POST(request: Request) {
  const id = new URL(request.url).searchParams.get("c") || "";
  await unsubscribe(id);
  // One-click clients don't read the body; always 200 so the client shows success.
  return new NextResponse(null, { status: 200 });
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("c") || "";
  const ok = await unsubscribe(id);
  const heading = ok ? "You're unsubscribed." : "Something went wrong.";
  const body = ok
    ? "You won't receive the Auwa letter any more. If this was a mistake, you can sign up again any time at auwa.life."
    : "We couldn't process that unsubscribe link. Email hello@auwa.life and we'll take you off the list.";
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Unsubscribe | Auwa</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap');
  html,body{margin:0;height:100%;background:#f8f7f4;color:#141318;}
  .wrap{min-height:100%;display:flex;align-items:center;justify-content:center;padding:40px 24px;box-sizing:border-box;}
  .card{max-width:460px;text-align:center;}
  .mark{font-family:'EB Garamond',Georgia,serif;font-size:22px;letter-spacing:0.25em;margin:0 0 40px;}
  h1{font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px;}
  p{font-family:'EB Garamond',Georgia,serif;font-size:17px;line-height:1.7;color:#33313a;margin:0 0 28px;}
  a{font-family:'Inter',Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#141318;text-decoration:underline;text-underline-offset:4px;}
</style></head>
<body><div class="wrap"><div class="card">
  <p class="mark">AUWA</p>
  <h1>${heading}</h1>
  <p>${body}</p>
  <a href="https://auwa.life">Return to auwa.life</a>
</div></div></body></html>`;
  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
