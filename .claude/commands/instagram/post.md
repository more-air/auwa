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

A 4-slide editorial carousel built end-to-end by this command: two photos from the article + two text frames generated from the Auwa template. No Figma needed.

The four slides:

1. Hero photo
2. Quote text frame
3. Context photo
4. Closing CTA text frame

The whole post lands in a single flat folder per article: `social/instagram/[photo-slug]/`. After the command runs, that folder contains:

```
_post.txt                 ← caption, hashtags, alt text per image. Underscore-prefix sorts to top of folder.
image-hero.jpg            ← article photos, descriptive names from manifest, image- prefix groups them
image-[name].jpg          ← e.g. image-cosmic.jpg, image-sketches.jpg
text-quote-dark.jpg       ← carousel slot 2 (dark theme)
text-quote-light.jpg      ← carousel slot 2 (light theme)
text-close-dark.jpg       ← carousel slot 4 (dark theme)
text-close-light.jpg      ← carousel slot 4 (light theme)
```

Naming logic: `image-` prefix on every article photo so they group together alphabetically and don't intermingle with the text frames. Text frames keep their `text-` prefix (slot position is implicit in the name — quote = slot 2, close = slot 4). `_post.txt` underscore puts the brief at the top of the folder where it's easy to find on a phone.

**The command does NOT pre-pick which two photos go on slides 1 and 3.** It outputs every article photo at IG size and whoever uploads the post (Tom or Rieko) picks the best two at the moment of posting. This avoids the "Tom picks photo X, Rieko prefers Y" coordination problem and gives whoever's at the keyboard final editorial control. Alt text in `_post.txt` is keyed per image filename so the poster reads off whichever two photos they chose.

Plain text `_post.txt` is intentional. Tom reads and copies sections from the Dropbox app on Android. Markdown (.md) renders as raw `**` and `#` characters in that viewer.

### Step 2A: Inputs

Ask in one message:

1. "Which journal article? Slug or title."
2. "Scheduled date and time? (Defaults to next Friday or Saturday evening.)"

### Step 3A: Read the Article + Map the Slug

1. Load the article from `website/main/src/app/journal/[url-slug]/page.tsx`. Note the title, topic, voice, and any specific framing.
2. Look up the IG folder name (the `photo-slug`) in `auwa/photography/_manifest.json`. The article URL slug and the photo folder slug can differ (e.g. URL `the-beginning` vs photo folder `auwa-book`). The manifest entries are keyed by photo-slug with a `url_slug` field inside.
3. The IG folder is `social/instagram/[photo-slug]/`. The article URL on slide 4 uses `[url-slug]`.

### Step 4A: Generate Three IG-Optimised Quotes

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

### Step 5A: Process All Photos + Generate Text Frames

Output everything into the flat per-article folder. Loop through every image in the manifest and process each to IG size with its descriptive name (no slug prefix). Then render the four text frames (dark + light × quote + close).

```bash
# All article photos at IG size — image- prefix + descriptive names from manifest
# (loop through manifest.articles[photo-slug].images, run for each name → source pair)
cd website/main && node scripts/process-image.js \
  ../../photography/[photo-slug]/2-edited/[source-file] \
  ../../social/instagram/[photo-slug]/image-[name].jpg ig
# e.g. ../../social/instagram/auwa-book/image-hero.jpg, image-cosmic.jpg, ...

# Slot 2 text frame — quote, dark + light
python3 social/instagram/_scripts/text-image.py \
  --variant quote --theme dark \
  --quote "[chosen quote, no surrounding quote marks]" \
  --out social/instagram/[photo-slug]/text-quote-dark.jpg

python3 social/instagram/_scripts/text-image.py \
  --variant quote --theme light \
  --quote "[chosen quote, no surrounding quote marks]" \
  --out social/instagram/[photo-slug]/text-quote-light.jpg

# Slot 4 text frame — closing CTA, dark + light. --slug uses the URL slug.
python3 social/instagram/_scripts/text-image.py \
  --variant close --theme dark \
  --title "[article.title]" --slug "[url-slug]" \
  --out social/instagram/[photo-slug]/text-close-dark.jpg

python3 social/instagram/_scripts/text-image.py \
  --variant close --theme light \
  --title "[article.title]" --slug "[url-slug]" \
  --out social/instagram/[photo-slug]/text-close-light.jpg
```

After generating, clean up any legacy files in the slug folder (anything matching `[photo-slug]-*-ig.jpg` from the old bulk-processing workflow, leftover `post-editorial/` subfolder, numbered `1-hero.jpg` / `3-context.jpg` files, plain-named photos without the `image-` prefix, or `post.txt` instead of `_post.txt`):

