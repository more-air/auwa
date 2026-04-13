# AUWA Website Specification — auwa.life

*Created: April 2026. The specification for the auwa.life website — the brand's home and editorial hub.*
*Load when building the website, planning content, or working on site structure.*

---

## 1. Purpose & Positioning

The auwa.life website is the front door to the AUWA brand. It establishes AUWA as a Japanese lifestyle brand rooted in philosophical awareness before the app, store, or book exist as products. The website is the first thing anyone encounters — it needs to communicate the world, not just announce a product.

**What it IS:** A Kinfolk-inspired editorial destination. Atmospheric, contemplative, photography-led, with journal articles as the heartbeat. A place you visit to feel something, read something beautiful, and understand what AUWA is about.

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

All sections live under **auwa.life** with subpaths. auwalife.com mirrors for the Japan market.

```
auwa.life/                  → Home (editorial hub + brand introduction)
auwa.life/journal           → Journal index (all articles)
auwa.life/journal/[slug]    → Individual article
auwa.life/app               → Kokoro Mirror introduction (pre-launch: coming soon with email capture)
auwa.life/store             → Store introduction (pre-launch: coming soon with craftsman preview)
auwa.life/book              → The AUWA story universe (pre-launch: introduction + email capture)
auwa.life/about             → Tom & Rieko, the philosophy, the origin
auwa.life/brand             → Living style guide (logo, colours, typography, spacing, components)
```

### Information Architecture

**Home** is the editorial hub — not a static landing page but a living, updating page anchored by journal content. Think Kinfolk's homepage: a hero article, a curated grid of recent pieces, and subtle navigation into the four pillars.

**Journal** is the SEO engine and the content heartbeat. Long-form articles, craftsman profiles, seasonal essays, Japan travel stories. This is where brand authority accumulates and where organic search traffic lands.

**App, Store, Book** pages are initially lightweight — atmospheric introductions that establish what's coming, with email capture. They become full sections as each pillar launches.

**About** tells the story of Tom and Rieko, the philosophy of Yaoyorozu no Kami, and the origin of AUWA. Written in the brand voice: quiet, precise, present.

---

## 3. Page Layouts

### Home Page

The homepage should feel like opening a beautiful magazine, not landing on a product page.

**Structure (top to bottom):**

1. **Header** — AUWA wordmark (Cormorant Light, tracked) left-aligned. Navigation right: Journal, App, Store, Book, About. Instrument Sans, small caps, tracked. Dark background (void). Minimal, fixed on scroll.

2. **Hero** — Full-width atmospheric image or the latest journal article as a hero card. Large Cormorant headline, one line of subtext, atmospheric photography behind. Slow, subtle parallax or gentle fade-in on load. No CTA button in the hero — the content IS the invitation.

3. **Brand statement** — A single line of philosophical text. Centred, Cormorant, generous whitespace above and below. Something like: "Japanese philosophical awareness applied to modern life." This is the only "explanation" on the page. Let it breathe.

4. **Journal grid** — 3-6 recent articles in a Kinfolk-style grid. Mix of card sizes (one large, two medium, or asymmetric layout). Each card: atmospheric photography, Cormorant headline, one-line description, category tag. Dark backgrounds, warm photography.

5. **The Four Doors** — A quiet section introducing the four pillars. Not a feature grid — four atmospheric panels (image + short text) that invite exploration. App, Store, Journal, Book. Each links to its section. Think Hoshinoya's room selection: atmospheric, not informational.

6. **Footer** — Three sections stacked: (1) "Stay close." newsletter signup on dark void background with `SignupForm` component, (2) pillar links (Journal · Store · App · Book) centred in EB Garamond, (3) bottom bar with © AUWA and social icons (Instagram, X, LinkedIn).

### Journal Index

**Structure:**
- Page title: "Journal" in Cormorant
- Filter/category tags: Seasons, Craft, Travel, Philosophy (Instrument Sans, subtle)
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
  - **Pullquotes** — EB Garamond at clamp(1.75rem, 3.5vw, 2.75rem), full opacity.
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

### App Page (Pre-Launch)

- Atmospheric hero (dark, orb glow or AUWA character illustration)
- One line: "A daily awareness practice. Reveal your kokoro."
- Brief poetic description (3-4 sentences, Cormorant)
- Email capture: "Be the first to know."
- No screenshots, no feature lists, no pricing

