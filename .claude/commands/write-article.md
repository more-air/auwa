---
name: Write Article
description: Write a new journal article for auwa.life. Handles image optimisation, writing, and assembly.
---

## Instructions

You are writing a journal article for auwa.life. Load these context files before starting:

- `context/editorial.md` (writing voice, article structure, production workflow, image pipeline)
- `context/brand.md` (brand guidelines, typography, colour)

Follow the production workflow in editorial.md exactly. The global CLAUDE.md writing style rules apply strictly (no em dashes, no AI vocabulary).

## Step 1: Gather the Brief

Ask the user these questions one at a time (not all at once):

1. "What's the article about? A few sentences on the subject, angle, and any specific memories or details to include."
2. "Which category: Seasons, Craft, Philosophy, or Travel?"
3. "Have you dropped photos into `auwa/photos/`? If so, what's the folder name?"

If the user provides all this information upfront, skip the questions and proceed.

## Step 2: Process Images

If photos have been provided in `auwa/photos/[slug]/`:

1. Create the output directory: `website/main/public/journal/[slug]/`
2. List all images in the source folder and show them to the user
3. Ask: "Which image should be the hero? And are any of these a pair (two detail shots to sit side by side)?"
4. Optimise each image following the pipeline in editorial.md (resize to 2400px max, JPEG quality 85, rename to convention)
5. Report the final file sizes

If no photos yet, proceed with writing and note where images will go.

## Step 3: Write the Article

Write the full article following editorial.md Section 3 (Article Structure):

- Open in the scene. No preamble.
- 800-1500 words.
- Include one pullquote (the single most resonant line).
- Mix paragraph lengths for rhythm.

## Step 4: Voice Check

Before showing the draft, run the voice check from editorial.md Section 4:

- Search for em dashes. There must be zero.
- Search for AI vocabulary (delve, tapestry, nestled, journey, elevate, unlock, unpack, reimagine, landscape as metaphor). There must be zero.
- Check the ending. If it callbacks to the opening thesis, rewrite it.
- Read for anything that sounds written by committee. Rewrite it.

## Step 5: Assemble

Assemble the article as a content block array matching the format in the existing article page (`website/main/src/app/journal/[slug]/page.tsx`). Show the user:

1. The full article text
2. The proposed content block order (text, image, image-pair, pullquote)
3. The metadata (title, subtitle, category, author, photographer, publishedAt, heroImage)

Ask: "Happy with this, or want to adjust anything before I add it to the site?"

## Step 6: Add to Site

Once approved:

1. Add the article data to the articles object in `website/main/src/app/journal/[slug]/page.tsx`
2. Add it to the article list in `website/main/src/app/journal/page.tsx` (include the `image` field pointing to the hero image so it shows on the listing page)
3. Add it to the `latestArticles` array in `website/main/src/app/page.tsx` at the top (most recent first), with the `image` field pointing to the hero image. Increment the issue number to be one higher than the current highest.
4. Add the article slug to the `articleSlugs` array in `website/main/src/app/sitemap.ts`
5. Test the build compiles cleanly

**SEO note:** Dynamic metadata (og:title, og:description, og:image, twitter card, Article JSON-LD) is generated automatically from the article data in the articles object. No extra metadata work needed per article.
