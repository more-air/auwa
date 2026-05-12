# Auwa Brand

*Created: April 2026. The working brand reference for all Auwa touchpoints.*
*Load when working on visual design, social content, brand decisions, or any new touchpoint.*

---

## 1. Brand Essence

Auwa (あうわ) — "the harmony between the unseen and the seen." Kokoro (心) is the holistic Japanese concept that holds heart, mind, soul, and spirit as one undivided whole. The brand makes the invisible visible: invisible emotions (app), invisible craftsmanship (store), invisible Kokoro within all living things (stories).

The brand feels like: a quiet room in a Japanese temple at dusk. Dark, warm, still. Then light enters.

**Brand reference points:**

- **Aesop** — Luxury minimalism, craft-forward. Dark interiors, serif type, every store feels like the same calm room. The gold standard for "premium through restraint." Auwa's app and social should feel like walking into an Aesop store: you immediately know someone cared about every detail.
- **Kinfolk** — Editorial calm, intentional living. Wide-tracked serif wordmark. Generous white space. Photography that breathes. The confidence to leave half the page empty. Auwa's typography and spacing should carry this same unhurried authority.
- **Cereal** — Refined design magazine. Restrained colour palette, serif headlines, atmospheric travel photography. The exact intersection of design culture and wanderlust that Auwa's audience inhabits.
- **Hoshinoya** — Japanese luxury hospitality. Dark, warm, nature-integrated. Space as design. Shows how Japanese premium doesn't need to be austere — it can be warm and inviting while remaining minimal. Auwa's dark palette should feel this way: enveloping, not cold.
- **Studio Ghibli** — Warmth beneath simplicity. Hand-drawn worlds that adults take as seriously as children. The precedent for illustrated content that bypasses cynicism. Auwa's illustration integration follows this path.
- **Aman Resorts** — "Less is more" luxury. No logos on the building. The brand exists in the experience, not the signage. Auwa should feel like this: the brand recedes, the experience comes forward.
- **Monocle** — Tyler Brûlé's editorial worldview extended into products, retail, and radio. One coherent taste level across every touchpoint. Serif masthead, clean layouts. Proves that editorial authority translates into commerce.
- **Mubi** — Film streaming platform with a dark, cinematic UI. Serif display type over moody imagery. Proves that dark interfaces with serif typography can feel premium and inviting for a digital product.

**What Auwa is not:** Headspace-style illustration pop. Wellness-brand pastels. Busy Japanese maximalism. Tech-startup energy. Anything with a gradient that screams "app."

### How to describe Auwa (the three-layer messaging strategy)

Three descriptors, each with a different job. They don't compete — they live at different depths and are used in different contexts. Established April 2026 after testing phrases on new audiences.

| Layer | Phrase | Where it's used | Why |
|-------|--------|-----------------|-----|
| **Discovery** | **Japanese lifestyle brand** | Meta descriptions, About page prose, Instagram bio, press briefings, pitch decks, the dinner-party answer | Instantly legible to a new visitor. Places Auwa next to Kinfolk, Monocle, Goop in their mental shelf. Maps directly to high-volume search terms. |
| **Claim** | **Japanese Philosophy of Kokoro** | Homepage title tag, homepage H1, top-level brand claim, taglines | Auwa's unique ground. "Kokoro" is a low-competition word the brand essentially owns; "Japanese Philosophy" is the bigger bucket we compete in. This is the phrase that differentiates us from every other lifestyle brand. |
| **Voice** | **Japanese living** | Editorial prose in the journal, About page narrative, newsletter subject lines and body copy, Instagram captions, anything written in the brand's own voice | Aspirational, not category-descriptive. How Auwa talks to its own audience — not what it IS, but how you might live. |

Rules:
- **Never lead with "lifestyle brand" inside Auwa's own editorial voice** — that's marketing-speak. Use it when speaking *about* Auwa to outsiders.
- **Never lead with "Kokoro" in first-impression discovery copy** — it raises a question ("what's Kokoro?") before it answers one. Use it after you've earned the reader's attention.
- **"Japanese living" is a tone, not a category** — it's how the prose feels, not how the brand sells itself.

Writers moving between contexts (press → web → newsletter → journal → Instagram) should pick the layer matching the reader: outsider = Discovery, searcher = Claim, existing audience = Voice.

---

## 2. Logo

### The Wordmark

The Auwa logo is the wordmark itself — the letters A-U-W-A set in EB Garamond with wide tracking. No separate symbol, no icon, no monogram. The word is the logo.

