---
name: Article
description: Write a new journal article for auwa.life. Handles image optimisation, writing, and assembly.
---

## Instructions

You are writing a journal article for auwa.life. Load these context files before starting:

- `context/pillar/journal.md` (writing voice, article structure, production workflow, image pipeline)
- `context/brand/brand.md` (brand guidelines, typography, colour)

Follow the production workflow in journal.md exactly. The global CLAUDE.md writing style rules apply strictly (no em dashes, no AI vocabulary).

## Paths (IG output folder)

IG carousel images for this command go into the shared Dropbox `social` folder, not the git repo. Before Step 2's image work, resolve it once into an **absolute** `$SOCIAL` (absolute so it survives the `cd website/main` in the resize commands):

```bash
SOCIAL="$(grep -E '^AUWA_SOCIAL_ROOT=' website/main/.env.local | head -1 | cut -d= -f2- | sed 's/^"//; s/"$//')"
```

Pillars sit directly under `$SOCIAL` (no `instagram/` level), so the journal IG folder is `$SOCIAL/3-journal/[slug]/`. Always quote it — the path contains a space.

## Step 0: Is there already a brief?

**Check `Dropbox/3 venture/auwa/journal/[slug]/text/0-brief.md` before asking anything.** Article briefs are how a researched
article survives the end of a session. If one exists for this subject, load it and skip straight to
whatever it marks OPEN — the route, the photo selection, the hero, the angle and the keyword
research are already settled and re-deriving them wastes a session and risks contradicting a
decision the user already approved.

If no brief exists and the article needs real research (an archive photo selection, a route
reconstructed from EXIF, competitive keyword work), **write one as you go** and keep it current.
A brief holds: what is settled, what is OPEN, the photo list with file paths and the role of each
frame, the hero and why, the proposed title/seoTitle/keywords, facts already checked, and the
questions still outstanding for Tom or Rieko. Anyone should be able to pick the article up cold.

Briefs are tracked in git, so they sync between machines and outlive the photo working folder.

## Step 1: Gather the Brief

Ask the user these questions one at a time (not all at once):

1. "What's the article about? A few sentences on the subject, angle, and any specific memories or details to include."
2. "Which category: Seasons, Craft, Philosophy, or Travel?"
3. "Have you exported Lightroom-edited photos into `Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`? If so, what's the slug folder name? (Raw drops live in `1-original/` for Lightroom import; the article command reads from `2-edited/`.)"

If the user provides all this information upfront, skip the questions and proceed.

### 1a. When Claude is sourcing the photographs from the archive

If there are no edited photos yet because the article is being built *from the archive*, load
`context/pillar/photography.md` and follow the three-phase workflow in it. In short: survey with
`scripts/photo-survey.py`, shortlist, copy the chosen originals into `Dropbox/3 venture/auwa/journal/[slug]/image/1-original/`
(all media there is gitignored, so it costs the repo nothing), then write the article and hold it
while Tom does the Lightroom pass. Resume this command at Step 2 once `2-edited/` exists.

**Never recommend a photo without checking it is unpublished.** `scripts/journal-manifest.json` maps
every published source filename to its article; `scripts/photo-survey.py` checks it, plus a
perceptual hash for images re-exported through Topaz under a new name. Six of forty-nine shortlisted
photos turned out to be already live on 8 September 2026 because this check was skipped.

**And the hard gate: get the memory before writing.** Claude can choose and sequence the
photographs; Claude cannot supply what it was actually like to be there, and must never invent it.
The journal ranks and gets cited by AI Overviews because it is genuinely first-hand — an article
written from photographs alone is commodity travel writing and spends that advantage. Ask for five
minutes of real recollection, and make it easy by drawing the questions from the specific photos
chosen ("who was the craftspeople trip, and how did you find her?" rather than "tell me about the trip").
If no memory is available for a subject, say so and pick a different subject.

## Step 1b: Keyword research (high-performance SEO)

Before writing, make the article demand-led, not only whim-led. The goal: choose the angle, title, and key terms around what people actually search, so the finished piece recruits strangers, not just pleases existing readers. This is what turns a lovely essay into a ranking landing page. (Full rationale in `context/pillar/journal.md` Section 8.)

