# Auwa Newsletter

*Created: April 2026. Reference for sending newsletters and managing email.*

---

## How It Works

Three pieces: welcome emails (automatic), newsletter sends (manual via API), and the templates that power both.

**Welcome emails** fire automatically when someone signs up on the website. Everyone now gets the single unified `newsletter` variant. No verification step, no double opt-in. The email is a quiet nod, not a sales funnel. Sent transactionally via `resend.emails.send()`. Because the Broadcast-only `{{{RESEND_UNSUBSCRIBE_URL}}}` merge var does NOT substitute in transactional sends (it would render as a literal string), the welcome uses a **hosted one-click unsubscribe** instead: the signup route builds `https://auwa.life/api/unsubscribe?c=<contactId>` from the created contact id, puts it in the footer link, and adds `List-Unsubscribe` + `List-Unsubscribe-Post` headers. `/api/unsubscribe` (GET = branded page, POST = one-click) marks the contact `unsubscribed:true`. Contact id is a UUID, so no signed token is needed.

**Newsletters** are sent manually by calling the API endpoint, which creates and dispatches a Resend **Broadcast** (not a transactional email). This routes through `resend.broadcasts.create()` + `resend.broadcasts.send()` so `{{{RESEND_UNSUBSCRIBE_URL}}}` is replaced with a working per-recipient unsubscribe link and the `List-Unsubscribe` header is attached (required by Gmail/Yahoo since Feb 2024). You pass the content (heading, intro, articles, images) as JSON. Protected by a secret token so it can't be triggered accidentally.

---

## Email Templates

Both templates live in `website/main/src/emails/` as React Email components.

### welcome.tsx
Sent automatically on signup. Four variants based on source, with subjects tuned so Store and Book don't fall into Gmail Promotions:
- **newsletter**: subject "Welcome to Auwa" · "Stay close." body
- **app-waitlist**: subject "You're on the Auwa App waitlist" · "A practice is taking shape." body
- **store-waitlist**: subject "A note from Auwa." · "Made by hand, chosen with care." body
- **book-waitlist**: subject "A note from Auwa." · "Many stories, one light." body

### newsletter.tsx
The template for manual newsletter sends (article-led, monthly-ish). Accepts:
- `previewText` — the preview line shown in email clients
- `heroImage` — optional full-width image URL at the top
- `heroAlt` — alt text for the hero image
- `heading` — main heading (e.g. "Seasonal letter." or "Usui · Light rain.")
- `intro` — opening paragraph
- `articles` — array of `{ title, excerpt, url, image? }` objects
- `closingNote` — optional italic closing line

### monthly.tsx
The **Monthly Letter** — one calm email sent roughly monthly to the full list. One season (Rieko's illustration, kanji, a few lines) plus a short "Lately" section of one to three quiet updates pulled from recent Instagram posts and/or journal articles. This replaced an earlier "Quiet Letter" design that sent every 5 days in lockstep with the 72 micro-seasons — that cadence proved too frequent for subscribers, so it was folded into this single monthly send instead. Sent via its own endpoint `/api/monthly/send` (same NEWSLETTER_SECRET, same audience, Broadcast so unsubscribe works). Run it with the **`/marketing:monthly`** slash command (which carries the full image + assembly recipe). Accepts:
- `preview` — the preview line shown in email clients
- `intro` — the short centred masthead under the wordmark. Format: `The monthly letter · [Month Year]`
- `season` — the main feature: `{ image, imageAlt, kanji, name, dates, note, href?, cta?, href2?, cta2? }`. `name` is the English translation only (rendered uppercase); `kanji` renders serif Mincho, spaced. Prefer a single link to the 72 Seasons article (`cta: "Learn more"`). `null` for a month with no seasonal note.
- `updates` — array of `{ image, imageAlt, title, line, href, cta }`, the "Lately" grid (two to four items; 2-up on desktop, stacks 1-up on mobile). Short one-line titles, consistent-length lines, uniform `cta: "See more"`.
- `horizon` — optional quiet closing line about what's coming next (omit when there's no real news)

Newsletter images go in `website/main/public/email/monthly/YYYY-MM/` (one folder per issue), processed via `scripts/process-image.js` in `email-hero` (4:5 main feature) / `email-tile` (4:5 grid tile) modes, and must be deployed before send. Video posts: pull a still with `scripts/grab-video-frame.swift`, then `email-tile ... south` to bottom-crop past any caption. The footer unsubscribe uses `{{{RESEND_UNSUBSCRIBE_URL}}}` (substituted per-recipient in the Broadcast). Cadence: roughly monthly; keep it tight so it reads as a letter, not a digest.

---

## Sending a Newsletter

### Step 1: Prepare the content

Decide which journal articles to feature. Get the URLs, titles, excerpts, and hero images from the live site. Images must be full URLs (e.g. `https://auwa.life/journal/article-name/hero.jpg`).

### Step 2: Send via API

