# AUWA Brand

*Created: April 2026. The working brand reference for all AUWA touchpoints.*
*Load when working on visual design, social content, brand decisions, or any new touchpoint.*

---

## 1. Brand Essence

AUWA (あうわ) — "the harmony between the unseen and the seen." Kokoro (心) is the holistic Japanese concept that holds heart, mind, soul, and spirit as one undivided whole. The brand makes the invisible visible: invisible emotions (app), invisible craftsmanship (store), invisible Kokoro within all living things (stories).

The brand feels like: a quiet room in a Japanese temple at dusk. Dark, warm, still. Then light enters.

**Brand reference points:**

- **Aesop** — Luxury minimalism, craft-forward. Dark interiors, serif type, every store feels like the same calm room. The gold standard for "premium through restraint." AUWA's app and social should feel like walking into an Aesop store: you immediately know someone cared about every detail.
- **Kinfolk** — Editorial calm, intentional living. Wide-tracked serif wordmark. Generous white space. Photography that breathes. The confidence to leave half the page empty. AUWA's typography and spacing should carry this same unhurried authority.
- **Cereal** — Refined design magazine. Restrained colour palette, serif headlines, atmospheric travel photography. The exact intersection of design culture and wanderlust that AUWA's audience inhabits.
- **Hoshinoya** — Japanese luxury hospitality. Dark, warm, nature-integrated. Space as design. Shows how Japanese premium doesn't need to be austere — it can be warm and inviting while remaining minimal. AUWA's dark palette should feel this way: enveloping, not cold.
- **Studio Ghibli** — Warmth beneath simplicity. Hand-drawn worlds that adults take as seriously as children. The precedent for illustrated content that bypasses cynicism. AUWA's illustration integration follows this path.
- **Aman Resorts** — "Less is more" luxury. No logos on the building. The brand exists in the experience, not the signage. AUWA should feel like this: the brand recedes, the experience comes forward.
- **Monocle** — Tyler Brûlé's editorial worldview extended into products, retail, and radio. One coherent taste level across every touchpoint. Serif masthead, clean layouts. Proves that editorial authority translates into commerce.
- **Mubi** — Film streaming platform with a dark, cinematic UI. Serif display type over moody imagery. Proves that dark interfaces with serif typography can feel premium and inviting for a digital product.

**What AUWA is not:** Headspace-style illustration pop. Wellness-brand pastels. Busy Japanese maximalism. Tech-startup energy. Anything with a gradient that screams "app."

### How to describe AUWA (the three-layer messaging strategy)

Three descriptors, each with a different job. They don't compete — they live at different depths and are used in different contexts. Established April 2026 after testing phrases on new audiences.

| Layer | Phrase | Where it's used | Why |
|-------|--------|-----------------|-----|
| **Discovery** | **Japanese lifestyle brand** | Meta descriptions, About page prose, Instagram bio, press briefings, pitch decks, the dinner-party answer | Instantly legible to a new visitor. Places AUWA next to Kinfolk, Monocle, Goop in their mental shelf. Maps directly to high-volume search terms. |
| **Claim** | **Japanese Philosophy of Kokoro** | Homepage title tag, homepage H1, top-level brand claim, taglines | AUWA's unique ground. "Kokoro" is a low-competition word the brand essentially owns; "Japanese Philosophy" is the bigger bucket we compete in. This is the phrase that differentiates us from every other lifestyle brand. |
| **Voice** | **Japanese living** | Editorial prose in the journal, About page narrative, newsletter subject lines and body copy, Instagram captions, anything written in the brand's own voice | Aspirational, not category-descriptive. How AUWA talks to its own audience — not what it IS, but how you might live. |

Rules:
- **Never lead with "lifestyle brand" inside AUWA's own editorial voice** — that's marketing-speak. Use it when speaking *about* AUWA to outsiders.
- **Never lead with "Kokoro" in first-impression discovery copy** — it raises a question ("what's Kokoro?") before it answers one. Use it after you've earned the reader's attention.
- **"Japanese living" is a tone, not a category** — it's how the prose feels, not how the brand sells itself.

Writers moving between contexts (press → web → newsletter → journal → Instagram) should pick the layer matching the reader: outsider = Discovery, searcher = Claim, existing audience = Voice.

---

## 2. Logo

### The Wordmark

The AUWA logo is the wordmark itself — the letters A-U-W-A set in EB Garamond with wide tracking. No separate symbol, no icon, no monogram. The word is the logo.