The wordmark works because:
- The natural symmetry of A-U-W-A mirrors itself (the two A's as bookends, U-W as the centre)
- This symmetry echoes the etymology: あ (heavens) and わ (earth) framing う (connection)
- Serif letterforms carry signals of craft, history, and intention — the right signals for a Japanese philosophy brand
- It scales cleanly from social profile to website header to printed materials

**Wordmark specifications:**
- **Typeface:** EB Garamond (currently rendered as SVG on the website)
- **Case:** All uppercase
- **Letter-spacing:** 0.25em
- **Colour:** sumi (`oklch(0.10 0.022 235)`) on light backgrounds; washi (`oklch(0.928 0.020 80)`) on Yoru-dark backgrounds. Sumi was renamed from `void` (April 2026) and softened to share hue 235 with Yoru, so the dark text and the dark surface read as one tonal family.
- **Size:** 20px height on mobile, 22px on desktop (website header)

**Minimum clear space:** The height of the letter "U" on all sides.

**Usage:**
- The wordmark appears in the header across all sections of auwa.life
- Always set in EB Garamond, never redrawn or substituted
- Never placed over busy imagery — always over solid dark or solid light backgrounds
- Never distorted, outlined, shadowed, or animated (the orb animates; the wordmark is still)

### Social Profile Image

The wordmark at social icon scale (110x110px display). Two options to test:

**Option A:** The full "Auwa" wordmark centred in a dark circle (void background). Works if the tracking is tight enough to read at small sizes.

**Option B:** A single "A" in Cormorant Light, centred in a dark circle. Cleaner at icon scale, still recognisably the brand.

Test both at actual Instagram/LinkedIn display sizes before deciding. The character is never the profile image — it lives inside the experience, not on the business layer.

### What About a Custom Logo Later?

If the brand grows to the point where a bespoke mark would add value (physical packaging, figure authentication stamps, embossed on store products), explore a custom-drawn version of the wordmark — refined letterforms with subtle ligatures or a harmonised U-W connection. This is a Year 2 investment, not a launch requirement. The Cormorant wordmark is strong enough to launch with.

---

## 3. Typography

### The Decision: EB Garamond (Locked)

**EB Garamond** was chosen as Auwa's primary serif after testing against Cormorant, Playfair Display, and DM Serif Display. It carries real historical weight (based on Claude Garamond's original 16th-century designs), reads beautifully at both display and body sizes, and has the scholarly, deep character that suits a philosophy-forward brand. More readable than Cormorant at body sizes, more refined than Playfair at display sizes.

Available via Google Fonts, loaded through `next/font` with `display: swap`. Weights: 400, 500, 600, 700. Styles: normal, italic.

**Future consideration:** If the brand reaches the point where a premium foundry font adds value (physical print, packaging), Canela (Commercial Type) or Tiempos (Klim) would be the natural upgrades — they're the typefaces Auwa's reference brands actually use. Year 2 investment at earliest.

### Primary Serif: EB Garamond (Display + Editorial)

The voice of Auwa. Used for all brand-level, emotional, and editorial text. Registered as `--font-display` / `font-display` in Tailwind.

- **Regular/400:** Headlines, subheadlines, brand copy, article body, about page prose, pullquotes — the default weight for everything
- **Medium/500:** Occasional emphasis (sparingly)
- **SemiBold/600:** Available but rarely used
- **Bold/700:** Available for special emphasis; not currently used on the website
- **Italic:** Available for editorial emphasis and book cover text

### Secondary: Instrument Sans (Functional Sans-Serif)

The working typeface. Used for all UI and functional elements. This stays regardless of serif choice.

- **Regular (400):** Body text, navigation, form labels, metadata, captions
- **Medium (500):** Buttons, small caps navigation (as in teaser header)
- **SemiBold (600):** Strong emphasis where needed (sparingly)

Clean, modern, slightly warm. Doesn't compete with the serif — it disappears into the background, letting the serif do the emotional work.

### Japanese: Noto Sans JP

