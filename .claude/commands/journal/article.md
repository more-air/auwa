---
name: Article
description: Write a new journal article for auwa.life. Handles image optimisation, writing, and assembly.
---

## Instructions

You are writing a journal article for auwa.life. Load these context files before starting:

- `context/pillar/journal.md` (writing voice, article structure, production workflow, image pipeline)
- `context/brand/brand.md` (brand guidelines, typography, colour)

Follow the production workflow in journal.md exactly. The global CLAUDE.md writing style rules apply strictly (no em dashes, no AI vocabulary).

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
4. Optimise each image following the pipeline in journal.md (resize to 2400px max, JPEG quality 85, rename to convention)
5. **Generate the social-share OG image from the hero.** Every article needs a landscape 1200×630 crop for LinkedIn, Facebook, WhatsApp, Pinterest, and X previews. The portrait 4:5 hero crops badly on every platform. From the article's public folder:
   ```bash
   cp [slug]-hero.jpg [slug]-og.jpg && \
   sips --resampleWidth 1200 [slug]-og.jpg && \
   sips -c 630 1200 [slug]-og.jpg
   ```
   Verify both files exist: `[slug]-hero.jpg` (portrait) and `[slug]-og.jpg` (1200×630 landscape). `generateMetadata()` in `journal/[slug]/page.tsx` derives the OG path by replacing `-hero.jpg` with `-og.jpg`, so the naming must match exactly.
6. Report the final file sizes

If no photos yet, proceed with writing and note where images will go — but remember to generate both `-hero.jpg` AND `-og.jpg` before publishing.

## Step 3: Write the Article

Write the full article following journal.md Section 3 (Article Structure):

- Open in the scene. No preamble.
- 800-1500 words.
- Include one pullquote (the single most resonant line).
- Mix paragraph lengths for rhythm.

## Step 4: Voice Check

Before showing the draft, run the voice check from journal.md Section 4:

- Search for em dashes. There must be zero.
- Search for AI vocabulary (delve, tapestry, nestled, journey, elevate, unlock, unpack, reimagine, landscape as metaphor). There must be zero.
- Check the ending. If it callbacks to the opening thesis, rewrite it. No one-line callbacks that restate the opening idea (e.g. "Which might be the most valuable thing a knife can teach you." "And why they will keep doing it long after you are gone."). End on a physical detail or an outward observation.
- Read for anything that sounds written by committee. Rewrite it.

**AI rhythm patterns to hunt for and remove.** These slip in unnoticed and are the single biggest giveaway across a set of articles:

1. **"Not X. It is Y." / "Not X, but Y."** construction. Classic LinkedIn-philosopher cadence. Allowed once per article maximum, only when the reveal genuinely earns it. Hunt for *"is not a message. It is a frequency,"* *"not competition. It was participation,"* *"not destruction. It is renewal,"* *"not a concept. It is a practice,"* *"is not a lesson but a duration."* If there are two or more in the same piece, rewrite all but the strongest.
2. **"There is a particular X..."** opening. A repeating tic across articles. *"a particular quality to time,"* *"a particular kind of quiet,"* *"a particular pleasure of thawing."* Use "a particular" at most once per article, and check what the other articles have already claimed as "particular" before using it again.
3. **Escalating three-part lists.** *"Clothes signal who we are. Phones signal how busy we are. Conversation signals how clever we are."* *"The grain of the stone. The particular blue of the sky. The fact that the stranger..."* Cut to two, or to one strong image. The rule from the global CLAUDE.md is hard: no escalating triplets.
4. **Rhyming cause-effect.** *"When you have nothing to protect, you stop scanning for threats. When you stop scanning, you start noticing."* Reads like a TED talk. Collapse into one sentence: *"With nothing to protect, you stop watching for threats, and begin noticing instead."*
5. **Meta-wisdom about the subject.** *"Which might be the most valuable thing a knife can teach you."* *"Like the mountain itself, it removed options until what remained had your full attention."* If a sentence explains what the reader should have learned, cut it. The detail already did the work.
6. **Aphoristic closers in the middle of a paragraph.** *"The steel remembers every strike of the hammer."* *"The wood remembers."* *"The process does not scale. It is not designed to."* Fine once per article, usually as the pullquote. If they stack, the piece starts sounding like a sequence of fortune cookies.
7. **Overly symmetrical constructions.** *"He explained the process the way someone explains breathing: simply, because it is simple, and because he has done it every day for decades."* The parallel "because… because…" is crafted in a way people don't write when they're tired. Break it: *"He explained the process simply, the way you might explain breathing. He has done it every day for decades."*

