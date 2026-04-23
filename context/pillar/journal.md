# AUWA Journal

*Created: April 2026. The reference for writing and producing journal articles for auwa.life.*
*Load when writing articles, planning content, or working on editorial voice.*

---

## 1. The Voice

AUWA's editorial voice draws from the same well as Kinfolk, Cereal, and Monocle. Quiet authority. Precise observation. A rhythm that alternates between short, declarative sentences and longer ones that give the reader room to breathe. The writing never announces itself. It arrives, says what it came to say, and trusts the reader to feel the rest.

The journal is written from direct experience. The founders have lived in and travelled through Japan for years. It is not research writing or reportage. It is personal essay grounded in real places, real objects, real moments. When we write about a knife, we held that knife. When we write about a temple at dawn, we stood in that silence.

**Reference writers and publications:**
- Kinfolk (Nathan Williams, early issues especially): the intersection of craft, place, and philosophy. Clean prose, generous white space.
- Cereal: travel writing that earns its quietness. Every word chosen.
- Monocle: confident, opinionated, concise. The worldview is the content.
- Charlie Mackesy: philosophy that arrives through simplicity, not complexity.
- John Berger ("Ways of Seeing"): observation as an act of attention.

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

**Cross-article check.** Before publishing, re-read the other articles in the journal and confirm this one isn't reusing the same signature phrase or construction. Repetition across the set is what lets a reader spot the pattern. Any phrase already used in two or more published articles is off-limits.

**What good AUWA writing does:**
- Leads with concrete, sensory detail. Specificity is authority.
- Uses fragments for rhythm. "No plastic. No foam. Just wood cradling steel."
- Earns its philosophical moments by grounding them first. The idea arrives after the object, the place, the sensation. Never before.
- Treats Japanese cultural concepts with familiarity, not exoticism. Brief glosses where helpful, never italicised for effect.
- Trusts silence. Not every paragraph needs to advance an argument. Some paragraphs simply describe.

**Attribution (updated April 2026):** Articles are credited to Rieko Maeda and Tom Vining, as both writers and photographers. The earlier anonymity preference has been retired. Use real names freely within article text where the writer refers to themselves or their partner ("my wife," "we," "Rieko," "Tom" are all fine). Image captions and alt text can name people naturally. Author field on the site is "Tom and Rieko" or split where one led a piece. Photography credit defaults to Tom unless otherwise stated.

**Philosophy and accuracy:**
- AUWA is "influenced by" the ancient Japanese belief that a life force resides in all things. Never "rooted in Shinto" or presented as a Shinto brand.
- The correct term for spirits inhabiting things is kami (or tama/tamashii). Kokoro (心) means heart, mind, spirit. It is AUWA's chosen brand word, not the Japanese theological term for spirit-in-objects. Write "AUWA uses the word Kokoro" not "the Japanese call this quality Kokoro."
- "Shinto" is fine when describing actual Shinto practices (shrines, priests, ceremonies). It should not be used to frame the broader philosophical worldview that AUWA draws from. Use "ancient Japanese belief" or "ancient Japanese understanding" instead.
- Yaoyorozu no Kami can appear in articles as a named concept, just not positioned as AUWA's doctrinal foundation.
- Drop "Japanese lifestyle brand" as a label. AUWA is described through what it does, not through a category.

---

## 3. Article Structure

Every article follows a consistent structure that maps to the Sanity CMS content model and the website's layout engine.

### Content Block Types

