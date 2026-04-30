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
3. "Have you exported Lightroom-edited photos into `auwa/photography/[slug]/2-edited/`? If so, what's the slug folder name? (Raw drops live in `1-original/` for Lightroom import; the article command reads from `2-edited/`.)"

If the user provides all this information upfront, skip the questions and proceed.

## Step 2: Process Images

The source folder is `auwa/photography/[slug]/2-edited/`. These are full-quality images already exported from Lightroom with the matching Auwa preset applied (Landscape, Interior, or Night). The raw drops live in `1-original/` and are not touched by this command.

If photos have been provided in `auwa/photography/[slug]/2-edited/`:

1. Create the output directories:
   - `website/main/public/journal/[slug]/` (web hero, supporting images, OG)
   - `social/instagram/[slug]/` (IG carousel-ready 1080×1350 versions)
2. List all images in the source folder and show them to the user
3. Ask: "Which image should be the hero? And are any of these a pair (two detail shots to sit side by side)?"
**All resizing uses `sharp` (Node.js)**, not `sips`. The script lives at `website/main/scripts/process-image.js`. Sharp does proper Lanczos3 resize + unsharp mask + MozJPEG encoding. Sips was producing soft output because it doesn't apply post-resize sharpening, which became visible after the Auwa preset's tonal flattening was layered on top. Always run from `website/main/`:

```bash
cd website/main && node scripts/process-image.js <input> <output> <web|ig|og>
```

4. **Web optimisation.** For each image in `2-edited/`, output a web version to `website/main/public/journal/[slug]/` at **1800px max long edge**:
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../photography/[slug]/2-edited/[source].jpg \
     public/journal/[slug]/[slug]-[name].jpg web
   ```
   Rename each to convention: `[slug]-hero.jpg`, `[slug]-facade.jpg`, etc. Typical sizes after the Auwa preset + sharp sharpening: 500KB-1MB depending on detail.

5. **IG optimisation.** For each image in `2-edited/`, also output a 1080×1350 (4:5 portrait, centre-cropped) version to `social/instagram/[slug]/` with the `image-` prefix convention:
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../photography/[slug]/2-edited/[source].jpg \
     ../../social/instagram/[slug]/image-[name].jpg ig
   ```
   The `image-` prefix groups article photos together in the IG folder and keeps them visually distinct from the text frames (`text-quote-*.jpg`, `text-close-*.jpg`) added in Step 7.

