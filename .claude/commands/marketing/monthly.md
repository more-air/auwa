---
name: Monthly Letter
description: Compose and send the monthly Auwa letter to the mailing list. Current micro-season plus a few quiet updates from Instagram and the journal.
---

## What this is

The Monthly Letter is Auwa's newsletter: one calm email sent roughly monthly to the full mailing list. Shape: a short centred masthead, a **main feature** (usually the current micro-season, big 4:5 image + a few lines), a **Lately** grid of two to four quiet updates, an optional forward-looking closing line, then the follow link. No hard sell, no article dump — a letter, not a digest.

It uses `website/main/src/emails/monthly.tsx` and the endpoint `/api/monthly/send` (a Resend Broadcast, same audience and `NEWSLETTER_SECRET` as the rest of the email system). This folded in the earlier 5-day "Quiet Letter" — one monthly send, not one every micro-season.

Load before starting:
- `context/marketing/newsletter.md` (email system, design principles, Resend setup)
- `context/pillar/journal.md` (writing voice)
- The global CLAUDE.md writing rules apply strictly (no em dashes, no AI vocabulary, no fragment-stacking).

## The letter's shape (what the fields map to)

`MonthlyEmail` props (`monthly.tsx`):
- **intro** — the centred masthead under the wordmark. Reusable format: `The monthly letter · [Month Year]`. A few words, not a sentence.
- **season** — the main feature: `{ image, imageAlt, kanji, name, dates, note, href?, cta?, href2?, cta2? }`.
  - `kanji` renders in a serif Mincho face, spaced, like the site's 72-seasons block. Don't hand-type kanji — pull from `micro-seasons.ts`.
  - `name` is the **English translation only** (e.g. "Paulownia trees bear fruit"), rendered uppercase. No romaji line.
  - `note` is the Step 3 text.
  - Links: prefer a **single** link to the 72 Seasons explainer — `href: "https://auwa.life/journal/72-seasons"`, `cta: "Learn more"`. Only add `href2`/`cta2` if a second link is genuinely additive (a plain IG link to the same illustration the hero already shows is not). The main feature need not be the season — it can be any big image + text + link.
- **updates** — the Lately grid, array of `{ image, imageAlt, title, line, href, cta }`. Two to four items (renders 2-up on desktop, stacks 1-up on mobile). `title` short (≤ ~16 chars, one line — the style is `nowrap`). `line` kept to a consistent length (~55-65 chars) so every tile wraps to the same number of lines. `cta` a uniform, platform-neutral label — use **"See more"** for all tiles.
- **horizon** — optional quiet closing line about what's coming next (e.g. books nearing release, the app entering testing). One sentence, prose, no roadmap. Omit it in months with no real news; the letter then closes straight into the follow link.
- **subject** — fixed masthead style: **"The Monthly Letter - Auwa"** (hyphen separator, no emoji).
- **preview** — one quiet sentence, not a repeat of the subject.

## Step 1: Fix the season

Read `website/main/src/lib/micro-seasons.ts`, determine the current micro-season from today's date (`getCurrentMicroSeason()`), and confirm it with the user (kanji / romaji / translation / dates). If the letter goes out mid-season or Rieko wants the one just ending, let the user pick.

## Step 2: Gather the images (the recipe)

