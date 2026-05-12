---
name: Instagram Post
description: Prepare any Instagram post brief (Reel, single image, carousel, or editorial slideshow from a journal article). One command, branches by type. Output ready to paste into Buffer or Later.
---

## Instructions

You are preparing an Instagram post brief for Auwa. Load these context files before starting:

- `context/marketing/instagram.md` (platform strategy, content pillars, hashtag rules, weekly cadence, image specs)
- `context/marketing/arrival.md` (launch phase and tone, especially the Gift Ethos section)

The global CLAUDE.md writing style rules apply strictly. No em dashes, no AI vocabulary, no marketing fluff.

## Step 1: Pick the Post Type

Ask first:

> "What type of post?
> 1. **Editorial slideshow** (4-slide carousel from a journal article)
> 2. **Single image** (atmospheric photograph, character still, etc)
> 3. **Reel** (character animation, ASMR, video)
> 4. **Carousel** (non-editorial: Japanese wisdom explainer, BTS story, etc)"

Branch on the answer. Slideshow uses Steps 2A-7A. Single/Reel/Carousel uses Steps 2B-7B.

---

## Slideshow Branch (Type 1)

An editorial carousel built end-to-end by this command: a typeset cover, every article photo at IG size, a quote text frame, and a closing CTA frame. No Figma needed.

The carousel structure (variable length, typically 6–8 slides):

1. **Cover** — `image-hero-text.jpg` (hero photo + 10% black overlay + drop-shadowed AUWA logo, optional eyebrow, 1–2 word title, optional Japanese translation). Or `image-hero.jpg` for articles where text on the hero would not look right (e.g. _The Beginning_); both files are produced so the poster picks at upload time.
2. **Quote** — `text-quote-dark.jpg` or `text-quote-light.jpg`
3. **Photo 1..N** — every other article photo at 1080×1350 (`image-[name].jpg`). Use as many as the article has good photos for; IG carousels accept up to 20 slides. More photos = more dwell time before the close slide nudges anyone toward the journal.
4. **Close** — `text-close-dark.jpg` or `text-close-light.jpg`

The whole post lands in a single flat folder per article: `social/instagram/3-journal/[photo-slug]/`. After the command runs, that folder contains:

```
_post.txt                 ← caption, hashtags, alt text per image. Underscore-prefix sorts to top of folder.
image-hero.jpg            ← clean hero, no overlay — slide 1 alternative when the photo wants to breathe on its own
image-hero-text.jpg       ← hero with the text-overlay cover; slide 1 alternative when the typeset cover suits the article
image-[name].jpg          ← every other article photo, descriptive names from the manifest
text-quote-dark.jpg       ← carousel slot 2 (dark theme)
text-quote-light.jpg      ← carousel slot 2 (light theme)
text-close-dark.jpg       ← final slot (dark theme)
text-close-light.jpg      ← final slot (light theme)
```

Naming logic: both hero variants share the `image-hero` stem so they sort together and the poster sees the pair side by side; `-text` flags the typeset version. Every other article photo gets `image-[name].jpg` (descriptive names from the manifest) so they group together alphabetically and don't intermingle with the text frames. Text frames keep their `text-` prefix (quote → slide 2, close → final slide). `_post.txt` underscore puts the brief at the top of the folder where it's easy to find on a phone.

**Both a text-overlay hero AND a clean hero are produced.** Some articles read best with the typeset cover (place names, single-word topics: _Nozawa_, _Yakushima_, _Kintsugi_); others — character-led, illustration-led, or atmospheric photography that the viewer should meet without language — read better as the bare photograph (e.g. _The Beginning_, character stills). The poster decides at upload by picking either `image-hero-text.jpg` or `image-hero.jpg` for slide 1.

**The command does NOT pre-pick which photos go on slides 3..N.** It outputs every article photo at IG size and whoever uploads the post (Tom or Rieko) picks the order at the moment of posting. This avoids the "Tom picks photo X, Rieko prefers Y" coordination problem and gives whoever's at the keyboard final editorial control. Alt text in `_post.txt` is keyed per image filename so the poster reads off whichever photos they chose.

Plain text `_post.txt` is intentional. Tom reads and copies sections from the Dropbox app on Android. Markdown (.md) renders as raw `**` and `#` characters in that viewer.

