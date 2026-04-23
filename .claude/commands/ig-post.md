---
name: IG Post
description: Prepare a full Instagram post brief (caption, hashtags, alt text, Story plan) from an asset and short context. Output ready to paste into Buffer or Later.
---

## Instructions

You are preparing an Instagram post brief for AUWA. Load these context files before starting:

- `context/instagram.md` (platform strategy, content pillars, hashtag rules, weekly cadence, image specs)
- `context/arrival.md` (launch phase and tone, especially the Gift Ethos section)

The global CLAUDE.md writing style rules apply strictly (no em dashes, no AI vocabulary, no "here's the thing," no marketing fluff).

## Step 1: Gather the Brief

Ask the user these questions one at a time (not all at once):

1. "What's the post about? One or two sentences on the subject and what you want the viewer to feel."
2. "Which content pillar: Kokoro Reveal, Japanese Wisdom, Behind the Kokoro, or Seasonal Living?"
3. "Which format: Reel, single feed post, or carousel? And where's the asset? (Path or description.)"
4. "Any specific phrase, Japanese word, or detail you want woven in?"
5. "Scheduled date and time? (Defaults to next available slot in the weekly cadence: Tue/Wed Reel, Fri/Sat Slideshow, Sun evening atmospheric.)"

If the user provides this information upfront, skip the questions and proceed.

## Step 2: Draft the Caption

Rules for every caption:

- **Three sentences maximum** unless there's a genuine reason to go longer.
- **No em dashes.** Ever. Use periods, commas, colons, parentheses.
- **No AI vocabulary.** Re-read the hard rules in the root CLAUDE.md Writing Style section before you draft.
- **The voice:** quiet, observational, first person plural ("we") sparingly. Concrete sensory detail over abstract claims. The Gift Ethos. No selling. No "Here's the thing." No "Let's be honest."
- **Japanese words welcome**, glossed briefly if needed, never exoticised. Format Japanese kanji in parentheses after the romaji: `Kokoro (心)`.
- **Caption text is indexed** for IG search. Weave in natural keywords (kokoro, Japanese philosophy, awareness, craft, season, whatever fits) but don't force them.
- **Never include a CTA.** No "tap the link," "check our bio," "follow for more." The link in bio does that job. The caption's job is to make someone pause.
- **Close quietly.** Often with the subject's own name, or with `auwa.life` as a single signature word on the last line.

## Step 3: Choose Hashtags

5 hashtags per post. Mix: 1 branded + 1 niche + 2 mid-range + 1 broad.

**Always:**
- `#AUWA`
- `#Kokoro`

**Add three more from the appropriate pool based on the pillar:**

- *Kokoro Reveal:* `#japanesephilosophy`, `#slowliving`, `#japaneseaesthetic`, `#mindfulness`, `#emotionalintelligence`
- *Japanese Wisdom:* `#japanesephilosophy`, `#shichijuniko`, `#72seasons`, `#wabisabi`, `#monono_aware`, `#ikigai`
- *Behind the Kokoro:* `#illustration`, `#picturebooks`, `#illustratedstory`, `#studiolife`, `#behindthescenes`
- *Seasonal Living:* `#seasonalliving`, `#japantravel`, `#slowtravel`, `#kyoto`, `#onsen`, `#forestbathing`, `#shinrinyoku`

Rotate so the same five don't appear on every post. Review Instagram Insights monthly and swap underperforming tags.

## Step 4: Write Alt Text

One sentence describing the image or video factually for accessibility. No poetry. Example: "The AUWA character, a small luminous figure with dot eyes, stands in soft cream light against a pale background."

## Step 5: Plan the Story Share

Every feed post and Reel gets shared to Story immediately after publishing, with a link sticker to the relevant URL (auwa.life, or the specific journal article, or the teaser page if appropriate).

Draft the Story share caption (one short line, optional), and specify which URL the link sticker points to.

## Step 6: Plan the First Comment

Instagram boosts posts where the account replies to its own post early. Draft a first-comment that adds one more beat of context without repeating the caption. Examples: a single Japanese word that deepens the meaning, a credit ("Illustrated by Rieko"), a link target ("Full essay at auwa.life/journal/[slug]").

If the post links to a journal article, the first comment is the right place to put the URL, since URLs in captions reduce reach.

## Step 7: Assemble and Save

Write the brief to `social/ig/YYYY-MM-DD-slug.md` using this template:

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

`#AUWA #Kokoro #x #y #z`

## Alt Text

[Single sentence]

## First Comment

[One or two lines, posted by @auwa within 5 minutes of publish]

## Story Share

**Link sticker target:** [URL]
**Caption (optional):** [Short line]

## Notes

[Any scheduling notes, pinning instructions, cross-post plans]
```

## Step 8: Show and Confirm

Show the user the full brief before saving. Ask:

1. "Voice check: does the caption sound like us?"
2. "Hashtags: any you'd swap?"
3. "Anything to adjust before I save this to `social/ig/`?"

Once confirmed, save the file and report the path.

## Step 9: Remind About the Workflow

After saving, remind the user:

- Paste the caption + hashtags into Buffer or Later for scheduling.
- Upload the asset. Verify the crop (Reel 9:16, feed 4:5 portrait).
- Add the alt text.
- Schedule the first comment to post within 5 minutes of publish.
- Prepare the Story share on phone for immediate share after publish.
- If it's a pinned post (first-ever, app arrival, store launch), note to pin it in-app after publish.
