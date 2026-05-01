# Auwa Website Patterns

*Load this file only for sessions that touch the website at `website/main/` — design tweaks, component fixes, deployment, Awwwards submission. Non-website Auwa sessions (social, strategy, copy, newsletter writing, business work) do not need this file and should not load it.*

*For the high-level site specification (information architecture, page layouts, design system tokens, content model), see `context/website/website.md`. This file is the working lessons-learned log: implementation patterns, Tailwind 4 gotchas, iOS fixes, and the Awwwards-readiness checklist.*

---

## DEPLOYMENT

The Auwa website lives at `website/main/` and deploys to the Vercel project "auwa-life" (https://auwa.life).

**Git push to `origin main` does NOT auto-deploy to the correct Vercel project.** Multiple Vercel projects are connected to this repo, so use the Vercel CLI instead.

**CRITICAL — always `cd` first.** The Vercel command MUST be run from `/Users/admin/Github/auwa/website/main/`, not the repo root. Running it from `/Users/admin/Github/auwa/` deploys to a *different* Vercel project (`auwa-app.vercel.app`) instead of `auwa-life` (which aliases to `auwa.life`). The only correct deploy:

```bash
cd /Users/admin/Github/auwa/website/main && export PATH="/usr/local/bin:$PATH" && npx vercel --prod --yes
```

This uses the `.vercel/project.json` at `website/main/.vercel/project.json` (project ID: `prj_doT3hBKj6wDaSBXMFmkv24Lbp23V`).

**Confirmation.** The output must contain `auwa-life-<hash>` in the Production URL and `Aliased: https://auwa.life`. If you see any other project prefix, you're in the wrong directory — redeploy from `website/main/`.

**Safeguards in place (April 2026).** Chaining git/push commands that contain their own `cd` before the vercel call landed the shell back at the repo root, where a stale `.vercel/project.json` pointed to the wrong project (`auwa-app`). Fixes:
1. The repo-root `.vercel/` folder was renamed to `.vercel.disabled/` and added to `.gitignore`. The Vercel CLI now has nothing to auto-link from the root, so a deploy from the wrong cwd fails loudly instead of silently shipping the wrong build.
2. The deploy slash command now includes a `pwd` guard that aborts if cwd isn't `website/main/`. Don't chain a `cd /Users/admin/Github/auwa && ...` before the vercel call — always make the vercel command its own bash invocation starting with `cd website/main`.

**Full deploy workflow:**
1. Commit and `git push origin main` in the Auwa repo (github: `more-air/auwa`).
2. **If any files under `/Users/admin/Github/moreair/.claude/skills/**` or other More Air shared assets were touched in this session**, commit and push those from inside `/Users/admin/Github/moreair/` as well — separate repo, separate push. Do this BEFORE the Vercel deploy so the repos stay in sync.
3. Run the Vercel CLI command above from `website/main/`.
4. Verify the output lists `Aliased: https://auwa.life` before reporting success.

---

*(For PDF generation from any `context/**/*.md` file, see `context/tooling/pdf.md`.)*

---

## WEBSITE DESIGN PATTERNS

Learned rules from building auwa.life. Apply these when making UI changes or building new pages.

**Text under images:** Always constrain text blocks below images (card titles, excerpts, captions) to `max-w-[90%]`. Prevents text running flush to the image edge, which looks unfinished. Applies to journal cards, home page scroll cards, continue reading cards, and image captions in articles.

**Mobile hamburger:** Minimum line thickness of 1.5px for hamburger menu icons. Thinner lines disappear on some screens.

**Teaser pages (pre-launch):** The stacked text-above-image layout runs all the way through tablet — the 2-column grid only engages at `lg` (1024px+). Tablet portrait in the split layout felt cramped (text and image both lost breathing room), so the mobile config extends up. Grid container: `flex flex-col h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-2 lg:h-[calc(100dvh-5rem)]`. Image: `w-full h-full object-cover lg:absolute lg:inset-0`. Vertical padding tightens to `py-12` below lg. Page-title h1 scale is `clamp(2.25rem,5vw,3.75rem)` — matches Journal, About, and the homepage module headings.

**Form success states:** Use full contrast for success messages. `text-sumi` on Surface (light) backgrounds, `text-washi` on Yoru (dark) backgrounds. Never use reduced opacity for confirmation text. Success message element must match the form's height to prevent layout shift: use `min-h-[44px] flex items-center`.

**Email inputs: `autoComplete="email" name="email"` and suppress the global focus outline.** Without these attributes iOS Safari offers the Contacts + iCloud Keychain autofill icons inside the field (a blue padlock + "i" chip). They look alarming on a quiet editorial signup. The site-wide `:focus-visible { outline: ... }` in globals.css also draws a rectangle around the input on focus — the signup form already indicates focus via the row's `focus-within:border-sumi/50` (or `focus-within:border-washi/50` on dark) border-bottom, so the outline is redundant. globals.css has `input:focus-visible, textarea:focus-visible { outline: none; }` override for this.

**Footer pattern:** The footer is one unified dark (`bg-yoru`) block with three zones: (1) two-column layout with signup left and pillar nav right, (2) spacer via `flex-1` to push the bottom bar down, (3) copyright + social icons. The footer uses `min-h` and `flex flex-col` so the bottom bar always sits at the base. Pillar links are left-aligned text on both mobile and desktop.

**Hero text on mobile:** Add `pr-12 md:pr-0` (or similar right padding) to hero headlines so text wraps earlier and doesn't crowd the right edge of the screen.

**Continue reading spacing on mobile:** Use `gap-y-12` on mobile (vs `gap-y-8` on desktop) so articles in the grid have clear visual separation. On a single-column mobile layout, the text of one article needs more distance from the image of the next.

**Image protection:** All images on the site are protected against casual saving. CSS in `globals.css` sets `-webkit-user-drag: none`, `user-select: none`, and `pointer-events: none` on all `img` elements (with `pointer-events: auto` restored for images inside links/buttons). A script in `layout.tsx` prevents right-click context menu on images. This deters casual copying, not determined users.

**Contact email obfuscation:** The about page uses the `ObfuscatedEmail` client component (`src/components/obfuscated-email.tsx`) to display `hello[at]auwa.life` initially, revealing the real `mailto:` link only on click. Use this component wherever a contact email appears on the site.

**Image caption spacing:** Captions below images need `mb-8 md:mb-12` to create sufficient breathing room before the next image or content block. Without this, captions run into the next image on mobile. Applies to all `figcaption` elements in article layouts and anywhere captions appear below images.

**Journal article breadcrumb:** Article pages show "JOURNAL / CATEGORY" as a breadcrumb trail above the article body. Both are clickable links (Journal goes to `/journal`, category goes to `/journal?category=...`).

**Article excerpts:** Excerpts shown on article cards (horizontal scroll, two-up, journal index) must be 55 characters or fewer. This keeps them to 2 lines max at 14px in the card width. Tighter is better. Lead with the image, not the text.

**SEO and social sharing (OG meta):**
- Every page needs `title`, `description`, and an `openGraph.images` array in its metadata export.
- Page titles: "[Page Name] | Auwa" format. Keep under 60 characters so Google doesn't truncate.
- Descriptions: 150-160 characters. Lead with what it is, not who you are. No marketing fluff.
- OG image: 1200x630px JPG. Use a real photograph, not generated text-on-colour. The OG image must exist as a static file in `public/` (e.g. `public/og-image.jpg`) and be referenced in both `openGraph.images` and `twitter.images`.
- Twitter card: always `summary_large_image` for visual brands.
- For article pages: generate per-article OG images using the article's hero photo, cropped to 1200x630. Use `sips -c 630 1200` to centre-crop.
- Test link previews on LinkedIn, WhatsApp, and Twitter using their respective preview tools before shipping.

---

## WEBSITE BUILD PATTERNS

Lessons learned from building auwa.life. Apply these to future Auwa website work and to More Air client projects where relevant.

**Dev server:**
- Always set PATH before running Node/npm commands: `export PATH="/usr/local/bin:$PATH"`
- If the dev server shows ENOENT errors for `.next/server/pages/_document.js`, delete `.next/` and restart: `rm -rf .next && npx next dev`
- The `.next` cache can go stale after dependency changes, component restructuring, or switching branches. When in doubt, delete it.

**Server/client components (Next.js App Router):**
- Server components CAN import client components (ones with `"use client"`). This is normal and correct.
- The Footer is a server component that imports SignupForm (a client component). This works fine.
- When a component needs interactivity (forms, state, event handlers), it needs `"use client"`. Keep the directive on the smallest possible component, not the whole page.

**Signup forms:**
- All signup forms use the shared `SignupForm` component with a `source` prop that determines the Resend segment.
- The `source` prop is a union type: `"app-waitlist" | "store-waitlist" | "book-waitlist" | "newsletter"`. When passing dynamic strings from API responses, cast them explicitly to this union type, not to `string`.
- Success messages are per-form via the `successMessage` prop. Keep them on-brand: quiet, warm, not shouty.

**Resend integration:**
- The Resend SDK must be lazy-imported inside the API handler (`const { Resend } = await import("resend")`), not at module level. Module-level imports crash during Next.js build because the API key isn't available at build time.
- Resend's free plan allows 3 segments. Adding a 4th requires upgrading or deleting one.
- The `contacts.create()` method doesn't accept both `audienceId` and `segments` simultaneously. Use `segments` only (the audience is implicit from the API key's default audience).
- "Already exists" errors from Resend are expected for returning subscribers. The API route handles this gracefully and returns success.