### Step 2A: Inputs

Ask in one message:

1. "Which journal article? Slug or title."
2. "Scheduled date and time? (Defaults to next Friday or Saturday evening.)"

### Step 3A: Read the Article + Map the Slug

1. Load the article from `website/main/src/app/journal/[url-slug]/page.tsx`. Note the title, topic, voice, and any specific framing.
2. Look up the IG folder name (the `photo-slug`) in `auwa/photography/_manifest.json`. The article URL slug and the photo folder slug can differ (e.g. URL `the-beginning` vs photo folder `auwa-book`). The manifest entries are keyed by photo-slug with a `url_slug` field inside.
3. The IG folder is `social/instagram/3-journal/[photo-slug]/`. The article URL on slide 4 uses `[url-slug]`.

### Step 4A: Cover Slide Setup

The cover (`cover.jpg`) is the typeset slide-1 alternative to the clean hero. Decisions here are about the title, the optional eyebrow, and the Japanese translation — **all interactive**, ask the user one at a time. The script renders both `cover.jpg` AND keeps `image-hero.jpg` clean, so nothing is lost if the user prefers the bare photograph at upload time.

Spec (locked, see `social/instagram/_scripts/text-image.py` `render_cover` for the implementation):

- AUWA wordmark, 30px tall, horizontally centred, top sits 120px from canvas top
- Optional eyebrow line, Instrument Sans Medium, 24pt, +10% letter-spacing, uppercase, centred, top at 530px
- Title, EB Garamond, 160pt, -2% letter-spacing, centred, top at 570px (baseline lands near canvas vertical centre). **Always 1–2 words** so it reads at thumbnail scale.
- Optional Japanese translation, Noto Serif JP SemiBold, 60pt, centred, top sits 54px below the title baseline
- 10% black wash sits between photo and text for contrast
- All text and the wordmark carry a uniform drop-shadow (X:0, Y:4, Blur:50, Spread:0, Black at 25%) and render in Washi (`#EFE9DD`)

**Ask in this order, one at a time:**

1. **Title source.** "For the cover title (always 1–2 words, sits large in EB Garamond): pull from the article title, or write a custom one?"
   - If pull from article title: propose the strongest 1–2 word fragment of the article title (e.g. _Nozawa Fire Festival_ → `Nozawa`, _Yakushima_ → `Yakushima`, _Twelve Hundred Years on Koya-san_ → `Koya-san`). Confirm before using.
   - If custom: ask "What's the title? (1–2 words)" and use the response verbatim.

2. **Eyebrow line.** "Include an eyebrow line above the title? (small caps, e.g. 'A DAY IN NOZAWA' / 'A FOREST IN YAKUSHIMA' / 'A KNIFE FROM SEKI'). Yes / no."
   - If yes: propose one based on the article's geography or subject. Confirm before using. The script uppercases automatically — provide it in any case.
   - If no: skip and the cover renders with no eyebrow.

3. **Japanese translation.** Auto-translate the cover title to Japanese (place names → kanji where one exists, e.g. Nozawa → 野沢, Yakushima → 屋久島, Koya-san → 高野山; concepts → the standard Japanese term, e.g. Wabi-sabi → 侘寂, Kintsugi → 金継ぎ). Show the proposal: "I'd suggest **野沢** for the Japanese line below the title. Use as-is, refine, or skip the JP line entirely?"
   - If skip: render without the Japanese line.
   - If refine: take the user's correction verbatim.
   - **Rieko is the source of truth on Japanese.** If she's reviewing, defer to her wording without argument. If only Tom is in the loop, flag any ambiguity ("there are two readings for this place name — 野沢 vs 野澤, the modern simplified form is 野沢") rather than guessing silently.

The actual cover render happens in Step 6A, batched alongside the text frames. This step just locks the inputs.

### Step 5A: Generate Three IG-Optimised Quotes

This is the highest-leverage step. The quote on slide 2 is the single thing that decides whether the carousel performs. The bar is high.

**Hard constraints (test before showing the user):**