### Store Page (Pre-Launch)

- Atmospheric hero (craftsman photography from Monolise research trips)
- One line: "Lifetime objects with kokoro."
- Brief description of the philosophy (craft over disposability, every object chosen because a master poured their spirit into making it)
- 2-3 preview images of the kinds of objects that will be available
- Email capture: "Be the first to know."

### Book Page (Pre-Launch)

- Atmospheric hero (illustration from AUWA stories)
- One line: "A cosmic being who reveals the kokoro in all things."
- Brief introduction to the four stories
- Illustration samples (2-3 atmospheric images)
- Email capture

### About Page

- Tom & Rieko's story (short, in brand voice, with photography)
- The philosophy of Yaoyorozu no Kami (accessible, not academic)
- The origin of AUWA (the name, the decade of development)
- The Eshi + Hanmoto model (brief, charming)
- Photography of Tom and Rieko (atmospheric, not corporate headshots)

---

## 4. Design System (Implemented)

*The living reference for the built website. See also the brand page at auwa.life/brand for a visual style guide.*

### Typography (Locked)

- **Display + Editorial:** EB Garamond (400, 500, 600, 700; normal + italic) — `font-display` in Tailwind
- **Functional / UI:** Instrument Sans (400, 500, 600) — `font-sans` in Tailwind
- **Japanese:** Noto Sans JP (300, 400) — `font-jp`; Noto Serif JP (400, 600) — `font-jp-serif`
- All loaded via `next/font/google` with `display: swap`

**Type sizing rules:**
- 12px — uppercase metadata labels (card categories, author credits). Tracking: 0.08em
- 13px — uppercase interactive labels (journal filters, micro-season link, image captions). Tracking: 0.06em
- 14px — all UI text (navigation, excerpts, form inputs, buttons, copyright). Tracking varies by context
- 18-19px — article body text (EB Garamond). Line-height: 1.85
- 18-20px — about page prose (EB Garamond). Line-height: 1.7
- 20-22px — card titles, pillar headings (EB Garamond). Tracking: 0.01em
- 28-32px — section headings ("Continue reading", "Stay close", "The name"). Tracking: 0.01em
- clamp(2.5rem, 5.5vw, 4.5rem) — page titles (h1). Tracking: 0.01em
- clamp(1.75rem, 3.5vw, 2.75rem) — pullquotes (EB Garamond). Tracking: 0.005em
- clamp(3rem, 8vw, 6.5rem) — micro-season kanji (Noto Serif JP). Tracking: 0.06em

**Form CTA buttons** use `font-medium` (500 weight) across all pages. All other UI text is weight 400.

### Colour (Light Theme)

The website uses a pure white background with the void/cosmic palette for text. This is the Kinfolk-inspired editorial expression of the brand — the dark palette lives in the app, social, and newsletter modules.

- **Page background:** Pure white — `oklch(1 0 0)` / `--color-surface`
- **Raised surfaces:** `oklch(0.95 0.005 250)` / `--color-surface-raised`
- **Text colour:** `--color-void` (`oklch(0.08 0.025 250)`) at opacity levels:
  - 100% — headings, titles, active nav
  - 80% — about page prose, footer category links
  - 70% — nav links, hover states, founder bios
  - 60% — subtitles, article subtitle
  - 50% — excerpts, captions
  - 45% — "Read the latest" arrow link
  - 40% — metadata labels, filter buttons (inactive), social share icons
  - 35% — input placeholder text
- **Borders:** void at 8% (dividers), 20% (form underlines), 50% (form focus)
- **Dark module (newsletter):** `bg-void` with white text at similar opacity levels

### Spacing & Layout (Implemented)

**Responsive horizontal padding (page-level gutter):**
- Mobile: 24px (`px-6`)
- Tablet: 48px (`md:px-12`)
- Desktop: 80px (`lg:px-20`)
- XL: 112px (`xl:px-28`)