1. **Anchor to a searchable noun.** Identify the primary topic as a place (Narai-juku), festival (Nozawa fire festival), craftsman (Shigefusa), or concept (Yaoyorozu no Kami). The articles that rank are searchable nouns. If the brief is an abstract essay with no searchable anchor, say so and suggest tying it to a specific place / object / concept people actually search for.
2. **Research demand and competition** with the tools available:
   - **WebSearch** the primary topic plus 3-5 variations. Read Google's "People also ask" and related-search phrasings — those are real queries in users' own words. Capture the exact phrasing people use ("Shigefusa knife" vs "Shigefusa kasumi").
   - Assess competition: are the top results thin and generic (easy to beat with first-hand content and original photos) or strong and authoritative (harder)? Auwa wins where competition is thin and first-hand experience matters.
   - If the user has Google Search Console access, ask them to check whether the site already gets impressions for related queries. A near-miss at position 8-20 is a strong signal to target that exact term.
3. **Pick keywords.** One **primary keyword** (the exact phrase to rank for) and 2-4 **secondary/related terms** to weave in naturally.
4. **Report and get a nod.** Tell the user the primary keyword, the secondary terms, a one-line read on competition, and how it shapes the title / description / angle. Confirm before writing.

Carry the primary keyword into the `title`, the `description`, the first paragraph of the body, one pullquote or heading where natural, and the hero alt text (Step 6). Never keyword-stuff. Search demand shapes *what* the piece is about and *which words* it uses for real things, never the quality of the prose.

## Step 2: Process Images

The source folder is `Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`. These are full-quality images already exported from Lightroom with the matching Auwa preset applied (Landscape, Interior, or Night). The raw drops live in `1-original/` and are not touched by this command.

If photos have been provided in `Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`:

1. Create the output directories:
   - `website/main/public/journal/[slug]/` (web hero, supporting images, OG)
   - `$SOCIAL/3-journal/[slug]/` (IG carousel-ready 1080×1350 versions, in Dropbox)
2. List all images in the source folder and show them to the user
3. Ask: "Which image should be the hero? And are any of these a pair (two detail shots to sit side by side)?"

   When proposing a hero, judge it against BOTH uses. The site wants portrait at 2400px tall (every
   published hero is portrait, mostly 3:4). The Instagram cover then sets a 1-2 word EB Garamond
   title in light Washi type, centred, over the upper-middle of a 1080x1350 crop, with the wordmark
   near the top — so the band behind the title wants to be mid-to-dark and calm, and the topic has
   to reduce to one or two words. `scripts/photo-survey.py` scores this. A superb photograph that
   scores badly is still usable: `/instagram:post` renders a clean untitled `image-hero.jpg`
   alongside the typeset one. Details in `context/pillar/photography.md`.
**All resizing uses `sharp` (Node.js)**, not `sips`. The script lives at `website/main/scripts/process-image.js`. Sharp does proper Lanczos3 resize + unsharp mask + MozJPEG encoding. Sips was producing soft output because it doesn't apply post-resize sharpening, which became visible after the Auwa preset's tonal flattening was layered on top. Always run from `website/main/`:

```bash
cd website/main && node scripts/process-image.js <input> <output> <web|ig|og>
```

4. **Web optimisation.** For each image in `2-edited/`, output a web version to `website/main/public/journal/[slug]/` at **1800px max long edge**:
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../`Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`[source].jpg \
     public/journal/[slug]/[slug]-[name].jpg web
   ```
   Rename each to convention: `[slug]-hero.jpg`, `[slug]-facade.jpg`, etc. Typical sizes after the Auwa preset + sharp sharpening: 500KB-1MB depending on detail.

5. **IG optimisation.** For each image in `2-edited/`, also output a 1080×1350 (4:5 portrait, centre-cropped) version to `$SOCIAL/3-journal/[slug]/` with the `image-` prefix convention:
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../`Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`[source].jpg \
     "$SOCIAL/3-journal/[slug]/image-[name].jpg" ig
   ```
   The `image-` prefix groups article photos together in the IG folder and keeps them visually distinct from the text frames (`text-quote-*.jpg`, `text-close-*.jpg`) added in Step 7.

