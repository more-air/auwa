---
name: Monthly Letter
description: Compose and send the monthly Auwa letter to the mailing list. Current micro-season plus a few quiet updates from Instagram and the journal.
---

## What this is

The Monthly Letter is Auwa's newsletter: one calm email sent roughly monthly to the full mailing list. It carries the current micro-season (Rieko's illustration, kanji, a few lines) plus a short "Lately" section: one to three quiet updates pulled from recent Instagram posts and/or journal articles. No hard sell, no article dump — a letter, not a digest.

This replaces the earlier split between a 5-day "Quiet Letter" and a separate monthly draft. Sending every 5 days (matching the 72 micro-seasons 1:1) turned out to be too much for subscribers, so the two were folded into this single monthly send. It uses `monthly.tsx` and the endpoint `/api/monthly/send`, same audience and secret as everything else in the email system.

Load before starting:
- `context/marketing/newsletter.md` (email system, design principles, subject-line format, Resend setup)
- `context/pillar/journal.md` (writing voice)
- The global CLAUDE.md writing rules apply strictly (no em dashes, no AI vocabulary, no fragment-stacking).

## Step 1: Fix the season

Read `website/main/src/lib/micro-seasons.ts` and determine the current micro-season from today's date (`getCurrentMicroSeason()`). Tell the user which season it is (kanji / romaji / translation / date range) and confirm it's the right one — if the letter is going out a few days into a season, or Rieko wants to feature the one just ending, let the user pick instead. Don't hand-type kanji; pull it from this file.

## Step 2: Get the season illustration

Ask: "What's the image URL for this season's illustration?"

The image must be reachable at a public absolute URL at send time (email clients fetch it live). Two options:
- Drop the file in `share/monthly-letter/` first for review, then once approved move it into `website/main/public/email/seasons/` and deploy, referencing `https://auwa.life/email/seasons/[filename]`.
- Or any already-public URL (e.g. an existing site image).

Gotcha: if the file was just added to `public/` but not deployed, the URL will 404 in the email. Confirm the image loads at its URL before sending.

## Step 3: Write the season note

Two to four sentences. Journal voice: unhurried, precise, one concrete sensory observation of what the season is doing right now, lightly threaded to noticing / Kokoro. Never a lecture, never salesy. If Rieko already wrote an Instagram caption for this season, adapt it (usually a touch fuller than the caption).

## Step 4: Gather "Lately" updates

Ask the user for 1-3 things to feature this month — recent Instagram posts, new journal articles, or other quiet news (a figure taking shape, a craftsman partnership, a milestone). For each:
- Pull the image from the live post/article if possible, or ask the user for one (public URL, `share/monthly-letter/` staging first if it needs prep).
- Write a short title (a few words) and one line of description in the same unhurried voice — not ad copy.
- Get the destination link (`href`) and a quiet CTA label (`cta`, e.g. "See more", "Read").

Keep this section small. Two updates is usually enough; three is the ceiling. This is a letter, not a roundup.

## Step 5: Assemble the fields

- **subject**: `[translation]. - Auwa` (e.g. `Warm winds blow. - Auwa`). Lowercase after the first word, hyphen separator, no emoji.
- **preview**: one quiet sentence, not a repeat of the subject.
- **intro**: one to two sentences opening the letter (e.g. "A quiet note as July gives way to August...").
- **season**: `{ image, imageAlt, kanji, name, dates, note }` — `name` is romaji + English gloss (e.g. "Tsuchi uruōte — earth damp with heat"), `dates` is the date range, `note` is the Step 3 text. Pass `season: null` only if there's genuinely no seasonal note this month.
- **updates**: array of `{ image, imageAlt, title, line, href, cta }` from Step 4.

## Step 6: Voice check

Before previewing: zero em dashes, zero AI vocabulary, no three-fragment stacking. Read it aloud in your head. It should feel like a letter from someone with good taste who respects your time, not a marketing email.

## Step 7: Preview

Show the user the assembled letter in readable form:

```
Subject: [subject]
Preview: [preview]

---
AUWA

[intro]

[season image: url]
[kanji]
[name]  ·  [dates]
[season note]

Lately

[update 1 image: url]
[update 1 title]
[update 1 line]
[update 1 cta] → [href]

...

With warmth,
Tom and Rieko
```

Ask: "Happy to send, or adjust the words, images, or subject?"

## Step 8: Send

Once approved, read `NEWSLETTER_SECRET` from `website/main/.env.local`, then POST to the production endpoint:

```bash
curl -X POST https://auwa.life/api/monthly/send \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "NEWSLETTER_SECRET_FROM_ENV",
    "subject": "Warm winds blow. - Auwa",
    "preview": "The season turns, and a little of what we have been making.",
    "intro": "A quiet note as July gives way to August, with a little of what we have been making, and the season turning outside the window.",
    "season": {
      "image": "https://auwa.life/email/seasons/atsukaze-itaru.jpg",
      "imageAlt": "Auwa in a warm summer wind, by Eko Maeda",
      "kanji": "温風至",
      "name": "Atsukaze itaru — warm winds blow",
      "dates": "28 July - 1 August",
      "note": "The first warm winds of high summer arrive this week..."
    },
    "updates": [
      {
        "image": "https://auwa.life/pillars/store.jpg",
        "imageAlt": "The first Auwa figure",
        "title": "The first figure is taking shape",
        "line": "Signed, hand-finished, and almost ready.",
        "href": "https://auwa.life/store",
        "cta": "See more"
      }
    ]
  }'
```

**Warning:** there is no safe "local" version of this endpoint. Pointing the curl at `localhost:3000` instead of production only changes which server handles the request — the route still calls `resend.broadcasts.send()` against the real `RESEND_AUDIENCE_ID` in `.env.local`, so it reaches every real subscriber either way. Only run the curl above once the user has explicitly approved sending to the real list.

For safe iteration on format or copy before that point, use the single-recipient preview script instead — it bypasses the audience/broadcast system entirely and only emails the address you give it:

```bash
export PATH="/usr/local/bin:$PATH" && npx tsx --tsconfig scripts/tsconfig.json scripts/send-monthly-test.tsx you@example.com
```

Note this script currently renders `MonthlyEmail({})`, i.e. the template's built-in sample content — update its props (or point it at the assembled fields from Step 5) to preview the actual draft rather than the sample.

The real send API returns `{ success: true, id: "..." }`. Report the result and the audience size. If it fails, check the Resend dashboard (common issues: unverified domain, wrong audience ID, image URL 404).

## Notes

- Always preview before sending. Never send without explicit approval.
- The real send endpoint (`/api/monthly/send`) always broadcasts to the full live audience — there is no test-recipient mode on the production path. Use `send-monthly-test.tsx` for anything that shouldn't go to real subscribers yet.
- Cadence is roughly monthly. The discipline is brevity, not frequency: keep it tight so it reads as a gift, not a digest.
- Goes to the full Auwa audience. The figure-lottery / signup hooks are what grow that list; this letter is what keeps it warm.
