# Auwa Journal

*Created: April 2026. The reference for writing and producing journal articles for auwa.life.*
*Load when writing articles, planning content, or working on editorial voice.*

---

## 1. The Voice

*Rewritten 9 September 2026. The previous version of this section said the voice "draws from the
same well as Kinfolk, Cereal and Monocle" and called for "a rhythm that alternates between short,
declarative sentences and longer ones". That instruction is why drafts kept coming back cold and
clipped, and it is what produced thirty stacked-fragment runs across the published articles before
they were rewritten. It has been replaced with what Tom and Rieko measurably do.*

**Write long.** This is the single most important thing on this page. Tom's own hand-written prose
runs a **mean of 17.7 words a sentence, a median of 16.5, with only 7% of sentences at eight words
or fewer and 39% at twenty or more.** He joins clauses with commas and with "and", and lets one
sentence carry two or three things. Claude's untended default is roughly a mean of 11 with 40%
short, which reads clipped and machine-made however good the individual words are.

A short sentence is for genuine emphasis, once or twice in a piece. **Never three in a row**, and
never a run of noun fragments ("The rock. The river. The kitchen table.").

**Warmth is stated, not implied.** Tom and Rieko write "a wonderful idea", "such an inspiration",
"which I liked hearing", "it makes me so happy". A cooler, more literary register reads to them as
cold, and they will rewrite it. Where a literary writer would leave a gap for the reader to fill,
they explain. Tom turned *"He has never forgotten that he said it."* into *"...but he's not
forgotten that he did, and that he showed his good character and nature in doing so."* Follow that
instinct rather than trimming it back.

**No crafted lines.** They delete every neat parallel, reveal and aphorism, including good ones.
If a sentence feels like the best line in the paragraph, it is usually the one that gets cut.
Contractions are fine and normal. So is repeating a plain word rather than reaching for a better one.

**Two registers, not one.**
- **Tom** writes the place, craft and concept pieces. Observant, specific, unhurried, first person
  plural for shared experience. Comfortable with a fact or a number when he has checked it.
- **Rieko** writes the personal and character pieces. First person singular, warmer still, "mum"
  rather than "mother", feeling stated simply and directly. Caution: the only sample of her voice
  in this repo is Tom writing as her on the Fin DAC article, so treat it as approximate and ask.

**What the reference publications are still good for.** Kinfolk, Cereal, Monocle and Berger remain
useful for *what to write about and what to leave out*: the intersection of craft, place and
philosophy, restraint about adjectives, trusting a photograph to carry its own weight, refusing to
tell the reader what to feel. They are **not** a model for sentence rhythm or register here. Do not
imitate their coolness.

**The published articles are a partial reference only.** Claude drafted nearly all of them, and the
edits they received were about facts and wording rather than structure. Use them for subject
treatment, how much to explain, how Japanese terms are handled, and what a caption sounds like.
Do **not** use them to calibrate sentence length, paragraph length or emphasis: on those three you
would be copying Claude.

**The journal is written from direct experience.** Not research writing or reportage. When we write
about a knife, we held that knife. When we write about a temple at dawn, we stood in that silence.
If the first-hand material for a piece does not exist, get it before drafting (Section 4, Step 1)
rather than writing around the gap.

**Measure the draft before showing it:**

```bash
python3 scripts/prose-check.py [slug] --sentences
```

---

## 2. Writing Rules

These are non-negotiable. Read the global CLAUDE.md writing style section for the full list. The essentials:

- **No em dashes.** The single most recognisable AI tell. Use periods, commas, colons, or parentheses.
- **No AI vocabulary.** "Delve," "tapestry," "landscape" (metaphorical), "nestled," "journey" (metaphorical), "elevate," "unlock," "unpack," "reimagine." If any of these words appear, rewrite the sentence.
- **No escalating three-part lists.** "The patience, the precision, the profound dedication..." is a dead giveaway.
- **No thesis-callback endings.** Don't end a piece by restating the opening idea with a neat bow. End by looking forward or outward, or with a single image that lingers.
- **No telling the reader what to think.** "This is what matters." "This is why it's important." Cut these. The writing should make the case without announcing it.

**AI rhythm patterns (learned the hard way, April 2026 review).** These slip in unnoticed when drafting. They are the biggest giveaway across a set of articles because they repeat. Hunt for them:

