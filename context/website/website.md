# Auwa Website

*Created: April 2026. The specification for the auwa.life website — the brand's home and editorial hub.*
*Load when building the website, planning content, or working on site structure.*
*For implementation work (component tweaks, bug fixes, deploys), also load `context/website/patterns.md` — they're a paired set.*

---

## 1. Purpose & Positioning

The auwa.life website is the front door to the Auwa brand. It establishes Auwa as a Japanese lifestyle brand rooted in philosophical awareness before the app, store, or book exist as products. The website is the first thing anyone encounters — it needs to communicate the world, not just announce a product.

**What it IS:** A Kinfolk-inspired editorial destination. Atmospheric, contemplative, photography-led, with journal articles as the heartbeat. A place you visit to feel something, read something beautiful, and understand what Auwa is about.

**What it is NOT:** A product launch page. A teaser page with an email form. A feature list. A marketing funnel. It's a brand world — the kind of site you'd bookmark and return to.

**Structural references:**
- **Kinfolk** (kinfolk.com) — The gold standard. Serif typography, generous whitespace, atmospheric photography, editorial authority. The grid layout of articles creates a magazine-like feel that rewards browsing.
- **Cereal** (readcereal.com) — Minimal, travel-focused, serif-heavy. Beautiful article layouts with photography that breathes.
- **Monocle** (monocle.com) — Editorial worldview extended across products, retail, and media. Clean, confident, opinionated.
- **It's Nice That** (itsnicethat.com) — Design culture editorial. Clean grid, strong typography, content-led.
- **Mubi** (mubi.com) — Dark, cinematic, serif display type. Proves dark-mode editorial can feel premium and inviting.
- **Hoshinoya** (hoshinoya.com) — Japanese luxury hospitality. Atmospheric, slow, immersive. The photography integration and pacing.
- **Aesop** (aesop.com) — Restraint as luxury. Serif type, dark palette, every detail considered.

**Additional references to study:**
- **The Kinfolk Table** layout style — how Kinfolk handles food/culture/travel photography within article pages
- **Apartamento** (apartamentomagazine.com) — Raw, intimate editorial photography
- **Analogue Life** (analoguelife.com) — Japanese craft curation, beautiful product storytelling
- **Snow Peak** (snowpeak.com) — How a Japanese brand presents philosophy alongside products

---

## 2. Site Architecture

All sections live under **auwa.life** with subpaths. All variants (auwalife.com, www.auwalife.com, www.auwa.life) 301 redirect to auwa.life. Google Search Console verified with sitemap submitted. Vercel project name: auwa-life.

```
auwa.life/                  → Home (editorial hub + brand introduction)
auwa.life/journal           → Journal index (all articles)
auwa.life/journal/[slug]    → Individual article (static-only: dynamicParams = false)
auwa.life/app               → Kokoro Mirror introduction (pre-launch: coming soon with email capture)
auwa.life/store             → Store introduction (pre-launch: coming soon with craftsman preview)
auwa.life/book              → The Auwa story universe (pre-launch: introduction + email capture)
auwa.life/about             → Tom & Rieko, the philosophy, the origin
auwa.life/brand             → Living style guide (noindex, disallowed in robots.txt)
auwa.life/not-found         → Branded 404 (src/app/not-found.tsx) — serves any unmatched URL
```

**Internal-only routes (`/brand`, `/book-signup`):** `notFound()` is called at the top of each page component when `process.env.NODE_ENV === "production"`, so they 404 in prod builds while still being viewable on `next dev`. Both routes are also listed in `src/app/robots.ts` disallow as a belt-and-braces. `/app/sitemap.ts` lists only the real public routes and the article slugs.

### Information Architecture

**Home** is the editorial hub — not a static landing page but a living, updating page anchored by journal content. Think Kinfolk's homepage: a hero article, a curated grid of recent pieces, and subtle navigation into the four pillars.

**Journal** is the SEO engine and the content heartbeat. Long-form articles, craftsman profiles, seasonal essays, Japan travel stories. This is where brand authority accumulates and where organic search traffic lands.

**App, Store, Book** pages are initially lightweight — atmospheric introductions that establish what's coming, with email capture. They become full sections as each pillar launches.

**About** tells the story of Tom and Rieko, the philosophy of Yaoyorozu no Kami, and the origin of Auwa. Written in the brand voice: quiet, precise, present.

---

## 3. Page Layouts

### Home Page (Implemented)

The homepage leads with a full-bleed Auwa face video, then moves through editorial sections: an intro paragraph, two hero-scale pullquotes, a four-pillar tab module (desktop) / swipeable carousel (mobile), a Journal strip, the current micro-season, three pillar cards, a two-up article module, and the "Meet Auwa" video moment (the Auwa-kokoro footage). All images use `rounded-md`. Scroll is native across every browser. Page transitions: leaving content opacity-fades 1 → 0 alongside a 20vh upward drift, a Sumi (ink) wash fades in over the leaving page, then a solid panel matching the **destination page's bg** (Yoru for `/book`, Surface for everywhere else) rises from below to cover. Reveals on the new page fire AFTER the wipe via `PageReadyContext`.

**Structure (top to bottom):**