```
text        — A paragraph of prose. The most common block.
image       — A single photograph (4:5 portrait). Appears on the left side
              with text beside it on desktop.
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

5. **Closing paragraphs (2-3 text blocks):** Bring the reader back to the personal. End with an image or a question, not a summary.

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

If the article references specific craftsmen, techniques, places, or cultural concepts, gather accurate details. For AUWA articles, Tom and Rieko are the primary sources. Japanese terminology should be verified. Historical or technical claims should be factual.

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

**Image processing (when Tom drops raw photos into `auwa/photos/[slug]/`):**

Claude Code should run this optimisation pipeline automatically:

1. **Create the article image directory:**
   ```
   mkdir -p website/main/public/journal/[slug]/
   ```

2. **Optimise each image using sips (macOS built-in):**
   - Resize so the longest edge is 2400px (preserving aspect ratio):
     ```
     sips --resampleHeightWidthMax 2400 [source].jpg --out [destination].jpg
     ```
   - If the source is not JPEG, convert:
     ```
     sips -s format jpeg [source].png --out [destination].jpg
     ```

3. **Further compress with ImageOptim CLI (if available) or cjpeg:**
   ```
   # Check if ImageOptim CLI exists, otherwise use sips quality setting
   sips -s formatOptions 85 [file].jpg
   ```

4. **Naming convention:**
   - Hero: `[slug]-hero.jpg`
   - Beside image: `[slug]-[descriptive-name].jpg` (e.g. `shigefusa-box.jpg`)
   - Image pair: `[slug]-[name-1].jpg` and `[slug]-[name-2].jpg`
   - All lowercase, hyphens not underscores, no spaces

5. **Write alt text** that describes the image for accessibility. Be specific: "Close-up of the Shigefusa blade showing kitaeji damascus pattern and hand-chiseled kanji" not "A knife."

6. **Write captions** (optional, 1-2 sentences). Captions should add information the reader can't see in the image.

7. **Verify file sizes.** Each optimised JPEG should be under 400KB for standard images, under 600KB for hero images. If larger, reduce quality or dimensions.

**Source photo folder structure:**
```
auwa/photos/[slug]/          ← Tom drops raw photos here
  hero.jpg (or .png, .heic)
  detail-1.jpg
  detail-2.jpg
  ...
```

**Output folder structure:**
```
auwa/website/main/public/journal/[slug]/
  [slug]-hero.jpg
  [slug]-[name].jpg
  [slug]-[name-1].jpg
  [slug]-[name-2].jpg
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
title:        Short, evocative. One to four words.
subtitle:     Max 53 characters. Punchy, with a turn or surprise. Two short sentences work well. Reference: "Made from wood that breaks axes. Named after a girl."
category:     Seasons | Craft | Philosophy | Travel
author:       AUWA
photographer: AUWA
publishedAt:  ISO date
heroImage:    Path to the hero photograph
```

---

## 5. The Four Content Territories

Each article belongs to one of four categories. These map to the brand's four pillars and give the journal its rhythm.

**Seasons:** Essays grounded in Japan's 72 micro-seasons. Not explanations of what micro-seasons are (that's a single introductory article). Rather, these are personal reflections tied to a specific moment in the seasonal calendar. What you noticed. What changed. A particular light, a particular flower, a particular shift in the air.

**Craft:** Profiles of craftsmen and the objects they make. Also essays on the philosophy of living with handmade things. The relationship between maker and user. Why a knife that took two years to arrive changes how you cook. These articles often overlap with the store's curatorial voice.

**Philosophy:** The Japanese philosophical concepts that underpin AUWA. Yaoyorozu no Kami, Kokoro, wabi-sabi, mono no aware. Written accessibly, grounded in daily life, never academic. The goal is to make these ideas feel practical and present, not abstract and historical.

**Travel:** Japan through the lens of awareness. Not travel guides. Not "top 10 temples in Kyoto." Personal essays about specific places and what they taught. The onsen lesson. The temple at dawn. The train station where nobody was in a hurry.

---

## 6. Launch Article Plan

The website needs 8-10 articles at launch. A mix across all four categories gives the journal enough density to feel established.

**Prepared:**
- "Shigefusa" (Craft) - complete, with placeholder images

**To write:**
- "Seimei: the light returns" (Seasons) - current micro-season at launch
- "The fifth day" (Seasons) - introduction to 72 micro-seasons
- "Objects with Kokoro" (Craft) - philosophy of lifetime objects
- "Temple mornings" (Travel) - the ritual of arriving before dawn
- "The onsen lesson" (Travel) - shared space, vulnerability, hot water
- "Everything has Kokoro" (Philosophy) - foundational essay on Yaoyorozu no Kami
- "Awareness, not mindfulness" (Philosophy) - why AUWA uses "awareness"
- "What wabi-sabi means" (Philosophy) - reclaiming the concept

Each article follows the production workflow in Section 4. The brief and photographs are provided, the draft is written, checked against the voice rules, and assembled with images.

---

## 7. Content Calendar (Post-Launch)

After the initial batch, publish 1-2 articles per week aligned with Japan's 72 micro-seasons. Each micro-season lasts roughly five days, which gives the journal a natural editorial rhythm:

- Every 5 days: an opportunity for a new seasonal reflection, craft profile, or travel essay
- The micro-season provides ambient editorial context without forcing every article to be about seasons
- The content calendar prevents the journal from going quiet, which is the biggest risk for editorial brands

---

*Confidential. AUWA Limited. All rights reserved.*