**Teaser pages (app, store, book):**
- Use `aspect-[4/5]` on mobile for the image, then `md:absolute md:inset-0` for desktop to fill the viewport.
- Avoid `h-[calc(100dvh-5rem)]` on mobile (causes white gap at bottom on scroll). Only apply the viewport height on `md:` and above.
- Images need `object-cover` to fill their container without distortion.

**Footer:**
- The footer includes the "Quiet letters." newsletter signup block. Don't duplicate newsletter sections on individual pages.
- Newsletter copy: "NEWSLETTER / Quiet letters. Seasonal essays, craftsman stories, and early news of everything we make."
- Pillar links in the footer are Journal, Store, App, Book (the four brand pillars).
- The left signup column uses `max-w-[440px]` so the newsletter copy wraps at the same width as the SignupForm below it (form is also `max-w-[440px]`). Do not widen back to 520px — the text would overhang the form edge and look unresolved.

**Image optimisation — ALWAYS use the sharp pipeline, not sips.** The canonical processor lives at `website/main/scripts/process-image.js`. It does Lanczos3 resize + unsharp mask + MozJPEG with 4:4:4 chroma subsampling — sips downsamples without sharpening, producing visibly soft output that became obvious once the Auwa preset's tonal flattening was layered on top. The article skill documents this; treat it as the rule across every image task.

```bash
cd website/main && node scripts/process-image.js <input.png> public/<dst.jpg> <mode>
```

Modes (pick by use):
- `web` — 1800px max long edge. Article body images, journal cards, anywhere ≤900 CSS px display width.
- `pillar` — 2400px max long edge. Homepage / teaser pillars at near-full-viewport.
- `hero` — 3840px max long edge. **Full-bleed heroes used with `<Image fill sizes="100vw">`.** Next.js's default `deviceSizes` go up to 3840, so anything smaller forces a runtime upscale on retina viewports — that's the blur. Use this for any 100svh hero image. (Added April 2026 after sips-processed heroes shipped soft.)
- `ig` — resize+crop to 1080×1350.
- `og` — resize+crop to 1200×630.

**next/image silently recompresses at q=75.** Even with a high-quality source, the runtime image processor downsamples to JPEG quality 75 by default. For full-bleed heroes that's visibly soft on illustrated artwork. Pass `quality={95}` on every `<Image>` used in a hero / pillar role. This was the second cause of the demo-world hero looking blurry alongside the under-source-resolution issue — both compound.

**Source images/frames often arrive as 3000-5500px PNGs (5-18MB each).** After processing through `web` mode: landscape JPGs ~200-600KB, portrait ~100-300KB. Through `hero` mode: 70-500KB depending on detail (7-color illustrations compress small, photographic bokeh larger).

**Video and image optimisation (for web):**
- Hero/background videos must be compressed before placing in `public/`. Source videos are often 20-40MB; web target is 2-6MB.
- Use `ffmpeg` for compression. Install via npm if not available: `cd /tmp && npm install ffmpeg-static`, then use `/private/tmp/node_modules/ffmpeg-static/ffmpeg`.
- Video compression command: `ffmpeg -i [input] -vf "scale=[width]:-2" -c:v libx264 -preset slow -crf 26 -an -movflags +faststart -pix_fmt yuv420p [output]`. Use `scale=1920` for landscape, `scale=1080` for portrait.
- Always extract a poster frame for the `<video poster="">` attribute: `ffmpeg -i [video] -vframes 1 -q:v 2 [poster.jpg]`. The poster JPEG itself should still be re-processed through `process-image.js` with `pillar` or `hero` mode for sharpening.
- Always strip audio from background/hero videos (`-an` flag) since they autoplay muted.
- Sips is fine for poster-frame extraction from videos, but never as the final encoder for any image rendered on a page — always send the result through `process-image.js`.

**Email templates** use text-based logos (styled with CSS) rather than image logos, since SVG support in email clients is unreliable and PNG conversion tools aren't available.

**Brand colour tokens — five canonical surfaces.** Two families: dark (Sumi/Yoru, hue 235) and warm-paper (Surface/Paper/Washi, hue 80-95). Tweak any one in `globals.css` and every page that uses it follows; that's the consistency contract — no per-page colour overrides anywhere.

| Token | OKLCH | Role | Notes |
|-------|-------|------|-------|
| `--color-surface` | `oklch(0.97 0.004 95)` (≈ `#f8f7f4`) | Page bg on every light page (`<main>`), entrance loader, hero pre-paint flash, email body bg, PWA `theme_color`. Also the page-transition wipe panel when destination is a light page. | Promoted from `oklch(1 0 0)` (pure white) in April 2026. The loader's tone became canonical. Pure `#ffffff` is no longer used anywhere; `bg-white` and `themeColor: "#ffffff"` are now drift. |
| `--color-paper` | `oklch(0.94 0.005 95)` (≈ `#ecebe7`) | Raised warm off-white plane that needs to read as a distinct layer above Surface. Currently the menu overlay panel — sliding in over a Surface page bg, the ~3% lower luminance is enough to register as "this is a separate layer" without introducing a different hue. | Same warm hue 95 family as Surface so it doesn't clash. Don't use as page bg or as foreground colour; it's specifically for raised panels. |
| `--color-sumi`  | `oklch(0.10  0.022 235)` | Text, logo, menu icon on light surfaces (~13:1 on Surface at 100%). Also the page-transition **darkening wash** colour — fades over the leaving page during LEAVE while the destination-bg panel rises beneath. | Renamed from `--color-void` (April 2026); softened L=0.10 + hue 235 to match Yoru. |
| `--color-yoru`  | `#0f1623` (≈ `oklch(0.16 0.022 235)`) | Every dark surface: dark page bg (`data-page-theme="dark"`), Footer, FigureHook strip, page-transition wipe panel when destination is `/book`. | Replaces the cosmic `bg-void` previously used on Footer + FigureHook. |
| `--color-washi` | `oklch(0.928 0.020 80)` (≈ `#EFE9DD`) | Light text/icon/border on **Yoru or Sumi** (uniform dark surfaces). Footer, FigureHook, dark book page, signup-form dark, cursor disc, dark CTA accents. | The warm-paper "ink" that gives dark contexts their old-book character. |

**Surface vs Washi for light foreground — the locked rule:**

| Background | Light foreground |
|------------|------------------|
| On Yoru or Sumi (uniform dark surface) | **Washi** |
| Over imagery / photography (variable mid-tones) | **Surface** (not Washi) |

