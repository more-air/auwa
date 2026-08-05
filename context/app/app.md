# Auwa App — Build Status & Design Language

> # ⏸ PARKED — 5 August 2026
>
> **Do not propose app work. If Tom asks for app work, say the app is parked and confirm before starting.**
>
> The Kokoro Mirror app is parked indefinitely as part of the three-pillar pivot. It is **built, fully craft-passed, and live at auwa.app**, but it was never released and is no longer maintained. Auwa is now a character IP business (Story, Store, Journal) with a Japan practice attached. See `CLAUDE.md` → THE PIVOT and `context/business/business.md` → the REVISION note at the top.
>
> **Why:** Tom would not use it himself in a world where he already has AI; it needed months more work plus a marketing push he did not want to run; the revenue is poor even in success; apps are becoming trivial to replicate; and it no longer excites him after two decades in the industry. The More Air case-study value is already banked by having built it — no release required.
>
> **The structural point worth keeping:** the app was in the wrong *position in the sequence*, not wrong in itself. As the first product it had to win attention for a character nobody knows. As a companion to a known character, behind published books and a sold-out figure edition, it becomes a much easier proposition.
>
> **Revisit condition, not a date:** a published book with reach, a sold-out figure edition, and a mailing list in the thousands.
>
> **Meanwhile:** leave it live at auwa.app, don't maintain it, don't release it to friends. Keep the domain and trademark class 9. The Yamato emotional framework and its colour system remain owned IP and are reusable in prints and editions outside the app.
>
> Everything below is **preserved so the work isn't lost**, not so it gets resumed. It is accurate as of the 29 May 2026 craft pass.

---

> **Historical note (late July 2026).** The full craft pass documented below shipped and is live at auwa.app (commits `a9fe364` → `e2e1bc0` on `main`; Vercel auto-deploys `website/app`). Nothing app-side changed after that; subsequent commits are newsletter/signup/journal work on auwa.life only. The app sits on ONE token/primitive system, so if it is ever revived most changes are a single-token or single-primitive edit, not a per-screen hunt. **Trust this file + `patterns.md` before opening components; don't re-verify the whole app from scratch.**