```bash
find social/instagram/[photo-slug] -maxdepth 1 -name "[photo-slug]-*-ig.jpg" -delete
rm -rf social/instagram/[photo-slug]/post-editorial
rm -f social/instagram/[photo-slug]/1-hero.jpg social/instagram/[photo-slug]/3-context.jpg
# Drop any photos that lack the image- prefix (skips text-*.jpg which are correctly named)
find social/instagram/[photo-slug] -maxdepth 1 -name "*.jpg" ! -name "image-*" ! -name "text-*" -delete
mv social/instagram/[photo-slug]/post.txt social/instagram/[photo-slug]/_post.txt 2>/dev/null || true
```

The script and the photography source remain the source of truth. Anything in the IG folder is regenerable on demand.

### Step 6A: Write Caption, Hashtags, Alt Text — Performance-Tuned

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

For the two text frames (a single alt covers both dark and light variants since the composition is identical):
- `text-quote-dark.jpg / text-quote-light.jpg`: `Pull quote on a dark wash: "[first 8-12 words of the quote]…" Auwa Journal.`
- `text-close-dark.jpg / text-close-light.jpg`: `Closing slide: Continue reading on the Auwa Journal. [Article title]. auwa.life/journal/[url-slug].`

**First comment — one line, posted within 5 minutes of publish.** Names the section, gives the URL for completeness, points at the bio for the tappable path:

`Read the full essay in our Journal at auwa.life/journal/[url-slug]. Link in bio.`

(Auto-schedule in Buffer / Later. The "Link in bio" matters because URLs in IG comments aren't tappable — without that line, the link sits as friction.)

### Step 7A: Save the _post.txt

Write a plain-text file at `social/instagram/[photo-slug]/_post.txt`. The underscore prefix sorts the brief to the top of the folder where it's easy to find on a phone. ASCII section headers, no markdown, no em dashes. Tom reads this on Android Dropbox and long-presses to copy each section into IG. The hashtags sit AT THE END OF THE CAPTION (not in a separate paste-step) because that's where they belong on IG, with a few line breaks between the caption signature and the hashtag block to keep the visible caption clean. Each alt-text entry uses a vertical "filename: / description" layout (filename on its own line, description on the next, blank line between entries) so each block is one tap-and-drag selection on a phone.

```
[ARTICLE TITLE] | Auwa Journal
==============================

Scheduled: [YYYY-MM-DD HH:MM London or TBD]
Carousel: 4 slides, 1080x1350
Theme: dark (default) or light, pick at upload
Folder: social/instagram/[photo-slug]/
Source: auwa.life/journal/[url-slug]


--- CAPTION (paste this whole block as-is into the IG caption field) ---

[Three-sentence caption, no markdown, no em dashes]

auwa.life (link in the bio)



#Auwa #Kokoro #x #y #z #a #b #c #d #e


--- FIRST COMMENT (post within 5 min of publish) ---

Read the full essay in our Journal at auwa.life/journal/[url-slug]. Link in bio.


--- ALT TEXT (per image file in this folder; set in IG when you upload each slide) ---

image-hero.jpg:
[factual description]

image-[name].jpg:
[factual description]

(... one block per image-*.jpg in the folder)

text-quote-dark.jpg / text-quote-light.jpg:
Pull quote on a dark wash: "[first 8-12 words]..." Auwa Journal.

text-close-dark.jpg / text-close-light.jpg:
Closing slide: Continue reading on the Auwa Journal. [Article title]. auwa.life/journal/[url-slug].


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

**For slideshows:** Everything lives in `social/instagram/[photo-slug]/`: every article photo as `image-*.jpg`, the four `text-*.jpg` frames, and `_post.txt`. On phone or desktop, open the folder, open `_post.txt`, paste the caption block (caption + hashtags) into Buffer or Later, pick two `image-*.jpg` files for slides 1 and 3 plus one dark/light pair for slides 2 and 4, set the matching alt text per slide from `_post.txt`, schedule the first comment to post within 5 minutes of publish, and prepare the Story share on phone. If a slide needs a tweak, re-run `/instagram:post` for that article — the script overwrites cleanly.

**For single / Reel / carousel:** Paste caption + hashtags into Buffer or Later. Upload the asset. Verify the crop (Reel 9:16, feed 4:5 portrait at 1080x1350). Add the alt text. Schedule the first comment to post within 5 minutes of publish. Prepare the Story share on phone for immediate share after publish. If it's a pinned post, note to pin in-app after publish.