Why two tokens: Washi (L 0.928) reads warm against a known dark surface — that's the editorial old-book character. Over a photograph, the same L=0.928 blends into bright/highlight spots in the image and reads soft. Surface (L 0.97, less chroma) cuts confidently across photographic mid-tones. Apply this rule whenever you place a light label on top of an image (pillar overlays, two-up CTA labels, hero text, hero logo + menu icon while transparent).

The other discipline: **never mix Sumi with Washi** (different families), **never use pure `#ffffff`** anywhere on the site (Surface is the white), **never use `text-white`** anywhere (use Surface or Washi by the rule above), and **never hardcode `#f8f7f4` or `#EFE9DD`** — consume the token. Footer is always Yoru+Washi. SignupForm `theme="dark"` is always Washi. Dark pages opt in via `<DarkPageTheme />` and inherit Yoru bg + Washi text.

**Sumi opacity tier ladder (locked April 2026 after Surface moved off pure white):**

| Tier | Use |
|------|-----|
| 100% | Headings, titles, active nav, wordmark |
| 80% | About prose, footer category links |
| 70% | Nav links, hover states |
| 60% | Subtitles |
| 55% | Form button hover |
| 50% | Excerpts, captions |
| 45% | Eyebrow / metadata labels, share icons, "Read the latest" — was 40%, bumped because 40% softened too much on the warm Surface |
| 40% | Input placeholder — was 35% |
| 20% | Form underlines |
| 10% | Default divider — was 8%, bumped because 8% reads invisible on Surface |

Washi tiers on Yoru mirror these one-to-one. If you change Sumi or Surface, the contrast ratios at every tier shift slightly; spot-check 45% labels and 10% dividers when tuning.

**Rounded image corners — `rounded-md` (6px) site-wide.** All image containers use `rounded-md overflow-hidden`. The previous standard was `rounded-xl` (12px); after a brief square-cornered iteration we settled on `rounded-md` as the consistent token — restrained enough to feel intentional, visible enough to register. Applies to: homepage Journal strip cards, pillar cards, two-up articles, journal index cards, article inline images / image-pair / image-beside / continue-reading, about page pillars, video-moment, editorial-frames, pillar-parade, book-preview, demo-world series covers, the kokoro video container. **The only exception** is the article hero image on mobile (edge-to-edge no-radius), which uses `md:rounded-md` so radius engages only at md+. **If you add a new image container anywhere, use `rounded-md` — never re-introduce `rounded-xl` or skip the radius.**

**Scroll — native everywhere.**
- No smooth-scroll library. Lenis was removed (April 2026) after it was creating more Safari compositor jitter than the assist was worth. Native scroll on modern desktop Chrome / Firefox is silky enough on its own, and mobile Safari's native scroll is already the target feel.
- Anchor scrolls use `window.scrollTo({ top, behavior: "smooth" })`. Example (HeroVideo scroll button): compute target `y` from `getBoundingClientRect().top + window.scrollY - headerOffset`, then `window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })`.
- Reveals (FadeIn, TextReveal) are driven by IntersectionObserver independently of scroll smoothness — they work identically regardless of which scroll implementation is in use.
- Do NOT reintroduce Lenis or any rAF-transform smooth-scroll library. It fights Safari's native compositor; the jitter history in this file was almost entirely a Lenis artefact.

**Page transitions — single-pass bottom-up wipe (detroit.paris pattern).**
- A solid panel slides UP from below the viewport, covers the leaving page, holds 100ms, then snaps off (no second slide). The new page mounts behind the panel during the hold, so the swap is seamless.
- Panel colour matches the **destination route's bg**: Yoru on `/book`, Surface on every other page. The moment the panel snaps off, the user sees the same plane behind it (now rendering the new page's content) — no flash of mismatched bg.
- A separate **Sumi (ink) wash** fades over the leaving page (opacity 0 → 0.8 over LEAVE_MS), giving the wipe tonal depth. Wash uses Sumi (the dark text colour), not Yoru — Yoru would read as a different dark plane and break the layered "ink fades, then page covers" gesture.
- Leaving content opacity-fades 1 → 0 alongside an upward drift, so EVERYTHING (text, images, sticky elements) dissolves together. Without the opacity sweep only images appeared to fade — high-contrast text remained visible against the darkening wash, reading as a half-finished transition.
- Reveals (FadeIn / TextReveal / StripReveal / ImageFade) are gated on `usePageReady()` from PageTransitionContext — they only fire after the wipe is fully settled, so the new page's entrance cascades AFTER the swipe finishes.
- Header consumes `useTransitionPanelTheme()` and flips its colour against the panel during the wipe (washi over dark panel, sumi over light panel).
- Easing: `cubic-bezier(0.87, 0, 0.13, 1)` (in-out-quart) on every property.
- `prefers-reduced-motion`: navigation is instant, no panel.
- **Skip-transition opt-out:** internal links carrying `data-skip-transition="true"` (menu nav items, the logo when the menu is open) skip the wipe entirely — the menu's own close motion is the visual transition. PageTransition still gates `revealReady` on the navigation, so the destination page's cascades wait until ~180ms after the menu close completes before firing. Without this opt-out, clicking a menu item or the logo from the open menu produced a "double transition" (menu close + dark wash + light panel rising) that read as cluttered.

**FadeIn component variants:**
- `variant="fade"` (default): opacity + 12px translateY. For text and general elements.
- `variant="reveal"`: opacity + 24px translateY with slightly longer duration. For image cards and visual elements. Creates a more pronounced cascading entrance.
- Stagger delays: use 150ms between grid items (pillar cards, two-up articles, continue reading). Use 60ms for horizontal scroll items. Cap at 480ms for longer lists.
- All elements should cascade in one after another when they enter the viewport. This looks elegant and intentional.

**Image hover zoom (global CSS):**
- All images inside links (`a img`) get `scale(1.04)` on hover with `0.8s` ease-out transition.
- Defined globally in `globals.css`. No per-component hover classes needed.
- Do NOT add inline `group-hover:scale-[...]` Tailwind classes. The global CSS rule handles everything consistently.
- The zoom should be clearly visible but still smooth. Too subtle (1.01) feels broken. Too much (1.08) feels cheap.

**Footer parallax reveal:**
- Footer has `sticky bottom-0 z-0`. Main content has `position: relative; z-index: 1; background-color: white` (set in globals.css).
- As user scrolls to the bottom, the white content slides up and away, revealing the dark footer beneath.
- Do NOT set `position: relative` on the `header` element in globals.css. This breaks the header's `sticky` positioning. Only `main` gets the override.

**Mobile viewport units:**
- Use `svh` (small viewport height) instead of `dvh` (dynamic viewport height) for any element that needs a stable height on mobile. `dvh` changes as mobile browser chrome shows/hides, causing layout shifts and scroll snap-back.
- Capture `window.innerHeight` on mount (via `useRef`) and use that for scroll calculations instead of reading `window.innerHeight` on every scroll event.
- For scroll-driven transforms, convert `vh` units to pixels using the captured viewport height. Live `vh` inside `translate3d()` shifts when the iOS URL bar retracts mid-scroll, making stacked or translated elements visibly jitter. Compute `translateYPx = (offsetVh * capturedInnerHeight) / 100` once per render.
- For scroll-driven React state, gate `setState` via a ref so it fires only when the value actually changes, not on every scroll frame. Per-frame `setState` with fresh array/object identities forces React to re-apply inline styles, which iOS Safari re-rasterises into a visible flicker.

**Dynamic OG images (Next.js):**
- Do NOT use `opengraph-image.tsx` (file-based dynamic OG) alongside `metadata.openGraph.images`. The file-based version takes priority and generates text-on-colour which looks poor on social platforms.
- Use a static photo as `public/og-image.jpg` (1200x630) and reference it in the metadata export. Real photography always outperforms generated graphics on social.

