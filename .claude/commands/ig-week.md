---
name: IG Week
description: Plan next week's three Instagram posts. Balances pillars, pulls from the article backlog and character animation queue, and outputs the week's schedule.
---

## Instructions

You are planning a full week of Instagram posts for AUWA. Three posts, following the weekly cadence locked in `context/instagram.md`.

Load:

- `context/instagram.md` (weekly cadence, content pillars, recommended mix)
- `context/arrival.md` (current phase, any campaign moments this week)

## Step 1: Ask the Brief

Ask the user:

1. "Which week are we planning? (Start Monday, default: next Monday.)"
2. "Any campaign moment this week? (Article going live, figure drop, Fin collab, LinkedIn push, app waitlist push.)"
3. "Which character animations are ready in the queue?"
4. "Which journal articles from the backlog are candidates for the weekend slideshow?"
5. "Any seasonal or micro-season moment this week that should shape the Sunday post?"

## Step 2: Check the Mix

Look at the last four weeks of posts in `social/ig/` and tally pillar frequency:

- 35% Kokoro Reveal (character content)
- 25% Editorial Slideshows
- 20% Seasonal Living
- 10% Japanese Wisdom
- 10% Behind the Kokoro

If one pillar is under-represented over the last month, bias this week toward it. If a campaign moment (e.g. app arrival) justifies a deliberate imbalance, name that explicitly.

## Step 3: Draft the Three Slots

The locked weekly cadence is:

1. **Tue or Wed: Character Reel** (Kokoro Reveal). The growth engine.
2. **Fri or Sat evening: Editorial Slideshow** (article digest). Depth and traffic.
3. **Sun evening: Atmospheric post** (Seasonal Living or Japanese Wisdom). Quiet close.

For each slot, propose:

- Pillar
- Format (Reel / Carousel / Single)
- Concept in one sentence
- Asset source (Runway, existing photography, article reference)
- Scheduled day and time (use instagram.md best-time guidance: Tue/Wed Reels at 7-9pm UK, Fri/Sat Slideshow at 10-11am UK, Sun Post at 7-8pm UK)

## Step 4: Show the Plan

Present the week as a three-row table:

| Day | Time | Pillar | Format | Concept | Asset |
|-----|------|--------|--------|---------|-------|
| Tue | 20:00 | Kokoro Reveal | Reel | [One-sentence concept] | [Source] |
| Fri | 11:00 | Editorial Slideshow | Carousel | [Article slug] | [article] |
| Sun | 19:30 | Seasonal Living | Single / Carousel | [Concept] | [Source] |

## Step 5: Confirm and Generate Individual Briefs

Ask the user: "Does this week look right? Any swaps?"

Once confirmed, offer to generate the individual briefs using `/ig-post` for slots 1 and 3, and `/ig-slideshow` for slot 2. Do not auto-generate them; the user should step through each one so voice and image selection get real attention.

## Step 6: Save the Week

Save the plan to `social/ig/weeks/YYYY-WW.md` (ISO week) with the table and a short note on the campaign moment if any. The weekly file is the user's at-a-glance view of where content stands.