- **"Not X. It is Y." / "Not X, but Y."** One per article maximum, and only if the reveal genuinely lands. Offenders to watch for: *"is not a message. It is a frequency,"* *"not competition. It was participation,"* *"not destruction. It is renewal,"* *"not a concept. It is a practice,"* *"is not a lesson but a duration."*
- **"There is a particular..."** A repeating tic. *"a particular quality,"* *"a particular kind of quiet,"* *"a particular pleasure."* At most once per article, and check the rest of the journal before reusing it.
- **Escalating three-part lists in the body.** *"Clothes signal who we are. Phones signal how busy we are. Conversation signals how clever we are."* *"The grain of the stone. The particular blue of the sky. The fact that the stranger..."* Cut to two, or to one strong image.
- **Rhyming cause-effect aphorisms.** *"When you have nothing to protect, you stop scanning for threats. When you stop scanning, you start noticing."* Collapse into one sentence.
- **Meta-wisdom about the subject.** Any sentence that tells the reader what they were supposed to learn. *"Which might be the most valuable thing a knife can teach you."* *"Like the mountain itself, it removed options..."* Cut them. The concrete detail already did the work.
- **Stacked aphoristic closers.** *"The steel remembers every strike of the hammer."* *"The wood remembers."* One per article, usually the pullquote. If they pile up, the piece reads like fortune cookies.
- **Overly symmetrical constructions.** *"Simply, because it is simple, and because he has done it every day for decades."* Break the symmetry.
- **Fragment-stacking as default rhythm.** Three short declaratives in a row ("Sentence. Sentence. Sentence."), each making one isolated point. The single most common current AI tell. Examples to hunt: *"Eight million spirits. Not a count. A way of saying the world is alive."* / *"Plum blossoms. Open for five days. Look away and you miss it."* / *"No plastic. No foam. Just wood cradling steel."* Rewrite as flowing sentences joined by comma, semicolon, or colon. A single fragment for emphasis is fine; two or more stacked is not.

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

**Cross-article check.** Before publishing, re-read the other articles in the journal and confirm this one isn't reusing the same signature phrase or construction. Repetition across the set is what lets a reader spot the pattern. Any phrase already used in two or more published articles is off-limits.

**What good Auwa writing does:**
- Leads with concrete, sensory detail. Specificity is authority.
- **Do NOT use fragments for rhythm.** An earlier version of this file recommended it and gave
  "No plastic. No foam. Just wood cradling steel." as the model. The global CLAUDE.md lists that
  exact line as an AI tell to hunt and rewrite, and the measured baseline (see Section 2a) says
  Tom writes long. The two instructions contradicted each other for months. Long wins.
- Earns its philosophical moments by grounding them first. The idea arrives after the object, the place, the sensation. Never before.
- Treats Japanese cultural concepts with familiarity, not exoticism. Brief glosses where helpful, never italicised for effect.
- Trusts silence. Not every paragraph needs to advance an argument. Some paragraphs simply describe.

**Attribution (updated April 2026):** Articles are credited to Rieko Maeda and Tom Vining, as both writers and photographers. The earlier anonymity preference has been retired. Use real names freely within article text where the writer refers to themselves or their partner ("my wife," "we," "Rieko," "Tom" are all fine). Image captions and alt text can name people naturally. Author field on the site is "Tom and Rieko" or split where one led a piece. Photography credit defaults to Tom unless otherwise stated.

**Philosophy and accuracy:**
- Auwa is "influenced by" the ancient Japanese belief that a life force resides in all things. Never "rooted in Shinto" or presented as a Shinto brand.
- The correct term for spirits inhabiting things is kami (or tama/tamashii). Kokoro (心) means heart, mind, spirit. It is Auwa's chosen brand word, not the Japanese theological term for spirit-in-objects. Write "Auwa uses the word Kokoro" not "the Japanese call this quality Kokoro."
- "Shinto" is fine when describing actual Shinto practices (shrines, priests, ceremonies). It should not be used to frame the broader philosophical worldview that Auwa draws from. Use "ancient Japanese belief" or "ancient Japanese understanding" instead.
- Yaoyorozu no Kami can appear in articles as a named concept, just not positioned as Auwa's doctrinal foundation.
- Drop "Japanese lifestyle brand" as a label. Auwa is described through what it does, not through a category.

---

## Sentence rhythm, and why the published articles are NOT the reference

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

---

## 3. Article Structure