The wordmark works because:
- The natural symmetry of A-U-W-A mirrors itself (the two A's as bookends, U-W as the centre)
- This symmetry echoes the etymology: あ (heavens) and わ (earth) framing う (connection)
- Serif letterforms carry signals of craft, history, and intention — the right signals for a Japanese philosophy brand
- It scales cleanly from social profile to website header to printed materials

**Wordmark specifications:**
- **Typeface:** EB Garamond (currently rendered as SVG on the website)
- **Case:** All uppercase
- **Letter-spacing:** 0.25em
- **Colour:** void (oklch 0.08 0.025 250) on light backgrounds; white (inverted) on dark backgrounds
- **Size:** 20px height on mobile, 22px on desktop (website header)

**Minimum clear space:** The height of the letter "U" on all sides.

**Usage:**
- The wordmark appears in the header across all sections of auwa.life
- Always set in EB Garamond, never redrawn or substituted
- Never placed over busy imagery — always over solid dark or solid light backgrounds
- Never distorted, outlined, shadowed, or animated (the orb animates; the wordmark is still)

### Social Profile Image

The wordmark at social icon scale (110x110px display). Two options to test:

**Option A:** The full "AUWA" wordmark centred in a dark circle (void background). Works if the tracking is tight enough to read at small sizes.

**Option B:** A single "A" in Cormorant Light, centred in a dark circle. Cleaner at icon scale, still recognisably the brand.

Test both at actual Instagram/LinkedIn display sizes before deciding. The character is never the profile image — it lives inside the experience, not on the business layer.

### What About a Custom Logo Later?

If the brand grows to the point where a bespoke mark would add value (physical packaging, figure authentication stamps, embossed on store products), explore a custom-drawn version of the wordmark — refined letterforms with subtle ligatures or a harmonised U-W connection. This is a Year 2 investment, not a launch requirement. The Cormorant wordmark is strong enough to launch with.

---

## 3. Typography

### The Decision: EB Garamond (Locked)

**EB Garamond** was chosen as AUWA's primary serif after testing against Cormorant, Playfair Display, and DM Serif Display. It carries real historical weight (based on Claude Garamond's original 16th-century designs), reads beautifully at both display and body sizes, and has the scholarly, deep character that suits a philosophy-forward brand. More readable than Cormorant at body sizes, more refined than Playfair at display sizes.

Available via Google Fonts, loaded through `next/font` with `display: swap`. Weights: 400, 500, 600, 700. Styles: normal, italic.

**Future consideration:** If the brand reaches the point where a premium foundry font adds value (physical print, packaging), Canela (Commercial Type) or Tiempos (Klim) would be the natural upgrades — they're the typefaces AUWA's reference brands actually use. Year 2 investment at earliest.

### Primary Serif: EB Garamond (Display + Editorial)

The voice of AUWA. Used for all brand-level, emotional, and editorial text. Registered as `--font-display` / `font-display` in Tailwind.

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

The website uses a clean sizing system: 12px for metadata labels, 13px for interactive uppercase elements, 14px for all UI text, 18-19px for article body, and responsive clamp() for display sizes.

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
| Navigation | Instrument Sans | 400 | 14px | 0.06em |
| UI text / excerpts | Instrument Sans | 400 | 14px | — |
| Form button (CTA) | Instrument Sans | 500 | 14px | 0.02em |
| Uppercase filter | Instrument Sans | 400 | 13px | 0.06em |
| Uppercase metadata | Instrument Sans | 400 | 12px | 0.08em |
| Kanji (micro-season) | Noto Serif JP | 400 | clamp(3rem, 8vw, 6.5rem) | 0.06em |
| Image captions | Instrument Sans | 400 | 13px | — |
| Footer copyright | Instrument Sans | 400 | 14px | 0.02em |

---

## 4. Colour System

### The Principle

AUWA lives in darkness. Light comes from within — from the Kokoro being revealed. The brand's default state is dark and quiet. Colour enters through gradients, glows, and the Yamato emotional states. This mirrors the app experience: you arrive in darkness, and AUWA's light shower reveals your Kokoro in colour.

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

The auwa.life website uses a light-mode, Kinfolk-inspired editorial aesthetic. The dark palette remains the brand's emotional core (used in the app, social content, and the newsletter module on the website), but the editorial site itself is light — maximising readability for long-form articles and letting photography breathe.