```bash
curl -X POST https://auwa.life/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "auwa-send-2026",
    "subject": "Light rain. - Auwa",
    "previewText": "Three pieces on seasonal living, Japanese craft, and finding stillness.",
    "heading": "Seasonal letter.",
    "intro": "Spring has settled in. The plum blossoms are gone, replaced by something quieter. Here are three pieces from the journal.",
    "articles": [
      {
        "title": "The blacksmith who sleeps beside his forge",
        "excerpt": "In Sakai, a third-generation knife maker explains why he has never taken a holiday.",
        "url": "https://auwa.life/journal/blacksmith-forge",
        "image": "https://auwa.life/journal/blacksmith-forge/hero.jpg"
      },
      {
        "title": "What the rain teaches",
        "excerpt": "Usui marks the moment winter loosens its grip. The old farmers knew this was the real new year.",
        "url": "https://auwa.life/journal/what-the-rain-teaches"
      }
    ],
    "closingNote": "Until next time. Be well."
  }'
```

Or test locally first:

```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "auwa-send-2026",
    "subject": "Test newsletter - Auwa",
    "previewText": "Testing the newsletter system.",
    "heading": "Test.",
    "intro": "This is a test send.",
    "articles": [],
    "closingNote": "Ignore this."
  }'
```

### Step 3: Verify

Check Resend dashboard for delivery status. The API returns `{ success: true, id: "..." }` on success.

---

## Email Design Principles

The emails follow the same principles as the website.

**Typography**: EB Garamond for all editorial text (headings, body, links). Inter for functional elements (CTAs, metadata, unsubscribe). The Auwa wordmark is rendered as styled text (EB Garamond, 24px, 0.25em tracking) rather than an image, for reliability across email clients.

**Colour**: Warm off-white background (#f8f7f4). Void text (#141318) at varying opacities. No brand colours in emails beyond this. The restraint is the point.

**Layout**: Single column, 520px max width, generous padding. No sidebars, no multi-column grids, no cards. Just text and the occasional image.

**Tone**: The same voice as the journal. Unhurried, precise, concrete. Never salesy. Never "DON'T MISS OUT." The email should feel like a letter from someone who respects your time.

**Images**: Hero images optional. Article images optional. When used, they're full-width, no border radius to speak of (2px max). Let the photography do the work.

---

## Sending From Address

All emails send from `Auwa <hello@auwa.life>`. This requires a verified domain in Resend. The domain `auwa.life` should already be verified (check Resend dashboard > Domains if emails bounce).

If the domain isn't verified yet: Resend dashboard > Domains > Add domain > add the DNS records (MX, SPF, DKIM) to your DNS provider > verify.

---

## Newsletter Cadence

No fixed schedule. Send when there's something worth reading. The 72 micro-seasons (roughly every 5 days) provide a natural content calendar, but the newsletter doesn't need to match that rhythm. Monthly is a good starting frequency. More often only if the content justifies it.

Each send should feature 1-3 journal articles, optionally tied to the current season or a theme. A short intro that sets context. An optional closing note. That's it.

---

## Subject Line Format

`[Topic or season name] - Auwa`

Examples:
- `Light rain. - Auwa`
- `Three objects with Kokoro. - Auwa`
- `A letter from Kyoto. - Auwa`
- `The spring journal. - Auwa`

Keep it short, specific, lowercase after the first word. Hyphen separator matches the website's page title format (updated April 2026 — all pages switched from pipe to hyphen for SEO + cross-touchpoint consistency). No emojis. No ALL CAPS. No questions designed to create false curiosity.

---

## File Reference

```
website/main/src/emails/welcome.tsx      — Welcome email template (auto-sent)
website/main/src/emails/newsletter.tsx   — Newsletter template (manual send, article-led)
website/main/src/emails/monthly.tsx      — Monthly Letter template (season + Lately updates)
website/main/src/lib/micro-seasons.ts    — 72-season data + getCurrentMicroSeason()
website/main/src/app/api/signup/route.ts — Signup + welcome email API
website/main/src/app/api/newsletter/send/route.ts — Newsletter send API
website/main/src/app/api/monthly/send/route.ts    — Monthly Letter send API
website/main/public/email/seasons/       — Rieko's per-season illustrations for the letter
share/monthly-letter/                    — Staging drop for season/update images before they go into public/email/
website/main/.env.local                  — API keys and newsletter secret (shared)
.claude/commands/marketing/monthly.md    — /marketing:monthly slash command
website/main/scripts/send-monthly-test.tsx — safe single-recipient preview send (bypasses the audience/broadcast entirely)
```

---

## Resend Setup

- **Audience ID**: `1924598e-56f8-478e-a0c9-cd896e612953` — the single consolidated "Auwa" list. As of 23 Jul 2026 all five signup forms feed this one audience (Resend has no per-contact tags; origin is stored as the contact `source` property). The old per-pillar audiences are dormant.
- **Welcome emails**: transactional (`resend.emails.send()`), hosted unsubscribe via `/api/unsubscribe`.
- **Monthly letter**: Resend **Broadcast** via `/api/monthly/send` (managed `{{{RESEND_UNSUBSCRIBE_URL}}}`). Verify with `dryRun` before a real send (Step 8 of `/marketing:monthly`).

**Env-var gotcha (bit us once):** the Vercel **Production** env vars `NEWSLETTER_SECRET`, `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` must have NO trailing newline. They'd been set with `echo` (appends `\n`), which broke the broadcast endpoint (401 on the secret, 500 on the Resend key). Set them with `printf '%s' "$val" | vercel env add NAME production` (no newline) and redeploy. `vercel env pull` masks them as `[SENSITIVE]`, so verify via `dryRun`, not by reading back. `.env.local` (used by the SDK / test scripts) is the clean source of truth.