6. **OG image (hero only).** Generate the 1200×630 landscape crop for link previews on LinkedIn, Facebook, WhatsApp, Pinterest, X. Source from the original `2-edited/` hero (NOT the already-resized web hero, to preserve resolution):
   ```bash
   cd website/main && node scripts/process-image.js \
     ../../`Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`[hero-source].jpg \
     public/journal/[slug]/[slug]-og.jpg og
   ```
   Verify these files exist: `[slug]-hero.jpg` (portrait, web), `[slug]-og.jpg` (1200×630 landscape, social previews), and `image-hero.jpg` in `$SOCIAL/3-journal/[slug]/` (1080×1350 IG). `generateMetadata()` in `journal/[slug]/page.tsx` derives the OG path by replacing `-hero.jpg` with `-og.jpg`, so the naming must match exactly.
7. Report the final file sizes and counts (X web, X IG, 1 OG).

8. **Update the photography manifest.** Add an entry for the new article in `auwa/scripts/journal-manifest.json`:
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

This reads `auwa/scripts/journal-manifest.json` and processes every article in one pass: web (1800px) + IG (1080×1350) + OG (1200×630), with proper Lanczos3 + unsharp mask + MozJPEG via the `sharp` library.

## Step 3: Write the Article

Write the full article following journal.md Section 3 (Article Structure):

- Open in the scene. No preamble.
- 800-1500 words.
- Include one pullquote (the single most resonant line).
- Mix paragraph lengths for rhythm.

### Sentence rhythm, and why the published articles are NOT the reference

*Added 9 September 2026, after getting this exactly backwards on the Fin DAC article.*

**Do not read the eleven pre-September-2026 articles to learn how Tom and Rieko write.**
Claude drafted nearly all of them. Reading them to calibrate voice measures Claude's own habits
and calls them house style. That is what happened: a analysis of the corpus concluded that
"28-53% of sentences are eight words or fewer" was the standard, and Claude then chopped Tom's
long sentences into short ones to match it. The piece read *less* like him afterwards, not more.
Tom's reply is the rule: *"AI tends to write in these super short sentences, which isn't my style
at all."*

That 28-53% figure is not a style. It is the short-declarative tic the global CLAUDE.md names as
the most recognisable AI tell, baked into the corpus and mistaken for a standard.

**The real baseline is Tom's own hand-written prose:**

| | Tom, by hand | the Claude-drafted corpus |
|---|---|---|
| mean sentence | **17.7 words** | 10.2-13.5 |
| median | **16.5 words** | 7-12 |
| sentences <= 8 words | **7%** | 28-53% |
| sentences >= 20 words | **39%** | 8-25% |
| runs of 3+ short sentences | **0** | 1 to 5 per article |

**So: write long.** Join clauses with commas and with "and". Let a sentence carry two or three
things. A short sentence is for genuine emphasis, once or twice in a piece, never as the default
rhythm and never three in a row.

