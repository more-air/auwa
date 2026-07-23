# Auwa — Done

*Last revised: 23 July 2026. The record of what Auwa has actually achieved, so progress is banked rather than forgotten the moment it ships. The mirror of `todo.md`: as items there are completed, they move here. Strategy and rationale live in the pillar and business context files; this is the honest tally of what exists. PDF export: `documents/Auwa-Done.pdf`.*

*Reconstructed 23 Jul 2026 from the full commit history (267 commits, 19 Mar → 23 Jul 2026) and the context files. Dates are when the work landed.*

---

## Milestones at a glance

- **Mar 2026** — Book 1 prototype with images; repo and context system established.
- **Apr 2026** — Full editorial website live at auwa.life; email capture and welcome system; 8 journal articles; Awwwards readiness and submission.
- **Apr 2026** — Awwwards **Honorable Mention won**; scored well in the running for Site of the Day.
- **May 2026** — Kokoro Mirror app built and given a full craft pass; store model pivoted to first-party + collab editions; homepage rebuilt to its current form.
- **May–Jul 2026** — Instagram grown from ~700 to 2,667 followers; 72-seasons cadence established.
- **Jul 2026** — Madrid Protocol trademark applications filed (JP/US/EU/CN); privacy policy live; Meta lead-form ad live and converting; owned-list capture engine started.

---

## Brand & identity

- Brand architecture locked: single domain **auwa.life** with `/app` `/store` `/journal` `/book`; all variants (auwalife.com, www.*) 301-redirect to auwa.life; Google Search Console verified and sitemap submitted.
- Auwa wordmark (serif) finalised; the character deliberately reserved for the app, book, and figures.
- Full brand system documented and in use: typography (EB Garamond + Instrument Sans + Noto JP), OKLCH cosmic palette plus emotional-state colours, light/dark specs, motion principles (`brand.md`).
- **Yamato emotional framework** (Ha-Ta-A-Yu-Wa, five states) developed by Rieko, replacing the earlier Kido Airaku.
- **72 micro-seasons** system defined as ambient philosophy and the spine of the content calendar.
- Founder identities settled and used publicly: Rieko Maeda (Eko), Creator · Eshi; Tom Vining, Producer · Hanmoto.
- Philosophy language settled on "ancient Japanese belief that a life force resides in all things" (moved on from "Shinto"), with Kokoro as the core expression.

## Website (auwa.life)

The largest body of shipped work: the editorial site went from nothing to Awwwards-recognised in roughly six weeks, then kept being refined.

- Teaser site live (late Mar); full **Kinfolk-inspired editorial site** live from 9 Apr with the complete brand system.
- Homepage iterated hard to its current form: EditorialFrames (desktop) + PillarParade (mobile), the SevenStars orbital and Meet Auwa approach choreography on `/book`, closing "Ready to step in?" moment.
- **8+ journal articles** published with original photography: Shigefusa, Yakushima, Koya-san, Yunomine Onsen, 72 Seasons, oroku-gushi, The Beginning, and more.
- Full **SEO** build: keyword-rich titles/descriptions/H1s, structured data, sitemap, canonical fixes; the article workflow bakes SEO and indexing in.
- Signup forms wired to Resend with source tagging; figure-lottery bottom strip; article signup card now on every journal article (23 Jul).
- **Awwwards**: three polish batches (page transitions, staggered reveals, custom cursor), a full readiness pass (404, OG, manifest, focus states, next/image), and a mobile performance/a11y pass (deferred the 3MB audio, LCP ~5.1s → ~2s). **Honorable Mention won.**
- Deep cross-browser hardening: an extended run of iOS Safari and Android Chrome compositing fixes, a single motion/spacing/scroll token system, robust page transitions.
- `/privacy` page live (22 Jul, standard pre-launch, not lawyer-reviewed); あうわ entrance loader parked (22 Jul) to stop cold visitors waiting ~3s.
- Photography pipeline: Auwa Lightroom presets, a sharp export pipeline, and an image manifest.