- **Page background:** Pure white — `oklch(1 0 0)` / `--color-surface`
- **Raised surfaces:** `oklch(0.95 0.005 250)` / `--color-surface-raised` — used for placeholder images, card backgrounds
- **Primary text:** void (`oklch(0.08 0.025 250)`) at various opacities (100% for headings, 80% for body prose, 60% for subtitles, 50% for excerpts, 40% for metadata labels)
- **Borders/dividers:** void at 8-20% opacity
- **Wordmark:** void on light backgrounds
- **Interactive hover:** void at 70% opacity (text darkens on hover from lighter state, or lightens from full opacity)

### Dark Theme (App, Social, Newsletter Module)

The brand's natural state. Used for the Kokoro Mirror app, social content templates, and the "Quiet letters" newsletter section in the website footer.

- **Background:** void (`oklch(0.08 0.025 250)`)
- **Primary text:** white at various opacities
- **Wordmark:** white (inverted)
- **Form borders:** white at 20% opacity, 50% on focus

---

## 5. The Orb

The glowing orb is AUWA's presence before the character appears. It pulses gently, breathes, and transforms during the light shower. On the teaser page it sits at the centre of the screen as the primary visual element.

**Usage:**
- Teaser pages: hero element
- App: the input screen's visual anchor, transforms into the light shower
- Website backgrounds: very subtle, atmospheric (never dominant outside the app)
- Social: sparingly — the orb belongs to the digital experience, not print/static contexts

**Never:** place the orb next to the wordmark as a combined logo. They serve different purposes.

---

## 6. Photography Direction

Tom's Japan photography catalogue (17M+ Unsplash views) is the primary photography asset. The style that works for AUWA:

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

The AUWA photographic register lives in the **Kinto + Analogue Life** family, with the warmth of Hoshinoya and the cinematic restraint of Mubi as supporting reference points. Established April 2026 after testing Kinfolk (cleanest editorial), Hoshinoya/Aman (warm premium), and Casa Brutus / Rinko Kawauchi (luminous poetic Japanese contemporary) directions side by side.

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
- **Yassan.1985** and similar Kyoto street photographers leaning on maiko/geiko subjects — risks Orientalism, conflicts with AUWA's "philosophy-forward, not exoticising Japan" line, and parts of Gion have publicly asked tourists to stop photographing maiko.
- Tom's previous Unsplash-style processing (high clarity, pushed saturation, teal/orange split, dramatic skies) — the punch reads as travel photography, not editorial restraint. Strong composition and moment work transfers; the processing layer needs replacing.

**The benchmark.** The three teaser images at `website/main/public/pillars/` (`app.jpg`, `store.jpg`, `book.jpg`) are the brand's photography north stars. They sit in the Kinto + Analogue Life family. Every processed image should feel like a fourth pillar shot.

### Treatment

All AUWA photography is processed through one of three Lightroom presets stored in the `AUWA` group: **AUWA Landscape**, **AUWA Interior**, **AUWA Night**. Every processed image should feel like it could sit alongside one of those three in the same campaign.

**Tonal philosophy (shared across all three presets):**

- Warm white balance, never orange. Wood as the dominant temperature anchor.
- Lifted shadows, protected highlights, slight matte lift on the deepest blacks (gives the editorial film signature).
- Saturation pulled back globally. Oranges and warm woods protected. Greens and aquas muted.
- Visible material texture preserved (wood grain, fabric weave, ceramic, plaster, snow, peeling paint).
- No clarity push on interior or night work (kills skin tone and softens fabric).
- No grain except Night (where subtle grain blends high-ISO sensor noise into the aesthetic).
- Subtle vignette, never dramatic.

**AUWA Landscape** for exterior architecture, shrines, cedar forests, snow scenes, Japan landscapes. Reference plate: `store.jpg`.

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

**AUWA Interior** for interiors, craftsmen at work, ceramic and washi close-ups, portraits in Japanese spaces. Reference plate: `app.jpg`.

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

**AUWA Night** for fire festivals, lantern processions, low-light interiors, night cityscapes. Reference plate: `store.jpg` (philosophical anchor, not literal tonal match).

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
3. For each image: select it, click the matching preset (Landscape / Interior / Night) under `Presets > AUWA` in the left panel.
4. Per-image nudges only if needed: Exposure (always image-specific), small WB shift, occasional Highlights or Shadows tweak. Don't redo the look.
5. Optional crop or straighten per image.
6. Export from Lightroom (`File > Export`) using the saved export preset:
   - **AUWA Article Export**: full-quality JPG (no resize), sRGB, quality 90, target `auwa/photography/{slug}/2-edited/`. The article command picks up from here.