Every article follows a consistent structure that maps to the Sanity CMS content model and the website's layout engine.

### Content Block Types

```
text        — A paragraph of prose. The most common block.
image       — A single photograph. Appears on the left side with text beside
              it on desktop, in a fixed 4:5 portrait box.
              Optional `orientation: "landscape"` puts it in a 4:3 box at the
              same column width instead. Use it for any frame that is not
              portrait: a 4:5 crop of a landscape photo keeps only the middle
              60% of the width. Default is portrait.
image-pair  — Two photographs side by side, each with its own caption.
              Full width. Used for detail or comparison shots.
pullquote   — A single sentence pulled from the text, displayed large.
              Used once or twice per article, never more.
```

### Typical Flow

1. **Opening paragraphs (2-3 text blocks):** Arrive in the scene. Concrete, sensory, specific. No preamble. No "Japan is a country of..." context-setting. Drop the reader into the moment.

2. **Single image:** The first photograph, placed left with text flowing beside it on desktop. This is the visual anchor for the first act of the piece.

3. **Middle paragraphs (3-5 text blocks, possibly with a pullquote):** Deepen the subject. Move from observation to reflection, from the specific to the philosophical. The pullquote should be the single most resonant line.

4. **Image pair:** Two detail photographs side by side. These work best for close-ups, textures, or paired perspectives on the same subject.

5. **Closing paragraphs (2-3 text blocks):** Bring the reader back to the personal. End on a physical detail or an outward observation, not a summary. **Never end on an `image` block** — every published article ends on at least two `text` blocks, and for a structural reason (below).

### The article shape (measured off the eleven published articles, 9 Sep 2026)

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

### What the Layout Engine Does Automatically

The `groupIntoSections()` algorithm in the article page groups content blocks into layout sections:

- Text blocks that follow an image are placed beside it (image left, text right).
- Text blocks with no preceding image are placed on the right half of the page.
- Image pairs always span full width.
- Pullquotes sit within the text flow, displayed at display size.

This means the CMS author only needs to order the blocks. The layout handles itself.

---

## 4. Article Production Workflow

This is the process used to produce the Shigefusa article and the process to follow for all future articles.

### Step 1: Brief (5 minutes)

Tom provides a few sentences describing the article's subject, angle, and any specific details or memories to include. This can be as simple as:

> "The Shigefusa wa-gyuto we waited two years for. The unboxing. The kiri wood box, the tsubaki oil, the kitaeji pattern. The philosophy of a craftsman who doesn't have a website. Waiting as a practice."

### Step 2: Research and Context

If the article references specific craftsmen, techniques, places, or cultural concepts, gather accurate details. For Auwa articles, Tom and Rieko are the primary sources. Japanese terminology should be verified. Historical or technical claims should be factual.

### Step 3: First Draft

Write the full article following the structure in Section 3 above. Key principles:

- Start in the scene, not with context.
- 800-1500 words for a standard article. Some can be shorter (500 words for a seasonal reflection).
- Mix paragraph lengths. Short ones for emphasis, longer ones for immersion.
- Include placeholder markers for images: describe the shot you need in brackets.
- Write the pullquote as you go. It should be a line that stops you.

### Step 4: Voice Check

Read the draft against the rules in Section 2. Specifically:

- Search for em dashes. Replace all of them.
- Search for AI vocabulary (delve, tapestry, nestled, etc.). Replace all of it.
- Read the ending. Does it tie a neat bow? Rewrite it.
- Read it aloud. Does any sentence sound like it was written by a marketing team? Rewrite it.
- Does it sound like Tom? Direct, precise, observant, unhurried. Not literary for the sake of being literary.

### Step 5: Image Selection and Preparation

Tom selects photographs from his Japan catalogue. For each article:

- **Hero image:** The strongest single photograph. 4:5 portrait for mobile, fills viewport height on desktop. Should work as the first thing you see.
- **Beside image (1):** A single photograph for the image-beside section. This sits at roughly 40% width on desktop, so it needs to hold up at that size.
- **Image pair (optional):** Two detail photographs. These work best at closer range: textures, inscriptions, tools, hands at work.

**Image processing pipeline (Lightroom + sharp):**

Per-article workflow:

1. Tom drops raw photos into `auwa/photography/[slug]/1-original/`.
2. Tom opens Lightroom Classic, imports that folder, applies the matching Auwa preset (Landscape / Interior / Night) to each, exports at full quality (no resize) to `auwa/photography/[slug]/2-edited/`. See `context/brand/brand.md` Section 6 for the preset spec.
3. The article command reads from `2-edited/` and runs the sharp pipeline below.

Claude Code should run this optimisation pipeline automatically:

1. **Create the article output directories.** IG output goes to the shared Dropbox `social` folder, not the repo. Resolve it once into an absolute `$SOCIAL` (see the `/journal:article` command's Paths note): `SOCIAL="$(grep -E '^AUWA_SOCIAL_ROOT=' website/main/.env.local | head -1 | cut -d= -f2- | sed 's/^"//; s/"$//')"`. Pillars sit directly under `$SOCIAL` (no `instagram/` level).
   ```
   mkdir -p website/main/public/journal/[slug]/
   mkdir -p "$SOCIAL/3-journal/[slug]/"
   ```

2. **Optimise each image using sharp** (Node.js, installed in `website/main/node_modules`). Sips was used previously but produces visibly soft output because it doesn't apply post-resize sharpening; sharp does proper Lanczos3 resize + unsharp mask + MozJPEG encoding. The wrapper script lives at `website/main/scripts/process-image.js`. Always run from `website/main/`:
   ```
   cd website/main && node scripts/process-image.js [source] [output] [mode]
   ```
   Modes: `web` (1800px max long edge, articles), `pillar` (2400px max long edge, hero pillars), `ig` (1080×1350 centre-cropped, Instagram), `og` (1200×630 centre-cropped, social previews).

3. JPEG quality (85) and MozJPEG encoding are baked into the script. No additional compression step needed.

4. **Naming convention:**
   - Web hero: `[slug]-hero.jpg`
   - Web supporting: `[slug]-[descriptive-name].jpg` (e.g. `shigefusa-box.jpg`)
   - Image pair: `[slug]-[name-1].jpg` and `[slug]-[name-2].jpg`
   - IG counterparts: same name plus `-ig` suffix in `$SOCIAL/3-journal/[slug]/`
   - OG (hero only): `[slug]-og.jpg` (the article page derives this path from the hero)
   - All lowercase, hyphens not underscores, no spaces

5. **Update the photography manifest** at `auwa/photography/_manifest.json`. Add an entry mapping each source filename to its named role for the new article. The manifest enables `node website/main/scripts/process-all.js` to re-process every article in one command if the Auwa presets or sharp settings change. Skipping this step makes the new article un-replayable.

6. **Write alt text** that describes the image for accessibility. Be specific: "Close-up of the Shigefusa blade showing kitaeji damascus pattern and hand-chiseled kanji" not "A knife."

7. **Write captions** (optional, 1-2 sentences). Captions should add information the reader can't see in the image.

8. **Verify file sizes.** With the Auwa preset applied (which preserves texture), expect web hero images at 500KB-800KB and supporting images at 600KB-1.1MB at 1800px / q85. IG images at 1080×1350 typically 300-700KB. These are larger than the pre-preset baseline because the preset preserves more high-frequency detail; this is intentional. Next.js Image optimises further on serve. Only flag a file if it exceeds 1.5MB.

**Source photo folder structure:**
```
auwa/photography/[slug]/
  1-original/         ← Tom drops raw photos here
  2-edited/           ← Lightroom exports here, full quality (article command reads from here)
```

**Output folder structure:**
```
website/main/public/journal/[slug]/   (web at 1800px + 1200×630 OG)
  [slug]-hero.jpg
  [slug]-[name].jpg
  ...
  [slug]-og.jpg

$SOCIAL/3-journal/[slug]/                       (IG at 1080×1350, in Dropbox)
  [slug]-hero-ig.jpg
  [slug]-[name]-ig.jpg
```

### Step 6: Content Assembly

Assemble the text blocks, image blocks, image-pair blocks, and pullquote into the content array. The order of blocks determines the layout. Test the article locally to check:

- Does the image-beside section flow naturally?
- Is the pullquote positioned well (not too early, not too late)?
- Does the image pair break up the text at the right moment?
- Is the ending clean?

### Step 7: Metadata

For each article:

```
title:        Editorial H1. **Max 20 characters, one to three words.** Prefer a naming noun (a place,
              a maker, an object, a concept) over a descriptive or possessive phrase. The published set
              runs 8-20 chars, mean 12.5. Not the Google title; that is `seoTitle`.
subtitle:     Max 53 characters. Punchy, with a turn or surprise. Two short sentences work well. Reference: "Made from wood that breaks axes. Named after a girl." Reader-facing editorial line — stays poetic.
description:  100-155 characters. Keyword-rich meta description for Google. MUST contain "Japanese" where natural plus the primary topic word. Distinct from subtitle — subtitle is poetry, description is search. Structure: "{what it's about}, {place/context}. {why it matters}." Reference: "On Yaoyorozu no Kami, the ancient Japanese belief that eight million spirits live in all things — and what it means for modern awareness."
category:     Seasons | Craft | Philosophy | Travel
author:       Auwa
photographer: Auwa
publishedAt:  ISO date
heroImage:    Path to the hero photograph
```

The page title automatically becomes `"{title} - Auwa Journal"` with the hyphen separator. `generateMetadata()` prefers `description` for the meta tag and falls back to `subtitle` if `description` is omitted. Always write both.

---

## 5. The Four Content Territories

Each article belongs to one of four categories. These are editorial territories for the journal's own rhythm, and deliberately do NOT map onto what Auwa makes — the brand dropped its pillar framing on 5 Aug 2026 (see CLAUDE.md). Four categories here is a coincidence of editorial range, not a structure to keep in sync with anything.

**Seasons:** Essays grounded in Japan's 72 micro-seasons. Not explanations of what micro-seasons are (that's a single introductory article). Rather, these are personal reflections tied to a specific moment in the seasonal calendar. What you noticed. What changed. A particular light, a particular flower, a particular shift in the air.

