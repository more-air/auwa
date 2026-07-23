#!/usr/bin/env node
// One-off: replace the four leftover Resend properties with a single `source`
// property, then backfill `source` on the existing Auwa contacts from the
// pre-merge backup (so we know roughly where each of them came from).
//
// Origin mapping for the backfill (later wins on overlap):
//   App Waitlist members  -> "web"    (ambiguous: app page OR footer OR article)
//   Store Waitlist members -> "store"
//   Book Waitlist members  -> "book"
//   the 5 Meta-ad leads    -> "meta"   (from share/meta-leads/*.csv)
//
//   node scripts/resend-tag-source.mjs            # dry run: show the plan
//   node scripts/resend-tag-source.mjs --execute  # delete/create/backfill
//
// Reads RESEND_API_KEY from website/main/.env.local. Uses the pre-merge backup
// in share/ (gitignored). Never deletes a contact.

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXECUTE = process.argv.includes("--execute");
const API = "https://api.resend.com";
const AUWA_ID = "1924598e-56f8-478e-a0c9-cd896e612953";
const OLD_PROPS = ["newsletter", "store_waitlist", "app_waitlist", "book_waitlist"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadKey() {
  const env = readFileSync(`${ROOT}/website/main/.env.local`, "utf8");
  const m = env.match(/^\s*RESEND_API_KEY\s*=\s*(.+)$/m);
  const k = (m?.[1] ?? "").trim().replace(/^["']|["']$/g, "");
  if (!k) throw new Error("RESEND_API_KEY not found");
  return k;
}
const KEY = loadKey();
const h = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const j = (r) => r.json();

function latestBackup() {
  const files = readdirSync(`${ROOT}/share`).filter((f) => f.startsWith("resend-backup-") && f.endsWith(".json"));
  if (!files.length) throw new Error("No resend-backup-*.json in share/");
  files.sort();
  return `${ROOT}/share/${files[files.length - 1]}`;
}

function metaEmails() {
  const dir = `${ROOT}/share/meta-leads`;
  const out = new Set();
  for (const f of readdirSync(dir).filter((x) => x.toLowerCase().endsWith(".csv"))) {
    const buf = readFileSync(`${dir}/${f}`);
    const text = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString("utf16le") : buf.toString("utf8");
    for (const e of text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? []) out.add(e.toLowerCase());
  }
  return out;
}

function buildSourceMap() {
  const backup = JSON.parse(readFileSync(latestBackup(), "utf8"));
  const map = new Map();
  for (const c of backup["App Waitlist"] ?? []) map.set(c.email.toLowerCase(), "web");
  for (const c of backup["Store Waitlist"] ?? []) map.set(c.email.toLowerCase(), "store");
  for (const c of backup["Book Waitlist"] ?? []) map.set(c.email.toLowerCase(), "book");
  for (const e of metaEmails()) map.set(e, "meta");
  return map;
}

async function main() {
  // Current properties
  const props = (await fetch(`${API}/contact-properties`, { headers: h }).then(j)).data ?? [];
  const toDelete = props.filter((p) => OLD_PROPS.includes(p.key));
  const hasSource = props.some((p) => p.key === "source");
  console.log(`Properties now: ${props.map((p) => p.key).join(", ") || "(none)"}`);
  console.log(`Will delete: ${toDelete.map((p) => p.key).join(", ") || "(none)"}`);
  console.log(`Will create "source": ${hasSource ? "already exists" : "yes"}`);

  // Backfill plan
  const contacts = (await fetch(`${API}/audiences/${AUWA_ID}/contacts`, { headers: h }).then(j)).data ?? [];
  const map = buildSourceMap();
  const tally = {};
  for (const c of contacts) {
    const s = map.get(c.email.toLowerCase()) ?? "web";
    tally[s] = (tally[s] ?? 0) + 1;
  }
  console.log(`\nBackfill across ${contacts.length} contacts:`);
  for (const [s, n] of Object.entries(tally).sort()) console.log(`  ${s}: ${n}`);

  if (!EXECUTE) {
    console.log(`\nDry run. Re-run with --execute to apply.`);
    return;
  }

  // 1. Delete old properties
  for (const p of toDelete) {
    await fetch(`${API}/contact-properties/${p.id}`, { method: "DELETE", headers: h });
    console.log(`Deleted property ${p.key}`);
  }
  // 2. Create `source`
  if (!hasSource) {
    const r = await fetch(`${API}/contact-properties`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ key: "source", type: "string" }),
    }).then(j);
    console.log(`Created property source (${r.id ?? "ok"})`);
  }
  // 3. Backfill each contact
  let done = 0;
  for (const c of contacts) {
    const source = map.get(c.email.toLowerCase()) ?? "web";
    await fetch(`${API}/audiences/${AUWA_ID}/contacts/${encodeURIComponent(c.email)}`, {
      method: "PATCH",
      headers: h,
      body: JSON.stringify({ properties: { source } }),
    });
    done++;
    await sleep(120);
  }
  console.log(`\nDone. Tagged ${done} contacts with a source.`);
}

main().catch((e) => {
  console.error(`Failed: ${e.message}`);
  process.exit(1);
});
