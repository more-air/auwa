---
name: Import Leads
description: Import Meta lead-form CSVs into Resend — adds each email to the single Auwa list and fires the welcome email, reusing the website signup path. Idempotent (skips contacts already on the list).
---

## Purpose

Meta lead-form ads collect emails *inside Instagram*; they do not flow to Resend automatically and they do not get the website's welcome email. This command closes that gap: it replays each lead through the live `/api/signup` endpoint, which adds the contact to the right Resend audience AND sends the source welcome email, exactly as a website signup would. It skips anyone already on the list (no duplicates, no second welcome).

Background: see `context/marketing/instagram.md` ("Meta lead ads" + the capture loop). The importer lives at `scripts/import-meta-leads.mjs`.

## Before running

Tom exports the leads CSV from Meta Ads Manager (Ads Manager → the form → download leads; export the **full date range** each time and let the script dedupe — don't hand-trim to "only new" rows) and drops it into `share/meta-leads/`. That folder is gitignored, so the emails never reach git.

**These are real welcome emails to real people.** Always dry-run first and show Tom the list before the real send.

## Steps

1. **Confirm the drop.** `ls share/meta-leads/` — check a `.csv` is present. If the folder is empty, ask Tom to export from Meta and drop it in, then stop.

2. **Dry run.** Set PATH and preview without sending:
   ```
   export PATH="/usr/local/bin:$PATH" && node scripts/import-meta-leads.mjs --dry-run
   ```
   Show Tom the unique email count and the list. If it reports **0 emails**, the CSV encoding/format is off (Meta exports UTF-16 LE, tab-separated — the script already handles that; a zero usually means an empty or malformed export). Inspect the raw file before proceeding; do not run the real import against a broken parse.

3. **Real import** (only after Tom has seen the dry-run list; the count is small enough that a glance confirms it):
   ```
   export PATH="/usr/local/bin:$PATH" && node scripts/import-meta-leads.mjs
   ```
   It throttles ~13s per email for the endpoint's 5/min rate limit, so a batch takes a minute or so. It prints a per-email result (`added + welcomed` / `already on list` / `ERROR`) and a final tally.

4. **Report.** Give Tom the tally: X added + welcomed, Y already on list, Z errors. If there were errors, show them — do not silently swallow.

5. **Remind** (once, lightly): the CSV in `share/meta-leads/` holds real emails; Tom can clear the folder now it's imported. Don't delete his file yourself.

## Options (rarely needed)

- `--source=<name>` — passed through to `/api/signup` for logging only; it no longer changes which list a contact joins (every signup feeds the single Auwa list as of 23 Jul 2026). Default `newsletter`.
- `--dir=<path>` — read a specific file or folder instead of `share/meta-leads/`.
- `--delay=<ms>` — gap between requests (default 13000).

## Note

This is the deliberately simple path. If lead volume ever grows enough that daily manual imports get tedious, automate the CSV step (Meta form → Google Sheet → a connector POSTing to `/api/signup`), per the options discussed in `instagram.md`. At current volumes, export-drop-run is less work than maintaining a connector.