**Craft:** Profiles of craftsmen and the objects they make. Also essays on the philosophy of living with handmade things. The relationship between maker and user. Why a knife that took two years to arrive changes how you cook. These articles often overlap with the store's curatorial voice.

**Philosophy:** The Japanese philosophical concepts that underpin Auwa. Yaoyorozu no Kami, Kokoro, wabi-sabi, mono no aware. Written accessibly, grounded in daily life, never academic. The goal is to make these ideas feel practical and present, not abstract and historical.

**Travel:** Japan through the lens of awareness. Not travel guides. Not "top 10 temples in Kyoto." Personal essays about specific places and what they taught. The onsen lesson. The temple at dawn. The train station where nobody was in a hurry.

---

## 6. Published Launch Articles

All launch articles are now live on auwa.life/journal as of May 2026. The journal launched with the full set, giving it the density needed to feel established rather than nascent.

**Live:**
- "Shigefusa" (Craft) - the wa-gyuto knife that took two years to arrive
- "Seimei: the light returns" (Seasons) - current micro-season at launch
- "The fifth day" (Seasons) - introduction to the 72 micro-seasons
- "Objects with Kokoro" (Craft) - philosophy of lifetime objects
- "Temple mornings" (Travel) - the ritual of arriving before dawn
- "The onsen lesson" (Travel) - shared space, vulnerability, hot water
- "Everything has Kokoro" (Philosophy) - foundational essay on Yaoyorozu no Kami
- "Awareness, not mindfulness" (Philosophy) - why Auwa uses "awareness"
- "What wabi-sabi means" (Philosophy) - reclaiming the concept

Each follows the production workflow in Section 4. Image processing pipeline is in place; all photography is Lightroom-edited and sharp-optimised. Articles are linkable from external surfaces (LinkedIn, Instagram, newsletter) without caveat.

---

## 7. Content Calendar (Post-Launch)

**Cadence revised 22 Jul 2026:** the original "1-2 articles per week" was aspirational and never held (publishing stalled May-July). Correct target is **1-2 quality articles per month**, chosen by search demand (see Section 8), sustainable against the 3-4 day week and the lifestyle-design principle in arrival.md. Volume is not the point; the journal needs to feed a steady trickle of high-intent strangers into the email list, not maximise pageviews. The old weekly ambition is retired.

The micro-season still provides ambient editorial rhythm:

- The five-day micro-season is an *opportunity* for a seasonal reflection, craft profile, or travel essay, not a quota
- The micro-season provides ambient editorial context without forcing every article to be about seasons
- Publishing less is fine; going fully silent is the real risk for editorial brands, so hold a minimum of roughly one a month

---

## 8. Organic search strategy (SEO + AI search)

