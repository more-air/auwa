// Dev utility: render the current welcome email and send it to one address for
// review, without deploying. Reads RESEND_API_KEY from website/main/.env.local.
//   Usage:  npx tsx scripts/send-welcome-test.tsx [to-address]
import { readFileSync } from "node:fs";
import { render } from "@react-email/render";
import { Resend } from "resend";
import WelcomeEmail from "../src/emails/welcome";

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
  const html = await render(WelcomeEmail({ source: "newsletter" }));
  const { data, error } = await resend.emails.send({
    from: "Auwa <hello@auwa.life>",
    to,
    subject: "A note from Auwa. (test)",
    html,
  });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`Sent welcome test to ${to} — id ${data?.id}`);
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
