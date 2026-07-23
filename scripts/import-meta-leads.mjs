#!/usr/bin/env node
// Import Meta lead-form CSVs into Resend by replaying each email through the
// live website signup endpoint (/api/signup). That endpoint already:
//   - adds the contact to the right Resend audience, and
//   - sends the source-specific welcome email, and
//   - skips the welcome if the contact already exists (idempotent).
// So this script needs no Resend key and no dedup logic of its own — it just
// simulates a website signup for every email in the dropped CSV(s).
//
// Workflow:
//   1. Export the leads CSV from Meta Ads Manager.
//   2. Drop it into  share/meta-leads/  (gitignored — emails never get committed).
//   3. Run:  node scripts/import-meta-leads.mjs
//
// Flags:
//   --dry-run            parse + list emails, POST nothing
//   --source=<name>      audience/welcome variant (default: store-waitlist)
//   --dir=<path>         folder or single .csv to read (default: share/meta-leads)
//   --endpoint=<url>     signup endpoint (default: https://auwa.life/api/signup)
//   --delay=<ms>         gap between requests (default: 13000, to respect the
//                        endpoint's 5-signups-per-minute-per-IP rate limit)

import { readdir, readFile } from "node:fs/promises";
import { join, resolve, extname } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const DIR = resolve(args.dir || "share/meta-leads");
// Source is saved as the contact's `source` property in Resend (one shared
// list, tagged by origin — see api/signup/route.ts). "meta" marks Meta-ad
// leads. It no longer affects which list they join.
const SOURCE = args.source || "meta";
const ENDPOINT = args.endpoint || "https://auwa.life/api/signup";
const DELAY = Number(args.delay ?? 13000);
const DRY = Boolean(args["dry-run"]);

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collectEmails() {
  let files = [];
  if (extname(DIR) === ".csv") {
    files = [DIR];
  } else {
    const entries = await readdir(DIR).catch(() => {
      throw new Error(`Folder not found: ${DIR}`);
    });
    files = entries.filter((f) => f.toLowerCase().endsWith(".csv")).map((f) => join(DIR, f));
  }
  if (files.length === 0) throw new Error(`No .csv files in ${DIR}`);

  const seen = new Set();
  for (const file of files) {
    // Meta exports leads as UTF-16 LE (tab-separated). Detect encoding by BOM
    // so the email regex sees real characters, not null-padded bytes.
    const buf = await readFile(file);
    let text;
    if (buf[0] === 0xff && buf[1] === 0xfe) text = buf.toString("utf16le");
    else if (buf[0] === 0xfe && buf[1] === 0xff) text = Buffer.from(buf).swap16().toString("utf16le");
    else text = buf.toString("utf8");
    text = text.replace(/^﻿/, "");
    const found = text.match(EMAIL_RE) || [];
    for (const e of found) seen.add(e.trim().toLowerCase());
    console.log(`  read ${file.split("/").pop()} — ${found.length} email(s)`);
  }
  return [...seen];
}

async function postOne(email) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: SOURCE }),
    });
    if (res.status === 429) {
      const wait = (Number(res.headers.get("retry-after")) || 30) + 1;
      console.log(`    rate-limited, waiting ${wait}s…`);
      await sleep(wait * 1000);
      continue;
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { status: "error", detail: body.error || res.status };
    // The endpoint returns an id only when a NEW contact was created (and thus
    // the welcome email was sent). success with no id => already on the list.
    return { status: body.id ? "added" : "skipped" };
  }
  return { status: "error", detail: "429 after retries" };
}

async function main() {
  console.log(`\nMeta lead import → ${SOURCE}  (${DRY ? "DRY RUN" : ENDPOINT})`);
  console.log(`Reading ${DIR}`);
  const emails = await collectEmails();
  console.log(`\n${emails.length} unique email(s):`);
  emails.forEach((e) => console.log(`  ${e}`));

  if (DRY) {
    console.log(`\nDry run — nothing sent. Re-run without --dry-run to import.`);
    return;
  }

  const tally = { added: 0, skipped: 0, error: 0 };
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const { status, detail } = await postOne(email);
    tally[status]++;
    const label =
      status === "added" ? "added + welcomed" : status === "skipped" ? "already on list" : `ERROR: ${detail}`;
    console.log(`  [${i + 1}/${emails.length}] ${email} — ${label}`);
    if (i < emails.length - 1) await sleep(DELAY);
  }

  console.log(
    `\nDone. ${tally.added} added + welcomed, ${tally.skipped} already on list, ${tally.error} error(s).`
  );
  if (tally.error) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`);
  process.exit(1);
});