*Added 22 Jul 2026, after Vercel analytics showed the journal ranking on Google page 1 for long-tail Japanese terms (Narai-juku snow #1, Yaoyorozu no Kami #6, Shigefusa #7, Nozawa fire festival #8) with no backlink campaign, only the Awwwards listing.*

**What the data told us.** The site's technical quality plus original, first-hand content is already strong enough to rank the long tail without backlinks. Google's helpful-content and E-E-A-T systems reward exactly what Auwa is: genuine first-hand experience, original photography, specificity nobody else has. Backlinks were never the ignition for long-tail terms; they buy competitive head terms and overall authority later. This validates the journal as a compounding acquisition asset, and it is the acquisition channel most aligned with the lifestyle-design principle (arrival.md): an article published once brings high-intent strangers for years with no further work, while an IG post is dead in 48 hours. SEO earns while the founders are in Japan; the feed does not.

**The order of work (highest ROI first):**

1. **Make ranking pages convert (do first; ties to capture).** High-intent strangers already land on the Shigefusa and Yaoyorozu articles. If those pages don't carry the Quiet Letter sign-up gracefully in-context, the best free traffic Auwa gets is bouncing. Every article must have the capture. Highest-ROI SEO-adjacent task because the traffic already exists. See instagram.md "The capture loop."

2. **Optimise the existing 10 articles (high ROI, cheap, compounds across pages already earning).**
   - Title tags + meta descriptions tuned to real queries (the Section 4 `description` spec already mandates "Japanese" + topic word; audit each against what people actually search, e.g. "Shigefusa knife", "Narai-juku Nakasendo", not just the poetic title).
   - Internal linking: interlink the articles into topical clusters (craft ↔ craft, philosophy ↔ philosophy, travel ↔ travel). Islands leave ranking on the table; a linked cluster builds the topical authority Google rewards. Add a "related reading" link or two per article.
   - Concept articles (wabi-sabi, Yaoyorozu, mono no aware) get one clear, quotable definition paragraph near the top. Wins featured snippets and makes the piece the citable source in AI answers (below).
   - Confirm Article structured data / schema and clean breadcrumbs are present.

3. **Publish new articles chosen by demand, not only by whim (steady, sustainable).** The articles that rank are searchable nouns: place names, festivals, named craftsmen, named concepts, seasonal terms. New pieces should sit where (a) Tom/Rieko have genuine first-hand experience and photography AND (b) there is real search demand with weak competition. This is not writing for robots; it is writing genuinely excellent pieces on subjects people already search. Abstract essays are good for existing followers but recruit no strangers. Cadence per Section 7: 1-2 a month is enough to compound.

4. **Backlinks: a slow, medium-term compounding layer, not a quick sub lever.**
   - Cheap credibility links now: SiteInspire, CSS Design Awards, Typewolf, Godly, Minimal.gallery, httpster. Low effort, decent authority, some referral traffic. But designers are not buyers (same lesson as Awwwards), so the value is authority and credibility, not conversions.
   - High-value aligned links, layered slowly as relationships allow: Nalata Nalata, Analogue Life, Rikumo, Tortoise, Kinto, Ignant, Remodelista, Freunde von Freunden, Hole & Corner, Kyoto Journal, Tofugu. Referral traffic here is exactly the right person (Japan / craft / design, commercial intent). Posture per arrival.md: 3-5 personal no-ask emails a month, link to one specific piece. It raises the ceiling over 6-18 months; it will not move subs this month. Don't over-invest ahead of capture and on-page work.

**AI search (how it factors in 2026).** AI Overviews, ChatGPT, Perplexity, and Claude-with-search are reshaping informational search. Two effects, net tailwind for Auwa:
- **Zero-click risk on definitional queries.** "What is wabi-sabi" may be answered inline without a click. Auwa's pure-concept articles are most exposed. Mitigation: weight content toward experiential, place- and object-specific subjects an AI summary cannot substitute.
- **Citation as a new channel.** AI answers cite sources, and preferentially cite original, first-hand, specific, expert content over commodity rewrites. Auwa's "we held this knife" specificity and original photography is exactly what gets cited, and the person who clicks an AI citation is even higher intent. The game shifts from "rank #1" to "be the cited source."
- **What to do:** keep writing first-hand originals (already the voice, and the moat against AI commodity content); give concept pieces a clean extractable definition near the top; being mentioned and linked across the aligned web also helps AI engines "know" the brand.

**Optimisation pass, 8 September 2026 (all 11 articles).** The sweep in point 2 above was
finally run. What it found and changed, so the next pass can measure movement:

- **Every article's Google title was its editorial headline.** Only Yaoyorozu had an `seoTitle`
  override, which is most of why it was the best performer. All 11 now carry one, sized under 60
  characters including the ` | Auwa Journal` suffix. The on-page H1 is untouched and stays poetic;
  only the title tag changed. Target terms: Yakushima → Princess Mononoke forest; Koya-san →
  Okunoin; Nozawa → Dosojin Matsuri; Washi → "how washi paper is made"; Oroku-gushi → Japanese
  boxwood combs; 72 Seasons → Japan's 72 micro-seasons; Onsen → a first onsen; Narai → Narai-juku
  + Nakasendo; The Beginning → the Auwa story + Kokoro; Shigefusa → Shigefusa kitaeji.
- **"72 Seasons" was colliding with Metallica's 2023 album of that name** and the article appeared
  nowhere in a search for the Japanese micro-seasons. Retitled to "Japan's 72 Micro-Seasons".
- **Shigefusa's description named the wrong knife.** It said "the Kasumi blade"; the article is
  about a kitaeji, a different Shigefusa line. Corrected. The bare "Shigefusa" title was also
  competing on a buying query owned by retailers (Knifewear, Bernal, Japanese Natural Stones) and
  could not win it; the page now targets the informational query Google already surfaces it for.
- **Yaoyorozu was leaking clicks to the AI Overview.** Position 7.0, 103 impressions, 1 click over
  seven days, roughly 1% where position 7 should get three or four times that. Its description was
  a definition, competing with the AI summary above it on the summary's own ground. Rewritten to
  offer the place and the photographs a summary cannot reproduce. **This is the pattern to watch
  on every concept piece: rank is not the problem, the click is.**
- **Hero alt text was just the article title** on all 11 (the Shigefusa hero read "Shigefusa").
  A `heroAlt` field now carries real alt text written from each photograph.
- **BreadcrumbList schema added.** The site had none.
- **"Continue reading" was a hash of the slug**, effectively random, pointing craft at travel as
  readily as at craft. It now leads with the article's own category, so the topical clusters
  Google rewards are actually legible.
- **Onsen: deliberately NOT targeting "onsen etiquette."** Page one is JNTO, Banyan Tree and
  resort blogs, all rules guides. The piece is not a rules guide and dressing it as one would
  misrepresent it and lose anyway. The gap nobody fills is what a first onsen actually feels
  like, which is what the article is.

**Evidence the AI-citation thesis is real (8 Sep 2026).** Google's AI Overview for Narai-juku
cites auwa.life as a source. No backlink campaign, no outreach: original first-hand writing and
photography got picked up as the citation. This is the "be the cited source, not rank #1" bet in
the AI search section below, working in the wild. It is the strongest argument yet for weighting
new articles toward first-hand, place- and object-specific subjects.

**Still open after this pass.** Auwa has no Kokoro page, which is the concept it most wants to be
known for. That is the biggest gap in the whole SEO picture and the next thing to write; the
competition on "kokoro meaning" is thin content farms with only Quartz and Japan House Illinois
holding real ground. A philosophy cluster (Kokoro first, then mono no aware, mottainai, ma) is the
plan. Also unmeasured: whether these title changes moved anything. Check GSC in early October.

**Tooling.** Two slash commands operationalise this section. `/journal:optimise` audits and improves the *existing* articles (keyword research from Google Search Console + WebSearch, wording suggestions, internal links, capture placement, then re-indexing). `/journal:article` writes *new* articles and now bakes keyword research into its Step 1b so new pieces are demand-led from the start.

**Is this time well spent? (Honest verdict.)** Yes, with strict sequencing. Optimising the existing 10 is the best ROI on the whole marketing list: pages that already rank and already exist, a day or two of work, compounding forever. New searchable articles are a plant-trees-now investment: slow to compound (months), but the cheapest, most durable, highest-intent, most lifestyle-aligned acquisition channel Auwa has. Backlinks are a slow ceiling-raiser, worth the cheap ones now and the relationship ones layered gently. The one hard rule: none of this outranks the capture bottleneck. Rank and traffic are worthless if the pages don't convert to email. Capture first, then optimise existing, then publish steadily, then backlinks.

---

*Confidential. Auwa Limited. All rights reserved.*