- **Wraps to exactly 3 lines** at 86px EB Garamond regular on the 820px text box. This keeps the carousel's slide-2 rhythm consistent across the grid. Test every candidate before recommending:
  ```bash
  python3 -c "
  from PIL import Image, ImageDraw, ImageFont
  f = ImageFont.truetype('social/instagram/_assets/fonts/EBGaramond.ttf', 86)
  d = ImageDraw.Draw(Image.new('RGB', (1080, 1350)))
  q = 'YOUR QUOTE HERE'
  L, c = [], ''
  for w in q.split():
      cand = (c + ' ' + w).strip()
      if d.textlength(cand, font=f) <= 820: c = cand
      else: L.append(c); c = w
  if c: L.append(c)
  print(len(L), 'lines:', L)"
  ```
  Anything that doesn't wrap to 3 lines, rewrite or discard. Typical 3-line range is 11-15 words depending on word lengths.
- **One flowing sentence,** or two clauses joined by comma, semicolon, or colon. Two short sentences only when each carries a complete thought (not nominal fragments). **Never the "Sentence. Sentence. Sentence." stack** — the most common current AI tell, banned in CLAUDE.md and journal.md. Default to flow.
- **No banned constructions.** No em dashes, no "Not X. It is Y," no "There is a particular," no rhyming cause-effect, no escalating triplets, no AI vocabulary (delve, journey, tapestry, unlock, etc.). Full list in `context/pillar/journal.md` Section 2.

**Quality bar — the rubric:**

A great IG quote does at least three of these. A merely-okay quote does one. Aim for three.

1. **Curiosity gap.** Makes the reader want the rest of the carousel. A line that asks an implicit question outperforms one that gives a closed answer. *"The Japanese have a name for what we walk past without noticing"* (gap: what is it?) beats *"Twelve hundred years of chanting have worn the silence smooth"* (closed: pretty but inert).
2. **Concrete and sensory.** Specific nouns and active verbs beat abstract concepts. *"Sanskrit chanted every morning in the same hall for 1,200 years"* beats *"the silence is worn smooth"*. The first gives the reader something to hold; the second only decodes after the article.
3. **Article-defining insight.** Pull the deepest thing the article says, not the prettiest. The pretty sentence is often a flourish; the deep one is the reason the article exists.
4. **Brand-distinctive vocabulary.** Where it lands naturally, weave in *Kokoro*, *Wabi-sabi*, *Onsen*, *Yaoyorozu no Kami*, *Kintsugi*, the place name, or the craft. These are Auwa's owned search surfaces. Never force — a forced cultural term reads worse than a clean English line.
5. **Screenshot-shareable standalone.** Strip the carousel context. Does the line still mean something and still feel quietly arresting? If it needs the photo or the caption to make sense, it is too dependent.
6. **Avoid linking verbs where you can.** *"becomes," "is," "has"* drain energy. Active verbs and strong nouns carry weight. *"The steel remembers every strike of the hammer"* beats *"The steel is shaped by every strike of the hammer."*
7. **Avoid words that need decoding out of context.** *"unreliable," "smooth"* (when used metaphorically), *"strange"* — fine in the article where the surrounding paragraph explains them, weak as IG standalones because the reader has nothing to anchor against.

**Three candidates, three angles:**

Show three quotes from genuinely different angles, not three rewrites of one line. Useful angle pairs:

