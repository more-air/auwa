---
name: Quiet Letter
description: Compose and send the every-5-days micro-season "quiet letter" to the Auwa mailing list. One season, one illustration, a few lines.
---

## What this is

The Quiet Letter is Auwa's newsletter: a short note sent as each of the 72 micro-seasons turns (roughly every 5 days). It carries Rieko's illustration for the current season plus two to four sentences about what is shifting in nature and how it touches the Auwa idea of noticing (Kokoro). It is the SAME asset Rieko already makes for the 72-season Instagram cadence, re-dressed as an email. One piece of writing, two channels. No hard sell.

It is separate from `/marketing:newsletter` (that one carries journal articles and is monthly-ish). This one is smaller, more frequent, and season-led. It uses its own template (`quiet-letter.tsx`) and endpoint (`/api/quiet-letter/send`), but the same audience, secret, and design language.

Load before starting:
- `context/marketing/newsletter.md` (email system, design principles, subject-line format, Resend setup)
- `context/pillar/journal.md` (writing voice)
- The global CLAUDE.md writing rules apply strictly (no em dashes, no AI vocabulary, no fragment-stacking).

## Step 1: Fix the season

Read `website/main/src/lib/micro-seasons.ts` and determine the current micro-season from today's date (the file has `getCurrentMicroSeason()` and the full table). Tell the user which season it is (kanji / romaji / translation) and confirm it is the right one. If Rieko is writing ahead for the NEXT turning, let the user pick that entry instead. The season fields (kanji, romaji, translation) come straight from this file. Do not hand-type kanji.

## Step 2: Get the illustration

Ask: "What's the image URL for this season's illustration?"

The image must be reachable at a public absolute URL at send time (email clients fetch it live). Two clean options:
- Drop the file in `website/main/public/email/seasons/` and deploy, then reference `https://auwa.life/email/seasons/[filename]`.
- Or any already-public URL (e.g. an existing site image).

If it is a video/animation (Rieko's Reels), use a still frame as the image and offer to add a soft "See it move" link to the Instagram Reel (Step 4 `link`).

Gotcha: if the file was just added to `public/` but not deployed, the URL will 404 in the email. Confirm the image loads at its URL before sending.

## Step 3: Write the letter

Two to four sentences, total. In the journal voice: unhurried, precise, one concrete sensory observation of what the season is doing right now, lightly threaded to noticing / Kokoro. Never a lecture, never salesy. If Rieko already wrote an Instagram caption for this season, adapt it (usually a touch fuller than the caption). Structure the output as one or two short paragraphs (the template takes a `paragraphs` array).

Optionally write a one-line `signOff` (e.g. "Rieko", or "Until the next turning"). Keep the commercial layer out of the body; only about every sixth letter may carry one gentle line about the app, book, or figure, and only if the user asks for it.

## Step 4: Assemble the fields

- **subject**: `[translation]. - Auwa` (e.g. `Warm winds blow. - Auwa`). Lowercase after the first word, hyphen separator, no emoji.
- **previewText**: one quiet sentence, not a repeat of the subject.
- **kanji / romaji / translation**: from micro-seasons.ts.
- **image / imageAlt**: from Step 2.
- **paragraphs**: array of the sentences from Step 3.
- **link** (optional): `{ "label": "See it move", "url": "https://instagram.com/..." }`.
- **signOff** (optional).

## Step 5: Voice check

Before previewing: zero em dashes, zero AI vocabulary, no three-fragment stacking. Read it aloud in your head. It should feel like a letter from someone with good taste who respects your time, not a marketing email.

## Step 6: Preview

Show the user the assembled letter in readable form:

```
Subject: [subject]
Preview: [previewText]

---
AUWA

[kanji]
[romaji]  ·  [translation]

[image: url]

[paragraph 1]
[paragraph 2]

[link label if any]
[signOff if any]
```

Ask: "Happy to send, or adjust the words, image, or subject?"

## Step 7: Send

Once approved, read `NEWSLETTER_SECRET` from `website/main/.env.local`, then POST to the production endpoint:

```bash
curl -X POST https://auwa.life/api/quiet-letter/send \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "NEWSLETTER_SECRET_FROM_ENV",
    "subject": "Warm winds blow. - Auwa",
    "previewText": "The seventh season of summer has arrived.",
    "kanji": "温風至",
    "romaji": "Atsukaze itaru",
    "translation": "Warm winds blow",
    "image": "https://auwa.life/email/seasons/atsukaze-itaru.jpg",
    "imageAlt": "Auwa in a warm summer wind, by Eko Maeda",
    "paragraphs": [
      "The first warm winds of high summer arrive this week...",
      "..."
    ],
    "link": { "label": "See it move", "url": "https://instagram.com/p/..." },
    "signOff": "Rieko"
  }'
```

To test locally first, POST to `http://localhost:3000/api/quiet-letter/send` (dev server must be running). Note: local images must still be public URLs.

The API returns `{ success: true, id: "..." }`. Report the result and the audience size. If it fails, check the Resend dashboard (common issues: unverified domain, wrong audience ID, image URL 404).

## Notes

- Always preview before sending. Never send without explicit approval.
- Cadence is every ~5 days as each season turns. The discipline is brevity, not frequency: keep each one tiny and beautiful so the rhythm reads as a gift.
- Goes to the full Auwa audience (same as the newsletter). The figure-lottery / signup hooks are what grow that list; this letter is what keeps it warm.
