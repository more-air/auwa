# Auwa App — Build Patterns

> **⏸ PARKED — 5 August 2026.** The app is parked as part of the three-pillar pivot. Do not load or act on this file unless Tom explicitly confirms he wants app work. See `CLAUDE.md` → THE PIVOT.

*Load this file for app implementation work (component changes, bug fixes, deploys). Paired with `context/app/app.md` (build status + design language). For the canonical app spec see `context/pillar/app.md`.*

---

## DEPLOYMENT

The auwa.app PWA lives at `website/app/` and deploys to the `auwa-app` Vercel project (aliased to https://auwa.app).

### Two deploy paths

**Git auto-deploy (recommended for routine work).** `git push origin main` from anywhere in the repo. Vercel's Git integration picks up the push and auto-deploys.

**Vercel CLI (use when you want explicit control).** Must run from `website/app/`:

```bash
cd /Users/admin/Github/auwa/website/app && \
  [ "$(pwd)" = "/Users/admin/Github/auwa/website/app" ] || { echo "ABORT: wrong cwd $(pwd)"; exit 1; } && \
  export PATH="/usr/local/bin:$PATH" && \
  npx vercel --prod --yes
```

Confirmation: output must list `Aliased: https://auwa.app`.

### Multiple Vercel projects linked to this repo

Three projects share the repo. Always confirm the cwd before deploying:

| Cwd | Vercel project | Domain |
|---|---|---|
| `website/app/` | `auwa-app` (prj_zaDXSo2qMY4dO7aeScdU1myrjycW) | auwa.app |
| `website/main/` | `auwa-life` (prj_doT3hBKj6wDaSBXMFmkv24Lbp23V) | auwa.life |
| repo root | (disabled) | — |

The repo-root `.vercel/` was renamed to `.vercel.disabled/` on 21 April 2026 to stop the CLI from silently picking the wrong project. Don't re-enable it.

### Git author email requirement

The `auwa-app` Vercel project enforces commit-author email validation. Local git must have `user.email "hello@moreair.co"`. If a deploy is blocked, the cause is almost always a commit with a stale author email (e.g., `admin@Toms-MacBook-Max.local`).

Fix: update git config, make a NEW commit (don't amend), push, redeploy. Existing commits in history are unaffected.

### Vercel project rootDirectory setting

The `auwa-app` project's rootDirectory must stay set to `website/app`. If a deploy fails with "No Next.js version detected", it's been cleared — restore it via the Vercel API or dashboard:

```bash
TOKEN=$(jq -r '.token' "/Users/admin/Library/Application Support/com.vercel.cli/auth.json")
curl -s -X PATCH \
  "https://api.vercel.com/v9/projects/prj_zaDXSo2qMY4dO7aeScdU1myrjycW?teamId=team_LEEh1WsbpjGqE26uFOD3cszC" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rootDirectory":"website/app"}'
```

---

## FILE STRUCTURE

```
website/app/
├── package.json                    # next 15.5.14, react 19, tailwindcss 4, lucide-react
├── next.config.ts
├── tsconfig.json                   # paths: @/* → src/*
├── postcss.config.mjs
├── eslint.config.mjs
├── .vercel/project.json            # links to auwa-app Vercel project
├── public/
│   ├── character/                  # 10 Auwa silhouette webps (5 dirs × calm/glow)
│   ├── favicon.svg
│   └── apple-touch-icon.png
└── src/
    ├── app/
    │   ├── globals.css             # tokens, type utilities, safe-area
    │   ├── layout.tsx              # cosmic surface base + fonts
    │   ├── manifest.webmanifest/route.ts
    │   ├── page.tsx                # Home + daily flow (state-managed phases)
    │   ├── welcome/page.tsx        # onboarding
    │   ├── light/page.tsx          # MERGED Light: Capture/Trove toggle + dot-grid
    │   ├── rest/page.tsx           # Sanctuary (breathing Kokoro + sound controls)
    │   ├── trove/page.tsx          # redirect → /light (kept for old links)
    │   ├── senshin/
    │   │   ├── page.tsx
    │   │   ├── about/page.tsx
    │   │   ├── help/page.tsx
    │   │   └── look-back/page.tsx
    │   ├── archive/page.tsx
    │   ├── kokoro/page.tsx
    │   ├── letter/page.tsx
    │   └── settings/page.tsx
    ├── components/
    │   ├── button.tsx              # primary/secondary/tertiary/ghost — SEMI-ROUND (rounded-card)
    │   ├── advance-button.tsx      # Stoic circle-arrow (next/back/close/done) — the flow advance affordance
    │   ├── step-progress.tsx       # Stoic equal-width segment progress
    │   ├── chip.tsx                # selection primitive (rounded-pill)
    │   ├── icon-button.tsx         # 40px circular with 44px hit-slop
    │   ├── page-header.tsx         # back + title + optional action (utility/list surfaces)
    │   ├── segmented-control.tsx   # sliding-pill iOS picker (rounded-pill)
    │   ├── share-card.tsx          # share preview: Story 9:16 / Feed 1:1 toggle
    │   ├── empty-state.tsx
    │   ├── stack-card.tsx          # the card-stack workhorse
    │   ├── state-picker.tsx        # EVEN grid (2×2 + Yuragi centred, all equal size)
    │   ├── auwa-character.tsx      # real silhouette, state-mapped
    │   ├── kokoro-silhouette.tsx   # user's Kokoro + motifs; no motifs = simple Auwa companion
    │   ├── orb.tsx                 # Auwa's presence — now used sparingly (removed from refining/reveal/shower/rest/senshin)
    │   ├── gradient-field.tsx
    │   ├── light-shower.tsx        # orb removed; pure light flare
    │   ├── daily-light-capture.tsx # has `embedded` prop for the /light section
    │   ├── context-grid.tsx        # full-screen: chips + back + circle-arrow advance
    │   ├── sub-expression-row.tsx
    │   ├── quiet-entries.tsx       # bottom tab bar — FOUR tabs; Home = custom Auwa glyph
    │   ├── placeholder-asset.tsx
    │   └── cosmic-page-theme.tsx
    └── lib/
        ├── yamato.ts               # the Yamato framework data
        ├── motifs.ts               # motif library
        ├── letters.ts              # letters from Auwa
        ├── daily-light-prompts.ts
        ├── reflections-placeholder.ts
        └── app-store.ts            # localStorage persistence
```

The daily flow (Home / Picker / Refining / Context / Shower / Revelation / Light / Closing / Signup) is state-managed inside `page.tsx` — no separate routes. Transitions are phase changes. This is intentional: the light shower covers classification latency and must be an in-page transition, not a route change.

---

## DESIGN TOKENS

### Type utilities (10)

All in `globals.css` under `@utility` blocks. Use semantic class names; never inline font-size.

See `context/app/app.md` for the full table. Quick reference:

```
t-display     EB Garamond 30/35    Hero questions
t-voice-xl    EB Garamond 26/34    Revelation reflection
t-voice-l     EB Garamond 21/29    Prompts
t-voice       EB Garamond 17/26    Letter body
t-title       Instr Sans 600 17/22 Header titles
t-button      Instr Sans 500 16/19 Button labels
t-body        Instr Sans 400 15/22 Settings rows
t-meta        Instr Sans 400 13/18 Captions
t-eyebrow     Instr Sans 500 11/14 caps  Section headers
t-jp          Noto Serif JP 11/14  Romaji subtext
```

### Opacity ladder (text on cosmic)

`text-cosmic-50/{X}` where X ∈ {12, 30, 50, 70, 95}. No bespoke opacities.

### Yamato gradients

Three OKLCH stops per state, defined in `:root` (not `@theme inline`):

```css
--gradient-{state}-mid
--gradient-{state}-deep
--gradient-{state}-edge
```

States: `hare`, `takaburi`, `aware`, `yuragi`, `nagomi`.

Reference via inline style on the consuming component. Default radial pattern:

```ts
background: `radial-gradient(circle 240px at 28% 18%, var(--gradient-${state}-mid) 0%, var(--gradient-${state}-deep) 55%, var(--gradient-${state}-edge) 100%)`
```

### Motion tokens

```
--duration-press         120ms    Button tap response
--duration-hover         220ms
--duration-page          420ms    Screen-to-screen transition
--duration-enter         700ms    Element reveal on mount
--duration-reveal       1100ms    Hero element reveal
--duration-orb-breath   4800ms    Full inhale-exhale cycle
--duration-light-shower 3600ms
--duration-bloom        1800ms
--duration-emerge       1400ms
--duration-firefly       900ms
--duration-letter       2000ms

--ease-out-expo   cubic-bezier(0.16, 1, 0.3, 1)     Brand default
--ease-in-out     cubic-bezier(0.65, 0, 0.35, 1)    Symmetric crossfades
--ease-spring     cubic-bezier(0.34, 1.56, 0.64, 1) Bouncy press
```

### Radius tokens (added 29 May)

Registered in `globals.css @theme` so Tailwind generates the utilities. **Never hardcode `rounded-[Npx]`.**

```
--radius-card   16px   rounded-card   default rectangles: tiles, stack cards, inputs, list rows, BUTTONS
--radius-hero   22px   rounded-hero   large feature cards (StatePicker cards)
--radius-sheet  28px   rounded-sheet  bottom sheets, the share-card preview
--radius-pill   9999px rounded-pill   chips, segmented control, circular buttons
```

Buttons are semi-round (`rounded-card`), Tom's preference — change `SIZE_CLASSES` in `button.tsx` (already done). Chips/SegmentedControl/AdvanceButton use `rounded-pill`.

---

## STATE MANAGEMENT

Single source of truth: `src/lib/app-store.ts`.

- `useAppStore()` — React hook, subscribes to changes via CustomEvent
- `useStoreReady()` — returns true after hydration (gate redirects with this)

Mutators: `updateOnboarding`, `completeOnboarding`, `addRevelation`, `addFirefly`, `addSenshin`, `setSenshinStatus`, `markLetterSeen`, `setSettings`, `resetStore`, `exportStore`.

Persistence is plain localStorage under `auwa.app.v1` for v1 testing. Production replaces with Vercel Postgres + Tier 2 E2EE for Senshin per `context/business/privacy.md`.

### Daily flow phase enum

```ts
type Phase = "home" | "picker" | "refining" | "context" | "shower" | "revelation" | "share" | "light" | "closing" | "signup";
```

`share` opens the `ShareCard` preview from the revelation and closes back to it. `closing` and `signup` only fire on first-run (when `store.onboarding.completed === false`). Don't add to the enum without thinking through the first-run vs returning-user paths.

---

## TAILWIND 4 GOTCHAS

### `@theme inline` tree-shakes non-standard namespaces

`--gradient-*` and `--color-{state}` (where state isn't a standard Tailwind colour) get tree-shaken if no Tailwind utility consumes them. Inline-style references via `var(--gradient-hare-mid)` don't fire the tree-shaker.

**Fix**: define these tokens in a plain `:root` block OUTSIDE `@theme inline`. Standard Tailwind namespaces (`--color-cosmic-*`, `--duration-*`, `--ease-*`) stay inside `@theme`.

### `@utility` for custom utilities

Tailwind 4 supports `@utility name { ... }` for custom utilities consumable via class names. Use this for `t-display`, `t-voice-*`, etc. — not `@layer components` (which doesn't expose to the JIT scanner).

### `<Image>` quality defaults

Next.js 16+ requires explicit whitelisting in `next.config.ts` for `quality` values other than 75. If you add `<Image quality={95}>`, add 95 to the `images.qualities` array.

### Press scale on rounded buttons

`active:scale-[0.97]` combined with `rounded-full` + `overflow-hidden` can cause Safari border-radius repaint artefacts. Apply `transform-origin: center` and ensure no `overflow-hidden` on the same element as the scale.

---

## COMPONENT PATTERNS

### Reach for primitives first

Bespoke buttons, cards, and pills are drift. Use the components in `src/components/` before inventing new patterns.

### PageHeader convention

Every secondary surface gets a `PageHeader`:

```tsx
<PageHeader title="Trove" trailing={<IconButton ...>} />
```

Don't roll your own "← BACK / TITLE" row.

### Bottom tab bar (QuietEntries)

**Four tabs:** `/` (Home), `/light` (Light = Capture+Trove), `/rest`, `/senshin`. Active tab via `pathname`. Home icon is a custom inline Auwa silhouette glyph (`AuwaGlyph` in the file), not Lucide. Don't show on drill-downs (Kokoro, Archive, Letter, Settings, Senshin sub-pages, Welcome, daily-flow phases).

### State picker

`<StatePicker selected={...} onSelect={...} />` renders an **even grid**: a 2×2 of the four corner states (Hare/Takaburi, Nagomi/Aware) plus Yuragi centred below at single-column width (`w-[calc(50%-0.375rem)]`). All five cards are the same size — no wide card. Each card: state gradient + Auwa character variant + English name + kanji/romaji, on `rounded-hero`.

### Advance affordance + flow shells

Linear flows (onboarding, daily flow, Senshin) advance with the **`AdvanceButton` circle-arrow**, bottom-right, disabled until the step is valid. Back is a chevron top-left; `StepProgress` (equal segments) sits top-centre on the working steps. Onboarding (`OnboardingShell`) and Senshin (`SenshinShell`) wrap this as a local shell; refining/context replicate it inline. The simple Auwa companion (`KokoroSilhouette` with no motifs) accompanies onboarding + Senshin steps. Full-width pill `Button`s are reserved for non-sequential commits (Home "Begin", "Catch this light", Senshin handoff, signup).

---

## AUWA CHARACTER ASSETS

10 webp files at `public/character/`, copied from `/website/main/public/book/character/`:

```
auwa-front.webp        auwa-front-glow.webp
auwa-up.webp           auwa-up-glow.webp
auwa-down.webp         auwa-down-glow.webp
auwa-left.webp         auwa-left-glow.webp
auwa-right.webp        auwa-right-glow.webp
```

Yamato state → variant mapping (in `auwa-character.tsx`):

| State | Calm | Glow |
|---|---|---|
| Hare (Radiant) | `auwa-up.webp` | `auwa-up-glow.webp` |
| Takaburi (Intense) | `auwa-front.webp` | `auwa-front-glow.webp` |
| Aware (Reflective) | `auwa-down.webp` | `auwa-down-glow.webp` |
| Yuragi (Unsettled) | `auwa-left.webp` | `auwa-left-glow.webp` |
| Nagomi (Serene) | `auwa-right.webp` | `auwa-right-glow.webp` |

When Rieko delivers definitive state-specific variants, drop them in `/public/character/` with the same filenames OR update the mapping. Consumers (StateCard, KokoroSilhouette, etc.) don't change.

---

## PREVIEW + VERIFICATION

Dev server runs on port 3004:

```bash
cd /Users/admin/Github/auwa/website/app && export PATH="/usr/local/bin:$PATH" && npm run dev
```

Or via the Claude Preview tool with `name: "auwa-app"` from `.claude/launch.json`.

**Always set mobile viewport (375x812)** for visual verification — the app is mobile-first and many issues only show at phone sizes.

### Dev server gets into a bad state under heavy editing (READ THIS)

During the 29 May craft pass the Next dev server repeatedly corrupted after many rapid multi-file edits: the page renders **unstyled** (raw HTML, "Skip to content" link visible, default fonts) or throws `__webpack_modules__[moduleId] is not a function`. The **production build was always clean** — this is purely a dev HMR/CSS-chunk problem (Tailwind 4 + many edits + the earlier `next.config.ts` change).

**Reliable fix (do this, don't keep reloading):** stop the preview server → `rm -rf .next` (from `website/app/`) → start the preview server again → re-seed localStorage. Clearing `.next` is safe (gitignored, regenerates). A plain reload does NOT fix it.

`next.config.ts` has `devIndicators: false` (set this session) so the dev overlay badge doesn't sit over the Home tab in screenshots — harmless in prod.

### Bounded-height scroll (flex gotcha)

For a screen with a pinned header/footer and a scrolling middle (e.g. the personalisation grid with an always-visible advance button): the root `<main>` must be `h-svh` (not `min-h-svh`), and **every flex ancestor of the scroll area needs `min-h-0`** (flex items default to `min-height:auto` and won't shrink below content, so the "pinned" footer gets pushed off-screen). This bit the OnboardingShell — fixed by adding `min-h-0` to the section and the inner wrapper.

### Seed test state

To verify with a completed onboarding + a recent revelation:

```js
localStorage.setItem('auwa.app.v1', JSON.stringify({
  onboarding: {
    completed: true,
    motifs: ['dog','mountain','moon','river','candle'],
    firstGiftMotif: 'noticed',
    whenFits: ['morning'],
    trait: 'quiet',
    source: 'instagram'
  },
  revelations: [{
    id: 'r1',
    createdAt: new Date(Date.now()-86400000).toISOString(),
    state: 'aware',
    reflection: 'A quiet weight today.'
  }],
  fireflies: [],
  senshin: [],
  lettersSeen: [],
  settings: { senshinReminder: false },
}));
window.location.href = '/';
```

---

## LESSONS LEARNED

### What broke

- **Tailwind 4 tree-shaking gradient tokens** — fix: move them to plain `:root` outside `@theme`.
- **Vercel CLI from the wrong cwd** deploys to the wrong project. Always include a `pwd` guard.
- **Commit-author email validation on auwa-app** blocked deploys until git config user.email was updated to a real address.
- **State picker arc was congested** — replaced with 2×2+1 grid. The 5-item Yamato set lays out naturally as energy × valence corners + Yuragi as the unstable middle.
- **Editorial chrome leaked into the original `/app/pwa`** — Header, FigureHook, EntranceLoader needed self-suppression. Solution was splitting into a separate Next.js project (this codebase) with no editorial chrome at all.
- **CLI "Upload aborted" loops** — usually a symptom of Vercel rejecting the deploy (e.g., author validation) which the CLI misinterprets as a transient network failure and retries forever. Check the Vercel dashboard for the real status.
- **Dev server CSS corruption under heavy editing** — after many rapid multi-file edits the dev server served unstyled pages / `__webpack_modules__ is not a function`. Build was always clean. Fix: stop preview → `rm -rf .next` → start → re-seed. See the PREVIEW section. Reloading doesn't fix it.
- **Flex `min-h-0` for pinned-footer + scroll** — a `flex-1` ancestor of a scroll area defaults to `min-height:auto` and grows to content, pushing pinned footers (the always-visible advance button) off-screen. Root must be `h-svh`; every flex ancestor of the scroll needs `min-h-0`.

### What works

- localStorage-backed app store with React hook + CustomEvent sync. Cross-tab updates work via the storage event listener.
- 10-file Auwa character asset set as placeholders. Read elegant on the picker cards until Rieko's definitive variants land.
- Even-grid state picker (2×2 + centred Yuragi, all equal size) with saturated gradients reads as the state's colour at a glance and fixed the "wide Yuragi" inconsistency.
- One radius token layer (`rounded-card/-hero/-sheet/-pill`) + the `AdvanceButton` circle-arrow made the whole app consistent and trivially re-tunable — exactly Tom's "globally changeable, not hardcoded" ask.
- Lucide icons at `strokeWidth={1.5}` sit quieter and more on-brand than the default 2px.
- StackCard pattern + PageHeader give every secondary surface consistent chrome with minimal code.

---

*Confidential. Auwa Limited. All rights reserved.*
