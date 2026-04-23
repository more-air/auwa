# AUWA Newsletter

*Created: April 2026. Reference for sending newsletters and managing email.*

---

## How It Works

Three pieces: welcome emails (automatic), newsletter sends (manual via API), and the templates that power both.

**Welcome emails** fire automatically when someone signs up on the website. Each signup source gets a different message: newsletter subscribers hear about the journal and what to expect; app/store/book waitlisters get confirmation they're on the list with a pointer to the journal. No verification step. No double opt-in. The email is a quiet nod, not a sales funnel. These are sent transactionally via `resend.emails.send()`, and the unsubscribe link in the footer is a `mailto:hello@auwa.life?subject=Unsubscribe` rather than a merge variable (merge vars only substitute in Broadcasts).

**Newsletters** are sent manually by calling the API endpoint, which creates and dispatches a Resend **Broadcast** (not a transactional email). This routes through `resend.broadcasts.create()` + `resend.broadcasts.send()` so `{{{RESEND_UNSUBSCRIBE_URL}}}` is replaced with a working per-recipient unsubscribe link and the `List-Unsubscribe` header is attached (required by Gmail/Yahoo since Feb 2024). You pass the content (heading, intro, articles, images) as JSON. Protected by a secret token so it can't be triggered accidentally.

---

## Email Templates

Both templates live in `website/main/src/emails/` as React Email components.

### welcome.tsx
Sent automatically on signup. Four variants based on source, with subjects tuned so Store and Book don't fall into Gmail Promotions:
- **newsletter**: subject "Welcome to AUWA" · "Stay close." body
- **app-waitlist**: subject "You're on the AUWA App waitlist" · "A practice is taking shape." body
- **store-waitlist**: subject "A note from AUWA." · "Made by hand, chosen with care." body
- **book-waitlist**: subject "A note from AUWA." · "Many stories, one light." body

### newsletter.tsx
The template for manual newsletter sends. Accepts:
- `previewText` — the preview line shown in email clients
- `heroImage` — optional full-width image URL at the top
- `heroAlt` — alt text for the hero image
- `heading` — main heading (e.g. "Seasonal letter." or "Usui · Light rain.")
- `intro` — opening paragraph
- `articles` — array of `{ title, excerpt, url, image? }` objects
- `closingNote` — optional italic closing line

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
    "subject": "Light rain. | AUWA",
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
    "subject": "Test newsletter | AUWA",
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

**Typography**: EB Garamond for all editorial text (headings, body, links). Inter for functional elements (CTAs, metadata, unsubscribe). The AUWA wordmark is rendered as styled text (EB Garamond, 24px, 0.25em tracking) rather than an image, for reliability across email clients.

**Colour**: Warm off-white background (#f8f7f4). Void text (#141318) at varying opacities. No brand colours in emails beyond this. The restraint is the point.

**Layout**: Single column, 520px max width, generous padding. No sidebars, no multi-column grids, no cards. Just text and the occasional image.

**Tone**: The same voice as the journal. Unhurried, precise, concrete. Never salesy. Never "DON'T MISS OUT." The email should feel like a letter from someone who respects your time.

**Images**: Hero images optional. Article images optional. When used, they're full-width, no border radius to speak of (2px max). Let the photography do the work.

---

## Sending From Address

All emails send from `AUWA <hello@auwa.life>`. This requires a verified domain in Resend. The domain `auwa.life` should already be verified (check Resend dashboard > Domains if emails bounce).

If the domain isn't verified yet: Resend dashboard > Domains > Add domain > add the DNS records (MX, SPF, DKIM) to your DNS provider > verify.

---

## Newsletter Cadence

No fixed schedule. Send when there's something worth reading. The 72 micro-seasons (roughly every 5 days) provide a natural content calendar, but the newsletter doesn't need to match that rhythm. Monthly is a good starting frequency. More often only if the content justifies it.

Each send should feature 1-3 journal articles, optionally tied to the current season or a theme. A short intro that sets context. An optional closing note. That's it.

---

## Subject Line Format

`[Topic or season name] | AUWA`

Examples:
- `Light rain. | AUWA`
- `Three objects with Kokoro. | AUWA`
- `A letter from Kyoto. | AUWA`
- `The spring journal. | AUWA`

Keep it short, specific, lowercase after the first word. The pipe separator matches the website's page title format. No emojis. No ALL CAPS. No questions designed to create false curiosity.

---

## File Reference

```
website/main/src/emails/welcome.tsx      — Welcome email template (auto-sent)
website/main/src/emails/newsletter.tsx   — Newsletter template (manual send)
website/main/src/app/api/signup/route.ts — Signup + welcome email API
website/main/src/app/api/newsletter/send/route.ts — Newsletter send API
website/main/.env.local                  — API keys and newsletter secret
```

---

## Resend Setup

- **Audience ID**: 5c25ed2d-c4c8-4671-b27b-5bf92d61bba3 (all contacts go here)
- **Segments**: App Waitlist, Store Waitlist, Book Waitlist (3 segments, free plan limit)
- **Newsletter subscribers**: In audience, no segment (filter by "not in any segment" to find them)
- **Welcome emails**: Sent via Resend Emails API (transactional, not broadcast)
- **Newsletters**: Sent via Resend Emails API with `to: audience:ID` (broadcast to full list)