**Awwwards-level polish (lessons learned):**
- Native scroll beats rAF-transform smooth-scroll libraries. We shipped with Lenis and then removed it — native scroll on modern Chrome / Firefox is already smooth, and Safari's native scroll is the target feel that libraries spend their energy trying to fake. Less code, less compositor fighting, identical reveal behaviour.
- Image reveals (fade + slide-up) look better than clip-mask reveals. Clip-path creates sharp edges during animation that conflict with rounded corners.
- Custom cursors are polarising. Test with real users before shipping. They can feel fiddly and inaccessible. We removed ours.
- Horizontal scroll hijacking (converting vertical scroll to horizontal) can feel strange and disorienting. Native horizontal scroll/swipe is usually better. We removed ours.
- Page transitions (crossfade) are worth the small effort. They make the site feel like one continuous experience.
- Footer parallax reveal is a high-impact, low-effort detail that signals craft.
- Hover zoom on images should be clearly visible (1.04 scale) not barely perceptible (1.015). Users need to see the response to feel the interactivity.
- Staggered cascade animations on grid items (150ms between each) look elegant and intentional. Apply to all grid/row layouts.

**Build/type errors:**
- When passing props between components, prefer explicit union types over `as` casts of generic strings.
- The ESLint `core-web-vitals` import warning is a known Next.js 15 issue. It doesn't block the build.
- When deleting routes or renaming components, always restart the dev server and delete `.next/` to clear stale caches. Hot reload doesn't always pick up deleted files.

**Homepage routes:**
- Root `/` — Live homepage. EditorialFrames (desktop ≥md) + PillarParade (mobile <md) as the four-pillar module, via a `hidden md:block` / `md:hidden` pair.

**Four-pillar module (replaces the scroll-driven flipbook on the live homepage):**
- `src/components/editorial-frames.tsx` — desktop (≥md). "Magazine index" tab gallery with image crossfade, staggered reveal per frame (eyebrow → TextReveal heading → body → CTA), auto-advance every 10s (`ADVANCE_MS = 10000` — long enough for the pillar-01 video to play through before rotation), pauses on hover. Clickable image (Link with `data-cursor="Open"`) navigates to the active pillar. Image column pinned at 480px, text column flex-1, grid template `[480px_1fr]`, max-w-[1060px] mx-auto so the composition centres on wide viewports. Four frames: **Store / Lifetime objects. / Visit store**, **Book / Open the eyes. / Explore world**, **Journal / Quiet moments. / Explore journal**, **App / Awareness, daily. / Join waitlist**.
- `src/components/pillar-parade.tsx` — mobile (<md). Horizontal scroll row of four tall 3:4 cards; mirrors the Journal strip exactly (native overflow-x-auto, no scroll-snap, no touch-action override, no data-lenis-prevent). Cards at `w-[72vw] max-w-[360px]`, so next card peeks clearly on first load. FadeIn variant="fade" on each card (vertical rise, no horizontal translate — horizontal translate pushes later cards off-viewport and prevents IntersectionObserver firing). Dot indicators below update via a scroll listener on the scroller element.

**Homepage structure (live root `/`):**
- Full-bleed Auwa face video ("Scroll" label + breathing vertical line instead of bouncing chevron, transparent header overlay). The "Scroll" button uses native `window.scrollTo({ top, behavior: "smooth" })` to land on the intro with an offset for the sticky header.
- "Our Philosophy" intro. Desktop-only 心 (Kokoro) kanji watermark at 3% alpha behind the paragraph, right side.
- Pullquote 1 ("What you pay attention to…") at `clamp(2.25rem, 6vw, 4.75rem)`, leading 1.05.
- Four-pillar module (EditorialFrames desktop / PillarParade mobile).
- "The Journal" horizontal scroll strip.
- Micro-season (72 Seasons kanji + CtaLink "Read essay").
- Three pillar cards (Book / Store / App).
- Pullquote 2 ("In every handmade bowl…") at the same size as pullquote 1.
- Two-up articles (Onsen + Nozawa). "Read the essay" label inside each card has the same text-roll rollover as the nav.
- VideoMoment (Meet Auwa).

**Global UI layer (mounted in layout.tsx):**
- `EntranceLoader` — once-per-session あうわ reveal on a warm `#f8f2e5` overlay. Chars rise in with 180ms stagger, reverse-stagger exit (わ→う→あ), overlay fades, unmount. Respects prefers-reduced-motion and sessionStorage flag.
- `CursorLabel` — 72px black disc with uppercase text following the cursor on desktop (`pointer: fine`). Reads the target's `data-cursor` attribute ("Read" or "Open"). Scales from 0→1 on enter, 1→0 on leave. Applied to every clickable editorial image/card.
- `SoundToggle` — bottom-right corner speaker button. Plays `/audio/drift.mp3` at 28% volume with 1.2s fade in/out. Muted by default, preference stored in localStorage. Swap the filename in `sound-toggle.tsx` to rotate through the 7 tracks in `public/audio/` (aurora, begin, crystal, drift, float, light, silk). **Inverts colour when the sticky footer is revealed behind it** — uses an IntersectionObserver on a zero-height sentinel appended as `<main>`'s last child (scroll listeners are Lenis-swallowed and unreliable). **Pauses playback on `visibilitychange` (hidden) and `pagehide`** — iOS Safari would otherwise keep the media badge live and, in some cases, continue playback after the user switches tabs.
- Shared `AuwaLogo` component (`src/components/auwa-logo.tsx`) — inline SVG using `fill="currentColor"`, so the header transitions between white/void via CSS `color` instead of `filter: invert()`. Fixes the "ghost logo" flash Safari showed on the previous filter-based approach.

**Header `transparent` prop:**
- Header is now edge-pinned floating (no bar). Logo + menu trigger are independent fixed elements at top corners. See "Header" notes elsewhere in this file and the website.md page-layout section for the full per-route + per-element colour matrix.

**Body copy standard:** All paragraph text across homepage modules, teaser pages, and articles uses `font-display text-[18px] md:text-[19px]` for consistency.

**Two-column modules (Meet Auwa, Email Capture):**
- Both use `pt-16 md:pt-24 pb-28 md:pb-48` for equal visual top/bottom spacing (bottom needs more padding because the image extends below the text centre)
- Image ratio: 9:16 portrait card with `max-w-[380px]` and `max-h-[70vh]`
- Meet Auwa: video card left, text right. Links to `/journal/the-beginning`. CTA is a bordered button "THE STORY"
- Email Capture: text + form left, Narai snow image right. No shadow on image.

**Button style (bordered CTA):**
- `font-sans text-[13px] tracking-[0.08em] uppercase text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/30 transition-all duration-300`
- Always add `self-start` when inside a flex column to prevent full-width stretch

**Desktop nav hover:**
- Active page: full opacity + underline
- Hover: underline animates from left (`w-0 group-hover:w-full`), text darkens from 50% to 100%
- Underline: `h-[1.5px] bg-void`, positioned at `-bottom-1`

**Teaser page copy pattern:**
- Each teaser page stack: small-caps super-header thesis line / main H1 label / body copy / "Notify me" form. Two-line hierarchy does the work: super-header carries the thesis, H1 is the clean label.
- **App:** "A DAILY MIRROR" / "The App." / *"A daily practice for awareness, guided by ancient Japanese philosophy. No advice, just attention. Add your email and we'll write when the app arrives."*
- **Store:** "MADE TO LAST" / "The Store." / *"A curated home for Japanese craftsman objects. Made slowly, chosen for a lifetime, the antithesis of throwaway. Add your email and we'll write when our store opens."*
- **Book:** "OPEN THE EYES" / "The Book." / *"Illustrated stories following Auwa the character as it shows the world what it's been too busy to notice. Add your email and we'll write when the first book arrives."*
- Button text: "Notify me" (not "Join Waitlist")
- Super-header thesis lines also live in each page's `<title>` metadata ("Daily awareness practice | Auwa" etc.)

**Email unsubscribe:**
- The `{{{RESEND_UNSUBSCRIBE_URL}}}` merge variable is ONLY substituted when sending through Resend's Broadcasts API. In transactional sends via `resend.emails.send()` it stays as literal text and the link breaks.
- Newsletters therefore use `resend.broadcasts.create({ audienceId, from, subject, name, react })` followed by `resend.broadcasts.send(id)` — this substitutes the merge var AND attaches the `List-Unsubscribe` header required by Gmail/Yahoo since Feb 2024.
- Welcome emails (transactional) use a plain `mailto:hello@auwa.life?subject=Unsubscribe` instead, since the merge var cannot work there.
- Clicking a broadcast unsubscribe link removes the contact from the Resend audience automatically.

