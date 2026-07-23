#!/usr/bin/env node
// Consolidate the three Resend audiences (App / Store / Book Waitlist) into ONE
// list. Strategy: keep "App Waitlist" as the single canonical list (it already
// holds the general newsletter + article signups), copy every Store and Book
// contact into it (deduped by email), and leave the two source lists untouched
// as a safety net (dormant, can be deleted from the dashboard later).
//
// This script NEVER deletes a contact. It only reads, backs up, and adds.
//
//   node scripts/resend-consolidate.mjs            # dry run: backup + preview
//   node scripts/resend-consolidate.mjs --execute  # actually copy contacts
//
// Reads RESEND_API_KEY from website/main/.env.local. Backup is written to
// share/ (gitignored) so the emails never reach git.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXECUTE = process.argv.includes("--execute");
const API = "https://api.resend.com";
const TARGET_NAME = "App Waitlist"; // becomes the single "Auwa" list
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadKey() {
  const env = readFileSync(`${ROOT}/website/main/.env.local`, "utf8");
  const m = env.match(/^\s*RESEND_API_KEY\s*=\s*(.+)$/m);
  const k = (m?.[1] ?? "").trim().replace(/^["']|["']$/g, "");
  if (!k) throw new Error("RESEND_API_KEY not found in website/main/.env.local");
  return k;
}

const KEY = loadKey();
const h = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

async function listAudiences() {
  const r = await fetch(`${API}/audiences`, { headers: h });
  return (await r.json()).data;
}
async function listContacts(id) {
  const r = await fetch(`${API}/audiences/${id}/contacts`, { headers: h });
  return (await r.json()).data ?? [];
}
async function createContact(id, c) {
  const r = await fetch(`${API}/audiences/${id}/contacts`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({
      email: c.email,
      first_name: c.first_name ?? undefined,
      last_name: c.last_name ?? undefined,
      unsubscribed: !!c.unsubscribed,
    }),
  });
  return r.json();
}

async function main() {
  const auds = await listAudiences();
  const target = auds.find((a) => a.name === TARGET_NAME);
  if (!target) throw new Error(`Target audience "${TARGET_NAME}" not found`);
  const sources = auds.filter((a) => a.name !== TARGET_NAME);

  // 1. Read everything + back up.
  const backup = {};
  const targetContacts = await listContacts(target.id);
  backup[target.name] = targetContacts;
  for (const s of sources) backup[s.name] = await listContacts(s.id);

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = `${ROOT}/share/resend-backup-${stamp}.json`;
  writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`Backup written: share/${backupPath.split("/share/")[1]}`);
  for (const [name, cs] of Object.entries(backup)) console.log(`  ${name}: ${cs.length}`);

  // 2. Work out who needs copying into the target.
  const inTarget = new Set(targetContacts.map((c) => c.email.toLowerCase()));
  const toCopy = [];
  for (const s of sources) {
    for (const c of backup[s.name]) {
      const e = c.email.toLowerCase();
      if (!inTarget.has(e) && !toCopy.some((x) => x.email.toLowerCase() === e)) toCopy.push(c);
    }
  }
  const uniqueTotal = new Set([...inTarget, ...toCopy.map((c) => c.email.toLowerCase())]).size;
  console.log(`\n${toCopy.length} contact(s) to copy into "${target.name}".`);
  console.log(`Final unique total on the single list will be: ${uniqueTotal}`);

  if (!EXECUTE) {
    console.log(`\nDry run. Re-run with --execute to copy them in.`);
    return;
  }

  // 3. Copy them in (add-only, idempotent).
  let added = 0, skipped = 0;
  for (const c of toCopy) {
    const res = await createContact(target.id, c);
    if (res.id) added++;
    else skipped++;
    await sleep(120);
  }
  const finalCount = (await listContacts(target.id)).length;
  console.log(`\nDone. ${added} copied in, ${skipped} skipped. "${target.name}" now holds ${finalCount}.`);
  console.log(`Store and Book lists left untouched as a safety net (delete from the dashboard when ready).`);
}

main().catch((e) => {
  console.error(`Failed: ${e.message}`);
  process.exit(1);
});