All source images live in the shared Dropbox `social` folder (`$AUWA_SOCIAL_ROOT`, see `src/lib/social-root.ts`) — season art under `5-season/<season>/`, post content under the pillar folders. Confirm files are downloaded, not Dropbox online-only placeholders (a 0-byte file can't be read).

Output every newsletter image into `website/main/public/email/monthly/YYYY-MM/` using the sharp pipeline (keeps sizes tiny; email clients fetch images live):

```bash
export PATH="/usr/local/bin:$PATH"; cd website/main
# Main feature (4:5 portrait, ~1040×1300):
node scripts/process-image.js "<src>" public/email/monthly/2026-07/season-x.jpg email-hero
# Lately tiles (4:5 portrait, 500×625 — the uniform ratio that makes the grid tidy):
node scripts/process-image.js "<src>" public/email/monthly/2026-07/tile-x.jpg email-tile
```

**Video posts (Reels):** grab a still, don't screenshot. `qlmanage -t -s 1200 -o <dir> "<video>.mp4"` gives a quick poster frame, but it's an early frame and often carries the intro caption. To seek past the caption to a clean frame, use the Swift grabber, then bottom-crop so any residual top caption is dropped:

```bash
swift scripts/grab-video-frame.swift "<video>.mp4" /tmp/frame.png 13   # frame at 13s
node scripts/process-image.js /tmp/frame.png public/email/monthly/2026-07/tile-x.jpg email-tile south
```

The optional 4th arg (`south`) crops from the bottom. Prefer a clean source frame from the post's `_png` folder if one exists.

## Step 3: Write the season note

Two to four sentences. Journal voice: unhurried, precise, one concrete sensory observation of what the season is doing right now, lightly threaded to noticing / Kokoro. Never a lecture, never salesy.

## Step 4: Gather the Lately items

Ask the user for two to four things to feature — recent Instagram posts, journal articles, or quiet news. Per the flow the user prefers, take them **one at a time**: what it is, where it links (paste the URL — IG post text can't be fetched, so write the line yourself from the image), then move to the next. For each, write a short title and a consistent-length one-line description (see field notes above), and use "See more" as the CTA. Point at the website over an IG post when the site page is stronger (e.g. the book page vs a book IG post). Order for flow, strongest first.

## Step 5: Voice check

Zero em dashes, zero AI vocabulary, no three-fragment stacking. Read it aloud in your head. A letter from someone with good taste who respects your time, not a marketing email.

## Step 6: Preview (single-recipient, safe)

Assemble the props into a JSON file (in the scratchpad), then render/send with `send-monthly-test.tsx` — a plain transactional send that never touches the audience:

```bash
export PATH="/usr/local/bin:$PATH"; cd website/main
# Local browser preview (writes HTML; point image URLs at the dev server to see them):
RENDER_ONLY=public/email/monthly/_preview.html npx tsx --tsconfig scripts/tsconfig.json \
  scripts/send-monthly-test.tsx you@example.com /path/props.json
sed -i '' 's#https://auwa.life/email/#/email/#g' public/email/monthly/_preview.html   # then open on localhost:3003; delete the file after
# Or send the real assembled letter to ONE address to check it in a real client:
npx tsx --tsconfig scripts/tsconfig.json scripts/send-monthly-test.tsx you@example.com /path/props.json
```

The props JSON carries `subject` (used as the email subject) plus the `MonthlyEmail` fields. Show the user the assembled letter and iterate here until approved. **Images must be live at their `auwa.life` URL for a mailed test to render them**, so deploy new images first (Step 7). When re-sending a test after changing an image kept at the same filename, append `?v=N` to the image URLs in the props — mail clients cache by URL, so an unchanged filename shows the stale version otherwise.

## Step 7: Deploy the images

The images must be public before any send (test or real), and the broadcast endpoint renders the **deployed** `monthly.tsx`, so any template change must ship too. Commit and deploy via `/website:deploy` (or the deploy flow), then verify:

```bash
for f in season-x tile-a tile-b; do curl -s -o /dev/null -w "$f %{http_code}\n" \
  "https://auwa.life/email/monthly/2026-07/$f.jpg"; done
```

## Step 8: Send to the list (real broadcast — irreversible)

Only after the user has **explicitly approved sending to the real list**. This goes to every subscriber and cannot be unsent. Read `NEWSLETTER_SECRET` from `website/main/.env.local`, then POST the same assembled props (including `horizon` if used) to production:

```bash
SECRET=$(grep -E '^NEWSLETTER_SECRET=' website/main/.env.local | cut -d= -f2- | tr -d '"')
curl -X POST https://auwa.life/api/monthly/send \
  -H "Content-Type: application/json" \
  -d "{\"secret\":\"$SECRET\", ...all the props from the JSON... }"
```

Returns `{ success: true, id: "..." }`. Report the result and the audience size (Resend dashboard). On failure, common causes: unverified domain, wrong audience ID, or an image URL 404.

**Warning:** there is no safe "local" version of this endpoint — pointing the curl at `localhost` still calls `resend.broadcasts.send()` against the real `RESEND_AUDIENCE_ID`. Use `send-monthly-test.tsx` for anything that shouldn't reach subscribers.

## Notes

- Always preview before sending. Never send to the list without explicit approval.
- The template footer's unsubscribe uses `{{{RESEND_UNSUBSCRIBE_URL}}}`, which Resend substitutes per-recipient in a Broadcast (one-click unsubscribe + the List-Unsubscribe header Gmail/Yahoo require). Keep it — don't revert it to a mailto.
- Each issue gets its own `public/email/monthly/YYYY-MM/` folder, so image caching is a non-issue for the real send (fresh URLs); the `?v=N` trick is only for re-testing at a reused filename.
- Cadence is roughly monthly. The discipline is brevity, not frequency: keep it tight so it reads as a gift.