1. **Header** — Edge-pinned floating elements (no bar). Auwa wordmark `fixed top-6 left-6` (md/lg/xl scaled to match page gutter). Hamburger menu trigger `fixed top-6 right-6` mirrored. Sound-toggle bars sit between the two on the right cluster. Always visible (no hide-on-scroll). Header colour is driven by a **sentinel-based tone system** (`HeaderTone` / `HeaderToneProvider` in `src/components/header-tone.tsx`): pages drop `<HeaderTone tone="surface|sumi|washi" />` markers inside any positioned section, a document-level IntersectionObserver watches them within the top 80px header band, and the most recently entered sentinel sets the active tone — separately for the LEFT half of the viewport (logo) and the RIGHT half (menu icon + sound toggle). A 5% viewport-width tolerance prevents sub-pixel rect overlap from breaking split layouts. When no sentinel is in band, per-route fallbacks apply: Surface over photographic hero, Sumi after past-hero on light pages, Washi on dark pages (`/book`). Article hero on md+ runs split (image-left sentinel `tone="surface"`, text-right sentinel `tone="sumi"`); teaser pages on lg+ run split the opposite way (text-left `tone="sumi"`, image-right `tone="surface"`). During a page-transition wipe, both elements flip against the panel theme via `useTransitionPanelTheme()`. Menu open uses a portalled full-screen overlay with centred nav items + a thin sumi/15 hairline + an Instagram link styled as a peer of the nav (sumi/45 → sumi on hover); nav items and the logo carry `data-skip-transition="true"` so clicking them inside the menu skips the page-transition wipe (the menu's own close motion serves as the visual transition). Menu close: colour flip is held for 900ms (mirror of the 200ms open delay) so the panel mostly clears the header band before the colour reverts.

2. **HeroVideo** — Full-bleed Auwa face video. `h-[100svh]` on every breakpoint so the video bottom pins to the browser bottom on desktop as well as mobile. Portrait `.mp4` on mobile, landscape on desktop. "Scroll" label + breathing vertical line replaces the bouncing chevron; the button calls native `window.scrollTo({ top, behavior: "smooth" })` with a header offset to land on the intro section.

3. **Intro block** — "Japanese Philosophy" `<h1>` rendered in the small-caps eyebrow style (so the composition is visually unchanged while the page now has a keyword-rich H1 signal Google can read). `ScrollFadeText` paragraph introducing Auwa and its four expressions, "The Story" CTA linking to `/journal/the-beginning`. Desktop-only 心 (Kokoro) watermark at 3% alpha behind the paragraph.

4. **Pullquote 1** — Hero-scale `ScrollFadeText` ("What you pay attention to…") at `clamp(2.25rem, 6vw, 4.75rem)`, leading 1.05.

5. **Four-pillar module** — Desktop (`md+`) renders `EditorialFrames`: a tab gallery that crossfades the active pillar's image (portrait 4:5, 480px column) with its editorial content (eyebrow, heading via `TextReveal`, body, CTA). Auto-advances every 10s (long enough for the pillar-01 video, ~9s, to play through before rotating), pauses on hover. Mobile (`<md`) renders `PillarParade`: horizontal overflow-x-auto row of four 3:4 cards with right-to-left reveal entrance (matches the Journal strip), dot indicators below. Both modules use the same heading ("Four ways in."). No scroll-hijacking; no sticky transforms.

6. **Journal strip** — 11 article cards in a horizontal scrolling row. Each card: 4:5 portrait image, rounded corners, category label, title, excerpt (55 chars max). FadeIn `variant="reveal"` cascade (60ms stagger).

7. **Micro-season** — 72 micro-season kanji display (`MicroSeasonFeature`). Breathing room either side. CtaLink "Read the essay" to the 72 Seasons article.

8. **Three pillar cards** — Book, Store, App. Portrait 4:5 aspect, rounded corners, gradient overlay with pillar name. Staggered cascade `variant="reveal"` (150ms stagger).

9. **Pullquote 2** — Hero-scale `ScrollFadeText` ("In every handmade bowl…"), matching pullquote 1 size.

10. **Two-up articles** — Onsen Lesson + Nozawa Fire Festival. Two large portrait cards side by side. Staggered cascade animation. "Read the essay" label has a text-roll rollover matching the nav.

11. **Meet Auwa video moment** — `VideoMoment` component. Portrait video of the Auwa character in a rounded card (left on desktop, stacked on mobile) with descriptive text alongside. Video and heading link to `/journal/the-beginning`. "The story behind Auwa" link goes to `/about`.

12. **Footer** — Dark (`bg-void`), sticky at bottom with parallax reveal effect (content slides over it as you scroll). "Quiet letters." newsletter signup, pillar links, copyright + social icons.

### Journal Index

**Structure:**
- Page title: "Journal" — rendered via `TextReveal` (same word-cascade entrance as the teaser H1s)
- Filter/category tags: Seasons, Craft, Philosophy, Travel (Instrument Sans, subtle)
- Article grid: Kinfolk-style cards, atmospheric photography, varied sizes
- Pagination or infinite scroll (start with pagination — cleaner, more intentional)

### Journal Article Page (Implemented)

The most important page. Built with a content block system designed to map cleanly to Sanity CMS portable text.

**Layout structure (top to bottom):**
- **Hero** — Split layout: image left (4:5 portrait on mobile, fills viewport height on desktop), title + subtitle right-aligned
- **Meta row** — Category link, author/photographer credit (12px uppercase), social share icons (Facebook, Pinterest, X). Full-width border below.
- **Article body** — Content blocks grouped into layout sections by a `groupIntoSections()` algorithm:
  - **Text-only sections** — Text and pullquotes, always positioned on the right half (`md:ml-[50%]`). This alignment is consistent throughout the article.
  - **Image-beside sections** — Image on the left (4:5 portrait, with extra right padding to make it visually smaller), text on the right in a 50/50 grid. Text blocks that follow an image are automatically grouped beside it.
  - **Image-pair sections** — Two side-by-side images, full width, each with its own caption. Used for detail/close-up photography.
  - **Pullquotes** — EB Garamond (upright, never italic) at clamp(1.75rem, 3.5vw, 2.75rem), full opacity. Matches the homepage pullquote treatment; italic would break that consistency.
- **Full-width divider** — `border-void/8`
- **Continue reading** — 3 related article cards in a grid
- **Footer** — The shared footer component handles the newsletter signup ("Stay close.") and pillar links. No per-page newsletter section needed.

**Content block types (maps to Sanity CMS):**
```
type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "image-pair"; images: [{ src, alt, caption? }, { src, alt, caption? }] }
  | { type: "pullquote"; text: string }
```

The order of content blocks in the CMS determines the article layout. No manual layout selection needed — the grouping algorithm handles it automatically.

**Slide-up reveals — built into the renderer.** Every `FadeIn` on the article page (text blocks, pullquotes, CTAs, image-pair sections, image-beside images, hero subtitle, byline) uses `translateY={32}` instead of the default 12. This gives article body content a deliberate slide-up as sections enter the viewport, rather than the subtler rise used elsewhere. Because the 32px translateY lives in `renderTextBlock` and the section wrappers (not individual article data), **every future article gets this automatically** — no per-article wiring needed. The article hero image uses `ImageFade` to fade in once the image actually loads, rather than sliding.

### Teaser Pages (App, Store, Book — Pre-Launch)

All three teaser pages use the **same hero layout as the article page** — this was a deliberate choice after an earlier bespoke viewport-locked flex layout on teasers caused a visible content drop on desktop Safari (font-swap recalculation resized a flex-1 image column as custom fonts loaded). Using the article-page pattern eliminates the shift.

**Structure (identical across app, store, book):**
```tsx
<main>
  <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">
    <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-0">
      <TextReveal as="h1" stagger={90}>{label}</TextReveal>
      <FadeIn delay={400}><p>{body}</p></FadeIn>
      <FadeIn delay={600}><SignupForm ... /></FadeIn>
    </div>
    <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden order-first md:order-last">
      <ImageFade ... />
    </div>
  </div>
</main>
```

- Mobile: image with fixed aspect ratio on top, text block below (natural flow). No viewport-height constraint.
- md+: grid with viewport-minus-header height. Image and text side by side.
- `ImageFade` fades the image in once it actually loads.
- No Footer on teaser pages (single-viewport moments; footer would push content below the fold).

**Content:**
- **App:** "Awareness, daily." / body about daily practice / app-waitlist signup form / `/pillars/app.jpg`
- **Store:** "Lifetime objects." / body about craftsman objects / store-waitlist signup / `/pillars/store.jpg`
- **Book:** "Open the eyes." / body about illustrated stories / book-waitlist signup / `/pillars/book.jpg`

### About Page

- Tom & Rieko's story (short, in brand voice, with photography)
- The philosophy of Yaoyorozu no Kami (accessible, not academic)
- The origin of Auwa (the name, the decade of development)
- The Eshi + Hanmoto model (brief, charming)
- Photography of Tom and Rieko (atmospheric, not corporate headshots)
- Title "The architecture / of Kokoro" uses two stacked `TextReveal` spans (second delayed 180ms) to preserve the explicit line break while keeping the word-cascade entrance

---

## 4. Design System (Implemented)

*The living reference for the built website. See also the brand page at auwa.life/brand for a visual style guide.*

### Typography (Locked)

- **Display + Editorial:** EB Garamond (400, 500, 600, 700; normal + italic) — `font-display` in Tailwind
- **Functional / UI:** Instrument Sans (400, 500, 600) — `font-sans` in Tailwind
- **Japanese:** Noto Sans JP (300, 400) — `font-jp`; Noto Serif JP (400, 600) — `font-jp-serif`
- All loaded via `next/font/google` with `display: swap`

**Type sizing rules:**
- 18-19px — article body text (EB Garamond). Line-height: 1.85
- 18-20px — about page prose (EB Garamond). Line-height: 1.7
- 20-22px — card titles, pillar headings (EB Garamond). Tracking: 0.01em
- 28-32px — section headings ("Continue reading", "Stay close", "The name"). Tracking: 0.01em
- clamp(2.25rem, 5vw, 3.75rem) — page titles (h1) on Journal, About, and the three teaser pages. Tracking: 0.01em
- clamp(2.5rem, 5.5vw, 4.5rem) — article hero titles only (journal/[slug]). Tracking: 0.01em. Kept at the larger scale because the hero pairs with a full-height photograph and needs the extra weight.
- clamp(1.75rem, 3.5vw, 2.75rem) — pullquotes (EB Garamond, upright). Tracking: 0.005em. Pullquotes are never italic — in-article and homepage treatments match.
- clamp(3rem, 8vw, 6.5rem) — micro-season kanji (Noto Serif JP). Tracking: 0.06em

**Uppercase tracking scale (locked).** All Instrument Sans uppercase elements follow a size-based tracking scale — smaller text gets MORE letter-spacing, larger text gets LESS:

| Text size | Tracking | Examples |
|-----------|----------|----------|
| 11px | `0.18em` | mobile FigureHook strip |
| 12px | `0.16em` | eyebrows, card categories, metadata labels, filter buttons, hero "Scroll" / "Explore" cues, breadcrumbs, share-row, footer copyright, image-overlay CTAs, bordered CtaLink buttons |
| 14px | `0.12em` | navigation, form CTAs, INSTAGRAM handle |
| 16-19px | `0.10em` | (rare) larger interactive caps |
| 24px+ | `0.04em` | display caps |

This scale supersedes an earlier "single 0.14em across all uppercase" attempt that made small caps feel pinched and large caps feel airy. Mixed-case display headings (h1/h2/h3 in EB Garamond) keep their own `tracking-[0.005em]` / `0.01em` values and don't follow the uppercase scale. Full reference and rationale in `context/brand/brand.md` §3.

**Form CTA buttons** use `font-medium` (500 weight) across all pages. All other UI text is weight 400.

### Colour (Light Theme)

The website uses a warm off-white background (Surface, ≈ `#f8f7f4`) with the Sumi/Yoru/Washi family for text and surfaces. This is the Kinfolk-inspired editorial expression of the brand — the cosmic palette lives in the app, social, and emotional-state modules.

- **Page background:** Surface — `oklch(0.97 0.004 95)` / `--color-surface` (≈ `#f8f7f4`). Same warm-paper family as Washi, at higher altitude. Consumed by `<main>`, the entrance loader, the hero pre-paint flash, the email body bg, and the PWA `theme_color`. Pure `#ffffff` is no longer used anywhere on the site.
- **Raised surfaces:** `oklch(0.95 0.005 250)` / `--color-surface-raised`
- **Text colour:** `--color-sumi` (`oklch(0.10 0.022 235)`) at the locked opacity tiers below.

| Tier | Use |
|------|-----|
| 100% | Headings, titles, active nav, wordmark, menu icon |
| 80% | About page prose, footer category links |
| 70% | Nav links, hover states, founder bios |
| 60% | Subtitles, article subtitle |
| 55% | Form button hover states |
| 50% | Excerpts, captions |
| 45% | Eyebrow labels, metadata labels (uppercase 12px), filter buttons (inactive), social share icons, "Read the latest" arrow link. **Bumped from 40% when Surface moved off pure white — 40% read softer against the warm field.** |
| 40% | Input placeholder text. **Bumped from 35% for the same reason.** |
| 20% | Form underlines |
| 10% | Default divider line. **Bumped from 8% — 8% reads invisible on Surface; 10% is the floor.** |

- **Borders:** Sumi at 10% (default divider), 20% (form underlines), 50% (form focus).
- **Light text on Yoru / on uniform dark surfaces:** Washi (`oklch(0.928 0.020 80)`) at the same tiers (100/80/70/60/45/40/10). Footer, FigureHook strip, SoundToggle button, dark book page, signup-form dark, cursor disc.
- **Light text over imagery / photography:** **Surface** (`oklch(0.97 0.004 95)`), not Washi. Used for the header logo + menu icon over the transparent hero, the pillar card text overlays, two-up CTA labels, the four-pillar module index counter, the hero "Scroll" label + line, and the book-hero card text. Surface has higher luminance and lower chroma than Washi so it cuts confidently against variable photographic mid-tones; Washi blends into bright spots. **Never use `text-washi` over a photograph.**

### Spacing & Layout (Implemented)

**Responsive horizontal padding (page-level gutter):**
- Mobile: 24px (`px-6`)
- Tablet: 48px (`md:px-12`)
- Desktop: 80px (`lg:px-20`)
- XL: 112px (`xl:px-28`)

**Vertical section spacing — three tokens, locked.**

Every section on the site uses one of three utility classes defined as `@utility` in `globals.css`. No bespoke `py-xx` or `pb-xx` values anywhere. Changing a token in one place propagates across every page.

Why three? Because "consistent rhythm" means different things in different contexts. Two adjacent modules need a breathing gap between them. Paragraphs inside one essay need tight flow. Hero moments need generous airlocks. One token for each pattern, no overlap.

| Token | Value | Use |
|-------|-------|-----|
| `space-section` | `py-16 md:py-24` (64/96px, both sides) | **Discrete modules** — home page sections, journal grid, video moment. Two adjacent `space-section` sections produce a 192px gap between content, which reads as "distinct module to distinct module." |
| `space-flow` | `pb-16 md:pb-24` (64/96px, bottom only) | **Continuous narrative** — About page paragraphs, article byline, any columnar content that feels like parts of one essay. Sections flow with a single 96px gap, not doubled. |
| `space-breathing` | `py-28 md:py-44` (112/176px, both sides) | **Hero moments** — pullquotes and the 72 micro-seasons kanji module. Content that needs to stand alone and inhale. |

**How to pick.** Ask: is this section an independent module, or a paragraph in a continuous narrative? Home page sections are independent (each has its own identity) → `space-section`. About page paragraphs are narrative (they flow as one essay) → `space-flow`. Pullquotes and the kanji moment are hero content → `space-breathing`.

**Exceptions — the complete list.** These are the only places we deviate from the three tokens. If you need something outside this list, promote the new exception into this table before writing it in code.

- Hero top padding: `pt-12 md:pt-16` (48/64px) — for page heroes that use `space-flow` and need a tighter top to sit close to the header (e.g. About page hero).
- Header height: `h-16 md:h-20` (64/80px)
- Newsletter (footer): lives inside `footer.tsx` — the footer has its own internal rhythm and doesn't use any section token.

Any page-section `<section>` in `src/app/**/page.tsx` or `src/components/*.tsx` MUST use `space-section`, `space-flow`, or `space-breathing`. Hardcoded `py-20`, `pb-32`, etc. are drift — treat as bugs.

**Separator placement — always between sections, never inline.**

The `<Separator />` component is a zero-padding, full-width divider line. It sits at the exact boundary between two sections, taking no vertical space of its own. The symmetry rule: each adjacent section's padding token provides the breathing room on its own side, so a `space-section → Separator → space-section` boundary reads as 96px above the line and 96px below on desktop.

NEVER place a divider line inline at the top of a section (inside its top padding) — that pushes the line *into* the section's padding, making the space above the line smaller than the space below and breaking symmetry with other separators on the page. If you need a divider between sections, render `<Separator />` between them in the page tree. If the previous section flows straight into the next without a line, skip the separator entirely.

**Trailing spacer before the footer.** The last module on any page needs a `<div className="h-16 md:h-24" aria-hidden="true" />` before `</main>`. Between adjacent sections mid-page the total gap is 96+96 = 192px (two space-section padding blocks meeting); the trailing spacer recreates that gap against the footer, so the last module doesn't sit tighter to the footer than it does to the module above it.

**Grid gaps:**
- Article grid (journal index): `gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16`
- Pillar cards (home): `gap-5 md:gap-6 lg:gap-8`
- Horizontal scroll (home): `gap-5 md:gap-6 lg:gap-8`
- Image pairs (article): `gap-4 md:gap-6`
- Founder bios (about): `gap-8 md:gap-16`

**Content widths:**
- Article body text: right half of viewport (`md:ml-[50%]`)
- About page prose: `max-w-[680px]` centred
- Newsletter form: `max-w-[400px]` centred within `max-w-[480px]` container
- Waitlist forms: `max-w-[440px]`
- Horizontal scroll cards: `w-[260px] md:w-[280px] lg:w-[300px]`

**Image aspect ratios:**
- Primary (cards, articles, editorial): 4:5 portrait — the standard ratio everywhere
- Book cover: 3:4 portrait
- Image break (about page): 2.5:1 landscape
- Article hero (mobile): 4:5 portrait; (desktop): fills viewport height

### Motion (Locked tokens)

Every animation on the site consumes the same tokens. CSS durations live in `globals.css` (`--duration-*`); JS durations, staggers, and easing live in `src/lib/motion.ts` (`DURATION`, `STAGGER`, `EASING`). Components import from `motion.ts` instead of hardcoding ms values. Changing a token in one place propagates everywhere — FadeIn, TextReveal, hover states, page transitions, the lot.

**Durations (single source of truth — `motion.ts` + `globals.css`):**

| Token | Value | Use |
|-------|-------|-----|
| `DURATION.enter` / `--duration-enter` | 800ms | FadeIn default, TextReveal — text and general reveals |
| `DURATION.reveal` / `--duration-reveal` | 1200ms | FadeIn reveal variant — image cards, visual moments |
| `DURATION.hover` / `--duration-hover` | 300ms | Hover and state transitions |
| `DURATION.page` / `--duration-page` | 500ms | PageTransition crossfade |

**Stagger ladder — three values, no ad-hoc numbers:**

| Token | Value | Use |
|-------|-------|-----|
| `STAGGER.strip` | 60ms | Horizontal scrollers (Journal strip, PillarParade) |
| `STAGGER.grid` | 120ms | Grid cascades (pillar cards, continue reading, two-up articles) |
| `STAGGER.hero` | 180ms | Display-type cascades (multi-line TextReveal, stacked hero headings) |

**Easing — three curves only:**

| Token | Value | Use |
|-------|-------|-----|
| `EASING.outExpo` / `--ease-out-expo` / Tailwind `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Brand default — fast departure, gentle arrival. "Like a breath out." |
| `EASING.inOut` / `--ease-in-out` / Tailwind `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric — image crossfades, slow ambient transitions |
| `EASING.textRoll` / `--ease-text-roll` / Tailwind `ease-text-roll` | `cubic-bezier(0.7, 0, 0.3, 1)` | Text-roll hover rollovers (CTAs, nav items, scroll label) — punchier "snap into place" feel, sharper than outExpo |

**FadeIn mechanics (fixed):**
- `variant="fade"` (default): 12px rise, `DURATION.enter`
- `variant="reveal"`: 24px rise, `DURATION.reveal`
- Root margin: `"0px 0px -40px 0px"` (fires 40px before viewport edge); extended to `"0px 200% 0px 0px"` for horizontal scrollers so off-viewport-right cards fire when the section scrolls in
- No `will-change` toggling (Safari layer-teardown jitter — see `website-patterns.md`)

**Hardcoded ms values are drift.** If you see `duration-500`, `800ms`, or `delay={150}` in a component, it should come from `motion.ts` instead. Treat as a bug.

### Photography Treatment

All photography follows brand.md Section 6. Portrait-first (4:5) for all editorial and card imagery — no landscape images in article layouts or grids.

---

## 5. Technical Architecture

### Stack

- **Framework:** Next.js 15 (App Router, React Server Components, webpack)
- **Styling:** Tailwind CSS 4 (PostCSS plugin, OKLCH colour system via `@theme inline` in globals.css)
- **CMS:** Sanity (headless — not yet integrated; content currently hardcoded as placeholder data)
- **Hosting:** Vercel (automatic deployments, edge functions, image optimisation)
- **Email:** Resend (fully integrated — welcome emails auto-send on signup, newsletter sends via API). Templates in `src/emails/` using React Email (`@react-email/components`).
- **Analytics:** Vercel Analytics (`@vercel/analytics/react`, added to `layout.tsx`). Privacy-respecting, no cookie banner needed, GDPR compliant.
- **Fonts:** Google Fonts via next/font (EB Garamond, Instrument Sans, Noto Sans JP, Noto Serif JP)

### Sanity Content Model

```
// Journal Article
{
  title: string
  slug: slug
  publishedAt: datetime
  category: reference → Category
  heroImage: image (with hotspot)
  excerpt: text
  body: portable text (rich text with images, pull quotes, embeds)
  author: reference → Author
  seoTitle: string
  seoDescription: text
  relatedArticles: array of references → Article
}

// Category
{
  title: string  // Seasons, Craft, Travel, Philosophy
  slug: slug
  description: text
}

// Author
{
  name: string
  role: string
  image: image
  bio: text
}

// Page (for App, Store, Book, About — editable)
{
  title: string
  slug: slug
  heroImage: image
  body: portable text
  seoTitle: string
  seoDescription: text
}

// Newsletter subscribers are handled directly via Resend Contacts API.
// No Sanity schema needed. See context/marketing/newsletter.md for details.
```

### Image Pipeline

- Sanity's image CDN handles responsive sizing, format conversion (WebP/AVIF), and cropping
- All images uploaded at 2x resolution minimum (2400px wide for full-width heroes)
- Hotspot cropping set in Sanity Studio for each image (ensures correct focal point across aspect ratios)
- Lazy loading for below-fold images (Next.js Image component handles this)
- Target: 95+ Lighthouse performance score

### Component Library

Reusable components live in `src/components/`. All are server components unless noted.

| Component | File | Client? | Purpose |
|-----------|------|---------|---------|
| Header | `header.tsx` | Yes | Rendered once in `layout.tsx` inside `<HeaderToneProvider>` so it can read sentinel tones. Sits OUTSIDE `PageTransition` so the logo + menu button stay above page-leave animations. Mobile menu is portalled to body. Morphing hamburger ↔ X via inline-style transitions; all three lines share matched compositor-layer hints (`willChange: "top, transform"`, `transformOrigin: 50% 50%`, both `backfaceVisibility` properties, `transform` always set) so mobile Chromium / iOS Safari rasterise them at the same stroke width. |
| HeaderTone / HeaderToneProvider / useHeaderTone | `header-tone.tsx` | Yes | Sentinel-based dynamic tone system. `HeaderToneProvider` mounts in `layout.tsx`; runs a single document-level IntersectionObserver against every `[data-header-tone]` sentinel within the top-80px header band, with a 5% viewport-width tolerance on the left/right split. `<HeaderTone tone="..." side="left|right|both">` sentinels are dropped inside positioned sections to declare what colour the header should read against that section. The header consumes via `useHeaderTone()`; null per-side falls back to per-route logic. Sentinels deliberately do NOT use `visibility: hidden` (Chromium IO suppresses observation on visibility-hidden elements). |
| Footer | `footer.tsx` | No | "Stay close" newsletter signup (dark), pillar links, copyright + social icons. Sticky at bottom with parallax reveal. |
| SignupForm | `signup-form.tsx` | Yes | Email signup form. Props: `source` (app-waitlist / store-waitlist / book-waitlist / newsletter), `buttonText`, `successMessage`, `theme` (light/dark), `className`. Posts to `/api/signup`. Input, button, and success message all use `text-[16px]` (not 14px) to prevent iOS Safari's focus auto-zoom — anything under 16px fires the zoom, which pushed the submit button off-screen on smaller iPhones. |
| FadeIn | `fade-in.tsx` | Yes | IntersectionObserver-based animation. Two variants: `"fade"` (default, 12px rise) and `"reveal"` (slides in from the right, for image cards). Accepts `className`, `delay`, `duration`, `translateY`, `variant`. Article pages pass `translateY={32}` for a more pronounced slide-up on body content. |
| StripReveal | `strip-reveal.tsx` | Yes | Module-level reveal for horizontal scrollers. One IntersectionObserver fires when the container enters viewport and cascades all children in with CSS transition-delay stagger. Replaces per-card FadeIn in horizontal scrollers — the per-card approach fails on narrow viewports (rootMargin 200% only catches the first ~3 cards). After first reveal, swiping right shows already-revealed cards. Props: `className`, `itemClassName`, `stagger`, `translateX`. |
| TextReveal | `text-reveal.tsx` | Yes | Word-by-word text animation. Splits text into words, each rises from below with stagger. For hero headlines. Props: `as` (tag), `delay`, `stagger`. Used on teaser H1s ("Open the eyes.", "Awareness, daily.", "Lifetime objects.") and on the Journal + About page titles. For explicit multi-line headings (e.g. About's "The architecture / of Kokoro"), stack two TextReveal spans with `as="span" className="block"` and `delay={180}` on the second so the cascade flows from line 1 into line 2. |
| PageTransition | `page-transition.tsx` | Yes | Single-pass bottom-up wipe on route change. Wraps children in layout.tsx (which itself sits inside `<HeaderToneProvider>`). Phases — LEAVE (1800ms): leaving content opacity-fades 1 → 0 alongside a 20vh upward drift, a Sumi (ink) wash fades 0 → 0.8 over the leaving page, a solid panel rises from `translateY(100%)` to 0 covering everything; the panel's bg matches the DESTINATION page (Yoru for `/book`, Surface elsewhere), so the moment it snaps off the user sees the same plane behind it. HOLD (100ms): panel covers; new page mounts behind. SETTLE: panel teleports back to `translateY(100%)` with no transition, wash snaps to opacity 0. Reveals (FadeIn / TextReveal / StripReveal / ImageFade) gate on `usePageReady()` so the new page's cascades fire AFTER the wipe completes — `revealReady` flips true 200ms after settle. Easing: `cubic-bezier(0.87, 0, 0.13, 1)` (in-out-quart) on every property. `prefers-reduced-motion`: navigation is instant, no panel. Internal navigations carrying `data-skip-transition="true"` (menu items, logo when menu is open) skip the wipe entirely — `revealReady` still gates so the destination page's cascades wait for the menu's own close motion to finish. |
| HeroVideo | `hero-video.tsx` | Yes | Full-bleed video hero for the live homepage. `h-[100svh]` on all viewports (no desktop aspect cap), so the video bottom pins to the browser bottom whatever the monitor ratio. Portrait `.mp4` on mobile, landscape on desktop. "Scroll" label + breathing vertical line is a `<button>` that calls native `window.scrollTo({ top, behavior: "smooth" })` with a header offset to land on the intro. |
| EditorialFrames | `editorial-frames.tsx` | Yes | Desktop (≥md) four-pillar module. Tab gallery crossfading through four frames (Store / Book / Journal / App) with staggered reveal per frame (eyebrow → `TextReveal` heading → body → CTA). Image column pinned at 480px, text column flexible, grid template `[480px_1fr]`, `lg:gap-28` horizontal gap, `max-w-[1100px] lg:mx-auto`. Auto-advance every **10s** (`ADVANCE_MS = 10000`) so the pillar-01 video plays fully through; pauses on hover; rotation gated on a one-shot IntersectionObserver so the module always opens at pillar 01 / Store regardless of how long the user lingered on the hero. Image crossfade: 1500ms `cubic-bezier(0.4, 0, 0.2, 1)` (symmetric ease-in-out, gentle). |
| PillarParade | `pillar-parade.tsx` | Yes | Mobile (<md) four-pillar module. Horizontal `overflow-x-auto` row of four 3:4 cards mirroring the Journal strip (native scroll, no snap, no `touch-action` override). Cards at `w-[72vw] max-w-[360px]` so card 2 peeks clearly. FadeIn `variant="reveal"` with `revealDistance={40}` so the right-to-left cascade matches the Journal strip without pushing card 2 below the IntersectionObserver's 10% threshold. Dot indicators update via scroll listener on the scroller element. |
| VideoMoment | `video-moment.tsx` | Yes | "Meet Auwa" section: portrait video card + text. Desktop: side-by-side. Mobile: stacked. |
| AuwaVideoBlock | `auwa-video-block.tsx` | Yes | Full-width Auwa face video. Landscape desktop, square mobile. Auto-plays on visibility. |
| MicroSeason | `micro-season.tsx` | Yes | Displays current 72 micro-season with kanji. |
| ObfuscatedEmail | `obfuscated-email.tsx` | Yes | Bot-proof email display. Shows `user[at]domain` initially, reveals real `mailto:` link on click. Props: `user`, `domain`. |
| ImageFade | `image-fade.tsx` | Yes | Next.js `<Image>` wrapper that fades from opacity 0 → 1 over `DURATION.reveal` once pixels are painted. Used on the article hero AND all editorial card images (journal index, in-article image-pair / image-beside, continue-reading). Cache-guard on mount: `img.complete && naturalWidth > 0` flips `loaded` directly so cached images on revisits don't stay at opacity 0 (onLoad never fires for them). Inline `transition` re-specifies `transform` + `filter` alongside opacity so the global `a img { transition: transform 0.8s ... }` hover-zoom rule isn't wiped by the inline opacity transition. |
| FigureHook | `figure-hook.tsx` | Yes | Sitewide bottom peek strip inviting visitors to the figure edition waitlist. Mounted in `layout.tsx`. Hidden on teaser pages (`/store`, `/app`, `/book`) where a local signup is already primary. Appears after 600px scroll, fades out as a zero-height sentinel at the end of `<main>` enters the viewport (240px pre-footer margin so the handoff to the footer's "Quiet letters" block is gentle). Sentinel watches main-content-end, not the sticky footer directly — the footer is `sticky bottom-0` from page load and would register as intersecting at every scroll position. **Snap discipline:** the strip uses a `snap` flag (true on mount + path change, cleared via two `requestAnimationFrame` hops) to disable the opacity+transform transition for the first committed render after navigation — without that, navigating to a new article from a page where the strip was visible animated the strip's translate from 0% to 100%, producing a brief 10px dark lip flash at the bottom on article load. |
| SoundToggle | `sound-toggle.tsx` | Yes | Sound bars rendered inside `header.tsx` as part of the right cluster (between logo and menu, sharing the header's colour stream so the three read as one row). Off-state: bars hold an asymmetric equaliser pose `[0.55, 0.85, 0.4, 0.7]` (varying `scaleY`) so the icon reads as audio at a glance, not as four stacked dots. Playing: `sound-wave` keyframe animates `scaleY` per bar with staggered durations + delays. All bars share matched compositor-layer hints (`willChange: transform`, both `backfaceVisibility` properties, `transform` always set even when playing — including the `scaleY(1)` rest value during animation, never `undefined`) — same fix as the hamburger lines for mobile Chromium / iOS Safari rasterising siblings at different widths. `visibilitychange` + `pagehide` listeners pause playback so iOS doesn't keep a ghost media badge when the tab backgrounds. A SECOND, standalone `<SoundToggle />` mount in `layout.tsx` is currently parked (commented out) — that one was the older sitewide floating button. The header-cluster mount is the active one. |

**API routes:**

| Route | Purpose |
|-------|---------|
| `/api/signup` | Creates Resend contact + sends welcome email. Accepts `{ email, source }`. |
| `/api/newsletter/send` | Sends newsletter to full audience. Accepts content JSON + secret token. |

**Email templates** (in `src/emails/`, React Email components, not rendered on the website):

| Template | Purpose |
|----------|---------|
| `welcome.tsx` | Auto-sent on signup. 4 variants based on source. |
| `newsletter.tsx` | Manual newsletter sends. Accepts heading, intro, articles array, hero image. |

### SEO

**Messaging strategy — three layers, applied consistently across every page.** Each layer has a distinct job; they don't compete:

- **Discovery** (what a new visitor types into Google): *"Japanese lifestyle brand"*. Used in meta descriptions, About page prose, Instagram bio, press briefings, the dinner-party answer. Instantly legible, places Auwa next to Kinfolk / Monocle / Goop in a new visitor's mental shelf.
- **Claim** (the unique ground Auwa owns in search): *"Japanese Philosophy of Kokoro"*. Used in the homepage title tag and homepage H1. "Kokoro" is a low-competition word Auwa essentially claims outright; "Japanese Philosophy" is the higher-volume bucket the brand competes for. Titles and H1s enforce this claim.
- **Voice** (editorial prose tone): *"Japanese living"*. Thread through article intros, About narrative, newsletter prose, Instagram captions. Aspirational, not category-descriptive.

**Title pattern — `" | "` (space-pipe-space) separator. Every page matches this structure:**

| Page | Title |
|------|-------|
| `/` | Auwa \| Japanese Philosophy of Kokoro |
| `/journal` | Auwa Journal \| Japanese Philosophy, Craft & Seasons |
| `/about` | About Auwa \| A Japanese Lifestyle Brand |
| `/store` | Auwa Store \| Japanese Craftsman Objects & Figure Editions |
| `/app` | Auwa App \| Japanese Awareness Practice |
| `/book` | Auwa Book \| Illustrated Japanese Stories |
| `/journal/[slug]` | `{article.title} \| Auwa Journal` |

Every title stays ≤60 chars (Google truncates after that). Every title contains "Japanese" somewhere — either as the category qualifier ("Japanese Awareness Practice") or in the unique-claim phrase ("Japanese Philosophy of Kokoro").

**Meta description pattern — 100-155 chars, keyword-rich, distinct from on-page poetry.** Articles carry TWO fields:
- `subtitle` — the on-page editorial line (poetic, short, reader-facing).
- `description` — the meta description (keyword-rich, 100-155 chars, contains "Japanese" and the primary topic word). `generateMetadata()` prefers `description`, falls back to `subtitle` if absent.

This separation is important: the reader sees quiet poetry on the page; Google sees a concrete topic statement in search results.

**H1 rules — one per page, keyword-led when possible:**
- Homepage: `Japanese Philosophy` (rendered as the small-caps eyebrow above the intro paragraph — visually unchanged, semantically elevated).
- `/journal`: `Journal` (short category label is fine; the title tag carries the keyword weight).
- `/about`: `The architecture of Kokoro` (poetic; the title tag does the SEO work).
- Teaser pages (`/app`, `/store`, `/book`): topic H1s (`Awareness, daily.`, `Lifetime objects.`, `Open the eyes.`).
- Articles: `article.title`. Japanese topic words (Yakushima, Shigefusa, Yaoyorozu no Kami) ARE the H1.

**Structured data (JSON-LD) — one per page type, injected via `<script type="application/ld+json">`:**
- `/` — `Organization` + `WebSite` (in `layout.tsx`).
- `/journal` — `Blog` with `BlogPosting` entries for every article.
- `/about` — `AboutPage` with `Organization` mainEntity containing `Person` entries for Rieko Maeda (Creator, Japanese) and Tom Vining (Producer, British).
- `/journal/[slug]` — `Article` with headline, description, author, datePublished, publisher, image, url.
- Teaser pages (`/store`, `/app`, `/book`) — no structured data yet; add `Store` / `SoftwareApplication` / `Book` schemas when they launch.

**Canonical URLs — intentionally NOT emitted.** The root layout used to set `alternates.canonical = "https://auwa.life"`; Next.js metadata inheritance then applied that canonical to every child page, which told Google every article was a duplicate of the homepage — and collapsed them under homepage consolidation. Fix (April 2026): remove the global canonical entirely. Each URL is now its own canonical by default. Only add `alternates: { canonical: url }` on a specific page if that page genuinely needs one (e.g. to strip query params).

**Image alt text — always include the geographic, cultural, or craft qualifier where it reads natural.** Prefer Japanese terms (washi, onsen, shimenawa, noren, engawa) over English translations — they rank on image search AND feel editorial. Prefer place names (Yakushima, Koya-san, Nagano) over "mountain" / "forest". Hero image alt should identify Japan or the specific Japanese subject within the first ten words.

**Sitemap slug hygiene.** The sitemap's `articleSlugs` array MUST match the keys in the articles object in `src/app/journal/[slug]/page.tsx` byte-for-byte. A single-character drift ( `oroko-combs` vs `oroku-gushi`) means Google crawls a 404 and never discovers the real URL. Fixed once; the article command now guards against it.

**Journal articles are the primary SEO asset** — target long-tail keywords around Japanese philosophy, craft, seasonal living, awareness. Each article's `description` should combine "Japanese" + the specific topic term + a brief what-it's-about sentence.

---

## 6. Build Approach

### v0 / Stitch Prompt Ideas

Use v0.dev or Stitch to rapidly scaffold pages, then refine in Claude Code. Prompts should be specific and reference-heavy:

**Homepage prompt:**
"Create a dark-mode editorial homepage inspired by Kinfolk magazine. Serif display typography (Cormorant), sans-serif navigation (Inter or similar). Full-width hero with atmospheric photography and large headline overlay. Below: a brand statement line centred with generous whitespace, then a 3-column asymmetric article card grid (varied card sizes, dark backgrounds, warm photography). Minimal footer with wordmark. Overall feel: Japanese luxury hospitality meets design magazine. Colour: near-black backgrounds (#0f0f14), off-white text (#dddde2), subtle yellow-green accent (#c4cc5a). Tailwind CSS."

**Article page prompt:**
"Create a long-form article page with dark background. Full-width hero image with parallax. Large serif headline (Cormorant) centred below hero. Article body in a narrow column (max 680px) with generous line-height. Pull quotes in larger serif, centred. Full-width photography interspersed. Author block at bottom. Related article cards (2-3) below. Newsletter signup at end. Dark, atmospheric, editorial. Think Cereal magazine online."

**Journal index prompt:**
"Create a magazine-style article index page with dark background. Page title in large serif. Filter row with category tags. Article cards in asymmetric grid — mix of large (spanning 2 columns) and standard cards. Each card: atmospheric image, serif headline, one-line excerpt, category badge. Hover: subtle scale and brightness shift. Kinfolk/Cereal aesthetic. Dark mode."

### Build Timeline (Achievable in a Few Days)

**Day 1: Scaffold + Homepage**
- Set up Next.js 16 + Tailwind 4 + Sanity
- Scaffold homepage layout (v0/Stitch for initial structure, Claude Code for refinement)
- Configure fonts (Cormorant, Instrument Sans, Noto Sans JP)
- Implement colour system (OKLCH custom properties in Tailwind config)
- Homepage: header, hero, brand statement, article grid (with placeholder content), newsletter signup, footer

**Day 2: Article Pages + Journal Index**
- Journal article page template (the most important page)
- Journal index with category filtering
- Sanity content model for articles, categories, authors
- Sanity Studio configured with preview
- Responsive testing across breakpoints

**Day 3: Remaining Pages + Polish**
- App, Store, Book pre-launch pages (atmospheric, simple)
- About page
- Newsletter integration (Resend)
- Motion: scroll reveals, hover states, page transitions
- SEO: meta tags, OG images, structured data
- Performance optimisation, Lighthouse audit
- Deploy to Vercel, connect domain

**Day 4: Content Population**
- Populate initial journal articles (see Section 7)
- Final photography treatment and upload
- Cross-browser testing
- Soft launch

---

## 7. Preparing Initial Articles (The Day-One Content Plan)

The website needs content on day one. An empty journal undermines the editorial positioning. Aim for 8-10 articles prepared and ready to publish at launch — a mix that showcases the four content territories (seasons, craft, travel, philosophy) and gives the site enough density to feel established.

### Article Preparation Approach

Tom and Rieko can prepare ~10 articles in a focused day using this workflow:

1. **Select 10 topics** from the list below
2. **Gather photography** from Tom's 15+ year Japan catalogue (already shot, just needs selection and Lightroom treatment)
3. **Write first drafts** — Tom writes in brand voice, 800-1500 words per article. Some can be shorter (500-word seasonal reflections). Use Claude to help draft, then edit for voice and authenticity.
4. **Rieko reviews** for cultural accuracy and adds Japanese terms/context
5. **Apply photography treatment** (Lightroom "Auwa — Atmospheric" preset)
6. **Upload to Sanity** with metadata, hero images, categories, SEO descriptions

### Suggested Initial Articles

**Seasons (2-3 articles):**
- "The Fifth Day" — An introduction to how Japan divides the year into 72 micro-seasons, and what it means to notice the world in five-day increments. Photography: seasonal Japan landscapes.
- "Seimei (清明): The Light Returns" — A seasonal essay tied to the current micro-season at launch. Atmospheric, personal, grounded in a specific place and moment in Japan.

**Craft (2-3 articles):**
- "The Knife Maker of Seki" — Profile of a craftsman Tom and Rieko met during their Monolise research. The story of a lifetime spent perfecting a single craft. Photography from the workshop visit.
- "Objects with Kokoro" — An essay on the philosophy of choosing lifetime objects over disposable ones. Why a hand-forged knife or a ceramic cup from a master artisan changes your relationship with daily life.
- "What Wabi-Sabi Actually Means" — Reclaiming the concept from Instagram aesthetics. What it means to find beauty in imperfection and impermanence, beyond the interiors trend.

**Travel (2-3 articles):**
- "Temple Mornings" — An atmospheric essay about the ritual of visiting Japanese temples at dawn. The silence, the light, the practice of being present. Photography: Tom's temple work.
- "The Onsen Lesson" — On the Japanese bathing culture and what it teaches about shared space, vulnerability, and attention. Not a guide — a reflection.

**Philosophy (2-3 articles):**
- "Everything Has Kokoro" — The foundational essay. An accessible introduction to Yaoyorozu no Kami and why it matters in modern life. The philosophical anchor for the entire journal.
- "Awareness, Not Mindfulness" — Why Auwa uses the word "awareness" instead of "mindfulness." The difference between a Western self-help concept and a Japanese philosophical worldview.
- "The Guest" — On being a respectful visitor to Japan (and to any culture). The awareness that comes from understanding you are in someone else's home. Photography: Japan travel moments.

### Content Calendar (Post-Launch)

After the initial 10 articles, publish 1-2 articles per week aligned with the 72 micro-seasons content calendar. Each micro-season (5 days) is an opportunity for a seasonal essay, craftsman profile, or travel piece. This gives the journal a natural rhythm without feeling forced.

---

## 8. Newsletter & Email

Fully documented in `context/marketing/newsletter.md`. Summary:

- **Welcome emails** auto-send on signup (4 variants per source: newsletter, app-waitlist, store-waitlist, book-waitlist). Sent as transactional via `resend.emails.send()`. Unsubscribe is a plain `mailto:hello@auwa.life?subject=Unsubscribe` because the `{{{RESEND_UNSUBSCRIBE_URL}}}` merge var does not substitute in transactional sends.
- **Welcome email subjects**: "Welcome to Auwa" (newsletter) · "You're on the Auwa App waitlist" (app) · "A note from Auwa." (store and book — softer subject keeps them out of Gmail Promotions).
- **Newsletter sends** go through Resend's **Broadcasts API** (`resend.broadcasts.create()` + `.send()`), not the transactional Emails API. This is what enables the `{{{RESEND_UNSUBSCRIBE_URL}}}` merge variable and the `List-Unsubscribe` header. Triggered manually via the `/marketing:newsletter` slash command or the `/api/newsletter/send` endpoint.
- **Signup points**: shared footer on every page ("Quiet letters."), plus dedicated forms on app/store/book teaser pages
- **Templates**: React Email components in `src/emails/` (welcome.tsx, newsletter.tsx)
- **Resend segments**: App Waitlist, Store Waitlist, Book Waitlist (3 segments, free plan limit). Newsletter subscribers go to audience without a segment.
- **Subject format**: `[Topic] | Auwa` — poetic, not clickbait

### Social share previews (journal articles)

Each article has a dedicated 1200×630 landscape OG image at `/journal/{slug}/{slug}-og.jpg`, alongside the portrait 4:5 hero. `generateMetadata()` in `src/app/journal/[slug]/page.tsx` derives the OG path from the hero filename. FB, Pinterest, and X pull this image into their link previews. Instagram is intentionally not supported — IG has no link-share flow. To regenerate after a hero change:

```bash
cd website/main/public/journal/{slug} && cp {slug}-hero.jpg {slug}-og.jpg && \
  sips --resampleWidth 1200 {slug}-og.jpg && sips -c 630 1200 {slug}-og.jpg
```

---

## 9. Analytics & Performance

- **Vercel Analytics** — installed and live. `@vercel/analytics/react` in `layout.tsx`. Privacy-respecting, no cookie consent banner needed.
- **Key metrics:** Page views, unique visitors, time on page (especially journal articles), newsletter signups (conversion rate by page), referral sources
- **Lighthouse target:** 95+ across all categories
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 10. Awwwards Submission Checklist

Baked in from the April 2026 SOTD-prep pass. CLAUDE.md carries the full list of learnings; this section is the quick site-level audit before any submission.

- Branded `src/app/not-found.tsx` renders for any unmatched URL (test with `/definitely-not-a-page`).
- Every dynamic slug route (`/journal/[slug]`) calls `notFound()` for unknown slugs AND exports `generateStaticParams` + `dynamicParams = false`. Never fall through to a fallback article.
- Internal-only routes (`/brand`, `/book-signup`) are guarded by `notFound()` under `process.env.NODE_ENV === "production"` so they 404 in prod builds. They're also disallowed in `src/app/robots.ts`.
- `src/app/manifest.ts` exists with name, theme_color, icons. Both `favicon.svg` and `apple-touch-icon.png` present.
- Every top-level route exports its own `openGraph.images` + `twitter.images` at 1200×630. OG files under `public/og/{page}.jpg`. Article OGs live at `public/journal/{slug}/{slug}-og.jpg` — the `write-article` command now covers generation.
- All site imagery uses `next/image` (including inside horizontal scrollers with `loading="eager"` and `priority={i < 2}` on the first two cards — the default lazy-load heuristic misses off-viewport-right cards on iOS).
- `globals.css` has a `:focus-visible` ring. No component strips it with `outline-none` without an explicit replacement.
- Icon-only buttons carry `aria-label`; decorative inline SVG gets `aria-hidden="true"`.
- `SoundToggle` inverts over the dark footer via IntersectionObserver, and pauses on `visibilitychange` + `pagehide`.
- `EditorialFrames` auto-advance is gated on an IO one-shot so rotation only starts when the module enters the viewport — first-time visitors see pillar 01 / Store first.

---

*Confidential. Auwa Limited. All rights reserved.*