6. **OG image (hero only).** Generate the 1200×630 landscape crop for link previews on LinkedIn, Facebook, WhatsApp, Pinterest, X. Source from the original `2-edited/` hero (NOT the already-resized web hero, to preserve resolution):
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../photography/[slug]/2-edited/[hero-source].jpg \
     public/journal/[slug]/[slug]-og.jpg og
   ```
   Verify these files exist: `[slug]-hero.jpg` (portrait, web), `[slug]-og.jpg` (1200×630 landscape, social previews), and `image-hero.jpg` in `social/instagram/[slug]/` (1080×1350 IG). `generateMetadata()` in `journal/[slug]/page.tsx` derives the OG path by replacing `-hero.jpg` with `-og.jpg`, so the naming must match exactly.
7. Report the final file sizes and counts (X web, X IG, 1 OG).

8. **Update the photography manifest.** Add an entry for the new article in `auwa/photography/_manifest.json`:
   ```json
   "[photo-slug]": {
     "url_slug": "[url-slug-if-different-else-same]",
     "hero": "[source-filename-of-hero].jpg",
     "images": {
       "hero": "[source-filename].jpg",
       "[name-2]": "[source-filename].jpg",
       ...
     }
   }
   ```
   The manifest is the source-of-truth for source-to-name mappings. It enables `node website/main/scripts/process-all.js` to re-process every article in one command when presets or sharpening settings change. Without a manifest entry, the new article won't be re-processable in future bulk runs and a future session would have to re-derive the mapping by reading every source image.

If no photos yet, proceed with writing and note where images will go. Web hero, OG, and IG versions must all be generated before publishing.

### Bulk re-processing (when presets or pipeline change)

If the Auwa Lightroom presets change and you've re-exported the affected `2-edited/` folders, OR if the sharp settings in `process-image.js` change, run from `website/main/`:

```bash
node scripts/process-all.js              # all 11 articles
node scripts/process-all.js [photo-slug] # single article (e.g. narai-juku)
```

This reads `auwa/photography/_manifest.json` and processes every article in one pass: web (1800px) + IG (1080×1350) + OG (1200×630), with proper Lanczos3 + unsharp mask + MozJPEG via the `sharp` library.

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

1. Add the article data to the articles object in `website/main/src/app/journal/[slug]/page.tsx`. Four fields do the SEO work — get them all right:
   - **`title`**: the topic phrase, concise. The page title becomes `"{title} | Auwa Journal"` (pipe separator, brand + category suffix), so the whole string must stay under 60 chars total or Google truncates it.
   - **`subtitle`**: the editorial line that appears on-page under the H1. Stays poetic, not keyword-stuffed. This is the reader-facing voice.
   - **`description`**: keyword-rich meta description (100-155 chars) — separate from `subtitle`. Google uses this in search results. MUST include "Japanese" where natural plus the primary topic word. Structure: `"{what it is about}, {place/context}. {why it matters}."` Example: *"On Yaoyorozu no Kami, the ancient Japanese belief that eight million spirits live in all things, and what it means for modern awareness."*
   - **Keyword placement check**: the primary topic word must appear in `title`, `description`, AND somewhere in the first paragraph of the article body.

2. Add it to the article list in `website/main/src/app/journal/page.tsx` (include the `image` field pointing to the hero image so it shows on the listing page).

3. Add it to the `latestArticles` array in `website/main/src/app/page.tsx` at the top (most recent first), with the `image` field pointing to the hero image.

4. **Add the article slug to the `articleSlugs` array in `website/main/src/app/sitemap.ts`**. Verify the slug is *byte-identical* to the key in the articles object in `journal/[slug]/page.tsx`. A mismatch (e.g. `oroko-combs` in sitemap vs `oroku-gushi` in articles object) causes Google to crawl a 404 and never discover the real URL. This cost Auwa ~10 days of missed indexing once — don't let it repeat.

5. **Alt text pass** on every image block (`image`, `image-pair`, `image-beside`). Used by image search, social previews, and screen readers. Rule: include the geographic / cultural / craft qualifier wherever it reads natural. Prefer specific Japanese terms (washi, onsen, shimenawa, noren, engawa) over English translations — they rank on image search AND feel editorial. Prefer place names (Yakushima, Koya-san, Nagano) over "mountain" / "forest." A hero image alt should identify Japan or the specific Japanese subject within the first ten words.
   - Bad: *"image of a tree"*
   - Better: *"Cedar tree on Yakushima"*
   - Best: *"A thousand-year-old Japanese cedar on Yakushima, moss at the base, ferns growing between the roots"*

6. **Indexability sanity check**: `src/app/robots.ts` disallows `/api/, /brand, /book/1, /book/2, /home-1, /instagram`. The article route must NOT match any of those. It won't, if it lives under `/journal/[slug]` — but confirm before shipping.

7. Test the build compiles cleanly (`npm run build` inside `website/main/`).

**What the site does automatically, no manual work required:**
- `generateMetadata()` in `journal/[slug]/page.tsx` derives the page title (`"{title} | Auwa Journal"`), meta description (prefers `description`, falls back to `subtitle`), Open Graph, Twitter card, and Article JSON-LD from the article data. Nothing extra to wire up.
- OG image path is derived by replacing `-hero.jpg` with `-og.jpg` on the hero path — so the only requirement is that BOTH files exist in `public/journal/[slug]/`. Step 2 covers this; verify before shipping.
- No `<link rel="canonical">` is emitted (intentional — each article URL is its own canonical). Don't add one.

## Step 7: Create the Instagram post

Once the article is live (or just before — the post brief doesn't need the URL to be reachable), create the editorial IG carousel for it. The output ends up as a single per-article folder at `social/instagram/[photo-slug]/` containing every article photo at IG size + four text frames + one `_post.txt` brief, ready to copy into Instagram from a phone.

Run the slideshow branch of `.claude/commands/instagram/post.md` from Step 2A onwards. The article and source images already exist, so:

- Skip "which slug" (use this article's photo-slug)
- Skip the manifest check (article.md just populated it)
- Skip the photo processing step inside the slideshow flow (Step 2 of this command already generated `image-[name].jpg` for every article photo). The slideshow flow then only needs to generate the four text frames and write `_post.txt`.

The IG post step asks YOU which quote (three IG-optimised candidates), so it stays interactive. After the slideshow flow runs, the article folder under `social/instagram/[photo-slug]/` contains:

```
_post.txt                 ← caption, hashtags, alt text per image
image-hero.jpg            ← every article photo at 1080×1350
image-[name].jpg
text-quote-dark.jpg       ← carousel slot 2 (dark theme)
text-quote-light.jpg      ← carousel slot 2 (light theme)
text-close-dark.jpg       ← carousel slot 4 (dark theme)
text-close-light.jpg      ← carousel slot 4 (light theme)
```

Whoever posts picks two of the `image-*.jpg` files for slides 1 and 3 at upload time, and one of the dark/light theme pairs for slides 2 and 4.

## Step 8: Request indexing (after the deploy lands)

Don't wait for Google to organically find the new article — that can take 4-6 weeks for a site Auwa's age. Two things after deploy:

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
