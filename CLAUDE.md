# Auwa — Project Context

*Last Updated: 1 May 2026*

---

## WORKING WITH THIS REPO — SAFETY RULES (READ FIRST)

These rules are non-negotiable, including in `--dangerously-skip-permissions` / "bypass permissions" mode. They exist because of a real incident on 1 May 2026 in which a session ran `git checkout HEAD -- <files>` to "revert the working tree", silently wiping multiple sessions of uncommitted work. The work was eventually reconstructed from session transcripts; assume the next time will not be recoverable.

**Never run a destructive git command without first asking the user.**

Specifically: do NOT run any of the following without an explicit, in-conversation confirmation that names the actual files / branches involved AND describes what will be lost:

- `git checkout HEAD -- <path>`, `git checkout -- <path>`, `git checkout <ref> -- <path>`
- `git restore <path>`, `git restore --source=… <path>`
- `git reset --hard`, `git reset --merge`
- `git clean -fd`, `git clean -fdx`
- `git rm` against tracked files with uncommitted changes
- `git stash drop`, `git stash clear`
- `git branch -D`, `git push --force`, `git push --force-with-lease`
- `git rebase -i`, `git rebase --onto …` against branches with uncommitted work
- `rm -rf` against the repo or any subdirectory containing uncommitted work
- `cp <source> <dest>` or `Write` over a file with uncommitted changes from a different on-disk source (HEAD, another branch, a backup)

Before running ANY of these:

1. State plainly what the command will do. Example: *"This runs `git checkout HEAD -- src/app/book/page.tsx` which will wipe the uncommitted changes shown in `git diff` for that file. The lost work cannot be recovered from git."*
2. Show the user the current `git status` and `git diff --stat` for the affected paths.
3. Wait for an explicit OK that names the files (e.g., "yes, revert book/page.tsx").
4. Only then run the command.

**If the user asks for a "working tree revert" or "undo my changes" or similar, treat it as ambiguous.** Do not assume they mean `git checkout HEAD --`. Ask: *"Do you want to discard these specific changes permanently, or stash them, or commit them to a throwaway branch first?"* The default answer is to PRESERVE work, not discard it.

**Don't propose `git checkout HEAD --` as a fix for build/runtime errors.** The fix is in the source code, not in throwing away local changes. If reverting feels like the simplest path, the user can revert in their editor file-by-file and keep what they want.

**Recovery is not free.** Reconstructing wiped work from `~/.claude/projects/<project>/*.jsonl` transcripts is possible but slow, brittle, and only works if the bad command happened recently enough that the relevant sessions are still on disk. Treat that path as last-resort, not a safety net that justifies casual destructive commands.

### If you ever DO need to recover from a destructive command

A documented recovery walkthrough exists. The high-level shape:

1. List sessions in `/Users/admin/.claude/projects/-Users-admin-Github-auwa/*.jsonl` by mtime; identify the disaster session and the sessions whose work needs recovering (typically: everything after the last deploy through to the moment of the destructive command).
2. In the disaster session, locate the FIRST destructive command's timestamp — that's the cutoff.
3. For every file in `src/`, `public/`, `context/`, `scripts/`, or the project root that was Edit/Write-touched in that window, replay the events: take the most recent full Read result before the cutoff (strip the `<num>\t` cat-n prefix), then apply each subsequent Edit's old/new replacement and each Write in chronological order. Skip partial Reads (offset/limit set) — they shouldn't replace `current_content`.
4. Diff each reconstructed file against current on-disk; present diffs one at a time for explicit apply/skip approval. Apply via `Edit` or `Write` tools. **Never** via `git checkout`, `git restore`, or any other destructive primitive.
5. Files that need bootstrap content (no full Read in window) can be initialised from `git show HEAD:<path>` — flag clearly that this is a bootstrap.

The full session that did this on 1 May 2026 is preserved in the transcripts and can be referenced as a worked example if it happens again. Don't try to skip steps; the partial-Read trap and the IO ref bug will both bite a careless replay.

### Routine commits to GitHub + Vercel

The simplest preventive habit is to commit + deploy at the end of every meaningful session — that way a destructive command can only wipe one session's worth of work, not many. The `/website:deploy` slash command runs the full flow (commit, push, deploy to Vercel). Use it.

