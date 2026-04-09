# AUWA — Brand Tokens

## Overview
AUWA is a daily EQ practice for the AGI generation. A cosmic being from the solar system WAWA who reveals the kokoro within all living things through a magical light shower. Web app, collectible figures, illustrated stories. Created by Japanese illustrator Rieko Vining over a decade of development.

## Personality
Luminous, contemplative, otherworldly

## Typography
- **Display:** Cormorant — 300 light, 400 regular (elegant, ethereal, classical proportions. Thin strokes glow against dark backgrounds. Feels like light itself, not a tech product.)
- **Body:** Instrument Sans — 400 regular, 500 medium (clean, modern, warm. Doesn't compete with the display serif. Good readability at small sizes.)
- **Japanese:** Noto Sans JP — 300 light, 400 regular (for kō stamps, Japanese text elements. Clean, respectful, excellent rendering)
- **Scale ratio:** 1.333 perfect fourth (gentle progression suits contemplative pacing)
- **Loading:** Google Fonts (Cormorant, Instrument Sans, Noto Sans JP — all free, loaded via next/font/google)

## Colour

The palette is drawn from Rieko's illustrations: deep cosmic night skies as the base, with AUWA's characteristic yellow-green luminescence as the accent. The four Kido Airaku emotions each carry a distinct colour family.

- **Primary accent:** oklch(0.85 0.15 105) — AUWA glow, the warm yellow-green light that surrounds the character
- **Neutral base:** Cool-tinted, pulled toward deep space blue

- **Neutrals (cosmic dark palette):**
  - 50: oklch(0.97 0.005 250) — lightest, near-white with a breath of blue
  - 100: oklch(0.93 0.008 250)
  - 200: oklch(0.87 0.012 250)
  - 300: oklch(0.75 0.015 250)
  - 400: oklch(0.60 0.018 250)
  - 500: oklch(0.45 0.020 250)
  - 600: oklch(0.35 0.022 250)
  - 700: oklch(0.25 0.025 250)
  - 800: oklch(0.18 0.028 250) — deep space
  - 900: oklch(0.13 0.030 250) — near-black cosmic
  - 950: oklch(0.08 0.025 250) — void

- **Kido Airaku emotion colours:**
  - Ki (Joy): oklch(0.82 0.14 85) — warm gold/amber
  - Do (Anger): oklch(0.60 0.18 25) — deep red/amber
  - Ai (Sorrow): oklch(0.70 0.06 250) — soft blue-grey
  - Raku (Ease): oklch(0.75 0.10 160) — gentle green/lavender

- **Semantic:**
  - Success: oklch(0.75 0.12 155)
  - Error: oklch(0.65 0.18 25)
  - Warning: oklch(0.80 0.14 85)

- **Dark mode:** Primary mode. AUWA is dark-first. The deep cosmic background IS the brand. Light mode is not planned for the teaser page. The app experience described in the business plan is entirely dark-mode (dark, calm screen, glowing orb).

## Voice
- **Tone:** Quiet, precise, present
- **Copy style:** Short sentences. Poetic but never flowery. UK English. Write as if the words carry weight, not volume. Think haiku more than manifesto. Let silence (whitespace) do the heavy lifting.
- **Banned words:** All CLAUDE.md anti-slop rules apply, plus: "wellness", "mindfulness" (too generic/saturated), "journey" (overused), "discover your true self" (cliche), "transform" (AUWA reveals, it doesn't transform), "zen" (reductive), "ancient wisdom" (patronising framing of living philosophy), "self-care" (commodified), "unlock your potential" (corporate). Never describe AUWA as an app on the teaser page. It's an experience, a practice, a presence.

## Visual Direction
- **DESIGN_VARIANCE:** 7 (distinctive, atmospheric, unlike typical tech/wellness. Not wild, but clearly its own thing)
- **MOTION_INTENSITY:** 4 (subtle, ambient. Think slow breathing, not fireworks. Gentle particle drift, soft glow pulses. Nothing should startle)
- **VISUAL_DENSITY:** 2 (extremely sparse. The teaser page should feel like a clearing in deep space. Mostly negative space with one focal point)
- **Layout style:** Centred, vertical, atmospheric. Single focal element surrounded by void. Think Olafur Eliasson installation, not a marketing page.
- **References:** teamLab (immersive digital art), Olafur Eliasson (light as medium), Hoshinoya (Japanese luxury restraint), the deep-field Hubble photographs (cosmic scale/silence), Rieko's own illustrations (the dark backgrounds with luminous focal points)
- **Differentiate from:** Headspace/Calm (too playful/illustrated/gamified), typical AI product pages (too techy/feature-listy), Japanese aesthetic cliches (cherry blossoms, red gates, wave prints). AUWA's Japanese-ness comes from philosophy, not visual stereotypes.

## Assets
- **Logo/Wordmark:** The AUWA wordmark from Book 1 cover, custom rounded geometric letterforms in yellow-green. Needs to be vectorised from the existing book art for web use. For the teaser, can be set in Satoshi Bold uppercase with generous letter-spacing as a temporary treatment.
- **Character:** AUWA, the small white luminous being with dot eyes, surrounded by concentric rings of light. Rieko's hand-illustrated versions exist in the book production files. 4 emotional variants planned (one per Kido Airaku state).
- **Favicon:** Simplified AUWA orb glow, circular
- **OG image:** 1200x630, dark cosmic background with AUWA character and glow, wordmark below

## Technical Constraints
- WCAG 2.1 AA, with particular attention to contrast on dark backgrounds
- Progressive Web App capability (future, not teaser phase)
- Performance: target 95+ Lighthouse. The teaser should be very lightweight
- No font licence costs (Satoshi is free commercial, Noto Sans JP is Google open source)
- Browser support: modern browsers (Safari, Chrome, Firefox, Edge). No IE11.

## Teaser Page Specifics
- **Purpose:** Build anticipation. Collect email addresses. Introduce the world without explaining it.
- **Primary action:** Email signup for early access
- **Tone:** Mysterious, inviting, sparse. Reveal just enough to intrigue. Don't explain the product, the philosophy, or the framework. Let the visual atmosphere do the work.
- **What to show:** AUWA wordmark, a single atmospheric visual (character or glow), one line of copy, email signup, maybe the tagline "A cosmic being who reveals your kokoro"
- **What NOT to show:** Feature lists, pricing, screenshots, the word "app", Kido Airaku framework details, micro-season explanations, team bios
- **Domain:** auwa.life (single domain with /app, /store, /journal, /book subpaths). auwalife.com as .com mirror.
