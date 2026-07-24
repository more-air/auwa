// Dev utility: render the monthly newsletter template and either write it to
// an HTML file (preview) or send it to a single address for review. This is a
// plain transactional send (resend.emails.send), completely separate from the
// Broadcast path in /api/monthly/send — so it's safe to run while iterating on
// format, and it never touches the real audience.
//
//   Usage:
//     # send assembled content to one address:
//     npx tsx --tsconfig scripts/tsconfig.json scripts/send-monthly-test.tsx <to> [props.json]
//     # render to HTML only, no send (for local preview):
//     RENDER_ONLY=/path/out.html npx tsx --tsconfig scripts/tsconfig.json scripts/send-monthly-test.tsx <to> [props.json]
//
// With no props.json the template's built-in sample content is used. A props
// JSON may carry a top-level `subject` (used as the email subject); the rest of
// its fields (preview, intro, season, updates) are passed to MonthlyEmail.
import { readFileSync, writeFileSync } from "node:fs";
import { render } from "@react-email/render";
import { Resend } from "resend";
import MonthlyEmail from "../src/emails/monthly";

function loadKey(): string {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const m = env.match(/^\s*RESEND_API_KEY\s*=\s*(.+)$/m);
  return (m?.[1] ?? "").trim().replace(/^["']|["']$/g, "");
}

async function main() {
  const to = process.argv[2] || "tom@moreair.co";
  const propsPath = process.argv[3];

  let subject = "Auwa — a note as the season turns (sample)";
  let props: Record<string, unknown> = {};
  if (propsPath) {
    const parsed = JSON.parse(readFileSync(propsPath, "utf8"));
    if (parsed.subject) subject = parsed.subject;
    const { subject: _drop, ...rest } = parsed;
    props = rest;
  }

  const html = await render(MonthlyEmail(props));

  const renderOnly = process.env.RENDER_ONLY;
  if (renderOnly) {
    writeFileSync(renderOnly, html, "utf8");
    console.log(`Rendered monthly HTML to ${renderOnly} (no send)`);
    return;
  }

  const key = loadKey();
  if (!key) throw new Error("RESEND_API_KEY not found in env or .env.local");
  const resend = new Resend(key);
  const { data, error } = await resend.emails.send({
    from: "Auwa <hello@auwa.life>",
    to,
    subject,
    html,
  });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`Sent monthly test to ${to} — id ${data?.id}`);
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