**Per-article OG images (social sharing):**
- Article `generateMetadata()` points `openGraph.images` at `/journal/{slug}/{slug}-og.jpg` — a 1200×630 landscape crop dedicated to social previews. The portrait 4:5 hero is never used for OG directly (platforms crop portrait awkwardly).
- Generate the OG file from the hero with sips:
  ```bash
  cp hero.jpg og.jpg && sips --resampleWidth 1200 og.jpg && sips -c 630 1200 og.jpg
  ```
- Every article folder under `public/journal/{slug}/` should contain both `{slug}-hero.jpg` (portrait) and `{slug}-og.jpg` (landscape). When adding a new article, generate both.
- Instagram is not included in the article share icon row: IG has no link-share preview flow. FB, Pinterest, and X are the only three.

**Welcome email subject lines (spam-avoidance tuned):**
- `newsletter` → "Welcome to Auwa"
- `app-waitlist` → "You're on the Auwa App waitlist"
- `store-waitlist` → "A note from Auwa."
- `book-waitlist` → "A note from Auwa."
- Store and Book use a softer subject because Gmail's Promotions classifier latches onto "Store" and "Book" as commerce keywords. Changing the subject (while keeping the hero image and body) was enough to shift them toward Primary.

---

## TAILWIND 4 GOTCHAS

Lessons from shipping the Auwa site on Tailwind 4. These bite on day one of any new build.