**The read-aloud test.** Read the piece aloud to another person, or imagine you are. If any sentence would make a friend raise an eyebrow and say "that sounds like something ChatGPT would write," cut it. No exceptions. Better a plainer sentence than a clever one that gives the game away.

**Cross-article check.** Before publishing, re-read the other articles in the journal and make sure this one isn't using the same signature phrase ("There is a particular…," "Not X. It is Y.," a closing callback). Repetition across articles is what lets a reader spot the pattern.

## Step 5: Assemble

Assemble the article as a content block array matching the format in the existing article page (`website/main/src/app/journal/[slug]/page.tsx`). Show the user:

1. The full article text
2. The proposed content block order (text, image, image-pair, pullquote)
3. The metadata (title, subtitle — max 53 characters, category, author, photographer, publishedAt, heroImage)

Ask: "Happy with this, or want to adjust anything before I add it to the site?"

## Step 6: Add to Site (with SEO checks baked in)

Once approved:

1. Add the article data to the articles object in `website/main/src/app/journal/[slug]/page.tsx`.
   - **Title**: once " | AUWA" is appended for the page title it must stay under 60 chars total (Google truncates longer ones in results). The article data's `title` field is that topic phrase — keep it concise.
   - **Subtitle**: appears on-page as an editorial line AND as the meta description in search results. Aim 100-155 chars. Long enough to carry the primary topic keyword plus context, short enough Google won't truncate. The 53-char ceiling elsewhere is card-display only; the subtitle itself can run longer. Ensure the primary topic word (e.g. "Yakushima", "washi", "onsen") appears in it.
   - **Keyword placement check**: the primary topic word should appear in the title, the subtitle, AND somewhere in the first paragraph of the article body. This isn't stuffing, it's natural editorial — just verify you haven't buried the term in an opening scene that names no places.

2. Add it to the article list in `website/main/src/app/journal/page.tsx` (include the `image` field pointing to the hero image so it shows on the listing page).

3. Add it to the `latestArticles` array in `website/main/src/app/page.tsx` at the top (most recent first), with the `image` field pointing to the hero image. Increment the issue number to be one higher than the current highest.

4. **Add the article slug to the `articleSlugs` array in `website/main/src/app/sitemap.ts`**. Verify the slug is *byte-identical* to the key in the articles object in `journal/[slug]/page.tsx`. A mismatch (e.g. `oroko-combs` in sitemap vs `oroku-gushi` in articles object) causes Google to crawl a 404 and never discover the real URL. This cost AUWA ~10 days of missed indexing once — don't let it repeat.

5. **Alt text pass**: every image block in the article content (`image`, `image-pair`, `image-beside`) must have a descriptive `alt` field. Used by image search, social previews, and screen readers. Don't write "image of a tree" — describe the subject specifically ("morning mist over Yakushima's cedar forest"). Missing alts cost ranking and accessibility points.

6. **Indexability sanity check**: `src/app/robots.ts` disallows `/api/, /brand, /book/1, /book/2, /home-1, /instagram`. The article route must NOT match any of those. It won't, if it lives under `/journal/[slug]` — but confirm before shipping.

7. Test the build compiles cleanly (`npm run build` inside `website/main/`).

**What the site does automatically, no manual work required:**
- `generateMetadata()` in `journal/[slug]/page.tsx` derives `title`, `description`, `openGraph.title/description/url/images`, `twitter.card/title/description/images`, and the Article JSON-LD structured data from the article data. Nothing extra to wire up.
- OG image path is derived by replacing `-hero.jpg` with `-og.jpg` on the hero path — so the only requirement is that BOTH files exist in `public/journal/[slug]/`. Step 2 covers this; verify before shipping.
- No `<link rel="canonical">` is emitted (intentional — each article URL is its own canonical). Don't add one.

## Step 7: Request indexing (after the deploy lands)

Don't wait for Google to organically find the new article — that can take 4-6 weeks for a site AUWA's age. Two things after deploy:

1. **Request indexing on the article URL**:
   - Go to https://search.google.com/search-console → select `auwa.life`
   - Paste `https://auwa.life/journal/[slug]` into the top search bar → press Enter
   - Wait 10-30 seconds for URL Inspection to load
   - Click **Request Indexing** (top right of the panel)
   - Success: "URL added to priority crawl queue" (actual indexing typically 1-3 days)

2. **Resubmit the sitemap** (so Google re-fetches the full list):
   - GSC left sidebar → **Sitemaps**
   - Click the existing `sitemap.xml` entry → three-dot menu → **Remove sitemap**
   - Then re-add under "Add a new sitemap" → enter `sitemap.xml` → **Submit**

Request Indexing is the fast path for the specific article; sitemap resubmit ensures Google sees the updated list and picks up the new URL on its next natural crawl.
