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
auwa.life/newsletter        → Email signup (also embedded across other pages)
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

6. **Newsletter signup** — Minimal. "Stay close." Email field + submit. Cormorant heading, Instrument Sans input. No long explanation.

7. **Footer** — Wordmark, copyright, minimal links (About, Journal, Instagram). Social icon for @auwa.life. Void background.

### Journal Index

**Structure:**
- Page title: "Journal" in Cormorant
- Filter/category tags: Seasons, Craft, Travel, Philosophy (Instrument Sans, subtle)
- Article grid: Kinfolk-style cards, atmospheric photography, varied sizes
- Pagination or infinite scroll (start with pagination — cleaner, more intentional)

### Journal Article Page

This is the most important page to get right. It's where people spend time, where SEO value lives, and where the brand voice is most fully expressed.

**Structure:**
- **Hero image** — Full-width, atmospheric, with gentle parallax
- **Title** — Large Cormorant, centred or left-aligned
- **Meta** — Date, reading time, category. Instrument Sans, small, subtle
- **Body** — Serif body copy (Cormorant Regular or consider a dedicated body serif like Crimson Pro or EB Garamond for long-form readability). Wide column (max ~680px) with generous line-height (1.7-1.8). Pull quotes in Cormorant Light, larger, centred. Photography interspersed — full-width or inset with captions.
- **Author block** — Small, minimal. "Words by Tom Vining" or "Words & illustration by Rieko Vining"
- **Related articles** — 2-3 cards at the bottom
- **Newsletter signup** — Repeated at article end

**Typography consideration for body copy:** The business plan notes the possibility of using serif for body copy (Kinfolk influence). For long-form journal articles, this is worth testing. Cormorant at body sizes (16-18px) may be too delicate — test EB Garamond or Crimson Pro as a dedicated body serif alongside Cormorant for display. Or use Instrument Sans for body and keep the Kinfolk feel through spacing, sizing, and photography treatment.

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

## 4. Design System

### Typography

**Display/Headlines:** Cormorant Light/Regular (or chosen serif after testing — see brand.md Section 3)
**Body copy:** To be tested. Options:
- Instrument Sans (current sans-serif — clean, modern, safe)
- EB Garamond or Crimson Pro (serif body — more Kinfolk, more editorial, needs testing for screen readability)
- Cormorant Regular at 16-18px (unified serif — may be too delicate for long-form)

**Functional/UI:** Instrument Sans 400/500
**Japanese text:** Noto Sans JP (or Noto Serif JP for editorial contexts)

### Colour

The cosmic OKLCH palette from brand.md. Dark-first. Light enters through photography and the glow accent.

- Background: void (oklch 0.08 0.025 250)
- Primary text: cosmic-200 (oklch 0.87 0.012 250)
- Secondary text: cosmic-400 (oklch 0.60 0.018 250)
- Accent: glow (oklch 0.85 0.15 105) — sparingly, for links and hover states
- Photography provides warmth and colour variety

### Spacing & Layout

- **Max content width:** 1200px (overall), 680px (article body)
- **Generous whitespace** — the page should breathe. Think Kinfolk, not a news site. Minimum 80px between major sections.
- **Grid:** CSS Grid or Flexbox. Asymmetric article cards (Kinfolk-style varied sizes)
- **Responsive breakpoints:** Mobile-first. 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

### Motion

Subtle, ambient, never attention-seeking. Consistent with brand.md Section 9.

- **Page transitions:** Gentle fade (200-300ms)
- **Scroll reveals:** Elements fade in and gently rise (5-10px translate) as they enter viewport. Staggered timing for grid items.
- **Photography:** Subtle parallax on hero images (optional — test performance)
- **Hover states:** Gentle opacity shift on cards, subtle glow on links
- **Implementation:** Framer Motion (already in the stack) or CSS transitions for simpler effects

### Photography Treatment

All photography follows brand.md Section 6: muted, warm, slight grain, gentle vignette. Create a consistent look across Tom's Japan catalogue. The Lightroom preset should be applied to all images before upload.

---

## 5. Technical Architecture

### Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Styling:** Tailwind CSS 4
- **CMS:** Sanity (headless, structured content, real-time preview, image pipeline with hotspot cropping)
- **Hosting:** Vercel (automatic deployments, edge functions, image optimisation)
- **Email:** Resend (transactional + newsletter)
- **Analytics:** Vercel Analytics or Plausible (privacy-respecting, no cookie banners)
- **Fonts:** Google Fonts via next/font (Cormorant, Instrument Sans, Noto Sans JP)

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

// Newsletter Subscriber (or handle via Resend directly)
{
  email: string
  source: string  // which page they signed up from
  subscribedAt: datetime
}
```

### Image Pipeline

- Sanity's image CDN handles responsive sizing, format conversion (WebP/AVIF), and cropping
- All images uploaded at 2x resolution minimum (2400px wide for full-width heroes)
- Hotspot cropping set in Sanity Studio for each image (ensures correct focal point across aspect ratios)
- Lazy loading for below-fold images (Next.js Image component handles this)
- Target: 95+ Lighthouse performance score

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

## 8. Newsletter Strategy

**Tool:** Resend (already in the tech stack for transactional email)

**Signup points:**
- Homepage (dedicated section)
- End of every journal article
- App/Store/Book pre-launch pages
- Dedicated /newsletter page

**Frequency:** Bi-weekly or monthly. Tied to seasonal rhythm. Not a marketing blast — a quiet, beautiful email that feels like receiving a letter. Short, atmospheric, links to new journal articles and seasonal reflections.

**Subject line style:** Poetic, not clickbait. "Seimei: the light returns" not "5 Japanese philosophy tips you need to read."

**Template:** Dark background, serif typography, one atmospheric image, 2-3 short text blocks linking to journal articles. Wordmark footer. Mobile-optimised.

---

## 9. Analytics & Performance

- **Vercel Analytics** or **Plausible** — privacy-respecting, no cookie consent banner needed
- **Key metrics:** Page views, unique visitors, time on page (especially journal articles), newsletter signups (conversion rate by page), referral sources
- **Lighthouse target:** 95+ across all categories
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

---

*Confidential. AUWA Limited. All rights reserved.*