## Book

- **Book 1 complete** (18 pages; prototype with images since March).
- **Book 2 finished** (revised from its draft). Both are at print test and will release as a set.
- Revision method proven: roughly two-thirds word reduction, atmospheric over narrated (the template for Books 3 and 4).
- Review mockups and PDFs produced for sharing.

## App — Kokoro Mirror (auwa.app)

- Scaffolded 28 May: cosmic theme and the daily-revelation spine.
- v1 surfaces built: onboarding, sanctuary, daily light, trove, senshin, archive, kokoro, letter, settings.
- Moved into its own Next.js project at **auwa.app** and deploying (28 May).
- **Full craft pass, 29 May**: design-system foundation, custom iconography, arrival redesign with the real Auwa silhouette, daily-flow rework, a delight pass, and a type/primitive consistency sweep.
- `/app/preview` experience route added on the website (22 Jul).
- State: built and craft-passed. Not yet released to friends (that is the current to-do).

## Figure

- Blender file done; multiple prototype sizes 3D-printed on BambuLab.
- Packaging concept defined: balsa box, ribbon, eco insert, handwritten Rieko card.
- (Bio-filament testing, finishing method, and final pricing remain on the to-do.)

## Social / Instagram

- **@auwalife grown from ~700 (May restart) to 2,667 followers** (22 Jul) — Phase 1 target met, and held through the six-week gap in June.
- Breakout post: 4,000+ likes, ~200 shares, 65 comments (the format to repeat).
- ~£350 ad spend used to date, blended cost-per-follower well under the £1 quality gate.
- **72-seasons cadence** established: Rieko draws one illustration or short video every five days, and is enjoying the rhythm (also the future 72-piece print set).
- IG editorial system built, plus a live planning grid at auwa.life/instagram (drag-to-reorder); content queue runs 10+ weeks ahead.
- **Meta lead-form ad live** (22 Jul, Ads Manager, Leads objective, Instant Form, UK+US, IG-only). Day-1: 5 leads at £0.94, under the £2 gate.
- Those first 5 leads imported into Resend and welcomed (23 Jul); reusable importer (`scripts/import-meta-leads.mjs`) and `/marketing:import-leads` command built.

## Email & capture

- Resend fully integrated: contacts API and sending, three segments (App / Store / Book waitlist), welcome emails auto-firing per source (four variants).
- Newsletter system with `/marketing:newsletter`.
- **Quiet Letter** micro-season broadcast template built (22 Jul) with `/marketing:quiet-letter`. (First real send to the list remains on the to-do.)
- ~93 organic subscribers (12 book / 41 store / 38 app) plus the first 5 Meta leads.

## Business & strategy

- Full written foundation: business plan, competitor analysis, Japan market analysis, and the structure/IP document.
- Store model **pivoted** (May) from a multi-vendor marketplace to first-party + collab editions.
- Sequencing decided: app before store; book as hybrid POD + pre-order-funded offset first edition.
- Working system built: context files in topical subfolders, an md-to-PDF pipeline, and repeatable slash commands (article, optimise, newsletter, quiet-letter, deploy, import-leads).
- Lifestyle-design principle agreed (15 Jul): build the durable asset base now, coast later; the character is the public face, never the founders.

## Trademarks & legal

- UK word marks filed: **UK00004341028** and **UK00004373944**; design mark **UK00004373930**.
- Seven Nice classes; class and territory protection rationale documented.
- **Madrid Protocol applications filed** (word + design) across **JP / US / EU / CN** (20 Jul).
- Corporate entities in place: Auwa Limited and More Air Limited.
- Privacy policy published (pre-launch, not yet lawyer-reviewed).
- (Open: pay WIPO before 15 Aug; watch the design-mark UK opposition window ~3 Sep — both on the to-do.)

---

*Upkeep: when a `todo.md` item is genuinely finished, move it here under its pillar with the date, then re-export both PDFs. Keep this factual — only things that actually exist. It doubles as the raw material for the eventual public "arrival" story.*
