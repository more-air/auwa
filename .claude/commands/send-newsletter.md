---
name: Send Newsletter
description: Compose and send a newsletter to the AUWA mailing list. Handles content selection, preview, and sending.
---

## Instructions

You are composing and sending a newsletter for AUWA. Load these context files before starting:

- `context/newsletter.md` (email system, templates, design principles, subject line format)
- `context/editorial.md` (writing voice)

The global CLAUDE.md writing style rules apply strictly (no em dashes, no AI vocabulary). The newsletter voice matches the journal: unhurried, precise, concrete.

## Step 1: Gather the Brief

Ask the user these questions one at a time (not all at once):

1. "What's the theme or occasion for this newsletter? (A season, a new article, a milestone, or just a regular update?)"
2. "Which journal articles should we feature? I can pull the latest from the site, or you can tell me which ones."
3. "Any personal note or closing thought you'd like to include?"

If the user provides all this information upfront, skip the questions and proceed.

## Step 2: Pull Content from the Site

Based on the user's answers:

1. Read the journal listing page (`website/main/src/app/journal/page.tsx`) to get the current article list
2. Read the relevant article pages (`website/main/src/app/journal/[slug]/page.tsx`) to get titles, subtitles, excerpts, and hero images for the featured articles
3. Check which images are available in `website/main/public/journal/` for the featured articles
4. Build the article array with full URLs: `https://auwa.life/journal/[slug]` for links, `https://auwa.life/journal/[slug]/[image]` for images

## Step 3: Write the Newsletter Content

Write the newsletter components:

- **Subject line**: Follow the format in newsletter.md (`[Topic] | AUWA`). Short, specific, lowercase after first word. No emojis.
- **Preview text**: One sentence that works as a teaser in email clients. Not a repeat of the subject.
- **Heading**: 1-3 words. Can be a season name, a theme, or a simple greeting.
- **Intro paragraph**: 2-4 sentences. Set the scene or mood. Connect to the season or theme. Never salesy.
- **Article excerpts**: For each featured article, write a 1-2 sentence excerpt that draws the reader in. Use existing subtitles or write fresh ones.
- **Closing note** (optional): A brief, warm sign-off if the user wanted one. Italic in the template.

## Step 4: Voice Check

Before showing the draft, run the same voice check as articles:

- Search for em dashes. There must be zero.
- Search for AI vocabulary. There must be zero.
- Read for anything that sounds like a marketing email. Rewrite it.
- The tone should feel like a letter from a friend who happens to have good taste.

## Step 5: Preview

Show the user the complete newsletter content in a readable format:

```
Subject: [subject line]
Preview: [preview text]

---

AUWA

[heading]

[intro paragraph]

---

[Article 1 title]
[Article 1 excerpt]
→ Read: https://auwa.life/journal/[slug]

[Article 2 title]
[Article 2 excerpt]
→ Read: https://auwa.life/journal/[slug]

---

[closing note if any]
```

Ask: "Happy with this? I can adjust the tone, swap articles, or change the subject line before sending."

## Step 6: Send

Once approved, send the newsletter by calling the API:

```bash
curl -X POST https://auwa.life/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "NEWSLETTER_SECRET_FROM_ENV",
    "subject": "[subject]",
    "previewText": "[preview]",
    "heading": "[heading]",
    "intro": "[intro]",
    "articles": [
      {
        "title": "[title]",
        "excerpt": "[excerpt]",
        "url": "https://auwa.life/journal/[slug]",
        "image": "https://auwa.life/journal/[slug]/[hero-image]"
      }
    ],
    "closingNote": "[closing or null]"
  }'
```

Read the NEWSLETTER_SECRET from `website/main/.env.local` before sending. Use the production URL (https://auwa.life), not localhost.

Report the result to the user. If successful, confirm it's been sent and how many contacts are in the audience.

## Important Notes

- Always preview before sending. Never send without explicit approval.
- The intro paragraph should be written fresh each time, not copied from articles.
- If the user hasn't specified articles, suggest the 2-3 most recent ones.
- Hero images must be full absolute URLs (https://auwa.life/...) since they render in email clients, not on the website.
- If sending fails, check Resend dashboard for the error. Common issues: unverified domain, API key expired, audience ID wrong.
