---
name: Instagram Slideshow
description: Turn a journal article into a 5-slide Instagram editorial carousel. Pulls the article, picks three pull quotes, drafts all copy, and saves the brief.
---

## Instructions

You are converting a published journal article into an Instagram editorial slideshow. Load these context files before starting:

- `context/marketing/instagram.md` (especially the Editorial Slideshow Format section)
- `context/pillar/journal.md` (voice rules, so the quote selection respects the article's register)

The global CLAUDE.md writing style rules apply. No em dashes. No AI vocabulary.

## Step 1: Identify the Article

Ask the user:

1. "Which journal article? Slug or title."
2. "Any quote in the article you particularly want pulled into the slideshow, or should I select?"
3. "Scheduled date and time? (Defaults to next Friday or Saturday evening, the Weekend Slideshow slot.)"

## Step 2: Read the Article

Load the article from `website/main/src/app/journal/[slug]/page.tsx`. Note:

- The hero image filename (usually `/journal/[slug]/[slug]-hero.jpg`).
- Any existing `type: "pullquote"` content blocks in the page (the author has already flagged the strongest line).
- Any image-pair or inline images that could serve as backdrop for text overlays.

## Step 3: Select the Three Pull Quotes

The carousel has five slides. Slides 2, 3, and 4 carry the three quotes. Picking the right three is the whole craft.

**Rules:**
- **Quote A** (slide 2): a complete-enough idea to stop the scroll. 8-20 words. This is the hook.
- **Quote B** (slide 3): longer, more atmospheric. A sentence that rewards the swipe. 15-35 words.
- **Quote C** (slide 4): the shortest and most lyrical. The one you'd remember. 5-15 words.
- All three must **sound different from each other** (idea, rhythm, emotional weight).
- None can be the same as the article's existing pullquote unless that pullquote is the strongest candidate.
- None can contain an em dash. (Articles sometimes slip these in. Rewrite with a period or comma if the chosen quote has one.)
- Never edit the article's meaning when extracting. If a quote needs trimming, cut at a natural break, don't rephrase.

## Step 4: Design Notes for Each Slide

Each slide gets a design brief, not just text. The slideshow fails if all three quote slides look identical. Vary the typography and the treatment.

Slide template:

1. **Hero** — article hero image, no text overlay. (Or optional: one-line floating title in small caps, top-left, white on darkened image.)
2. **Quote A** — large serif, centred, on white or off-white background. Minimal. The words do the work.
3. **Quote B** — white text overlaid on a cropped detail from the article's photography (an object, texture, close-up). Lower contrast, more atmospheric.
4. **Quote C** — large serif on a solid colour wash taken from the article's palette (warm off-white, deep green, dusk blue). Different colour each slideshow; identify it from the hero's dominant tones.
5. **Close** — a quiet closing image from the article (one of the secondary images, not the hero). Small text bottom-centre: `Read the full essay at auwa.life/journal/[slug]`. No loud CTA.

For each slide, specify in the brief:
- Image path (if applicable)
- Text content
- Typography treatment (size, weight, case, alignment)
- Background (colour or image)
- Any compositional notes

## Step 5: Draft the Caption

Rules from `ig-post` apply. Three sentences maximum. No CTA. The caption's job is to frame the article, not summarise it. Typical shape:

*"[A single observation tied to the article's theme]. [One more sentence that deepens the observation]. [A quiet close, often naming the subject or the season]."*

End with `auwa.life` on its own line.

## Step 6: Choose Hashtags

Pull from the Editorial Slideshow pool:

`#AUWA #Kokoro #[pillar-relevant tag] #[topic tag] #[sensibility tag]`

For example, an article on Shigefusa uses `#AUWA #Kokoro #japanesecraft #handmade #slowliving`. An article on the cedar avenue uses `#AUWA #Kokoro #shinrinyoku #japantravel #japaneseaesthetic`.

## Step 7: First Comment

The first comment is where the article URL goes:

`"Full essay at auwa.life/journal/[slug]"`

Single line. No more.

## Step 8: Assemble and Save

Save to `social/instagram/YYYY-MM-DD-slideshow-[slug].md` using this template:

```markdown
# Slideshow: [Article title]

**Date:** [YYYY-MM-DD]
**Time:** [HH:MM London]
**Pillar:** Editorial Slideshow (Journal digest)
**Format:** Carousel (5 slides, 4:5 portrait)
**Source article:** /journal/[slug]

## Caption

[Three-sentence caption]

## Hashtags

`#AUWA #Kokoro #x #y #z`

## First Comment

Full essay at auwa.life/journal/[slug]

## Story Share

**Link sticker target:** auwa.life/journal/[slug]
**Caption (optional):** [Short line]

## Slides

### Slide 1: Hero
- Image: /journal/[slug]/[slug]-hero.jpg
- Text: [None / small-caps title]
- Treatment: [Notes]

### Slide 2: Quote A
- Text: "[Quote A, 8-20 words]"
- Typography: [Size, weight, case]
- Background: [White / off-white / colour]

### Slide 3: Quote B
- Text: "[Quote B, 15-35 words]"
- Image backdrop: [/journal/[slug]/[detail-image].jpg]
- Typography: [Size, weight, case, overlay treatment]

### Slide 4: Quote C
- Text: "[Quote C, 5-15 words]"
- Background: [Specific colour from article palette, e.g. dusk blue #2e3a45]
- Typography: [Size, weight, case]

### Slide 5: Close
- Image: /journal/[slug]/[closing-image].jpg
- Text: "Read the full essay at auwa.life/journal/[slug]"
- Position: Bottom-centre, small, low-contrast
```

## Step 9: Show and Confirm

Before saving, show the user:

1. The three selected pull quotes, and ask "Any you'd swap?"
2. The colour chosen for slide 4, and ask "Does this colour feel right for the article's mood?"
3. The caption, and ask "Voice check ok?"

Then save.

## Step 10: Remind About the Production Step

After saving, remind the user that the slides themselves need to be designed in Figma, Photoshop, or Canva before scheduling. The brief tells the designer exactly what to make. A Figma template with the AUWA typography pre-set will cut production time to 10 minutes per slideshow after the first one is built.