**Translate/rotate use the CSS `translate`/`rotate` properties, not `transform`.**
`-translate-y-full` generates `translate: var(--tw-translate-x) -100%;` — it does not touch `transform`. Any inline `transition: transform ...` you add will not animate the hide/show slide. Transitions must target `translate` (and `rotate` if you're rotating via class). On the auwa.life header:
```css
transition: translate 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease-out;
```

**Class-based transitions can get stuck.** `transition-opacity duration-500` with a React-driven class swap (`opacity-0` → `opacity-100`) sometimes leaves a CSSTransition in `playState: "running", currentTime: 0, easing: linear` — especially when the element is portalled, or when a hot-reload occurs, or when `document.timeline.currentTime` is 0 (headless preview browsers). The overlay never animates; computed opacity stays at the start value even though the class is correct. The reliable fix: move the transitioning property to `style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 500ms cubic-bezier(...)" }}`. Inline styles bypass the class-swap edge case. Apply this pattern to any "must-fire" transition — overlays, modals, drawers, menu-button morphs.

**Explicit `transform` and rendering hints on sibling animated elements.** iOS Safari will render two otherwise-identical spans at different thicknesses if their rasterisation layers differ. Give every animated span the same combination: `transform: rotate(0deg)` (present even when static), `willChange: "top, transform"`, `backfaceVisibility: "hidden"` (both `backfaceVisibility` and `WebkitBackfaceVisibility`). Same layer, same anti-aliasing, equal weight.

**Form inputs need font-size ≥ 16px or iOS Safari auto-zooms on focus.** Any `<input>` smaller than 16px triggers a zoom-in when tapped, which can push adjacent in-row buttons off-screen. Set the input (and for visual consistency the button and success message) to `text-[16px]`. Don't try to gate this with a breakpoint — at any viewport width, the zoom fires on iOS if the focused input is under 16px.

**Per-letter opacity animations use plain `<span>` (inline), not `inline-block`.** Wrapping each character in `inline-block` creates separate composite boxes; iOS re-subpixel-positions each letter independently as opacity changes, causing a visible shimmer. Plain inline preserves letter kerning and shared baseline. Also skip CSS opacity transitions when opacity is already being driven by a raf scroll loop — the transition lags behind and compounds with the iOS compositor.

**Bordered element + `overflow-hidden` + descendant transform causes iOS border flashes.** When a hover-triggered descendant transform runs (e.g. a text-roll inside a bordered CTA), iOS WebKit (including DuckDuckGo) briefly clips the top border during compositor re-raster. Move the `overflow-hidden` to an inner mask span; keep the border on the outer element. The mask still clips the animation, but the border lives on an element that never has its overflow manipulated.

**Hold `translate3d(0, 0, 0)` at rest on FadeIn and TextReveal — DO NOT switch to `transform: none`.** This is settled, hard-won. Switching to `none` causes Safari to demote the compositor layer when the entrance transition completes, producing a subpixel "settle" that becomes visible whenever a neighbouring element transforms (image hover-zoom is the classic trigger — image scales up and down, parent FadeIn wrapper appears to nudge down a pixel). It also re-introduces the scroll-jitter the previous translate3d hold was added to fix. Layer count is the documented theoretical concern, but native scroll on modern Chrome / Firefox / Safari handles many persistent layers without issue. **Working code uses `translate3d(0, 0, 0)`. Future sessions must not change this without first reproducing the pre-fix bug, then making the case.**

**Don't add a smooth-scroll library.** Lenis was tried and removed — its rAF transform fights Safari's native compositor, producing micro-jitter that doesn't exist with plain native scroll. Safari's native scroll is already the target feel; sites like moreair.co feel buttery precisely because they don't fight the browser. Chrome and Firefox native scroll on modern hardware are smooth enough that the library's "assist" doesn't register as an upgrade. If scroll feels rough somewhere, investigate the compositor layer count and animation patterns — don't reach for a library.

**Nested opacity animations jitter in Safari.** Running per-word `TextReveal` or inner `FadeIn` animations INSIDE a wrapper that's also opacity-fading (e.g. a tab gallery crossfade) makes Safari's compositor re-rasterise layers as opacities compound. Symptom: visible subpixel jitter on the inner text "settling into place" during a frame change. Fix: pick one. Let the outer crossfade carry the reveal and make the inner content static, OR drop the outer crossfade and rely solely on the inner cascade. `EditorialFrames` chose the former — content inside each frame is now plain HTML and the 700ms outer opacity transition is the entire reveal.

**`will-change` toggling on IntersectionObserver trigger causes Safari scroll jitter.** `will-change: "opacity, transform"` while hidden + `"auto"` when visible made Safari tear down the preallocated compositor layer the instant IO flipped `isVisible` — before the transition had painted a single frame. Safari then had to create a new layer on-demand for the active transition, dropping a scroll frame in the process. Fix: **omit `will-change` entirely** on `FadeIn` / `TextReveal`. Safari auto-promotes a layer when the transition starts and demotes cleanly when it ends; that path is smoother than managing it by hand. Chrome is fine either way.

**IntersectionObserver bottom rootMargin of `-200px` keeps reveals comfortably in the eye-zone.** Three iterations have shipped here: `+120px` (fires before viewport edge — animations complete before the user reaches the section, on a fast scroll the reveal is "wasted"); `-80px` (fires when ~80px into viewport — element is peeking up from the bottom of the screen, easy to miss on a quick scroll); `-200px` (current — fires when element sits comfortably in the middle-lower third of the viewport, so the reveal plays out as the eye is moving into the section). Threshold stays at 0.1 (10% of element visible). Applied to `FadeIn`, `StripReveal`, `BookPreview`, `PillarParade`, `TextReveal`, and `EditorialFrames`. ScrollFadeText is scroll-progress-driven, not IO, and is unaffected.

**IntersectionObserver right rootMargin of `200%` for horizontal scrollers.** Cards sitting off-viewport-right (card 2+ in the Journal strip, two-up articles) never intersect the default root, so they stay at the FadeIn reveal variant's `translate3d(80px, 0, 0) opacity: 0` until the user swipes — producing an apparently missing image on iPhone. Widening the right rootMargin to `200%` catches cards up to 2 viewport widths to the right, so they fire when the SECTION scrolls in vertically. Page-flow layouts never place cards more than one viewport to the right, so the wider margin has no effect on non-scroller layouts.

**iOS Safari bfcache preserves React state — re-sync scroll-dependent UI on pageshow.** The header's hide-on-scroll flag would stay `true` after closing/reopening the tab from the home page: bfcache restored React state from before backgrounding, scroll position was restored to 0, but `hidden` was still true — so the header stayed off-screen until the user tried to scroll up. Fix: listen to both `window.pageshow` and `document.visibilitychange`, and on each, re-sync any scroll-derived state against current `window.scrollY`.

**Hero parallax scale needs RAF lerp smoothing for iOS URL-bar retraction.** A direct `scale = 1 + progress * 0.06` assignment per scroll event reads as a sudden zoom on iPhone when iOS Safari batches scroll events around URL-bar retraction. Fix: keep `currentScale` and `targetScale` refs; onScroll updates `targetScale`; a RAF loop lerps `currentScale += (target - current) * 0.18` (about 150ms to land). Cache the section height on mount + resize so the progress calc doesn't flicker when `svh` / `dvh` shifts. Shipped on `HeroVideo`.

**Instagram's in-app WebView inflates text unless `text-size-adjust: 100%` is set on `html`.** Without it, body copy renders 10-20% larger than intended when a visitor lands from an IG link — most visibly on iOS, where IG's WKWebView auto-inflates paragraph text as an accessibility assist. `globals.css` sets both `-webkit-text-size-adjust: 100%` and `text-size-adjust: 100%` on `html`. Safari / Chrome ignore the rule (they already honour CSS sizing), so it's safe everywhere. Android WebView on IG applies its own zoom layer that CSS can't override — every site behaves that way in the IG Android browser, not a code issue.

**Japanese fonts: `display: "block"` + OS-native fallback stack to stop the entrance loader flashing sans-serif.** `next/font`'s default `display: "swap"` + a Latin-only auto-fallback means Japanese glyphs (あうわ, 心, micro-season kanji) render in the OS Japanese default while the real font loads — which on iOS is Hiragino Kaku Gothic (sans). On the あうわ entrance loader this reads as a cold sans flash before the serif swaps in, undermining the first four seconds. Two-part fix: (1) `Noto_Sans_JP` / `Noto_Serif_JP` use `display: "block"` (short invisible window, then correct font — no sans fallback seen on normal connections); (2) `--font-jp-serif` / `--font-jp` in globals.css include explicit OS Japanese fallbacks (Hiragino Mincho / Yu Mincho for serif; Hiragino Kaku Gothic / Yu Gothic for sans) so if the block period ever runs long, a Japanese serif still renders — never the Latin fallback cascading to the system sans.

**`ImageFade`: guard against the cached-image onLoad-never-fires case.** If the browser already has the image in its disk / memory cache — common on revisits and for cards that preloaded — the `<img>` arrives with `complete: true` before React attaches the `onLoad` handler, so onLoad never fires and the image stays pinned at opacity 0. Fix on mount: `if (img.complete && img.naturalWidth > 0) setLoaded(true)`. Required for every on-load fade component; otherwise the component works on first visit and breaks silently on second.

**`ImageFade`: inline `transition` must include `transform` + `filter` alongside opacity, or the hover zoom loses its softness.** The global rule in globals.css is `a img { transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ... }`. Setting `style={{ transition: "opacity 1200ms ..." }}` on the `<img>` inside an `<a>` completely replaces that rule — the `a:hover img { transform: scale(1.04) }` still fires but with no transition, so the rollover snaps instead of glides. Inline transition on any image inside a link must re-specify the transform + filter transitions explicitly. Applies to `ImageFade` throughout journal / continue-reading / image-pair / image-beside.

**Sitewide peek strip (`FigureHook`) watches a main-content sentinel, not the footer.** The footer is `sticky bottom-0` from page load, so an IntersectionObserver targeting `<footer>` reports "intersecting" at every scroll position and the strip never appears. Same pattern as `SoundToggle`: append a zero-height sentinel as `<main>`'s last child and observe THAT, so the strip only fades out when the user is actually within ~240px of main-content-end. Sentinel is cleaned up in the effect teardown.

**`FigureHook` snap on path change — render-phase setState doesn't reach the committed render.** Earlier, the strip used a render-phase pattern (`pathJustChanged = renderedPath !== pathname`; if true, immediately call `setState` for renderedPath/scrolledPast/nearFooter) to disable the opacity+transform transition for one frame on navigation. **This silently doesn't work**: React detects render-phase setState and re-runs the render with the updated state, so the COMMITTED render always saw `pathJustChanged === false` and the "none" transition path never fired. Result: navigating to a new article from a page where the strip was visible interpolated the strip's transform from `translate3d(0, 0, 0)` (visible) to `translate3d(0, 100%, 0)` (off-screen) over the transition, producing a brief 10px dark lip flash at the bottom on article load. Correct pattern: a `snap` useState (initial true), a `pathRef` useEffect that sets `snap=true` + resets state when pathname changes, and a separate `[snap]` useEffect that clears `snap` via two `requestAnimationFrame` hops (one to commit the snap-true paint, one to flip false for subsequent transitions). General principle: render-phase setState is for ergonomic short-circuits, NOT for one-frame visual effects — anything that needs to be on screen for exactly one paint must use the useEffect + rAF pattern.

**Watermark fade-in: use `FadeIn` (gated on `usePageReady`), not a raw CSS animation.** The earlier approach was a `.watermark-fade-in { animation: fadeIn 1800ms ... }` CSS class on the watermark span. The animation runs as soon as the element mounts — but on a route navigation the new page mounts BEHIND the page-transition panel, so by the time the panel snaps off and the user actually sees the page, ~900ms of the 1800ms animation has already played. The watermark appeared "already faded in", abrupt. Fix: wrap the watermark span in `<FadeIn duration={1800} translateY={0}>`; FadeIn gates on `usePageReady()` so the fade only starts AFTER the wipe completes. The wrapper takes the position classes (`absolute top-12 lg:right-12 ...`); the inner span just has the font + low-alpha colour. Applied on `/about` and `/`. The `.watermark-fade-in` CSS class was removed from globals.css.

**`FadeIn` `triggerRef` for synced reveals across a vertical gap.** When a layout puts a body paragraph far below its title (e.g. `EditorialFeature`'s `lg:justify-between` puts the body at the bottom of the media height — 400-500px below the heading), the body has its OWN IntersectionObserver entry point. As the user scrolls, the title reveals when the title enters the viewport, but the body waits until the body itself enters — reading as a delay between title and body. Fix: `FadeIn` accepts an optional `triggerRef?: React.RefObject<HTMLElement | null>`; when provided, the IO observes `triggerRef.current` instead of FadeIn's own wrapper. In `EditorialFeature`, a `titleGroupRef` is attached to the eyebrow/h2/CTA group and passed to the body paragraph's `<FadeIn triggerRef={titleGroupRef}>` — body now reveals on the title's viewport entry, with its own delay handling sequencing within the cascade.

**Article hero: title cascades alongside the image's 2000ms fade.** On `/journal/[slug]`, the hero has a 4:5 image (left on md+) and a title + subtitle (right). Default behaviour ran `<TextReveal>` and `<FadeIn>` immediately on `usePageReady`, while the image faded over 2000ms via `ImageFade`; the text cascade completed at ~700ms while the image was still 35% faded, reading as text-first. Earlier "fix" added 700ms / 1200ms delays so text waited until the image was mostly done — but on mobile this meant the user saw the image, then the meta row + body content below (FadeIns at default delay), then the title last, which read backwards. Current shipped version: title `<TextReveal stagger={70}>` runs at delay 0 alongside the image (both gated on `usePageReady`); subtitle `<FadeIn delay={700}>` arrives one beat later. The image's 2000ms ImageFade overlaps the title's ~700ms cascade — both arrive together as one composed entrance, with subtitle as a deliberate second beat.

**Header tone sentinel system — IntersectionObserver geometry traps.** The `HeaderToneProvider` (`src/components/header-tone.tsx`) uses sentinels positioned `absolute inset-0` inside positioned parent columns to declare what colour the header should read against each section. The IO watches them within the top 80px header band and computes left/right tones based on which half of the viewport each sentinel covers. Three traps were hit and fixed:

1. **5% viewport-width tolerance on the left/right split.** A 50/50 grid where the right column's left edge sits a few pixels short of `vw/2` (sub-pixel rounding, grid gap, border) lets the right sentinel "cover" the left half by 3px and override the left sentinel's tone. Without tolerance, the logo flipped to surface on a Surface text-side bg — invisible. Use `const tolerance = vw * 0.05` and require `rect.left < halfway - tolerance` for `coversLeft`, `rect.right > halfway + tolerance` for `coversRight`.
2. **`visibility: hidden` on the sentinel breaks IO observation in Chromium.** The sentinel was originally `<div ... style={{ visibility: "hidden" }} />`. Chromium suppresses IntersectionObserver callbacks on visibility-hidden elements — observe runs but the callback never fires. The sentinel is empty (no content/bg/border) so it's already invisible without the property; remove it.
3. **IO ref-holder so the resize handler swaps observers cleanly.** On viewport resize, rootMargin needs to rebuild (the band depends on innerHeight). The naive pattern — `io.disconnect(); const fresh = new IntersectionObserver(...)` — leaves the OLD `io` reference in the closure that `MutationObserver` uses to observe newly-added sentinels. After resize, sentinels added via route change get observed by the disconnected old IO and never trigger. Fix: store the IO in a holder ref (`{ current: IO | null }`) so both `observe()` and `onResize()` reach the live observer.

**Parents of `<HeaderTone />` sentinels MUST be `position: relative`.** Sentinels use `absolute inset-0` to fill their declaring section. Without a positioned parent, the sentinel positions relative to a higher ancestor and its rect spans the entire page — it covers both halves of the viewport always, making the geometry split useless. Every section that drops a sentinel needs `relative` on the immediate parent. Verified currently for: book Hero, hero-video, journal/[slug] image + text columns, app/store teaser text + image columns. If a future page drops a sentinel and the colour doesn't update, check the parent's `position` first.

---

## PAGE-LEVEL ARCHITECTURE

Lessons learned placing global UI around Next.js App Router + page transitions.

**Render shared UI (header, footer) in `layout.tsx`, not in individual pages.** The Auwa site used to render `<Header />` from every page file. That put the header inside the `PageTransition` wrapper, which applies `opacity` and `transform` during leave/enter — both of which create a stacking context. A portalled body-level overlay (mobile menu, modals) at z-[90] then sits above the header (z-[100], but trapped inside the wrapper's context). Consequence: the logo and menu button fade out with the page during link clicks, and the mobile menu's X button disappears behind the Surface overlay. Rendering `<Header />` once in `layout.tsx`, outside the `PageTransition` wrapper, keeps it above every transition state. Infer page-specific props (e.g. `transparent` for a hero overlay) from `usePathname()` inside the header itself.

**Drop transform at rest in page-transition wrappers.** If the wrapper always sets `transform: translate3d(0, 0, 0)` even when the `visible` state is steady, it creates a permanent stacking context, with the same consequences as above for anything else body-level. Only apply transform during `entering`/`leaving`; at rest, leave the wrapper untransformed.

**Mobile menu overlay is a portal, header lives in sticky position.**
- Overlay: `createPortal(menuJSX, document.body)` at `z-[90]`. Fixed `inset-0`, `bg-surface` (warm off-white), fades via inline opacity transition.
- Header: `sticky top-0 z-[100]`. Stays above the overlay so the logo + X read on top.
- Close on `pathname` change (not on link click). PageTransition intercepts internal-link clicks and delays `router.push` by ~440ms — if the menu closes on click, you briefly see the old page behind the fading menu before the page transition kicks in. Keep the menu open through the leave phase by closing it in a `useEffect` that fires when pathname actually updates.

---

## MOBILE MENU PATTERNS

The specific pattern that shipped on auwa.life and should be reused on More Air client builds.

**Hamburger icon geometry.** Container `w-[28px] h-[22px]`, lines at `top: 2px / 10px / 18px` with `height: 2px`. That gives ~18px visible span (top of first line to bottom of third) which reads as the same visual weight as a `h-[20px]` serif logo next to it. Don't use `top: 0px` — iOS renders an edge-flush 2px span slightly thicker than the others.

**Sibling rasterisation discipline (hamburger lines + sound-toggle bars).** Mobile Chromium and iOS Safari assign sibling animated spans to different compositor layers if their style hints differ — even slightly — and rasterise them at visibly different stroke widths. To force every sibling onto a matched layer, all spans must declare the SAME combination:

```js
{
  transformOrigin: "50% 50%",
  transform: /* always set, even when static — never undefined */,
  willChange: "top, transform",          // hamburger
  // willChange: "transform",            // sound-toggle bars
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
}
```

The hamburger's middle span only animates `opacity` but still declares the same `willChange` + transform + backface hints as the outer two. The sound-toggle's playing branch sets `transform: scaleY(1)` explicitly rather than letting the keyframe animation own it via `undefined` — without that explicit value, the resting bars and the playing bars get different layer treatment. Same fix applies to any future cluster of small sibling shapes (icon dots, equaliser bars, dotted dividers).

**Hamburger → X morph.** Inline styles only. Middle line fades (`opacity: menuOpen ? 0 : 1`); top + bottom lines converge to centre (`top: menuOpen ? "10px" : "2px" | "18px"`) and rotate (`transform: menuOpen ? "rotate(±45deg)" : "rotate(0deg)"`). Transitions on `top` and `transform`, both 500ms ease-out-expo. The rotated 28px line has a ~20px vertical diagonal span, so the X and the hamburger feel the same size.

**Logo stays visible (and clickable) while the menu is open.** It re-colours through `pickColour` (sumi when `menuColorActive`) and intercepts clicks: clicking it closes the menu AND navigates home (with `data-skip-transition="true"` applied conditionally via `{...(menuOpen ? { "data-skip-transition": "true" } : {})}` so the page-transition wipe doesn't run on top of the menu close). The earlier "fade the logo to opacity 0 on menu open" pattern is gone — having the logo present in the open menu lets the user reach for it as the implicit "Home" item.

**Menu colour flip is asymmetric (open snappy, close held — except on skip-transition nav).** Open: `setMenuColorActive(true)` after 200ms, so the panel has descended enough to cover the header band before the colour flips. **Standalone close (X button click):** `setMenuColorActive(false)` after 900ms, mirror of the open delay — the panel ascends ~500ms into the close cycle by then. Without the close delay, the post-close colour briefly shows under the still-visible panel and reads as a flicker.

**Skip-transition navigation override.** When the close is triggered by a `data-skip-transition="true"` Link click (menu items, logo when menu is open), the click handler sets `setMenuColorActive(false)` IMMEDIATELY in the same event as `setMenuOpen(false)`. Reason: skip-transition navs render the destination page INSTANTLY behind the closing menu (no LEAVE phase), and the destination page's per-route or sentinel tone is what should resolve to. Holding `menuColorActive` for 900ms in this case lands the colour change AFTER the new page is already visible through the menu, reading as a flicker — the user reports it as "the colour changes after the page has loaded". The X-button standalone-close path keeps the 900ms hold; only Link clicks short-circuit it.

**Header `transparent` mode uses a wide atTop range.** On a page with a transparent-over-hero header, use `atTop <= 400px (enter) / <= 100px (leave, hysteresis)` and trigger `hidden` at `y > 10`. A narrow atTop range (e.g. `y <= 40`) with a distant hide trigger (e.g. `y > 80`) creates a visible dead-zone where the header flashes solid-white before it slides away. Keep `atTop` true through the entire scroll-up-slide distance.

**Nav link text-roll at display type sizes.** The nav links use the CtaLink-style text-roll (original rises up, duplicate rises from below). At `clamp(2.5rem, 6vw, 4.5rem)` and `leading-[1.08]` the mask must accommodate descenders: `<span className="inline-block overflow-hidden pb-[0.12em]">`. Also **over-translate** the rolling spans: use `-translate-y-[110%]` on the outgoing and an initial `translate-y-[110%]` on the incoming (not `-translate-y-full` / `translate-y-full`). The extra 10% catches any subpixel rendering slack in Safari where ascenders can otherwise peek over the top of the mask mid-transition.

**Menu overlay breathes — asymmetric open / close.** Overlay backdrop opens at 700ms and closes at 1100ms. Nav items open at 500ms with per-item 60ms stagger, and close at 900ms with no stagger — everything glides out together under the slower backdrop exhale. Same `cubic-bezier(0.16, 1, 0.3, 1)` both ways.

---

## ARTICLE SHARE ICONS

Article pages include Facebook, Pinterest, and X share links. Sizes currently `width="18"` (FB, Pinterest) and `width="17"` (X, accounting for its tighter glyph). `gap-5` between icons. Don't include Instagram — it has no link-share preview flow. All share URLs route to the article's OG image via `{slug}-og.jpg`.

---

## AWWWARDS READINESS (KEEP IN FORCE)

Lessons baked in from the April 2026 SOTD-prep pass. Every future site (Auwa, More Air client, or venture) should pass these before submission or launch. Missing any single one costs real jury points.

**404 + dynamic-route hygiene.** `src/app/not-found.tsx` exists and is branded (header/footer/type consistent with the rest of the site). Every `[slug]/page.tsx` calls `notFound()` when the slug isn't found, AND exports both `generateStaticParams` returning all known slugs AND `export const dynamicParams = false`. Never fall through to a fallback article/product — that returns 200 and indexes. `generateMetadata()` for unknown slugs returns `robots: { index: false, follow: false }`.

**Internal-only routes.** Any route meant for local-dev use only (`/brand`, `/book-signup`, future iteration mockups) gets a top-of-component `if (process.env.NODE_ENV === "production") notFound();` guard so it 404s in prod builds while staying viewable on `next dev`. Pair with `robots: { index: false, follow: false }` in metadata AND an entry in `src/app/robots.ts` disallow list.

**Per-page OG images.** Every top-level route (`/`, `/journal`, `/about`, `/app`, `/store`, `/book`, `/brand`) exports its own `openGraph.images` and `twitter.images` — don't rely on the root layout fallback. Pasting `/store` or `/book` into LinkedIn must show a specific image, not the homepage OG. Images live at `public/og/{page}.jpg`, 1200×630 JPG. Generate via `cp source.jpg dst.jpg && sips --resampleWidth 1200 dst.jpg && sips -c 630 1200 dst.jpg`. For articles, `generateMetadata()` derives OG path by replacing `-hero.jpg` with `-og.jpg`, so the article folder needs both files.

**PWA manifest + icons.** `src/app/manifest.ts` must exist with name, short_name, start_url, theme_color, and icons. `public/favicon.svg` AND `public/apple-touch-icon.png` (180×180) both present. Awwwards favicon-quality checks flag missing manifests.

**Focus + a11y.** Do NOT use `outline-none` on form inputs or buttons without a `:focus-visible` replacement. globals.css already has a global `:focus-visible { outline: 2px solid ... }` rule that handles keyboard focus if you don't strip it — don't strip it. Every icon-only button has `aria-label`; decorative SVG inside has `aria-hidden="true"`. Judges tab through.

**Horizontal scrollers + lazy loading.** `<Image>` in a horizontal scroller (Journal strip, Pillar Parade, carousels) must use `loading="eager"` on all cards, with `priority={i < 2}` on the first two. The default `lazy` heuristic waits for viewport intersection, but cards 2–4 sit just off-viewport to the right and never intersect until swiped to — resulting in a blank card on first swipe on iOS. First iPhone feedback from real users.

**Audio / media cleanup.** Any background `Audio` element gets `document.addEventListener("visibilitychange", pause)` AND `window.addEventListener("pagehide", pause)`. iOS Safari otherwise keeps a paused-media badge live and, in some cases, continues playback when the tab is backgrounded or the user opens a new tab. Applied on `SoundToggle`.

**Floating UI over sticky footer.** Fixed-position UI (sound toggle, cursor label, chat button) living over a `sticky bottom-0` dark footer needs to invert when the footer is revealed behind it. Use an IntersectionObserver with a zero-height sentinel appended as `<main>`'s last child rather than a scroll listener — IO avoids coupling floating-UI behaviour to scroll-event timing and works identically across any scroll implementation:

```ts
const sentinel = document.createElement("div");
sentinel.style.cssText = "width:100%;height:0;pointer-events:none;";
main.appendChild(sentinel);
const io = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) setOnDark(true);
  else setOnDark(entry.boundingClientRect.top < 0);
}, { rootMargin: "0px 0px -64px 0px", threshold: 0 });
io.observe(sentinel);
```

**Auto-advancing modules must wait for viewport.** Any carousel or slideshow that auto-advances (EditorialFrames' 7s rotation, future hero crossfaders) must gate its setTimeout/setInterval on an IntersectionObserver one-shot so rotation only starts when the module enters the viewport. Otherwise a visitor sitting on the hero video for 20s arrives at the module already showing frame 3 or 4 — not pillar 01. First impression broken.

**Sticky header + PageTransition.** Render `<Header />` in `layout.tsx` OUTSIDE the `PageTransition` wrapper. Inside it, the header inherits the wrapper's transform/opacity stacking context and fades out with every route change. Mobile menu overlays portal to `document.body` with the header at `z-[100]` above a `z-[90]` overlay.

**PageTransition = opacity-only. No transform.** An earlier version of PageTransition translated content 18px down on enter and 24px up on leave for a "settles into place" feel. This caused a visible content drop on teaser pages (viewport-locked centred layouts expose any page-wrapper translate to the eye — article and journal pages absorb it via natural flow). Keep PageTransition's `contentStyle` to `{ opacity: 1 }` at rest and `{ opacity: 0 }` on enter/leave. The crossfade alone carries the handoff without ever shifting layout.

**Header state must not persist across navigations.** Header is rendered once in `layout.tsx` and persists. If the user scrolled down on page A (header hidden via scroll) then clicks to page B, the new page's first render still has `hidden=true` from A's state — triggering the 500ms slide-down animation on B. Fix: adjust state during render using React's documented pattern:

```tsx
const [renderedPathname, setRenderedPathname] = useState(pathname);
if (renderedPathname !== pathname) {
  setRenderedPathname(pathname);
  setMenuOpen(false);
  setHidden(false);
  setAtTop(true);
  atTopRef.current = true;
  lastScrollY.current = 0;
}
```

React discards the current render and re-renders with the new state before paint. Do NOT use `key={pathname}` on the Header — remounting the sticky header causes a brief layout shift (header disappears, content below moves up, then header remounts and content moves down). Do NOT use `useLayoutEffect` + setState for this — the first paint still uses the old state on Safari.

**Teaser-style single-viewport pages MUST match the article-page hero pattern.** Earlier Auwa teaser pages (app, store, book) used a bespoke `flex flex-col h-[calc(100dvh-4rem)]` layout with a `flex-1 min-h-0` image column. Custom font swap (next/font `display: swap`) recalculated text heights after initial paint, which resized the flex-1 image, which visibly dropped the whole composition ~1s after load. Use the article hero pattern instead — `grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]` with an `aspect-[4/5]` image on mobile and natural text flow. This absorbs font-swap without layout shift.

**Submission cadence.** Tuesday or Wednesday morning UK time is the window — Monday is judges' backlog day, Thursday/Friday/weekend land in the "Nominee" pile after SOTD slots are allocated. Avoid the first week of any month (carryover backlog). Submit only once the hero video and entrance loader are the absolute final cut — those are the first four seconds and carry 80% of the judge's vote. Primary category for Auwa-tier brands: **Wellbeing** (least crowded premium lane). Tags to pick: Editorial, Typography, Animation, Transitions, Interaction Design, Cultural. Main preview image: 1400×787 JPG under 1MB, and for Auwa specifically it's a close crop of the Auwa face from the hero video — nothing else on Awwwards looks like it.
