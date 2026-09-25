---
name: Article Newsletter
description: Send a single-story newsletter (one photo, heading, strapline, hook, one CTA) to the Auwa mailing list. Use when a new journal article goes live, or for any one-thing announcement.
---

## What this is

A one-story email for the full Resend list. Same look as the welcome email: wordmark, one photo, heading, italic strapline, a short hook, one link. It is NOT the monthly letter (`/marketing:monthly`, season plus Lately grid) and NOT the multi-article `/marketing:newsletter`. Use it when there is exactly one thing to share.

Template: `website/main/src/emails/single.tsx`. Endpoint: `/api/single/send` (Resend Broadcast, same audience and `NEWSLETTER_SECRET` as the rest). Test script: `website/main/scripts/send-single-test.tsx`.

The global CLAUDE.md writing rules apply strictly: no em dashes, no AI vocabulary, no fragment-stacking. Load `context/marketing/newsletter.md` and `context/pillar/journal.md` if you need more.

## The fields

Props JSON (also the request body, plus `secret` and optional `dryRun`):

- `subject`: the article title, then ` - Auwa` (e.g. `Musubi - Auwa`). Hyphen, no emoji.
- `preview`: one quiet sentence, not a repeat of the subject.
- `image`: full `https://auwa.life/email/articles/<slug>/hero.jpg` URL.
- `imageAlt`: short alt text.
- `heading`: the article title, exactly as on the site.
- `strapline`: the article's subtitle, reused word for word from `journal/page.tsx` (the `excerpt` field).
- `body`: array of 1-3 short paragraphs. A hook summary that makes someone want to read the piece. Don't retell the whole article, and don't give away the ending. Inline links use `[text](url)`. **Wherever a person or brand with a public page is named (e.g. Fin DAC), link them** (ask the user for the URL if you don't have it).
- `cta`: default `Read full article`. `ctaUrl`: `https://auwa.life/journal/<slug>`.

## Steps

1. **Find the article.** Ask which one if not given. Read its title and subtitle from `website/main/src/app/journal/page.tsx`, and the full text from `Dropbox/3 venture/auwa/journal/<slug>/text/4-live.txt` (or the page file). Confirm it is live at `https://auwa.life/journal/<slug>` (curl for 200).
2. **Pick the hero image.** Source is the article's social folder, `Dropbox/3 venture/auwa/social/3-journal/<slug>/`. Use one image only. If the folder has several hero options, ask which. Confirm it is downloaded, not a 0-byte online-only placeholder.
3. **Process the image** (4:5, 1040x1300):
   ```bash
   export PATH="/usr/local/bin:$PATH"; cd website/main
   node scripts/process-image.js "<src>" public/email/articles/<slug>/hero.jpg email-hero
   ```
4. **Write the copy.** Hook in Rieko and Tom's register, journal voice. Voice check: zero em dashes, no AI vocabulary, no stacked fragments. Show the user the subject, preview, strapline and body for a quick read.
5. **Save props** to a JSON file in the scratchpad.
6. **Deploy** the image and template (commit, push, `vercel --prod`, see `/website:deploy`). Images must be live for a test to render, and the broadcast endpoint uses the deployed template. Verify with `curl -s -o /dev/null -w "%{http_code}" https://auwa.life/email/articles/<slug>/hero.jpg`.
7. **Send a test** to the user (default `hello@moreair.co`), a plain transactional send that never touches the list:
   ```bash
   export PATH="/usr/local/bin:$PATH"; cd website/main
   npx tsx --tsconfig scripts/tsconfig.json scripts/send-single-test.tsx hello@moreair.co /path/props.json
   ```
   Re-testing with a changed image at the same filename: add `?v=N` to the image URL. `RENDER_ONLY=/path/out.html` renders HTML without sending.
8. **Dry-run the endpoint** (creates and deletes a draft, sends nothing):
   ```bash
   SECRET=$(grep -E '^NEWSLETTER_SECRET=' website/main/.env.local | cut -d= -f2- | tr -d '"')
   curl -X POST https://auwa.life/api/single/send -H "Content-Type: application/json" \
     -d "$(jq --arg s "$SECRET" '. + {secret:$s, dryRun:true}' /path/props.json)"
   ```
   Expect `{"success":true,"dryRun":true,...}`.
9. **Send to the list** only after the user explicitly approves the test. Same call without `dryRun`. It cannot be unsent, and pointing it at localhost still sends to the real audience. Report the result.

## Notes

- The footer unsubscribe is `{{{RESEND_UNSUBSCRIBE_URL}}}`, substituted per recipient in a Broadcast. Keep it.
- Never send to the list without explicit approval of the test version.