**Vertical section spacing (standard rhythm):**
- Regular sections: `pb-16 md:pb-24` (64px / 96px) — the default for all modules
- Hero top padding: `pt-12 md:pt-16` (48px / 64px) — intentionally tighter
- Micro-season module: `py-24 md:py-36` (96px / 144px) — standalone moment, extra breathing room
- Newsletter module: `py-28 md:py-40` (112px / 160px) — generous, dark background module
- Footer category links: `py-16 md:py-24` (matches standard)
- Header height: `h-16 md:h-20` (64px / 80px)

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

### Motion (Implemented)

Uses a custom `FadeIn` client component with IntersectionObserver (not Framer Motion).

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out-expo
- **FadeIn duration:** 800ms default
- **FadeIn translateY:** 12px rise
- **FadeIn root margin:** `"0px 0px -40px 0px"` — triggers 40px before entering viewport
- **Stagger delays:** 60-100ms per item (grid cards, nav items)
- **Hover transitions:** 300ms with `transition-colors duration-300`
- **Header scroll:** Hides on scroll down, shows on scroll up (no animation library, pure React state)
- **Mobile menu:** 500ms opacity transition with staggered nav item reveals

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
- **Analytics:** Vercel Analytics or Plausible (privacy-respecting, no cookie banners)
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
// No Sanity schema needed. See context/newsletter.md for details.
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
| Header | `header.tsx` | Yes | Site header with AUWA wordmark, nav links, mobile menu. Hides on scroll down, shows on scroll up. |
| Footer | `footer.tsx` | No | "Stay close" newsletter signup (dark), pillar links, copyright + social icons. Shared across all pages. |
| SignupForm | `signup-form.tsx` | Yes | Email signup form. Props: `source` (app-waitlist / store-waitlist / book-waitlist / newsletter), `buttonText`, `successMessage`, `theme` (light/dark), `className`. Posts to `/api/signup`. |
| FadeIn | `fade-in.tsx` | Yes | IntersectionObserver-based fade-in animation. Accepts `className`, `delay`, `children`. Not Framer Motion. |
| MicroSeason | `micro-season.tsx` | Yes | Displays current 72 micro-season with kanji. |
| ObfuscatedEmail | `obfuscated-email.tsx` | Yes | Bot-proof email display. Shows `user[at]domain` initially, reveals real `mailto:` link on click. Props: `user`, `domain`. |

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

- Dynamic meta tags per page (title, description, OG image)
- Structured data (JSON-LD) for articles (Article schema)
- Sitemap auto-generated
- Canonical URLs
- Journal articles are the primary SEO asset — target long-tail keywords around Japanese philosophy, craft, seasonal living, awareness

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
5. **Apply photography treatment** (Lightroom "AUWA — Atmospheric" preset)
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
- "Awareness, Not Mindfulness" — Why AUWA uses the word "awareness" instead of "mindfulness." The difference between a Western self-help concept and a Japanese philosophical worldview.
- "The Guest" — On being a respectful visitor to Japan (and to any culture). The awareness that comes from understanding you are in someone else's home. Photography: Japan travel moments.

### Content Calendar (Post-Launch)

After the initial 10 articles, publish 1-2 articles per week aligned with the 72 micro-seasons content calendar. Each micro-season (5 days) is an opportunity for a seasonal essay, craftsman profile, or travel piece. This gives the journal a natural rhythm without feeling forced.

---

## 8. Newsletter & Email

Fully documented in `context/newsletter.md`. Summary:

- **Welcome emails** auto-send on signup (4 variants per source: newsletter, app-waitlist, store-waitlist, book-waitlist)
- **Newsletter sends** are manual via `/send-newsletter` slash command or API endpoint
- **Signup points**: shared footer on every page ("Stay close."), plus dedicated forms on app/store/book teaser pages
- **Templates**: React Email components in `src/emails/` (welcome.tsx, newsletter.tsx)
- **Resend segments**: App Waitlist, Store Waitlist, Book Waitlist (3 segments, free plan limit). Newsletter subscribers go to audience without a segment.
- **Subject format**: `[Topic] | AUWA` — poetic, not clickbait

---

## 9. Analytics & Performance

- **Vercel Analytics** or **Plausible** — privacy-respecting, no cookie consent banner needed
- **Key metrics:** Page views, unique visitors, time on page (especially journal articles), newsletter signups (conversion rate by page), referral sources
- **Lighthouse target:** 95+ across all categories
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

---

*Confidential. AUWA Limited. All rights reserved.*
