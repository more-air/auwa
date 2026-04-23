---
name: Write Article
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

## Step 6: Add to Site

Once approved:

1. Add the article data to the articles object in `website/main/src/app/journal/[slug]/page.tsx`
2. Add it to the article list in `website/main/src/app/journal/page.tsx` (include the `image` field pointing to the hero image so it shows on the listing page)
3. Add it to the `latestArticles` array in `website/main/src/app/page.tsx` at the top (most recent first), with the `image` field pointing to the hero image. Increment the issue number to be one higher than the current highest.
4. Add the article slug to the `articleSlugs` array in `website/main/src/app/sitemap.ts`
5. Test the build compiles cleanly

**SEO note:** Dynamic metadata (og:title, og:description, og:image, twitter card, Article JSON-LD) is generated automatically from the article data in the articles object. No extra metadata work needed per article — BUT the social-share image only works if the `-og.jpg` file exists alongside the `-hero.jpg` in `public/journal/[slug]/`. Step 2 covers this; double-check both files are present before shipping.