For Japanese text (micro-season names, kanji, Rieko's Japanese copy). Light (300) and Regular (400) weights only. Consider also testing **Noto Serif JP** for editorial Japanese text (paired with whichever Latin serif you choose).

### Type Hierarchy (Implemented — auwa.life)

The website uses a clean sizing system: 12px for all small uppercase (eyebrows, metadata, filter buttons, hero cues, share-row, footer copyright, bordered CTAs), 14px for navigation and form CTAs, 18-19px for article body, and responsive clamp() for display sizes.

| Element | Typeface | Weight | Size | Tracking |
|---------|----------|--------|------|----------|
| Wordmark / Logo | EB Garamond (SVG) | — | 20px mobile / 22px desktop | — |
| Page title (h1) — Journal, About, teasers | EB Garamond | 400 | clamp(2.25rem, 5vw, 3.75rem) | 0.01em |
| Article hero title (h1) — journal/[slug] | EB Garamond | 400 | clamp(2.5rem, 5.5vw, 4.5rem) | 0.01em |
| Section heading (h2) | EB Garamond | 400 | 28px / 32px | 0.01em |
| Card title | EB Garamond | 400 | 20px / 22px | 0.01em |
| Article body | EB Garamond | 400 | 18px / 19px | 0.005em |
| Pullquote (in-article) | EB Garamond (upright, never italic) | 400 | clamp(1.75rem, 3.5vw, 2.75rem) | 0.005em |
| Pullquote (hero-scale) | EB Garamond | 400 | clamp(2rem, 5.5vw, 4.5rem) | 0.005em |
| Page subtitle | EB Garamond | 400 | clamp(1.1rem, 2vw, 1.4rem) | — |
| About page prose | EB Garamond | 400 | 18px / 20px | — |
| Navigation (menu link, 14px CAPS) | Instrument Sans | 400 | 14px | 0.12em (uppercase scale) |
| UI text / excerpts | Instrument Sans | 400 | 14px | — |
| Form button (CTA, 14px CAPS) | Instrument Sans | 500 | 14px | 0.12em (uppercase scale) |
| Uppercase eyebrow / metadata / filter / hero cue / footer copyright / bordered CTA (12px CAPS) | Instrument Sans | 400 | 12px | 0.16em (uppercase scale) |
| Smallest CAPS (11px, e.g. mobile FigureHook) | Instrument Sans | 400 | 11px | 0.18em (uppercase scale) |
| Kanji (micro-season) | Noto Serif JP | 400 | clamp(3rem, 8vw, 6.5rem) | 0.06em |
| Image captions | Instrument Sans | 400 | 13px | — |

**Uppercase tracking scale (locked).** Smaller uppercase text gets MORE letter-spacing; larger uppercase text gets LESS. Optical principle: small caps need extra breathing room to read; large caps tighten naturally. The scale below is the locked set — no bespoke values:

| Text size | Tracking | Typical uses |
|-----------|----------|--------------|
| 11px | `0.18em` | Smallest CAPS — mobile breakpoint of the FigureHook strip |
| 12px | `0.16em` | Eyebrows, metadata labels, card categories, filter buttons, hero "Scroll" / "Explore" cues, breadcrumbs, share-row labels, footer copyright, image-overlay CTAs, bordered CtaLink buttons |
| 14px | `0.12em` | Navigation links, form CTAs, INSTAGRAM handle |
| 16-19px | `0.10em` | (rare) larger interactive caps |
| 24px+ | `0.04em` | (display caps) |

This replaces an earlier "single 0.14em across everything" attempt that made the smaller text feel pinched and the larger text feel airy. The scale was applied across 20 files in May 2026; the only exceptions are display headings (h1/h2/h3 in mixed-case EB Garamond) which keep `tracking-[0.005em]` / `0.01em` and don't follow the uppercase scale.

---

## 4. Colour System

### The Principle

Auwa lives in darkness. Light comes from within — from the Kokoro being revealed. The brand's default state is dark and quiet. Colour enters through gradients, glows, and the Yamato emotional states. This mirrors the app experience: you arrive in darkness, and Auwa's light shower reveals your Kokoro in colour.

### Foundation Palette (Established in Teaser)

```
Void (background):        oklch(0.08  0.025  250)
Cosmic 900:               oklch(0.13  0.030  250)
Cosmic 800:               oklch(0.18  0.028  250)
Cosmic 700:               oklch(0.25  0.025  250)
Cosmic 600:               oklch(0.35  0.022  250)
Cosmic 500:               oklch(0.45  0.020  250)  — secondary text
Cosmic 400:               oklch(0.60  0.018  250)  — subtle text
Cosmic 300:               oklch(0.75  0.015  250)
Cosmic 200:               oklch(0.87  0.012  250)  — primary text
Cosmic 100:               oklch(0.93  0.008  250)
Cosmic 50:                oklch(0.97  0.005  250)  — bright text
Glow:                     oklch(0.85  0.15   105)  — orb, accents
Glow Dim:                 oklch(0.70  0.10   105)  — hover states
```

These are cool-toned, deep, slightly purple-blue darks. Not pure black — there's always a hint of cosmic depth.

### Named Brand Colours

Three colours carry Japanese names because they appear together as the brand's signature warm-paper family, anchoring every light surface across the website, social slides, and the editorial moments where the brand needs to feel like an old book in lamplight rather than a digital UI.

| Name | Hex / OKLCH | Use |
|------|-------------|-----|
| **Yoru** (夜, "night") | `#1F2A2E` (rendered as `#0f1623` in `--color-yoru` to match the world hero illustration's dark) | Background. Slightly warmer and more atmospheric than pure void. The base layer for the footer, dark pages (`<DarkPageTheme />`), the FigureHook strip, and the editorial IG slides — any quiet, contemplative dark canvas. |
| **Washi** (和紙, traditional Japanese paper) | `#EFE9DD` / `oklch(0.928 0.020 80)` | Light text, icon, border, and wordmark on **Yoru / Sumi** — uniform dark surfaces. Footer, FigureHook strip, SoundToggle button, dark book page, signup-form `theme="dark"`, cursor disc, dark CTA accents. The "warm paper ink" that gives dark contexts their old-book character. |
| **Surface** (warm off-white) | `#f8f7f4` / `oklch(0.97 0.004 95)` | Two roles. (1) The page bg on every light page (`<main>`, journal, about, teasers), the entrance loader, hero pre-paint flash, email body bg, PWA `theme_color`. (2) Light foreground over **imagery / photography** — header logo + menu icon while transparent (over hero video), pillar card overlays, two-up CTAs, hero "Scroll" label + line, four-pillar module index counter, book-hero card text. Surface has more luminance (L 0.97 vs Washi 0.928) and lower chroma, so it cuts confidently against the variable mid-tones of a photograph where Washi blends with bright spots. |
| **Paper** (raised warm off-white) | `#ecebe7` / `oklch(0.94 0.005 95)` | A layered surface that needs to read as a distinct plane sitting *above* Surface. Currently the menu overlay panel — when it slides in over a Surface page bg, the ~3% lower luminance is enough to register as "this is a separate layer" without introducing a different hue. Same warm hue 95 family as Surface so it doesn't clash. Don't use as the page bg or as a foreground colour; it's specifically for raised panels. |

The discipline — locked rule for foreground colour:

| Context | Light foreground | Dark foreground |
|---------|------------------|-----------------|
| On Surface (the light page bg) | — | **Sumi** |
| On Yoru / on Sumi (uniform dark surface) | **Washi** | — |
| On imagery / photography (variable mid-tones) | **Surface** | **Sumi** (where the image is high-key) |

And the "never" list: **never mix Sumi with Washi** (different families), **never use pure `#ffffff`** anywhere on the site (Surface is the white), **never hardcode `#f8f7f4` or `#EFE9DD` directly** (consume the token), and **never use Washi over photography** (the cream blends into bright spots — Surface is the foreground over imagery). Tweak any of Surface, Sumi, Yoru, or Washi in `globals.css` and every page, component, and email follows.

### Yamato Emotional State Colours (5 Gradient Families)

```
Hare (晴/Radiant):     oklch(0.82  0.14  85)   — warm gold/amber
Takaburi (昂/Intense):  oklch(0.60  0.18  25)   — deep crimson/rust
Aware (哀/Reflective):  oklch(0.70  0.06  250)  — cool blue/indigo
Yuragi (揺/Unsettled):  oklch(0.65  0.12  55)   — amber/ochre
Nagomi (和/Serene):      oklch(0.75  0.10  160)  — soft sage/green
```

These are the starting points for the 5 gradient families used in the app's Kokoro revelation screens and across social content. Each emotional state has a 3-4 stop gradient to be developed in Figma:

- **Hare (Radiant):** Gold → amber → soft peach (warm, expanding, light)
- **Takaburi (Intense):** Crimson → burnt orange → dark rust (intense, rising, hot)
- **Aware (Reflective):** Indigo → steel blue → soft grey-blue (cool, receding, still)
- **Yuragi (Unsettled):** Amber → ochre → muted bronze (shifting, restless, warm-cool tension)
- **Nagomi (Serene):** Sage → warm olive → soft earth (grounded, open, calm)

### Light Theme (Website — auwa.life)

The auwa.life website uses a light-mode, Kinfolk-inspired editorial aesthetic on the warm-paper Surface (`oklch(0.97 0.004 95)`, ≈ `#f8f7f4`). Dark surfaces use the Yoru/Washi pair (footer, dark pages); dark text on light surfaces uses Sumi.

- **Page background:** Surface — `oklch(0.97 0.004 95)` / `--color-surface` (≈ `#f8f7f4`). Pure `#ffffff` is no longer used anywhere on the site.
- **Raised surfaces:** `oklch(0.95 0.005 250)` / `--color-surface-raised` — placeholder images, card backgrounds.
- **Primary text:** Sumi (`oklch(0.10 0.022 235)`) at the documented opacity tiers — see table below.
- **Borders/dividers:** Sumi at 10% (default divider) or 20% (form underlines, focus emphasis). 8% was used pre-Surface change; on the warm Surface, 8% reads invisible — 10% is the floor.
- **Wordmark + menu icon:** Sumi on Surface, Washi on Yoru. Never `#ffffff`.
- **Interactive hover:** Sumi at 70% (text darkens or lightens on hover, depending on the rest state).

**Sumi opacity tiers (locked — propagate by editing `--color-sumi`):**

| Tier | Use |
|------|-----|
| 100% | Headings, titles, active nav, wordmark, menu icon |
| 80% | Body prose (about page, longform paragraphs), footer category links |
| 70% | Nav links, hover transitions, founder bios |
| 60% | Page subtitles, article subtitles |
| 55% | Form button hover states |
| 50% | Excerpts, captions, "Read the latest" arrow link is at 45% (one tier softer for the editorial linkstop) |
| 45% | Eyebrow labels, metadata labels (uppercase 12px), filter buttons (inactive), social share icons. Bumped from 40% when Surface moved off pure white — 40% reads softer against the warm field. |
| 40% | Input placeholder text. Bumped from 35% for the same reason. |
| 20% | Form underlines |
| 10% | Default divider line. Bumped from 8% — 8% reads invisible on Surface. |

Washi tiers on Yoru mirror these one-to-one: Washi at 100/80/70/60/45/40/10 produces the equivalent reading on dark surfaces. SignupForm `theme="dark"` applies Washi at the same tiers automatically.

### Dark Theme — Website (Yoru + Washi)

Used for the Footer, FigureHook strip, and any page that opts in via `<DarkPageTheme />` (e.g. /book). Yoru is the named warm dark surface; Washi is the named warm-paper light text on it.

- **Surface:** `var(--color-yoru)` — `oklch(0.265 0.022 235)`
- **Text + wordmark + icons:** `var(--color-washi)` at the documented opacity tiers (mirroring sumi's tiers on light)
- **Form borders:** washi at 20% opacity, 50% on focus
- **Newsletter "Quiet letters" footer block:** Yoru bg + washi text, including the `Subscribe` button. SignupForm's `theme="dark"` produces this automatically.

### Dark Theme — App / Social (Cosmic palette)

Reserved for the Kokoro Mirror app and the IG editorial slides — the cosmic context where deep-space gradients emerge from black.

- **Background:** void / cosmic-900 (`oklch(0.08 0.025 250)`)
- **Primary text:** white
- **Wordmark:** white (inverted)
- **Form borders:** white at 20% opacity, 50% on focus

The cosmic palette stays separate because its job is different: app gradients need to emerge from a true near-black, and social slides need pure white text to punch on Instagram's preview layer. Don't blend the two systems on the website.

---

## 5. The Orb

The glowing orb is Auwa's presence before the character appears. It pulses gently, breathes, and transforms during the light shower. On the teaser page it sits at the centre of the screen as the primary visual element.

**Usage:**
- Teaser pages: hero element
- App: the input screen's visual anchor, transforms into the light shower
- Website backgrounds: very subtle, atmospheric (never dominant outside the app)
- Social: sparingly — the orb belongs to the digital experience, not print/static contexts

**Never:** place the orb next to the wordmark as a combined logo. They serve different purposes.

---

## 6. Photography Direction

Tom's Japan photography catalogue (17M+ Unsplash views) is the primary photography asset. The style that works for Auwa:

### What to use
- **Atmospheric landscapes:** Temples at dawn, misty mountains, bamboo groves, seasonal transitions. The images that got 8M+ views on Unsplash are exactly the right tone.
- **Quiet moments:** A path through trees, rain on stone, light through paper screens, a single flower. Ma (間) — space and silence.
- **Craftsmanship (for store):** Hands at work, close-ups of texture, the process of making. From the Monolise research trip photography.
- **Seasonal rhythm:** Cherry blossom, autumn maple, snow on stone, summer light. Content that refreshes with the 72 micro-seasons.

### What to avoid
- Tourist-perspective shots (crowds, selfies, busy intersections)
- Overly saturated or HDR-processed images
- Food photography unless atmospheric (a bowl of matcha in morning light, yes; a plate of sushi with garnish detail, no)
- Anything that feels like a stock photo or travel blog

### Style references

The Auwa photographic register lives in the **Kinto + Analogue Life** family, with the warmth of Hoshinoya and the cinematic restraint of Mubi as supporting reference points. Established April 2026 after testing Kinfolk (cleanest editorial), Hoshinoya/Aman (warm premium), and Casa Brutus / Rinko Kawauchi (luminous poetic Japanese contemporary) directions side by side.

The landing point: warm but not orange, restrained but not muted, materially tactile but not over-clarified. Magazine spread for daylight, craftsman's table for interiors, considered cinema for night. The treatment philosophy is "pull back until you almost want to add it back, then stop."

**Primary references:**
- **@kintojapan** (and kinto.co.jp) — bright window light, soft natural daylight, clean surfaces. The daylight register.
- **@analogue.life** — slightly deeper shadows, wood-grain warmth, considered hand on dark wood. The interior / craft register.

**Supporting references:**
- **Hoshinoya** (hoshinoya.com) — warm Japanese hospitality, atmospheric, slow. Useful for understanding "premium Japanese" tonality on indoor scenes.
- **Mubi** (mubi.com) and **Cereal** (readcereal.com) — cinematic restraint as editorial discipline. Useful for night work and strong narrative shots.
- **Rinko Kawauchi** (@rinkokawauchi) — luminous, poetic everyday. Useful as an aspirational ceiling for natural-light captures.
- **Hoshinoya site imagery** + **Naoya Hatakeyama** unpeopled landscapes — the unpeopled atmospheric register.

**Anti-references (do not emulate):**
- **Yassan.1985** and similar Kyoto street photographers leaning on maiko/geiko subjects — risks Orientalism, conflicts with Auwa's "philosophy-forward, not exoticising Japan" line, and parts of Gion have publicly asked tourists to stop photographing maiko.
- Tom's previous Unsplash-style processing (high clarity, pushed saturation, teal/orange split, dramatic skies) — the punch reads as travel photography, not editorial restraint. Strong composition and moment work transfers; the processing layer needs replacing.

**The benchmark.** The three teaser images at `website/main/public/pillars/` (`app.jpg`, `store.jpg`, `book.jpg`) are the brand's photography north stars. They sit in the Kinto + Analogue Life family. Every processed image should feel like a fourth pillar shot.

### Treatment

All Auwa photography is processed through one of three Lightroom presets stored in the `Auwa` group: **Auwa Landscape**, **Auwa Interior**, **Auwa Night**. Every processed image should feel like it could sit alongside one of those three in the same campaign.

**Tonal philosophy (shared across all three presets):**

- Warm white balance, never orange. Wood as the dominant temperature anchor.
- Lifted shadows, protected highlights, slight matte lift on the deepest blacks (gives the editorial film signature).
- Saturation pulled back globally. Oranges and warm woods protected. Greens and aquas muted.
- Visible material texture preserved (wood grain, fabric weave, ceramic, plaster, snow, peeling paint).
- No clarity push on interior or night work (kills skin tone and softens fabric).
- No grain except Night (where subtle grain blends high-ISO sensor noise into the aesthetic).
- Subtle vignette, never dramatic.

**Auwa Landscape** for exterior architecture, shrines, cedar forests, snow scenes, Japan landscapes. Reference plate: `store.jpg`.

| Panel | Setting | Value |
|-------|---------|-------|
| WB | Temp shift | +400 to +800 (RAW) or +8 to +15 (JPG units) |
| WB | Tint | +5 to +8 |
| Tone | Contrast | -10 |
| Tone | Highlights | -30 |
| Tone | Shadows | +20 |
| Tone | Whites | +15 |
| Tone | Blacks | -5 |
| Presence | Texture | +8 |
| Presence | Clarity | +5 |
| Presence | Dehaze | +5 |
| Presence | Vibrance | -5 |
| Presence | Saturation | -10 |
| HSL Hue | Red | +5 |
| HSL Sat | Red, Green, Aqua | -10, -15, -10 |
| HSL Lum | Red, Green | -5, -10 |
| Tone Curve | Bottom-left point | Output 5-8 (matte lift) |
| Vignette | Amount, Feather, Style | -8, 80, Highlight Priority |
| Grain | — | none |

**Auwa Interior** for interiors, craftsmen at work, ceramic and washi close-ups, portraits in Japanese spaces. Reference plate: `app.jpg`.

| Panel | Setting | Value |
|-------|---------|-------|
| WB | Temp shift | +400 to +800 (warmer than Landscape) |
| WB | Tint | +8 to +10 |
| Tone | Contrast | -5 |
| Tone | Highlights | -25 |
| Tone | Shadows | +15 |
| Tone | Whites | +10 |
| Tone | Blacks | -8 |
| Presence | Texture | +3 |
| Presence | Clarity | 0 (critical: no clarity push) |
| Presence | Dehaze | 0 |
| Presence | Vibrance | -3 |
| Presence | Saturation | -8 |
| HSL Hue | Red | +3 |
| HSL Sat | Red, Green, Aqua | -5, -10, -8 |
| HSL Lum | Red, Green | 0, -8 (skin and lacquer stay luminous) |
| Tone Curve | Bottom-left point | Output 5-8 |
| Vignette | Amount, Feather, Style | -5, 80, Highlight Priority |
| Grain | — | none |

**Auwa Night** for fire festivals, lantern processions, low-light interiors, night cityscapes. Reference plate: `store.jpg` (philosophical anchor, not literal tonal match).

| Panel | Setting | Value |
|-------|---------|-------|
| WB | Temp shift | +200 to +400 (gentle; sometimes 100 cooler if fire is already pushing orange) |
| WB | Tint | +3 to +5 |
| Tone | Contrast | -5 |
| Tone | Highlights | -30 (protect the brightest fire core) |
| Tone | Shadows | +15 (lift firelit faces and structure, leave the night sky alone) |
| Tone | Whites | -10 |
| Tone | Blacks | -30 (anchor true black; the night needs to read as night) |
| Presence | Texture | 0 |
| Presence | Clarity | 0 |
| Presence | Dehaze | 0 |
| Presence | Vibrance | -5 |
| Presence | Saturation | -5 (gentler than Landscape; the orange flame still gets calmed via HSL below) |
| HSL Hue | Orange, Red | -5, +3 |
| HSL Sat | Orange, Red, Yellow | -15, -10, -10 |
| HSL Lum | Orange, Red, Yellow | -8, -5, -5 |
| Tone Curve | Bottom-left point | **No matte lift on Night.** Pure black stays at output 0. (Matte lift is right for daytime where there's no actual pure black; night skies ARE pure black, and lifting them creates grey wash plus amplifies JPEG noise as visible artefacts.) |
| Vignette | Amount, Feather, Style | -10, 80, Highlight Priority |
| Grain | Amount, Size, Roughness | 8, 25, 50 (the only preset that uses grain) |

Exposure is deliberately excluded from every preset, since starting exposure varies per image. Always nudge it after the preset is applied.

### Per-article workflow

1. Drop raw images into `auwa/photography/{slug}/1-original/`.
2. Open Lightroom Classic (catalog at `auwa/photography/_lightroom/1-catalog/auwa.lrcat`). Import that folder via `File > Import > Add` (no copy or move).
3. For each image: select it, click the matching preset (Landscape / Interior / Night) under `Presets > Auwa` in the left panel.
4. Per-image nudges only if needed: Exposure (always image-specific), small WB shift, occasional Highlights or Shadows tweak. Don't redo the look.
5. Optional crop or straighten per image.
6. Export from Lightroom (`File > Export`) using the saved export preset:
   - **Auwa Article Export**: full-quality JPG (no resize), sRGB, quality 90, target `auwa/photography/{slug}/2-edited/`. The article command picks up from here.
7. Run `/journal:article`. It reads from `2-edited/`, generates the 1800px web versions to `website/main/public/journal/{slug}/`, the 1080×1350 IG versions to `social/instagram/3-journal/{slug}/`, and the 1200×630 OG image alongside the web hero.

Set the export target up once as a Lightroom Export Preset (`Export > Add` in the export dialog). After that, exporting a whole article's set is one click.

The Lightroom presets are stored in the `Auwa` group. The `.xmp` files live at `~/Library/Application Support/Adobe/CameraRaw/Settings/Auwa Landscape.xmp` (and Interior, Night). They are also version-controlled at `context/brand/photography/` so they can be re-imported on any new machine via `File > Import Develop Profiles and Presets`.

The Lightroom catalog itself, plus the development reference photos and pillar plates, lives outside git at `auwa/photography/_lightroom/`. That folder is gitignored. The presets travel via the `.xmp` files in `context/brand/photography/`, which are tracked.

---

## 7. Illustration Integration

Rieko's illustrations are Auwa's most valuable asset. They need to coexist with photography and typography without the brand feeling like it has two visual languages fighting each other.

### The Bridge

The bridge between photography and illustration is **colour and atmosphere.** Both should feel like they exist in the same world:
- Photography: muted, warm, slightly dreamy (grain, vignette, desaturation)
- Illustration: warm, textured, slightly muted (not full-saturation children's book colour)
- Both sit on the same dark backgrounds with the same cosmic colour system

### Social Content Integration

When illustration and photography appear in the same feed, the unifying elements are:
- **Consistent dark background** (void or cosmic-900) framing every post
- **Consistent typography** (Cormorant for all quote/text overlays, same sizing and tracking)
- **Consistent colour temperature** (warm, never cold or clinical)
- **Consistent border/framing** (if using borders — same weight, same colour, same radius across all post types)

### Post Types by Content

| Content Type | Visual Source | Frame/Treatment |
|-------------|-------------|-----------------|
| Kokoro Reveal | Illustration + type | Dark bg, character centred, Cormorant quote below/overlay, emotion gradient accent |
| Japanese Wisdom | Typography-led | Dark bg, Cormorant display text, subtle illustration or gradient accent element |
| Behind the Kokoro | Photography (process) | Dark bg frame, photo muted/warm, Instrument Sans caption |
| Seasonal Living | Photography (Japan) | Dark bg frame, photo muted/warm, optional Cormorant text overlay |
The constant across all four pillars: **dark frame, warm content, Cormorant voice, space.**

---

## 8. Social Content Templates

### The Grid Principle

The Instagram grid should feel like opening a book of quiet, beautiful pages — not a mosaic of competing styles. When someone visits @auwalife and sees the 3x3 grid, every thumbnail should feel like it belongs in the same room.

This means:
- **Consistent aspect ratio:** 4:5 (1080x1350) for all feed posts (maximum screen real estate, consistent grid)
- **Consistent outer frame:** Every post sits on the void background with generous padding (minimum 60px equivalent on each side). The dark frame is the unifying element.
- **Consistent text placement:** All typography aligns to the same invisible grid within the frame
- **Colour restraint:** No more than one accent colour per post (from the emotion palette or glow)

### Template 1: Quote Card (Kokoro Reveal / Japanese Wisdom)
- 1080 x 1350px, void background
- Cormorant Light centred text (28-36px for headline, 16-18px for attribution)
- Optional: subtle gradient wash behind text (one emotion colour at 10-15% opacity)
- Optional: small Auwa character illustration at bottom (thumbnail scale, atmospheric)
- Wordmark "Auwa" bottom-centre, small, cosmic-500

### Template 2: Photography (Seasonal Living / Behind the Kokoro)
- 1080 x 1350px, void background with photo inset (leaving ~40-60px dark border on all sides)
- Photo treated: warm, desaturated, grain
- Optional: Cormorant text overlay (short, positioned lower third)
- Wordmark "Auwa" bottom-centre, small

### Template 3: Illustration (Kokoro Reveal / Behind the Kokoro)
- 1080 x 1350px, void background
- Illustration centred or offset, breathing room around it
- Cormorant text if paired with a reflection or quote
- Wordmark "Auwa" bottom-centre, small

### Template 4: Carousel Slide (Japanese Wisdom)
- 1080 x 1350px, void background
- Slide 1: Cormorant headline (the hook)
- Slides 2-6: Instrument Sans body text with generous spacing, one idea per slide
- Final slide: call-to-action or wordmark
- Consistent padding, font sizes, and colour across all slides

### Template 5: Editorial Slideshow (Journal Digest)

The format used to digest a published journal article into a 4-slide carousel. Built in Figma using the Auwa slideshow template, exported as four PNGs at 1080x1350. Post text is generated by `/instagram:post` (slideshow branch).

**Structure:**
1. **Hero image** — full-bleed, no text overlay
2. **Anchor quote on coloured wash** — large EB Garamond, centred. Open-quote glyph at 30% opacity sits above the quote (matches the kokoro watermark logic on the home page intro). "Auwa Journal / auwa.life/journal" attribution small below the quote. Auwa wordmark bottom-centre.
3. **Rest-beat image** — full-bleed, no text overlay. The slideshow's visual breath.
4. **Close** — same wash as slide 2. EB Garamond headline ("Continue reading on the Auwa Journal."), article title in italic EB Garamond beneath, URL in small sans-serif. Auwa wordmark bottom-centre.

**Slideshow washes (locked palette).** Pick one per slideshow. The wash should harmonise with the photography's tonal range, not just the article's topic. A five-second test before export: lay slide 1, slide 2 wash, slide 3, slide 4 wash side by side. The rhythm should feel inevitable, not deliberate.

| Name | Hex | Text | When to use |
|---|---|---|---|
| **Stone** | `#8E9EAE` | White | Philosophy, reflection, evening atmospheres, contemplative pieces. The Beginning, Yaoyorozu no Kami, the Onsen Lesson. |
| **Kraft** | `#BFAE9C` | White | Craft, warmth, woodgrain, indoor scenes. Shigefusa, Washi, Oroku-gushi. |
| **Moss** | `#9AA391` | White | Nature, forest, growth, mountain pieces. Yakushima, Koya-san cedars. |
| **Ink** | `#2C2E33` | White | Gravity, fire, night, dense subjects. Nozawa Fire Festival, dusk, low-key photography. Match to dark imagery only — pairs poorly with high-key snow. |
| **Washi** | `#EFE9DD` | Dark `#1a1a1a` | Snow, washi paper, mist, fog, anything high-key. Narai-juku in snow, washi-making, winter pieces. The light counterweight. |

**Typography across all slideshow washes:**
- Quote (slide 2): EB Garamond, regular, large (~38-44px equivalent), centred, generous leading
- Quote glyph: serif open-quote, 30% opacity, sits above the first line
- Attribution under quote: Instrument Sans, small caps, ~11px equivalent
- Close headline (slide 4): EB Garamond, regular, large (~38-44px), centred
- Article title (slide 4): EB Garamond italic, ~14-16px, beneath the headline
- URL (slide 4): Instrument Sans, ~11px
- Wordmark (slides 2 and 4): Auwa in EB Garamond, letter-spaced, bottom-centre

### Reel Cover Image
- 1080 x 1920px (9:16), but design the central 1080 x 1350px area for feed grid crop
- Cormorant text centred in the safe zone
- Void background or atmospheric photography (muted)

### Story Template
- 1080 x 1920px
- Void background
- Cormorant text for quotes/reflections
- Instrument Sans for interactive elements (polls, questions)
- Auwa wordmark top-left (small, consistent placement)

---

## 9. Motion & Animation

### Principles
- **Slow and deliberate.** Auwa doesn't rush. Animations use ease-out-expo (cubic-bezier 0.16, 1, 0.3, 1) — fast departure, gentle arrival. Like a breath out.
- **Fade, don't slide.** Elements appear by fading in and gently scaling, not sliding in from edges. The app already uses this approach (Framer Motion fade-in components).
- **The light shower is the hero animation.** All other motion is supporting — subtle, ambient, never competing.
- **One tempo, not five.** Every duration, stagger, and easing on the website comes from a locked token set. One source of truth; tweaks propagate everywhere. See `context/website/website.md` Section 4 for the full table.

### Website motion tokens (summary)

The website enforces four durations, three staggers, and two easings. Components import from `src/lib/motion.ts` (JS) and `globals.css` (CSS variables). Full spec in `context/website/website.md`; at a glance:

- **Durations:** `enter` 800ms · `reveal` 1200ms · `hover` 300ms · `page` 500ms
- **Staggers:** `strip` 60ms · `grid` 120ms · `hero` 180ms
- **Easings:** `outExpo` (brand default) · `inOut` (ambient crossfades) · `textRoll` (hover rollovers)

Hardcoded ms values in components are treated as drift. Any new animation requirement either reuses an existing token or promotes a new one into the table first.

### For Social (Reels / Runway)
- Slow, atmospheric. Think 0.5-1 second transitions between elements.
- Rieko's illustrations can have subtle parallax (foreground/background layers moving at different speeds) or gentle breathing motion (Runway's motion tools)
- Text reveals: fade in word by word or line by line, Cormorant, centred, against void
- Never: fast cuts, beat-synced transitions, zoom-punch effects, or anything that feels like a TikTok trend

### Audio
- Ambient, atmospheric, warm. Suno-generated tones that feel like the inside of a temple.
- No beats, no vocals, no commercial music
- The existing ambient.mp3 on the teaser page sets the reference tone

---

## 10. Across the Four Sections

All sections live under a single domain: **auwa.life** with subpaths. auwalife.com mirrors to auwa.life for the Japan market. Social handles: @auwalife across most platforms, @auwa.life on TikTok and Bluesky, @auwa on LinkedIn. See `context/marketing/social.md` for the full map.

### /app (Kokoro Mirror)
Dark-first. Minimal chrome during the experience. Cormorant for Auwa's voice, Instrument Sans for UI. The revelation screen is the hero — everything else supports getting there and reflecting afterward.

### /store (Craftsman Marketplace)
Slightly lighter touch — product pages may use light backgrounds for product photography clarity, but the overall framing and navigation stays dark. Cormorant for editorial (craftsman stories, product descriptions), Instrument Sans for functional (pricing, specs, cart). Products shot on white backgrounds (AI-standardised) sit within the dark Auwa frame. Note: Shopify integration may require headless Storefront API or subdomain proxy (store.auwa.life) to maintain the /store subpath — technical decision to make during build.

### /journal (Editorial)
Dark-first. Editorial feel — more text, more space, more story. Photography-led. Cormorant-heavy for headlines, Instrument Sans for body. Long-form articles, craftsman profiles, travel essays. This is where the brand breathes most fully and where SEO value accumulates.

### /book (Illustrated Stories)
Dark-first. The illustrated stories and the Auwa universe origin. Cormorant-heavy. Illustration and animation-forward. The most immersive, atmospheric section.

### Shared Elements
- Same header: wordmark left, navigation right (links adapt per section)
- Same footer: minimal, wordmark, copyright, email
- Same font stack: Cormorant + Instrument Sans + Noto Sans JP
- Same colour system: void/cosmic palette + Yamato emotional states
- Same animation easing: ease-out-expo
- Single Next.js codebase serving all sections

The four sections should feel like four rooms in the same building, not four separate buildings.

---

## 11. Brand Book — Living System

### The Approach

The brand lives in three places, all staying in sync:

1. **This document** (`context/brand/brand.md`) — The written rules. Every Claude Code session reads this and applies it. Source of truth for *decisions*.

2. **The website brand page** (`auwa.life/brand`) — A living visual style guide built as a Next.js page within the website itself. It reads from the same CSS custom properties (`globals.css`) as the production site, so it's always up to date. Shows logo, colour palette, typography specimens, type scale table, spacing system, component examples, motion values, and design principles. Shareable by URL. No separate PDF needed — send the link.

3. **Code** (`globals.css` + `@theme inline` block) — The implementation. The OKLCH colour system, font stack, spacing, and motion variables are defined once in CSS and consumed everywhere: the website, the brand page, and eventually the app. Change a variable, everything updates.

**For external partners / collaborators:** Share the `/brand` URL. If they need a static file, print the page to PDF from the browser. The Figma component library (social templates, app design system) remains the visual production environment — but the website brand page is the canonical reference for brand rules.

### Remaining Figma Steps

- **Social content templates** — Build the 4 template types (quote, photography, illustration, carousel) as duplicatable Figma components using the locked colour system and typography
- **Photography preset** — Lightroom "Auwa — Atmospheric" preset (desaturate, warm, grain, vignette) applied to all photography content
- **Test grid** — 3x3 Instagram layout check before posting begins

---

## 12. What This Document Is

A working reference that evolves as Auwa evolves. Not a monument. The decisions above are enough to build all four sections of auwa.life, create months of coherent Instagram content, and brief any future collaborator.

When something isn't covered here, apply two principles: **would this feel at home in the quiet room?** and **does this let the content speak, or does it compete with it?**

---

*Confidential. Auwa Limited. All rights reserved.*