*Updated 29 May 2026 (late — after Tom's full craft pass). Paired with `context/app/patterns.md` (code patterns + deployment + gotchas) and `context/pillar/app.md` (the canonical app spec). All three should be loaded together for any app session, alongside `context/brand/brand.md` for brand identity.*

*This session (29 May, second pass) rebuilt the design system foundation and reworked every screen against Tom's detailed feedback and a set of Mobbin references (Stoic, How We Feel, One Year, Not Boring Habits, Finch). The headline outcomes: a global token layer so nothing is hardcoded per screen, the Light + Trove merge, a consistent flow chrome (progress + circle-arrow advance), and the onboarding character model locked with Rieko. Details below; the old "Rounds A/B/C" plan is fully delivered and retired.*

The Kokoro Mirror PWA at **auwa.app**. Standalone Next.js project at `website/app/`, separate from `website/main/` (the editorial auwa.life). Deploys to the Vercel project `auwa-app`, aliased to auwa.app.

---

## Where things live

- **Codebase**: `/Users/admin/Github/auwa/website/app/`
- **Live URL**: https://auwa.app
- **Vercel project**: `auwa-app` (prj_zaDXSo2qMY4dO7aeScdU1myrjycW)
- **Github**: `more-air/auwa`, main branch. Push to main auto-deploys.
- **FigJam (user flow source of truth)**: file key `bsT5waEFwTkrjZVDjjonCs`. Two diagrams: *v1 Detailed User Flow* and *v2+ Roadmap*. Read via the Figma MCP `get_figjam` tool when reasoning about cross-surface flow.

Routes (all root level, no prefix):

- `/` — Home + the state-managed daily-flow phase machine (home → picker → refining → context → shower → revelation → share → light → closing → signup)
- `/welcome` — 8-phase onboarding
- `/light` — **the merged Light section**: a Capture/Trove toggle (Daily Light capture + the firefly dot-grid). Was two surfaces; combined this session.
- `/rest` — Sanctuary
- `/trove` — **now just a redirect to `/light`** (kept for old links/bookmarks)
- `/senshin`, `/senshin/about`, `/senshin/help`, `/senshin/look-back`
- `/archive`, `/kokoro`, `/letter`, `/settings`
- `/manifest.webmanifest`

**Bottom tab bar is now four tabs** (was five): Home, Light, Rest, Senshin. Trove folded into Light. The Home tab icon is a custom Auwa silhouette glyph (not Lucide House).

---

## Current build status

**v1 friends-release scope is functionally complete AND the full design/craft pass is done.** Every screen walks, localStorage persistence works, the daily flow goes through revelation → share → daily light, all secondary surfaces render with seeded test data, and the whole app now sits on one consistent design system.

### What the craft pass delivered (29 May 2026, this session)

**Global token foundation (so nothing is hardcoded per screen — Tom's #1 ask):**
- **Radius scale** in `globals.css @theme`: `--radius-card` (16px), `--radius-hero` (22px), `--radius-sheet` (28px), `--radius-pill` (9999px) → consumed as `rounded-card / -hero / -sheet / -pill`. Every rounded rectangle pulls from these. No more `rounded-[Npx]`.
- **AdvanceButton** (`components/advance-button.tsx`): the Stoic circle-arrow disc — `direction` next/back/close/done × `tone` primary/subtle. The single advance/back/close affordance across onboarding, the daily flow, and Senshin.
- **StepProgress** (`components/step-progress.tsx`): Stoic-style equal-width segments (replaced the old elongated-pill version).
- **Buttons are semi-round** (`rounded-card`, Tom's preference), not pills. Chips + SegmentedControl use `rounded-pill`. AdvanceButton/IconButton stay circular.
- **Title rule (locked):** `t-display` (EB Garamond serif ~30px) is THE screen title everywhere (onboarding questions, refining state name, context question, Senshin prompts, Daily Light, etc.). `t-title` (Instrument Sans) is reserved for nav-header chrome (PageHeader titles only). Serif = voice layer; sans = functional chrome. See [[feedback-app-type-direction]].

**Screen reworks (all shipped):**
- **Onboarding** rebuilt around an `OnboardingShell` (in `welcome/page.tsx`): the *simple Auwa character* accompanies every step (Finch-style); the Kokoro gains the user's motifs on personalisation and is the reveal. Equal-segment progress + back chevron + circle-arrow advance, consistent. Personalisation pins the advance (always visible; grid scrolls beneath). Breath line reworded to set up the reveal.
- **Daily flow** — even-grid StatePicker (all five cards equal size; Unsettled centred at single-column width, no wide card); Refining + Context reworked (no orb, big glowing state character, serif title, back + circle-arrow); pure light-shower (orb removed, light flare); Revelation (no orb, Kokoro hero, **Share leads** with Continue as the quieter circle-arrow); **new ShareCard screen** with Story (9:16) / Feed (1:1) format toggle.
- **Light + Trove merged** into `/light` with a Capture/Trove toggle. Daily Light explains itself for first-timers + a clear non-serif tap-to-type input. Trove is the dot-grid (collected fireflies glow, faint placeholder dots show where future ones land — Not Boring Habits / One Year reference).
- **Rest** — one presence (breathing Kokoro, orb gone), calm sound controls (play/pause + status + track list), clear round close.
- **Senshin** — rebuilt on a `SenshinShell` (back + progress + circle-arrow) matching the rest of the app; a compelling first-timer intro explaining the practice; short quiet "Need to talk to someone?" crisis link; serif guidance title; closure is serif "Held." over sans "Go gently." + clear continue.
- **Home** — Begin button now semi-round (token); custom Auwa glyph as the Home tab; four-tab bar.

**Deferred (UI present, wiring later):** real audio playback in Rest + sound library; server-rendered share-card images (Share uses Web Share API + clipboard for now); the 365-prompt Daily Light library (still the ~25-prompt scaffold).

### Next session — N/A, parked 5 Aug 2026

*(Superseded. This previously read: "Tom flagged he has more refinements coming. Nothing is broken; this is polish." Those refinements never happened — Tom returned in late July, found he had no appetite for the app, and the project pivoted away from it on 5 August. Nothing is broken; it is simply finished as far as it goes.)*

---

## Design language

### Type system

Ten utilities in `globals.css`. Strict semantic naming. **Locked rule (Tom, 29 May):** EB Garamond serif carries the *voice layer* (screen titles via `t-display`, prompts, reflections, letters, emotional headings); Instrument Sans carries the *functional chrome* (buttons, chips, eyebrows, meta, settings rows, nav-header titles via `t-title`). Do NOT sans-ify headings — serif headings read beautifully on dark (per the How We Feel reference) and that's deliberate. `t-display` is the single screen-title utility used everywhere a screen leads with its question/name.

| Utility | Family | Size / line | Use |
|---|---|---|---|
| `t-display` | EB Garamond 400 | 30 / 35 / -0.014em | Hero question on Home/Picker |
| `t-voice-xl` | EB Garamond 400 | 26 / 34 / -0.012em | Revelation reflection hero |
| `t-voice-l` | EB Garamond 400 | 21 / 29 / -0.008em | Prompts |
| `t-voice` | EB Garamond 400 | 17 / 26 / 0 | Letter body, archive reflection |
| `t-title` | Instrument Sans 600 | 17 / 22 / -0.005em | Header titles |
| `t-button` | Instrument Sans 500 | 16 / 19 / 0 | Button labels |
| `t-body` | Instrument Sans 400 | 15 / 22 / 0 | Settings rows, body |
| `t-meta` | Instrument Sans 400 | 13 / 18 / 0 | Captions, dates |
| `t-eyebrow` | Instrument Sans 500 | 11 / 14 / +0.14em caps | Section headers |
| `t-jp` | Noto Serif JP 400 | 11 / 14 / +0.02em | Kanji + romaji subtext |

### Opacity ladder (text on cosmic)

Five steps only. `text-cosmic-50/{X}` where X ∈ {12, 30, 50, 70, 95}.

- 95 — primary text (rare, reserved for hero copy)
- 70 — secondary text (default body)
- 50 — tertiary text (metadata)
- 30 — disabled / placeholder
- 12 — dividers / hairlines

### Spacing scale

4 / 8 / 12 / 16 / 24 / 40 / 64. Mobile content padding: 16px. Card padding: 16-20px.

### Yamato state gradients

Each state has 3 OKLCH stops (mid / deep / edge). Defined in `:root` outside `@theme inline` (Tailwind 4 tree-shakes non-standard namespaces). Reference via inline style:

```ts
background: `radial-gradient(circle 240px at 28% 18%, var(--gradient-${state}-mid) 0%, var(--gradient-${state}-deep) 55%, var(--gradient-${state}-edge) 100%)`
```

### Radius scale (tokens — never hardcode)

`rounded-card` (16px, default rectangles: tiles, stack cards, inputs, list rows, buttons), `rounded-hero` (22px, large feature cards — the StatePicker cards), `rounded-sheet` (28px, bottom sheets + the share-card preview), `rounded-pill` (chips, segmented control, circular buttons). Defined in `globals.css @theme`. Change a value once, every surface follows.

### Component primitives

Reach for these before bespoke:

- `Button` — primary (filled, **semi-round** `rounded-card`), secondary outlined, tertiary text, ghost. NOT a pill anymore (Tom's call).
- `AdvanceButton` — **the Stoic circle-arrow disc.** The consistent advance/back/close affordance across onboarding, daily flow, Senshin, share, rest. `direction` next/back/close/done × `tone` primary/subtle. Caller positions it (usually bottom-right).
- `StepProgress` — Stoic-style equal-width segments for multi-step flows (onboarding, Senshin).
- `Chip` — pill for all selections (sub-expressions, tags, categories)
- `IconButton` — 40px circular with 44px hit-slop (header actions)
- `PageHeader` — back chevron + title + optional action (utility/list surfaces: Settings, Archive, Kokoro, Look Back)
- `SegmentedControl` — sliding-pill iOS picker (Light Capture/Trove, Share Story/Feed, Look Back views)
- `ShareCard` — the share-preview surface: Story (9:16) / Feed (1:1) format toggle + character-dominant card + "Revealed by Auwa" wordmark
- `EmptyState` — Orb + voice line + hint
- `StackCard` — card-stack pattern (Home cards, Settings sections, Archive rows)
- `StatePicker` — **even grid** (2×2 corners + Yuragi centred at single-column width — no wide card)
- `AuwaCharacter` — real silhouette, state-mapped, calm/glow
- `KokoroSilhouette` — the user's Kokoro (silhouette + motifs floating). No motifs → the simple Auwa companion (used through onboarding/Senshin).
- `Orb`, `GradientField`, `LightShower`, `DailyLightCapture` — atmospheric primitives. The orb is now reserved for genuine "Auwa's presence" moments; it was REMOVED from refining/revelation/shower/rest/senshin during the craft pass (the character or pure light carries those).

**Flow-shell pattern (not extracted, but consistent):** onboarding (`OnboardingShell`) and Senshin (`SenshinShell`) each own a local shell = back chevron + optional `StepProgress` + content + bottom-right `AdvanceButton`. The daily-flow sub-steps (refining/context) follow the same inline structure. If a future session wants DRY, extracting a shared `FlowShell` is the natural move — but the structure is already identical by convention.

### Iconography

Lucide React at `strokeWidth={1.5}` (vs default 2 — quieter, more on-brand).

Bottom tab bar (**four tabs now**): Home (custom Auwa silhouette glyph, in `quiet-entries.tsx`, NOT Lucide), Light (Sparkle), Rest (Moon), Senshin (Droplet). Trove was merged into Light.

Top chrome: Archive (History), Settings (Settings cog), back navigation (ChevronLeft).

Advance/next/back/close in flows: the `AdvanceButton` circle-arrow (not a Lucide icon used loose).

---

## References I'm directing the design from

### Mobbin captures (`share/_temp/mobbin/{app-name}/`)

Each app sits in its own subfolder with 2-5 PNGs (overview + detail screens). Tom's notes:

- **`bloom/`** — serif for short titles only; rest sans.
- **`calm/`** — no specific comment.
- **`equinox/`** — button visibility + type hierarchy on dark bg is excellent.
- **`gentler streak/`** — interesting layout but too much for Auwa.
- **`how we feel/`** — mix of serif/sans; pills + buttons on/off states are very legible. **Best reference for chips + state picker.**
- **`not boring habits/`** — dark-bg legibility; grey unfilled marks behind active items. **APPLIED:** the Trove dot-grid (faint placeholder dots + glowing collected fireflies).
- **`stoic/`** — overall look. Closest in tone to Auwa. **APPLIED:** the equal-segment progress indicator and the circle-arrow advance button (`AdvanceButton`) are both modelled on Stoic.
- **`withings/`** — busy but nice layout.
- **`one year/`** — **APPLIED:** the Light + Trove merge into one toggled section, the dot-grid collection view, and the clear tap-to-type capture input. **`random/`** — additional reference, no specific notes.
- **`how we feel/`** (see above) — **APPLIED:** serif emotional headings over sans chips, and the even-grid emotion picker (drove the StatePicker even-grid fix).
- **`finch/`** (see Finch section) — **APPLIED:** the character companion present through every onboarding step.

### Finch (`share/_temp/mobbin/finch/`)

Finch lives inside the Mobbin folder as another app subfolder. 13 PNG screens, the closest functional analogue to Auwa. Useful for:

- Home layout — `5-home-1.png`, `6-home-2.png` (hero scene at top + stacked action cards below + tab bar)
- Onboarding pacing — `1-onboard-1.png`, `2-onboard-2.png`, `4-onboard-4.png`
- Emotion check-in cascade — `7-quests-1.png` (drilling vocabulary picker with pills)
- Tab bar with illustrated icons — visible on every Finch screen
- Self-care mood log — `11-self-care.png` (mood scale + categorization + free text)
- Achievement beats — `6-home-2.png` ("You're Glowing!" overlay, 1-day streak)
- Settings grouped list — `13-settings.png` (iOS-style sections with toggles + chevrons)

When proposing a change, reference these files by path so Tom can compare what you're describing to what he shared.

---

## Working principles

- Think like a world-class app designer at a top studio. Precise on details, restrained on density, confident on type, expert on micro-interaction.
- The app is NOT the website. Don't carry editorial spacing or serif-heavy chrome here. If the app design ends up better than the website's, that's fine — Tom may feed elements back later (not a priority).
- Rieko (illustrator, co-founder) delivers character variants, background scenes, and per-motif illustrations later. Placeholder primitives must be elegant enough to ship to friends-release now.
- No em dashes in user-facing copy. Use periods, commas, parentheses, or restructure.
- Reference Mobbin / Finch files by path when proposing a change.
- Show; don't ask. Screenshot proposals via the preview server (port 3004) so Tom can react visually.
- Use TaskCreate to track multi-step work — Tom finds it useful.
- Stick to v1 spec scope (`context/pillar/app.md`). Don't invent features. If a request seems to drift from spec, flag and ask.

---

## How Tom works with you

*(Still true generally, and worth carrying into non-app sessions.)*

- Show; don't ask. He responds to screenshots faster than to descriptions.
- Be confident with design judgments. Don't hedge.
- Ship small iterations to auwa.app between rounds for visual reaction. Vercel auto-deploy from `git push origin main`.
- When Tom pushes back, redirect immediately rather than re-explaining.
- He'll usually share Mobbin references and notes when redirecting. Read them carefully and quote specific files when proposing the response.

---

*Confidential. Auwa Limited. All rights reserved.*
