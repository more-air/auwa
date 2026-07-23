// Dev utility: render the monthly newsletter template with its sample content
// and send it to one address for review, without deploying.
//   Usage:  npx tsx --tsconfig scripts/tsconfig.json scripts/send-monthly-test.tsx [to]
import { readFileSync } from "node:fs";
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
  const key = loadKey();
  if (!key) throw new Error("RESEND_API_KEY not found in env or .env.local");

  const resend = new Resend(key);
  const html = await render(MonthlyEmail({}));
  const { data, error } = await resend.emails.send({
    from: "Auwa <hello@auwa.life>",
    to,
    subject: "Auwa — a note as the season turns (sample)",
    html,
  });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`Sent monthly sample to ${to} — id ${data?.id}`);
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