---

## What Auwa is

Auwa is influenced by the ancient Japanese belief that a life force resides in all things. Not just people and animals, but rivers, mountains, a handmade bowl, a well-worn knife, the changing light of a season you almost didn't notice. Auwa uses the word Kokoro (心) as its own expression of this idea. Unlike English, which separates heart, mind, soul, and spirit into distinct concepts, Kokoro holds them as a single, undivided whole. In a culture of speed, distraction, and disposability, Auwa builds awareness: of how you feel, of the objects you live with, of the world you move through, and of your connection to the people and nature around you.

Where Western wellness centres on the self, Auwa draws from Japanese collectivist philosophy. Awareness isn't just inward. It extends to the craftsman who spent decades mastering a single knife, to the micro-season shifting outside your window, to the stranger whose day you can change by paying attention. This is "Japanese philosophical awareness applied to modern life."

Auwa is built on four interconnected pillars: a daily awareness practice app (Kokoro Mirror), a curated Japanese craftsman store, an editorial journal, and an illustrated story universe. These are not four separate products. They're one philosophy expressed four ways, one world with four ways in. The app builds emotional awareness, the store cultivates material awareness, the journal builds cultural awareness, the book teaches philosophical awareness. Public-facing copy uses the "four ways in" / "Auwa expresses this through four things" framing. The word "expressions" is the internal frame for how the pillars relate to the philosophy.

Within the book and app, Auwa is also a character — a luminous being who reveals the Kokoro in everything through a magical light shower. The character is the embodiment of the philosophy, created by Japanese illustrator Rieko Maeda over a decade of development. It appears only in the stories and the app, making those spaces special. The broader brand — store, journal, overall identity — expresses the philosophy through design, editorial, and craft without needing the character.

---

## THE FOUR BRAND PILLARS

### Kokoro Mirror App (auwa.life/app)
Daily awareness practice. User shares how they feel, Auwa's AI identifies the emotion using a proprietary Yamato-language framework, reflects it back poetically alongside Rieko's illustrated Auwa character. Shareable Kokoro cards, journal, Kokoro Archive for pattern recognition over time. The Auwa character appears here (and in the book) — one of two spaces where it lives. PWA first, wrappable for native via Capacitor. Free tier: 3 revelations/month. Paid: £6.99/month or £49.99/year.

### Auwa Store (auwa.life/store)
Curated multi-merchant marketplace for Japanese craftsman products — knives, ceramics, tea caddies, washi, textiles — plus Auwa's own collectible figures. Lifetime products with Kokoro: the antithesis of throwaway culture. Every object is chosen because a master craftsman poured their spirit into making it. Shopify multi-vendor, Stripe Connect for direct merchant payouts to Japan. Rieko leads craftsman outreach in Japanese. Tom's experience running a Japanese multi-merchant platform (2005-2007) is the direct operational precedent.

### Auwa Journal (auwa.life/journal)
Editorial content. Travel stories, craftsman profiles, onsen retreats, seasonal living, Japanese philosophy in practice. Written by Tom and Rieko from their own experiences in Japan. Builds brand authority, drives SEO, feeds Instagram content, and serves as a portfolio when approaching craftsman partners. The editorial voice that makes the brand feel alive between product launches.

### Auwa Book (auwa.life/book)
The illustrated story universe. A series of illustrated stories, the WAWA origin, the philosophy, creator bios. The canonical source of the Auwa universe. This is where the deeper mythology lives — for those who want to go deeper.

---

## THE BRAND PHILOSOPHY

Auwa is influenced by the ancient Japanese belief that a life force resides in all things. No divide between sacred and ordinary, between thinking and feeling. This belief is expressed in concepts like Yaoyorozu no Kami (八百万の神, "countless spirits") and in the folk tradition that objects used with care accumulate a kind of soul. Auwa uses the word Kokoro (心) as its own expression of this idea: the holistic Japanese concept that unifies what English separates into heart, mind, soul, and spirit. This connects all four pillars: the app reveals Kokoro in emotions, the store sells objects with Kokoro, the journal shares the world where Kokoro lives, the stories show Auwa revealing Kokoro in nature. Auwa's creator grew up within this philosophy in Kansai — it is not a marketing angle, it is lived experience.