7. Run `/journal:article`. It reads from `2-edited/`, generates the 1800px web versions to `website/main/public/journal/{slug}/`, the 1080×1350 IG versions to `social/instagram/{slug}/`, and the 1200×630 OG image alongside the web hero.

Set the export target up once as a Lightroom Export Preset (`Export > Add` in the export dialog). After that, exporting a whole article's set is one click.

The Lightroom presets are stored in the `AUWA` group. The `.xmp` files live at `~/Library/Application Support/Adobe/CameraRaw/Settings/AUWA Landscape.xmp` (and Interior, Night). They are also version-controlled at `context/brand/photography/` so they can be re-imported on any new machine via `File > Import Develop Profiles and Presets`.

The Lightroom catalog itself, plus the development reference photos and pillar plates, lives outside git at `auwa/photography/_lightroom/`. That folder is gitignored. The presets travel via the `.xmp` files in `context/brand/photography/`, which are tracked.

---

## 7. Illustration Integration

Rieko's illustrations are AUWA's most valuable asset. They need to coexist with photography and typography without the brand feeling like it has two visual languages fighting each other.

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
- Optional: small AUWA character illustration at bottom (thumbnail scale, atmospheric)
- Wordmark "AUWA" bottom-centre, small, cosmic-500

### Template 2: Photography (Seasonal Living / Behind the Kokoro)
- 1080 x 1350px, void background with photo inset (leaving ~40-60px dark border on all sides)
- Photo treated: warm, desaturated, grain
- Optional: Cormorant text overlay (short, positioned lower third)
- Wordmark "AUWA" bottom-centre, small

### Template 3: Illustration (Kokoro Reveal / Behind the Kokoro)
- 1080 x 1350px, void background
- Illustration centred or offset, breathing room around it
- Cormorant text if paired with a reflection or quote
- Wordmark "AUWA" bottom-centre, small

### Template 4: Carousel Slide (Japanese Wisdom)
- 1080 x 1350px, void background
- Slide 1: Cormorant headline (the hook)
- Slides 2-6: Instrument Sans body text with generous spacing, one idea per slide
- Final slide: call-to-action or wordmark
- Consistent padding, font sizes, and colour across all slides

### Reel Cover Image
- 1080 x 1920px (9:16), but design the central 1080 x 1350px area for feed grid crop
- Cormorant text centred in the safe zone
- Void background or atmospheric photography (muted)

### Story Template
- 1080 x 1920px
- Void background
- Cormorant text for quotes/reflections
- Instrument Sans for interactive elements (polls, questions)
- AUWA wordmark top-left (small, consistent placement)

---

## 9. Motion & Animation

### Principles
- **Slow and deliberate.** AUWA doesn't rush. Animations use ease-out-expo (cubic-bezier 0.16, 1, 0.3, 1) — fast departure, gentle arrival. Like a breath out.
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
Dark-first. Minimal chrome during the experience. Cormorant for AUWA's voice, Instrument Sans for UI. The revelation screen is the hero — everything else supports getting there and reflecting afterward.

### /store (Craftsman Marketplace)
Slightly lighter touch — product pages may use light backgrounds for product photography clarity, but the overall framing and navigation stays dark. Cormorant for editorial (craftsman stories, product descriptions), Instrument Sans for functional (pricing, specs, cart). Products shot on white backgrounds (AI-standardised) sit within the dark AUWA frame. Note: Shopify integration may require headless Storefront API or subdomain proxy (store.auwa.life) to maintain the /store subpath — technical decision to make during build.

### /journal (Editorial)
Dark-first. Editorial feel — more text, more space, more story. Photography-led. Cormorant-heavy for headlines, Instrument Sans for body. Long-form articles, craftsman profiles, travel essays. This is where the brand breathes most fully and where SEO value accumulates.

### /book (Illustrated Stories)
Dark-first. The illustrated stories and the AUWA universe origin. Cormorant-heavy. Illustration and animation-forward. The most immersive, atmospheric section.

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
- **Photography preset** — Lightroom "AUWA — Atmospheric" preset (desaturate, warm, grain, vignette) applied to all photography content
- **Test grid** — 3x3 Instagram layout check before posting begins

---

## 12. What This Document Is

A working reference that evolves as AUWA evolves. Not a monument. The decisions above are enough to build all four sections of auwa.life, create months of coherent Instagram content, and brief any future collaborator.

When something isn't covered here, apply two principles: **would this feel at home in the quiet room?** and **does this let the content speak, or does it compete with it?**

---

*Confidential. AUWA Limited. All rights reserved.*