- One **philosophical** (the article's deepest insight, named or unnamed) + one **sensory** (a concrete moment from the article) + one **provocative or curiosity-gap** (a line that makes the reader want more).
- Or one with the **cultural term named** + one with it **implied** + one **purely observational**.

For each candidate, give a one-line reason: which rubric criteria it hits. Show the line-count from the wrap test. Optionally add the verbatim on-page pullquote as a fourth comparison.

Ask: "Which one for slide 2? Or write your own."

### Step 6A: Process All Photos + Generate Cover and Text Frames

Output everything into the flat per-article folder. Three groups of files in this step:

1. **Every article photo at IG size.** Loop through every entry in the manifest's `images` map — no exceptions, no "we only need two for the carousel." IG carousels run up to 20 slides and the editorial value of slides 3..N comes from the photography. If the article has 8 good photos, 8 photos go in.
2. **The cover (`image-hero-text.jpg`)** — composed against the already-resized hero, using the title / eyebrow / JP locked in Step 4A.
3. **Quote and close text frames** — dark + light variants of each.

```bash
# 1. Every article photo at 1080×1350. Loop through manifest.articles[photo-slug].images.
#    Naming: hero stays as `image-hero.jpg`; every other photo uses its descriptive
#    manifest key as `image-[name].jpg` (e.g. image-blaze.jpg, image-priest.jpg).
cd website/main && node scripts/process-image.js \
  ../../photography/[photo-slug]/2-edited/[source-file] \
  ../../social/instagram/3-journal/[photo-slug]/image-[name].jpg ig
# Repeat for EVERY image in the manifest, including the hero. Don't truncate.

# 2. Cover — composed from the already-resized clean hero.
#    --eyebrow and --jp are optional; omit either if Step 4A's answer was "skip".
#    Pass exactly what Step 4A locked in; do not paraphrase or re-translate here.
python3 social/instagram/_scripts/text-image.py \
  --variant cover \
  --photo social/instagram/3-journal/[photo-slug]/image-hero.jpg \
  --title "[1-2 word cover title]" \
  --eyebrow "[optional eyebrow line]" \
  --jp "[optional Japanese translation]" \
  --out social/instagram/3-journal/[photo-slug]/image-hero-text.jpg

# 3. Quote and close text frames, dark + light each.
python3 social/instagram/_scripts/text-image.py \
  --variant quote --theme dark \
  --quote "[chosen quote, no surrounding quote marks]" \
  --out social/instagram/3-journal/[photo-slug]/text-quote-dark.jpg

python3 social/instagram/_scripts/text-image.py \
  --variant quote --theme light \
  --quote "[chosen quote, no surrounding quote marks]" \
  --out social/instagram/3-journal/[photo-slug]/text-quote-light.jpg

python3 social/instagram/_scripts/text-image.py \
  --variant close --theme dark \
  --title "[article.title]" --slug "[url-slug]" \
  --out social/instagram/3-journal/[photo-slug]/text-close-dark.jpg

python3 social/instagram/_scripts/text-image.py \
  --variant close --theme light \
  --title "[article.title]" --slug "[url-slug]" \
  --out social/instagram/3-journal/[photo-slug]/text-close-light.jpg
```

If the article command (`/journal:article`) already ran Step 5's IG optimisation, the `image-*.jpg` files will already exist; skip the photo loop and run only steps 2 and 3 above. **Do still verify every manifest entry has a corresponding `image-[name].jpg` in the folder** — older posts predate the every-photo loop and may only have hero + one or two others, in which case generate the missing ones from `2-edited/` before proceeding.

After generating, clean up any legacy files in the slug folder (anything matching `[photo-slug]-*-ig.jpg` from the old bulk-processing workflow, leftover `post-editorial/` subfolder, numbered `1-hero.jpg` / `3-context.jpg` files, plain-named photos without the `image-` prefix, or `post.txt` instead of `_post.txt`). Note: `cover.jpg` was the original name for the typeset cover before May 2026; if it's there, delete it (the new file is `image-hero-text.jpg`):

```bash
find social/instagram/3-journal/[photo-slug] -maxdepth 1 -name "[photo-slug]-*-ig.jpg" -delete
rm -rf social/instagram/3-journal/[photo-slug]/post-editorial
rm -f social/instagram/3-journal/[photo-slug]/1-hero.jpg social/instagram/3-journal/[photo-slug]/3-context.jpg
rm -f social/instagram/3-journal/[photo-slug]/cover.jpg
# Drop any photos that lack the image- prefix (skips text-*.jpg which are correctly named)
find social/instagram/3-journal/[photo-slug] -maxdepth 1 -name "*.jpg" ! -name "image-*" ! -name "text-*" -delete
mv social/instagram/3-journal/[photo-slug]/post.txt social/instagram/3-journal/[photo-slug]/_post.txt 2>/dev/null || true
```

The script and the photography source remain the source of truth. Anything in the IG folder is regenerable on demand.

### Step 7A: Write Caption, Hashtags, Alt Text — Performance-Tuned

This is the second high-leverage step. The caption and hashtags are what drive IG search discovery and the in-app "for you" surfacing. Treat as such.

**Caption — three sentences, performance-led:**

- **Sentence 1 (the stop):** sensory image or specific detail that interrupts the scroll. Not a thesis statement. Not "we believe."
- **Sentence 2 (the build):** one developing thought. Adds context the image alone can't give.
- **Sentence 3 (the land):** quiet observation, the subject's own name, or a Japanese term glossed (Kokoro (心)). No CTA. No "link in bio." No selling.
- **Caption is search-indexed.** Weave the natural keyword once: the place name, the craft, *Kokoro*, *Onsen*, *Wabi-sabi* — whichever is the article's anchor. Don't force.
- **Voice rules in `context/pillar/journal.md` and CLAUDE.md.** No em dashes. No "delve / journey / unlock / nestled / tapestry / elevate / curate / unpack / reimagine / landscape." No rhyming triplets. No "not X. it is Y." constructions more than once a month across the whole feed.
- Close with `auwa.life` on its own line as the signature word.

**Hashtags — 10 total. Standard for Auwa growth phase.**

Always `#Auwa #Kokoro` plus eight more chosen for the post. Eight (rather than three) is the new standard because each well-chosen tag is a different discovery surface — illustrators on `#picturebooks` won't find Auwa via `#japaneselifestyle`, and vice versa. For an account in restart/growth mode (under 10K), 7-10 hashtags consistently outperforms the older "3-5" advice. More than 10 triggers IG's spam dampener.

Pools (guidance, not rigid):

- *Lifestyle / philosophy:* `#japaneselifestyle` `#slowliving` `#japaneseaesthetic` `#intentionalliving` `#mindfulness` `#emotionalintelligence` `#kintsugi`
- *Craft:* `#japanesecraft` `#japaneseknives` `#handmade` `#craftsmanship` `#monozukuri` `#washi` `#handdrawnillustration`
- *Travel:* `#japantravel` `#slowtravel` `#shinrinyoku` `#onsen` `#kyoto` `#yakushima` `#kiso`
- *Seasonal / nature:* `#wabisabi` `#monoNoaware` `#shichijuniko` `#72seasons` `#seasonalliving` `#japanesegarden`
- *Story / illustration:* `#illustration` `#picturebooks` `#illustratedstory` `#japaneseillustration`

**Hashtag selection principles:**

- **Mix volume tiers.** Aim for the rough split: 4 broad (>3M posts: `#japaneselifestyle`, `#slowliving`, `#illustration`, `#japaneseaesthetic`) → 2 mid (100k-1M: `#shinrinyoku`, `#onsen`, `#picturebooks`) → 2 niche (under 100k but engaged: place name, craftsman name, `#shichijuniko`, `#japaneseillustration`). The broad ones surface coverage; the mid + niche are where Auwa actually gets discovered.
- **Use the place name or craftsman name** as a hashtag whenever it makes one. `#yakushima`, `#nozawaonsen`, `#shigefusa`. Low volume, exactly-the-audience.
- **Cover the wider Auwa brand,** not just this article's narrow topic. Auwa is lifestyle + philosophy + craft + illustrated story + journal. Even a story-pillar post should carry one or two lifestyle / philosophy tags so the broader audience sees it.
- **Never `#japanesephilosophy`** — over-promises, dominated by academic / motivational accounts that bring the wrong audience.
- **Never copy-paste the same 10 across articles.** The first two are constant. The other eight should rotate by topic. Repetition signals automation to IG and to followers.

**Placement: hashtags go at the end of the caption, after a few line breaks.** Not in the first comment. As of IG's 2025 algorithm, caption-end placement scores slightly higher than first-comment placement, and the line breaks keep the visible "tap to expand" caption clean.

**Alt text — one factual sentence per image file in the folder, not per slide.**

Because the photos aren't pre-assigned to slides 1 and 3 (whoever posts picks two at upload time), alt text is keyed by image filename. `_post.txt` lists alt text for every photo in the folder plus the two text frames. At post time the user reads off the matching pair.

For each photo: subject + setting + light/material detail. Accessibility-grade, not poetry. Reuse the article's existing image alt where one exists in the content array — those are already factual and well-shaped.

`image-hero-text.jpg` is a separate alt entry from `image-hero.jpg` because the typeset overlay changes what's on screen — describe the underlying photo, then end with the typeset content. Format: `[hero photo description]. Typeset overlay: [eyebrow if present], [title], [JP if present].` Example: `Wooden shaden tower wrapped in straw, embers showering against the night sky. Typeset overlay: A DAY IN NOZAWA / Nozawa / 野沢.`

For the two text frames (a single alt covers both dark and light variants since the composition is identical):
- `text-quote-dark.jpg / text-quote-light.jpg`: `Pull quote on a dark wash: "[first 8-12 words of the quote]…" Auwa Journal.`
- `text-close-dark.jpg / text-close-light.jpg`: `Closing slide: Read the story in the Auwa Journal. [Article title]. auwa.life/journal/[url-slug].`

**First comment — one line, posted within 5 minutes of publish.** Names the section, gives the URL for completeness, points at the bio for the tappable path:

`Read the full essay in our Journal at auwa.life/journal/[url-slug]. Link in bio.`

(Auto-schedule in Buffer / Later. The "Link in bio" matters because URLs in IG comments aren't tappable — without that line, the link sits as friction.)

### Step 8A: Save the _post.txt

Write a plain-text file at `social/instagram/3-journal/[photo-slug]/_post.txt`. The underscore prefix sorts the brief to the top of the folder where it's easy to find on a phone. ASCII section headers, no markdown, no em dashes. Tom reads this on Android Dropbox and long-presses to copy each section into IG. The hashtags sit AT THE END OF THE CAPTION (not in a separate paste-step) because that's where they belong on IG, with a few line breaks between the caption signature and the hashtag block to keep the visible caption clean. Each alt-text entry uses a vertical "filename: / description" layout (filename on its own line, description on the next, blank line between entries) so each block is one tap-and-drag selection on a phone.

```
[ARTICLE TITLE] | Auwa Journal
==============================

Scheduled: [YYYY-MM-DD HH:MM London or TBD]
Carousel: [N] slides, 1080x1350 (cover, quote, [N-3] photos, close)
Slide 1: image-hero-text.jpg (typeset cover) OR image-hero.jpg (clean) — pick at upload
Theme: dark (default) or light, pick at upload
Folder: social/instagram/3-journal/[photo-slug]/
Source: auwa.life/journal/[url-slug]


--- CAPTION (paste this whole block as-is into the IG caption field) ---

[Three-sentence caption, no markdown, no em dashes]

auwa.life (link in the bio)



#Auwa #Kokoro #x #y #z #a #b #c #d #e


--- FIRST COMMENT (post within 5 min of publish) ---

Read the full essay in our Journal at auwa.life/journal/[url-slug]. Link in bio.


--- ALT TEXT (per image file in this folder; set in IG when you upload each slide) ---

image-hero.jpg:
[factual description of the hero photo, no overlay]

image-hero-text.jpg:
[same hero description]. Typeset overlay: [eyebrow if present] / [title] / [JP if present].

image-[name].jpg:
[factual description]

(... one block per image-*.jpg in the folder)

text-quote-dark.jpg / text-quote-light.jpg:
Pull quote on a dark wash: "[first 8-12 words]..." Auwa Journal.

text-close-dark.jpg / text-close-light.jpg:
Closing slide: Read the story in the Auwa Journal. [Article title]. auwa.life/journal/[url-slug].


--- STORY SHARE (immediately after publish) ---

Link sticker target:
auwa.life/journal/[url-slug]

Optional caption:
[short line, or leave blank]


--- NOTES ---

Pin to grid:
[yes / no]

Boost:
[if applicable]
```

After saving, show the user:
1. The full file list in the post folder (every image-*.jpg, the four text-*.jpg frames, and _post.txt)
2. The caption and hashtags inline so they can voice-check without opening the file
3. Single confirm: "Voice check on the caption ok? Any swaps on hashtags?"

---

## Single / Reel / Carousel Branch (Types 2-4)

### Step 2B: Gather the Brief

Ask one at a time:

1. "What's the post about? One or two sentences on the subject and what you want the viewer to feel."
2. "Which content pillar: Kokoro Reveal, Japanese Wisdom, Behind the Kokoro, or Seasonal Living?"
3. "Where's the asset? (Path or description.)"
4. "Any specific phrase, Japanese word, or detail you want woven in?"
5. "Scheduled date and time? (Defaults to next available slot in the weekly cadence: Tue/Wed Reel, Fri/Sat Slideshow, Sun evening atmospheric.)"

If the user gave this upfront, skip the questions.

### Step 3B: Draft the Caption

Three sentences max. Voice rules:

- No em dashes. Use periods, commas, colons, parentheses.
- No AI vocabulary. Re-read the hard rules in CLAUDE.md Writing Style.
- Quiet, observational. First person plural ("we") sparingly. Concrete sensory detail over abstract claims.
- Gift Ethos. No selling. No CTA in the caption.
- Japanese words welcome, glossed briefly. Format kanji in parentheses after romaji: `Kokoro (心)`.
- Caption text is indexed for IG search. Weave keywords naturally, don't force.
- Close quietly. Often with the subject's own name, or `auwa.life` as a single signature word on the last line.

### Step 4B: Choose Hashtags

5 per post. Always `#Auwa #Kokoro` plus three from the pillar pool:

- *Kokoro Reveal:* `#japaneselifestyle #slowliving #japaneseaesthetic #mindfulness #emotionalintelligence`
- *Japanese Wisdom:* `#shichijuniko #72seasons #wabisabi #monoNoaware #ikigai`
- *Behind the Kokoro:* `#illustration #picturebooks #illustratedstory #studiolife #behindthescenes`
- *Seasonal Living:* `#seasonalliving #japantravel #slowtravel #kyoto #onsen #shinrinyoku`

Avoid `#japanesephilosophy`. Rotate so the same five don't appear on every post.

### Step 5B: Alt Text, Story Share, First Comment

**Alt text.** One factual sentence. No poetry. Example: "The Auwa character, a small luminous figure with dot eyes, stands in soft cream light against a pale background."

**Story share.** Every feed post and Reel gets shared to Story immediately after publish, with a link sticker. Specify the URL and an optional one-line caption.

**First comment.** One more beat of context that doesn't repeat the caption: a Japanese word, a credit, or a link. If linking to a journal article, the URL goes here, not the caption.

### Step 6B: Assemble and Save (Single / Reel / Carousel)

Save to `social/instagram/YYYY-MM-DD-[slug].md`:

```markdown
# [Post title, short]

**Date:** [YYYY-MM-DD]
**Time:** [HH:MM London]
**Pillar:** [Kokoro Reveal / Japanese Wisdom / Behind the Kokoro / Seasonal Living]
**Format:** [Reel / Single / Carousel]
**Asset:** [path or description]

## Caption

[Locked caption text]

## Hashtags

`#Auwa #Kokoro #x #y #z`

## Alt Text

[Single sentence]

## First Comment

[One or two lines, posted by @auwalife within 5 minutes of publish]

## Story Share

**Link sticker target:** [URL]
**Caption (optional):** [Short line]

## Notes

[Any scheduling notes, pinning instructions, cross-post plans]
```

### Step 7B: Show and Confirm (Single / Reel / Carousel)

Show the full brief. Ask:

1. "Voice check: does the caption sound like us?"
2. "Hashtags: any you'd swap?"
3. "Anything to adjust before I save?"

Save and report the path.

---

## Final Step (All Branches): Production Reminder

After saving, remind the user:

**For slideshows:** Everything lives in `social/instagram/3-journal/[photo-slug]/`: every article photo as `image-*.jpg` (including `image-hero.jpg` clean and `image-hero-text.jpg` typeset), the four `text-*.jpg` frames, and `_post.txt`. On phone or desktop, open the folder, open `_post.txt`, paste the caption block (caption + hashtags) into Buffer or Later. For slide 1, pick either `image-hero-text.jpg` (typeset cover, default) or `image-hero.jpg` (bare photo, when the hero wants to breathe — e.g. _The Beginning_, character stills). Slide 2 is one of the dark/light quote pair. Slides 3..N are however many `image-[name].jpg` files suit the article — IG carousels run up to 20 slides, more dwell-time before the close is generally better. The final slide is one of the dark/light close pair. Set the matching alt text per slide from `_post.txt`, schedule the first comment to post within 5 minutes of publish, and prepare the Story share on phone. If a slide needs a tweak, re-run `/instagram:post` for that article — the script overwrites cleanly.

**For single / Reel / carousel:** Paste caption + hashtags into Buffer or Later. Upload the asset. Verify the crop (Reel 9:16, feed 4:5 portrait at 1080x1350). Add the alt text. Schedule the first comment to post within 5 minutes of publish. Prepare the Story share on phone for immediate share after publish. If it's a pinned post, note to pin in-app after publish.