The app uses two additional Japanese philosophical frameworks internally:

**Yamato Emotional Framework (Ha-Ta-A-Yu-Wa)** — Rieko's proprietary framework of five emotional states based on ancient Yamato language: Hare (晴/Radiant), Takaburi (昂/Intense), Aware (哀/Reflective), Yuragi (揺/Unsettled), Nagomi (和/Serene). Each contains multiple sub-expressions described through poetic Japanese words. Replaces the earlier Kido Airaku framework. Users never see the taxonomy — they feel the precision.

**72 Micro-Seasons (Shichijūni-kō)** — Used as ambient philosophy, not user-facing taxonomy. Powers the content calendar (72 posts/year, refreshing every 5 days), journal rhythm, and store curation. In the app: a subtle calligraphic kō stamp (atmospheric, tappable for the curious). The AI's reflections do NOT force connections to the current micro-season.

---

## VISION & VALUES

**MTP:** To show the world that a more aware, more intentional life is possible, guided by Japanese philosophy that has practised it for centuries. Short form: *Restore awareness to a distracted world.* (Robin Sharma)

**Vision:** A world where people live with deeper awareness: of their emotions, of the objects they share their lives with, of the natural world around them, and of their connection to other people. Real abundance is not material. It is the abundance of the heart.

**Mission:** To apply Japanese philosophical awareness to modern life, through four interconnected doors: a daily awareness practice, curated craftsman objects, editorial storytelling, and an illustrated story universe, all rooted in the ancient Japanese belief that a life force resides in all things.

**Core values:** Awareness over autopilot. Kokoro over commerce. Connection over individualism. Depth over surface. Respect over consumption. Authenticity over algorithm. Seasonal wisdom over hustle culture. Clarity over clutter.

**Structural precedents:** Kinfolk (aesthetic philosophy + editorial + experiences, acquired ~$30M), Monocle (worldview + editorial + retail + media, ~$10M+ revenue), Hodinkee (digital-age appreciation for craft, raised $40M+), Goop (wellness + retail + storytelling, ~$100M revenue), Snow Peak (gear + experiences + community, ¥25.7B). Auwa's unique angle: Japanese cultural authenticity rooted in a living philosophy, an illustrated story universe, and an AI-powered awareness practice.

---

## What Auwa is not