**What to actually copy from Tom's writing**, beyond length: contractions ("can't", "he's not
forgotten"); warmth stated outright rather than implied ("a wonderful idea", "such an inspiration",
"which I liked hearing"); explanation offered where a literary writer would leave a gap (he turned
*"He has never forgotten that he said it."* into *"...but he's not forgotten that he did, and that
he showed his good character and nature in doing so."*); and no crafted parallels or reveals. He
deleted every neat construction Claude wrote, including *"The kimono is my mother's and the face
inside it is mine."* If a line feels like the best line in the paragraph, it is probably the one he
will cut.

**Check it before showing a draft:**

```bash
python3 scripts/prose-check.py [slug] --sentences
```

It reports mean and median sentence length, the share of short and long sentences, runs of three-plus
short sentences, and intensifier count, each against the range above. `--all` shows every article,
and makes the Claude-versus-Tom gap visible at a glance.

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

**Never invent a duration, and never state one Tom or Rieko has not said out loud.**
Added 9 September 2026, after Claude wrote *"the stories I have been drawing for the last ten
years"* into Rieko's voice. Tom: *"stop AI from ever saying 'ten' again, it's too specific."*

The number came from the context files, which describe the character as having "a decade of
development". That is a strategy note, not something Rieko would say about her own work, and
putting a precise figure in her mouth makes a claim she has not made. Precision is not accuracy:
a specific number in a first-person sentence reads as a fact the writer has checked, and here
nobody had.

- Write **"the last several years"**, "years", "a long time", or simply drop the timeframe.
- This covers any figure a reader would take as verified: how long something took, how many of a
  thing exist, prices, distances, follower counts, ages.
- A number is fine when Tom or Rieko gave it, or when it is checkable and checked (the date on a
  post, a year on a photograph, a maker's stated founding year). Fin's *"4 January 2022"* is fine
  because his post carries the date.
- If a number matters and nobody has confirmed it, leave it out and ask, rather than rounding to
  something that sounds right.

**The read-aloud test.** Read the piece aloud to another person, or imagine you are. If any sentence would make a friend raise an eyebrow and say "that sounds like something ChatGPT would write," cut it. No exceptions. Better a plainer sentence than a clever one that gives the game away.

**Cross-article check.** Before publishing, re-read the other articles in the journal and make sure this one isn't using the same signature phrase ("There is a particular…," "Not X. It is Y.," a closing callback). Repetition across articles is what lets a reader spot the pattern.

## Step 5: Assemble

Assemble the article as a content block array matching the format in the existing article page (`website/main/src/app/journal/[slug]/page.tsx`).

**The article shape (measured off the eleven published articles, 9 Sep 2026).** Build the content array to this and check it before showing the user anything.

`groupIntoSections()` turns a single `image` block into an `image-beside` section and attaches
**every** following text and pullquote block to it until the next image or image-pair. The image
sits in a fixed 4:5 box on the left, text flows on the right. That mechanic is what makes the
ordering below matter, and getting it wrong produces the two faults Tom has flagged more than once:
an awkward empty block before the side-by-side images, and a final image hanging off the end of the
article.

**The pattern, with the numbers every published article actually hits:**

| | published range | target |
|---|---|---|
| First single `image` at block index | 2-4 | **3** |
| Text/pullquote blocks after that first image | 4-7 | **5-6** |
| `pullquote` position relative to `image-pair` | ABOVE, 11 of 11 | **above** |
| Blocks after the LAST image | 2-7 | **3** |
| Body photographs (a pair counts as two) | 3-4 | **4** |

**What each rule is protecting:**

1. **Get the first image up near the top, by block 3.** Four or five paragraphs of solid text
   before the first photograph reads as a wall, and the image then lands too close to the
   image-pair below it.
2. **Give that first image at least four blocks after it.** This is the one that causes the empty
   gap. Too few and the text column runs out while the image is still going, so the first image
   collides with the side-by-side pair underneath. Aim for the text column to run *well past* the
   bottom of the image.
3. **Put the pullquote above the image-pair.** Every published article does this without exception.
   It gives the pair a beat of white space and display type to sit under. A pullquote's content has
   to suit that position, roughly halfway through, so pick a line about the subject rather than a
   line that gives away the ending.
4. **Lift the last image so three blocks sit beside it.** One short paragraph after a tall portrait
   leaves the image hanging hundreds of pixels below the text. Never make an `image` the last
   block; every published article ends on two `text` blocks.
5. **`image-pair` is full width and immune** to all of this. Pair two photographs when neither can
   carry four blocks of its own.

**How to verify, and the trap in it.** Do NOT compare the image against the *text column div*: the
grid stretches both columns to the row height, so that comparison always looks fine and tells you
nothing. Measure the **bottom of the whole `<figure>` against the bottom of the last `<p>`**, and do it at a
**wide window (2000px+)**, not at 1280px. This is the check:

```js
[...document.querySelectorAll('div.xl\\:grid')].map(r => {
  const fig = r.querySelector('figure');                 // the FIGURE, not 'figure div'
  const ps  = [...[...r.children][1].querySelectorAll('p, blockquote')];
  return Math.round(fig.getBoundingClientRect().bottom
                  - ps[ps.length - 1].getBoundingClientRect().bottom);   // want <= -100
});
```

Measure the **whole `<figure>`**, not just the image box: the caption sits below the photograph
and counts as hang. On making-washi the image cleared by 13px while the figure still overhung by
45px. And aim for **-100 or lower**, not merely negative; anything inside about 50px reads as
level, and one extra line of text either way flips it.

**Why wide windows are where it breaks.** The article body is capped at 1600px from `xl` up
(added 9 Sep 2026). Before that cap the two columns grew with the viewport, so at a 2000px window
the 4:5 beside-image reached 946px tall while the text column merely got wider and shorter, and the
image hung hundreds of pixels below the last line. That was true of the *published* articles too,
not just new ones: measured at 2000px, making-washi hung 590px and koya-san 334px. The cap fixes
most of it (koya-san went to -88), but content still has to do its share: making-washi still hangs
273px because it gives its last image only two paragraphs. That is the rule above, and it is why it
is a rule.

Show the user:

1. The full article text
2. The proposed content block order (text, image, image-pair, pullquote)
3. The metadata (title, subtitle — max 53 characters, category, author, photographer, publishedAt, heroImage)

Ask: "Happy with this, or want to adjust anything before I add it to the site?"

## Step 6: Add to Site (with SEO checks baked in)

Once approved:

1. Add the article data to the articles object in `website/main/src/app/journal/[slug]/page.tsx`. **Five fields do the SEO work.** The split between `title` and `seoTitle` is the important one and is easy to get wrong, so read this before writing any of them.

   **The principle: the page keeps the poetry, Google gets the search phrase.** Before the September 2026 sweep, one field was both, so every article's Google title was its editorial headline. That is why "The Onsen Lesson" and "The Beginning" earned nothing (nobody searches those phrases), and why "72 Seasons" was competing with Metallica's album of that name. These are now two separate fields and neither compromises for the other.

   - **`title`**: the editorial headline. This is the H1 a reader sees on the page. It is NOT the
     Google title, so it needs no keywords. **Hard limit: 20 characters, one to three words.**
     Measured off the published set, which runs 8-20 characters (mean 12.5); "Nozawa Fire Festival"
     at 20 is the ceiling. Longer than that and the H1 wraps to two lines at narrow widths.
     **Prefer a naming noun to a descriptive phrase.** Every title that works on the site names a
     thing: a place (Koya-san, Narai in Snow), a maker (Shigefusa, Fin DAC), an object (Oroku-gushi),
     a concept (Yaoyorozu no Kami). A possessive or descriptive phrase ("Her Mother's Kimono") is in
     spec on length and still reads wrong beside them. Count the characters before writing it in, and
     check the rendered H1 doesn't wrap.
   - **`seoTitle`**: the searchable phrase Google shows. **Required on every new article.** `generateMetadata` renders `"{seoTitle ?? title} | Auwa Journal"`, and the suffix is 15 characters, so `seoTitle` must be **45 characters or fewer** or Google truncates it. It should contain the primary keyword in the form people actually type.
     - Do not target a query the piece cannot win. A bare brand or product name is usually a buying query owned by retailers (Shigefusa proved this: page one was Knifewear and Bernal Cutlery, and the bare title earned nothing). Target the informational long tail instead.
     - Do not target a big commercial term the piece is not actually about. "Onsen etiquette" is the biggest term in that space, but the article is not a rules guide, so chasing it would misrepresent the piece and lose anyway.
     - Head terms owned by Wikipedia and JNTO (a prefecture, a famous mountain, a major city) are unwinnable. Lead with the specific thing inside the piece that nobody else has.
   - **`subtitle`**: the editorial line under the H1. Stays poetic, never keyword-stuffed. Reader-facing voice.
   - **`description`**: the meta description (100-155 chars), separate from `subtitle`. MUST include "Japanese" where natural plus the primary topic word.
     - **Write it to earn the click, not to define the subject.** On any concept or definitional topic there is an AI Overview above your result already giving the definition away. A description that repeats the definition competes with the summary on the summary's own ground and loses. Yaoyorozu was taking 1 click per 103 impressions at position 7 for exactly this reason. Offer instead what an AI summary cannot reproduce: a named place, a named person, first-hand experience, original photographs.
   - **`heroAlt`**: alt text for the hero image, written from the actual photograph. **Required on every new article.** Without it the hero alt silently falls back to the article title, which is how every hero on the site ended up with a one-word alt. Identify Japan or the specific Japanese subject within the first ten words. See the alt rules in point 5 below.

   - **Keyword placement check**: the primary topic word must appear in `seoTitle`, `description`, AND somewhere in the first paragraph of the article body.

   - **Category check (this is an internal-linking decision, not a label).** The `category` field now drives the "Continue reading" block, which leads with articles sharing the same category before filling from the rest. Choosing the category places the piece in a topical cluster that Google reads as a signal of authority. Pick the one where the article genuinely belongs and where you want the new piece to lend and receive link equity — not whichever sounds nicest.

   - **Link it into its cluster by hand as well.** The automatic block is not enough on its own. Find one or two places in the new body where a sibling article is genuinely the thing being referred to, and link it there with anchor text that names the destination. Anchor text is a ranking signal, so "these trees" pointing at the Yakushima piece is a wasted link; "the thousand-year cedars of Yakushima" is not. Then check whether an existing article should link *to* the new one, and add that too. A new article with no inbound internal links is an island.

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
- `generateMetadata()` in `journal/[slug]/page.tsx` derives the page title (`"{seoTitle ?? title} | Auwa Journal"`), meta description (prefers `description`, falls back to `subtitle`), Open Graph, Twitter card, Article JSON-LD and BreadcrumbList JSON-LD from the article data. Nothing extra to wire up — but the fallbacks are traps, not conveniences: an article with no `seoTitle` silently ships its editorial headline to Google, and one with no `heroAlt` silently ships its title as alt text. Set both explicitly, every time.
- OG image path is derived by replacing `-hero.jpg` with `-og.jpg` on the hero path — so the only requirement is that BOTH files exist in `public/journal/[slug]/`. Step 2 covers this; verify before shipping.
- No `<link rel="canonical">` is emitted (intentional — each article URL is its own canonical). Don't add one.

## Step 7: Create the Instagram post

Once the article is live (or just before — the post brief doesn't need the URL to be reachable), create the editorial IG carousel for it. The output ends up as a single per-article folder at `$SOCIAL/3-journal/[photo-slug]/` (in Dropbox) containing every article photo at IG size + four text frames + one `_post.txt` brief, ready to copy into Instagram from a phone.

Run the slideshow branch of `.claude/commands/instagram/post.md` from Step 2A onwards. The article and source images already exist, so:

- Skip "which slug" (use this article's photo-slug)
- Skip the manifest check (article.md just populated it)
- Skip the photo loop in Step 6A (this command already generated `image-[name].jpg` for every article photo). The slideshow flow still needs to ask the cover questions (Step 4A: title source / eyebrow yes-no / Japanese translation review), pick the quote (Step 5A), then render the cover and the four text frames.

The slideshow asks YOU two interactive things: the cover title + JP translation (Step 4A) and the slide-2 quote (Step 5A). After the slideshow flow runs, the article folder under `$SOCIAL/3-journal/[photo-slug]/` contains:

```
_post.txt                 ← caption, hashtags, alt text per image
image-hero.jpg            ← clean hero, no overlay (slide 1 alternative)
image-hero-text.jpg       ← typeset cover: AUWA logo + 1-2 word title + optional JP translation
image-[name].jpg          ← every other article photo at 1080×1350
text-quote-dark.jpg       ← slide 2 (dark theme)
text-quote-light.jpg      ← slide 2 (light theme)
text-close-dark.jpg       ← final slide (dark theme)
text-close-light.jpg      ← final slide (light theme)
```

Whoever posts picks either `image-hero-text.jpg` or `image-hero.jpg` for slide 1 (typeset vs bare photo), one of the dark/light pairs for slide 2 and the final slide, and however many `image-[name].jpg` files in between as suit the article.

## Step 8: Write the copy back to the shared folder

Every time the article changes on the site, regenerate the plain-text copy so Tom and Rieko
always have the current version beside the photographs:

```bash
python3 scripts/article-text.py [url-slug]
```

That writes `Dropbox/3 venture/auwa/journal/[journal-folder]/text/4-live.txt`, which carries the prose, the metadata,
the captions, the alt text and the photographs in the order they appear. Use `--slot 1` to write
`1-draft.txt` instead when the article is not live yet.

**Never write to `2-rieko.txt` or `3-tom.txt`.** Those are theirs. When Tom says Rieko has
edited, read the file he names and work from it.

---

## Step 9: Request indexing (after the deploy lands)

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