- Not clinical (no CBT, no diagnosis, no coping strategies)
- Not gamified (no streaks, no badges, no push notifications)
- Not generic (not another AI chatbot with a wellness skin)
- Not a weather app (micro-seasons are philosophy, not forecasts)
- Not advice-giving (Auwa reveals, period)
- Not a single-product app company (it's a four-pillar lifestyle brand)
- Not exoticising Japan (philosophy-forward, not Orientalism)

---

## CURRENT PHASE

- Illustration refresh in progress (MidJourney + Rieko's originals, ~150 images across 4 stories)
- Creative direction being locked (character variants, colour system, brand feel)
- Instagram relaunch: building audience from 700 → 5K followers (Instagram only, single-platform focus)
- Teaser page live at auwa.life capturing emails
- Website build next (Kinfolk-inspired editorial site, few days with v0/Stitch + Claude Code)
- App build follows creative direction (Figma design system → Claude Code production)
- Soft launch target: Q2/Q3 2026
- Store soft-launch target: Month 6-9 (after app validates)
- AI reflection quality is the single most important deliverable

---

## KEY DECISIONS MADE

**Brand architecture:**
- Single domain: auwa.life with /app, /store, /journal, /book. All variants (auwalife.com, www.auwalife.com, www.auwa.life) 301 redirect to auwa.life. Google Search Console verified, sitemap submitted.
- Auwa wordmark logo (serif typeface) — character saved for app, stories, figures, not the logo
- **Brand name in writing:** always "Auwa" in body copy, captions, alt text, articles, hashtags, headings — never "AUWA". The all-caps form belongs to the wordmark/logo treatment only, not to prose. Hashtags are always lowercase (`#auwa`, `#kokoro`).
- Premium, refined aesthetic — serif type has that ancient, crafted feel

**App:**
- Yamato emotional framework (5 states: Hare, Takaburi, Aware, Yuragi, Nagomi) with sub-expressions — replaces Kido Airaku
- Micro-seasons as ambient philosophy, NOT tied to AI reflection text
- Auwa character appears in the app (and book only) — these are the two spaces where the character lives
- Web app (PWA) first, wrappable for native later via Capacitor
- Free tier: 3 revelations/month; paid tier (£6.99/month) unlocks depth, not access
- Auwa character appears in the app — warmth and brand connection, not cold/clinical
- No vanilla/character-free version (the character IS the differentiator)
- Illustrations are the most valuable asset — refresh them BEFORE building the app

**Store:**
- Shopify multi-vendor marketplace with Japanese craftsmen (building on Tom's 2005-2007 experience)
- Stripe Connect for direct payouts to Japan
- Auwa figures (self-produced, 3D-printed BambuLab) alongside curated craftsman products
- Store soft-launch Month 6-9 (after app validates)

**Social & marketing:**
- Instagram-only until 5K followers (then expand to TikTok reposts + YouTube depth content)
- 4 content pillars: Kokoro Reveal, Japanese Wisdom, Behind the Kokoro, Seasonal Living
- £2K Year 1 Instagram ad budget, content-first growth
- Fin DAC collaboration (96K followers, existing Auwa stencil — warm lead)

**Email:**
- Resend fully integrated: contacts API + email sending
- Welcome emails auto-fire on signup (4 variants per source)
- No double opt-in (friction not worth it at this scale)
- Newsletter sends via `/marketing:newsletter` command or API endpoint
- Sending domain `auwa.life` must be verified in Resend before emails deliver
- React Email (`@react-email/components`) for all templates
- 3 Resend segments (free plan limit): App Waitlist, Store Waitlist, Book Waitlist
- Newsletter subscribers go to audience without a segment

**Timing:**
- Hotel B2B deprioritised to Year 2
- Press/podcast outreach after 5K IG followers
- YouTube for depth content Phase 2-3
- Retreats, workshops, expanded store: Year 2 (earned by results)

---

## THE KOKORO MIRROR — CORE UX

Arrival (dark, calm) → User types freely → Light shower animation → Kokoro revelation (gradient + Auwa character + calligraphic stamp + AI-generated poetic reflection) → Optional journal → Shareable card → Saved to Kokoro Archive.

What users NEVER see: the number 72, micro-season names forced into reflections, any taxonomy, advice or "try this" suggestions.

---

## TEAM MODEL (ESHI + HANMOTO)

Following the traditional Japanese ukiyo-e model (artist + publisher as equal partnership).

**Rieko (Creator/Eshi):** Illustrations, seasonal content, figure design, creative direction, Japanese craftsman outreach (native Japanese speaker), store curation.
**Tom (Producer/Hanmoto):** App design and build, brand, business development, marketing, project oversight, store platform and operations.

**Working pattern:** Tuesday-Friday (3-4 day week, 10am-6pm). Auwa gets 60%, More Air 25%, ventures 10%. No work Monday. Health and relationship come before any deadline.

---

## THE HIERARCHY OF VALUE

1. **Permanent, uncopyable:** Rieko's original art + manuscripts, a series of illustrated stories, the Auwa name and etymology (あうわ), Yaoyorozu no Kami foundation, proprietary Yamato emotional framework, Rieko's identity as Japanese creator, craftsman relationships
2. **Valuable, adaptable:** Refreshed illustration library, character designs, seasonal content system, brand identity, store curation and presentation
3. **Useful today, potentially commoditised tomorrow:** The app, the tech stack, the AI reflection engine, the Shopify store platform

---

## ILLUSTRATION PRINCIPLE

Rieko's original art is the source of truth. AI (MidJourney) refreshes and scales her vision for digital formats — it doesn't replace it. Always credit Rieko as creator. The human fingerprint must always be visible. The illustration style — influenced by Forsythe, Jeffers, Klassen, Watanabe — looks like "children's book" but reaches adults because it disarms and bypasses cynicism. Precedents: Charlie Mackesy (7M copies), Studio Ghibli, Moomin. The format is a Trojan horse for philosophy.

---

## MARKET POSITION

The Japanese awareness/lifestyle space is structurally unoccupied. Books sell millions (ikigai: 5-7M copies) but no brand owns the space. Apps exist for mood tracking and AI journaling but none are built from Japanese philosophy. Japanese craft exporters (Nalata Nalata, Analogue Life, Tortoise) sell products but have no digital companion, no emotional framework, no character universe. No competitor assembles all of Auwa's elements under one roof.

Interest in Japan is at an all-time high (42.7M visitors in 2025, anime market $37.7B, Pinterest Japanese aesthetic searches up 405%). The weak yen makes Japanese craft products 30-40% more accessible than 5 years ago. And in the same way Hodinkee proved that a digital-age audience would develop deep appreciation for hand-crafted mechanical watches, Auwa bets that AI acceleration makes people more — not less — hungry for objects made by human hands with centuries of tradition behind them. The timing is right.

---

## CONTEXT FILES

These files are NOT auto-loaded. Only read them when you need deeper context on a specific topic. Ask which file is relevant before loading, to conserve tokens.

**Shortcut phrases.** When the user's first message contains any of these phrases, load the listed files together without asking:

- *"website session"*, *"website updates"*, *"website work"*, *"website tweak"*, *"website fix"*, *"website bug"* → load `context/website/website.md` + `context/website/patterns.md` + `context/brand/brand.md`.
- *"newsletter send"*, *"send newsletter"* → load `context/marketing/newsletter.md` + `context/pillar/journal.md` + `context/brand/brand.md`.
- *"social session"*, *"instagram"*, *"social post"* → load `context/marketing/instagram.md` + `context/brand/brand.md` + `context/marketing/arrival.md`.
- *"article"*, *"journal article"*, *"write article"* → load `context/pillar/journal.md` + `context/website/patterns.md` + `context/brand/brand.md`.

Whenever `context/website/website.md` is loaded for implementation work (component changes, bug fixes, deploys), ALSO load `context/website/patterns.md`. The two are paired.

**Pillars (`context/pillar/`):**

- `context/pillar/app.md` — Kokoro Mirror app specification: core UX flow (input → light shower → revelation → journal → share → archive), AI reflection principles and voice, sub-expression definitions, vague input handling, screen-by-screen detail, technical architecture (Next.js, Claude API, Vercel Postgres, Sanity, Stripe), data model, API routes, build phases, design principles, colour system, FigJam flow reference.
- `context/pillar/book.md` — The four-book illustrated universe: status of each book (Book 1 complete at 18 pages, Book 2 in revision, Books 3 and 4 TBC), what the Book 1 revision achieved (two-thirds word reduction, atmospheric over narrated), revision principles as a template, canonical source of the Auwa character and story mythology.
- `context/pillar/journal.md` — Journal pillar and editorial writing guide: voice and style rules, article structure (content block types and layout engine), production workflow (brief to published article), image preparation, the four content territories (Seasons, Craft, Philosophy, Travel), launch article plan. (Was `editorial.md` pre-restructure.)

**Brand (`context/brand/`):**

- `context/brand/brand.md` — Brand guidelines: logo/wordmark specs, typography system (EB Garamond + Instrument Sans + Noto Sans/Serif JP), colour system (OKLCH cosmic palette + emotional state colours), light/dark theme specs, photography direction, illustration integration, social content templates, motion principles, cross-site consistency (auwa.life subpaths).
- `context/brand/manifesto.md` — The seven reasons for building Auwa, what Tom and Rieko each bring, success/failure/slow-burner scenarios, motivation for when you hit a wall.
- `context/brand/reference.md` — Illustration workflow (MidJourney + Rieko), archival/authentication strategy, collectible figure rules, store precedents (Monolise + Japanese merchant platform history), Fin DAC relationship, Nokia Animaru precedent, strategic lessons (KAWS, Labubu, Goop, Snow Peak, Hodinkee).

**Business (`context/business/`):**

- `context/business/business.md` — Master business plan: executive summary, brand philosophy (Yaoyorozu no Kami), vision/values, Auwa name/origin, products (Kokoro Mirror app, Auwa Store, Auwa Journal, Auwa Book, figures, Year 2+), market analysis, go-to-market phases, content engine, customer acquisition, financial projections, corporate/legal, team, risk analysis, strategic priorities.
- `context/business/competitors.md` — Competitor analysis: AI journaling (Reflection, Rosebud, Mindsera, Stoic), mood tracking (Daylio, Reflectly, Moodnotes), wellness (Headspace, Calm, Wysa), Japanese cultural products (72 Seasons, Pentad), collectibles (Labubu, KAWS, Sonny Angel), multi-category lifestyle brands (Goop, Snow Peak, Rapha, Monocle, School of Life), Japanese craft exporters (Nalata Nalata, Analogue Life, Rikumo, Tortoise, Kinto). Competitive matrix, features to adopt/avoid, signals to monitor.
- `context/business/japan.md` — Japan market analysis: tourism stats (42.7M visitors, ¥9.5T spending), cultural export growth (anime $37.7B), yen dynamics, Japandi trend (405% Pinterest growth), ikigai/wellness crossover (5-7M books sold), the structurally unoccupied EQ/wellness gap, multi-category lifestyle brand precedents with revenue data.
- `context/business/structure.md` — Business structure, IP & legal: corporate entities (Auwa Limited + More Air Limited), directors, shareholders, ownership chain, all trademark filings (word mark UK00004341028 + UK00004373944, design mark UK00004373930), 7 Nice classes, Madrid Protocol deadline (15 Aug 2026), copyright, licensing agreements, domains, costs, key dates, open actions. (Social handles live in `context/marketing/social.md`.)

**Website (`context/website/`):**

- `context/website/website.md` — Website SPECIFICATION for auwa.life: Kinfolk-inspired editorial site structure, page layouts, Sanity CMS content model, responsive design, serif typography, motion principles, v0/Stitch prompt ideas, reference websites, article preparation plan, design system tokens (type scale, colour opacities, spacing, grid gaps, content widths, motion specs), component library, API routes, email templates, SEO infrastructure. **Load for website design/planning sessions.**
- `context/website/patterns.md` — Website BUILD PATTERNS, Tailwind 4 gotchas, iOS fixes, Vercel deployment command, page-level architecture lessons, mobile menu patterns, article share icons, and the full Awwwards-readiness checklist. **Load only for website implementation sessions** (component tweaks, bug fixes, deployment). Not needed for social/strategy/copy/brand work.

**Marketing (`context/marketing/`):**

- `context/marketing/arrival.md` — Arrival strategy (the 12-month brand launch): why "arrival" not "launch," the four phases (Quiet Debut / Selective Amplification / App Soft Launch / Store Prep), the next 30 days priority list, full channel strategy (IG primary, LinkedIn secondary, Awwwards, guest articles, link-building, press, newsletter), £2-3K marketing budget allocation, first Instagram post spec, the three forks (app vs store, book timing, character exclusivity), Year 1 and Year 2 success pictures.
- `context/marketing/instagram.md` — Instagram strategy: specs/dimensions (Reels 1080x1920, Feed 1080x1350), algorithm priorities (sends/shares #1), 5 content pillars, weekly posting cadence, growth plan (700→5K), £2K paid budget split, collaboration tactics (Fin DAC), email capture, profile setup, best UK posting times, photo editing workflow.
- `context/marketing/newsletter.md` — Newsletter system: welcome email templates (auto-sent per source), newsletter template (manual send via API), sending workflow, email design principles, subject line format, Resend configuration, cadence guidance.
- `context/marketing/social.md` — Social account map: all live handles and logins across Instagram, Facebook, Threads, YouTube, LinkedIn, Bluesky, Pinterest, Discord, Twitch, Reddit, Medium, Spotify; pending email verifications; deliberately skipped platforms; outstanding next steps. Single source of truth for the social footprint.

**Tooling (`context/tooling/`):**

- `context/tooling/pdf.md` — PDF generation pipeline: the md-to-pdf recipe plus the `context/<folder>/<file>.md` → `documents/Auwa-*.pdf` filename mapping. **Load whenever the user asks for a PDF to be generated from any context file**, regardless of session topic. Future tooling files (image pipeline, audio prep) sit alongside in this folder.

---
