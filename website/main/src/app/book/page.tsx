"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AuwaCharacter } from "@/components/auwa-character";
import { BookPreview } from "@/components/book-preview";
import { DarkPageTheme } from "@/components/dark-page-theme";
import { EditorialFeature } from "@/components/editorial-feature";
import { FadeIn } from "@/components/fade-in";
import { Footer } from "@/components/footer";
import { HeaderTone } from "@/components/header-tone";
import { usePageReady } from "@/components/page-transition";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { SignupForm } from "@/components/signup-form";
import { TextReveal } from "@/components/text-reveal";
import { EASING, STAGGER } from "@/lib/motion";

/*
  /book — the dark book / world pillar.

  Two signature motions distinguish this page:
    1. SevenStars: opens as an orbital arrangement around Wakon-as-
       sun, then gathers into the horizontal row (desktop) / vertical
       column (mobile) as the user scrolls. Each planet's kokoro
       reveals one by one in a scroll-driven cascade once settled.
       Promoted from a /demo-book sandbox after multi-pass iteration
       on pacing, position, and per-breakpoint behaviour.
       (Backup of the pre-orbital version of this page is preserved
       at `_backups/book-page-pre-orbital-2026-05-13.tsx` at the
       project root for rollback.)
    2. MeetAuwa: scroll-driven approach-from-distance entrance —
       Auwa rises from below the section at small scale and settles
       into position before becoming interactive.

  Token discipline:
  • Type sizes / trackings come from context/website/website.md §4 only.
    No bespoke clamp() values, no italic pullquotes (system rule —
    pullquotes are never italic), tracking only at the documented
    0.005em / 0.06em / 0.08em values.
  • Motion uses STAGGER + FadeIn variants; no hardcoded delays beyond
    the per-line cascades native to TextReveal.
  • Section rhythm uses space-section / space-breathing utilities; no
    bespoke py-* values.
  • Dark surface comes from <DarkPageTheme /> setting
    data-page-theme="dark", which the header + FigureHook observe.
*/

type Spread = { src: string; alt: string; type?: "spread" | "cover" };

/* Auwa character variants. Keys map directly to the public asset
   filenames so a future swap (e.g. Rieko delivers updated artwork) is
   a one-line edit. */
const auwaVariants = {
  up: "/book/character/auwa-up.webp",
  down: "/book/character/auwa-down.webp",
  left: "/book/character/auwa-left.webp",
  right: "/book/character/auwa-right.webp",
  glow: {
    front: "/book/character/auwa-front-glow.webp",
    up: "/book/character/auwa-up-glow.webp",
    down: "/book/character/auwa-down-glow.webp",
    left: "/book/character/auwa-left-glow.webp",
    right: "/book/character/auwa-right-glow.webp",
  },
};

const previewSpreads: Spread[] = [
  { src: "/book/1/page-06.jpg", alt: "Earth speaks to Auwa" },
  { src: "/book/1/page-14.jpg", alt: "Bluu lit, the forest answering" },
  { src: "/book/1/page-16.jpg", alt: "Auwa listens to the song" },
];

const futureBooks = [
  {
    num: "01",
    title: "The Beginning",
    cover: "/book/covers/cover-1.jpg",
    status: "First chapter",
    note: "A blue flower in a quiet forest.",
  },
  {
    num: "02",
    title: "Ocean",
    cover: "/book/covers/cover-2.jpg",
    status: "Coming next",
    note: "Auwa descends below the surface.",
  },
  {
    num: "03",
    title: "Human",
    cover: "/book/covers/cover-3.jpg",
    status: "In progress",
    note: "The strangest beings of all.",
  },
  {
    num: "04",
    title: "Lioma",
    cover: "/book/covers/cover-4.jpg",
    status: "In progress",
    note: "The longest way home.",
  },
] as const;

/* Section divider in the dark tone. Padding gutters match the home
   page Separator so module boundaries align across light + dark
   templates. */
function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-px bg-washi/10" />
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <DarkPageTheme />
      <main>
        <Hero />
        <Intro />
        <Separator />
        <OpeningQuote />
        {/* No separator here — SevenStarsOrbital includes the separator
            at the top of its sticky-pinned area (desktop only), so the
            user sees the separator FREEZE at viewport top when the
            scroll-pin engages, then unfreeze once the cascade is done. */}
        <SevenStarsOrbital />
        <Separator />
        <MeetAuwa />
        <Separator />
        <KokoroReveal />
        <Separator />
        <Spreads />
        <Separator />
        <Series />
        <Separator />
        <Author />
        <Separator />
        <Signup />
        {/* No separator here — the footer's own washi/10 hairline at
            the top serves as the boundary between page and footer. */}
        {/* Trailing breath before the (sticky) footer reveals. Matches
            the gap created when two adjacent space-section blocks meet
            mid-page (see space-section utility in globals.css). */}
        <div className="h-16 md:h-24" aria-hidden="true" />
      </main>
      {/* Footer is now Yoru by default site-wide (one dark surface
          system across every page), so no per-page override needed. */}
      <Footer />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Sections
   ────────────────────────────────────────────────────────────────── */

/* Full-bleed magical-Auwa hero — same shape as the live HeroVideo
   (negative top margin to climb under the sticky header, h-[100svh]
   for the fixed-bottom anchor on iOS).

   Three layered illustrations by Rieko:
   • V1 "Auwa on dark"  — base, opacity 1 from first paint.
   • V2 "Auwa on pattern" — overlay, fades in 0→1 over 2.5s after a
     short settle, so the pattern arrives as if catching light.
   • V3 "Auwa eyes closed" — blink layer, opacity flicks to 1 then
     back to 0 every ~7s. Asymmetric timing (fast close, slow open)
     reads as a human-feeling blink. Skipped under
     prefers-reduced-motion.

   Mobile uses the portrait-* set; desktop uses landscape-*. The
   off-breakpoint set is `display:none` so only the active stack
   actually renders into the layout — both still fetch in browsers
   that don't honour display:none for image fetching, but each set
   is ~500-700KB so total worst-case is ~1.2MB which is fine for a
   hero. */
function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[100svh] w-full overflow-hidden">
        {/* Header tone — full-bleed dark hero, header reads against
            imagery → Surface logo + menu. Once the user scrolls past
            the hero, the per-route fallback (darkPage → washi)
            takes over because the post-hero content doesn't drop
            its own sentinel. */}
        <HeaderTone tone="surface" />
        <BookHeroLayers />
        {/* Top scrim — keeps the washi header glyphs legible over busy
            imagery without darkening the image meaningfully. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--color-yoru) 35%, transparent), transparent)",
          }}
        />
        {/* Bottom gradient — supports the title block and bridges the
            illustration into the page bg. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-yoru) 100%)",
          }}
        />
        {/* Hero copy.
            Mobile: centred above the Explore cue (which sits bottom-
            centre), so the title and the cue read as one composition.
            Desktop (md+): bottom-left, padding mirrors the page gutter
            so the title aligns with the Auwa wordmark.
            Eyebrow removed — the title alone carries the moment. */}
        {/* Title parked — hidden for now per design decision while
            we decide on the right wording. The hero reads as the
            book moment via the imagery + cue alone. An sr-only h1
            is retained so the page still has one heading element
            for SEO + screen-reader navigation. */}
        <h1 className="sr-only">Auwa Illustrated Stories</h1>
        {/* Begin-reading cue mirrors HeroVideo's pattern (text-roll
            label + breathing vertical line). Scrolls to #begin with
            the documented header offset. */}
        <BeginReadingCue />
      </div>
    </section>
  );
}

/** Three-layer hero: V1 base + V2 pattern fade-in + V3 blink loop.
    Renders both portrait and landscape stacks and toggles via
    Tailwind breakpoint classes — `<picture>` would also work, but
    layering three pictures with shared opacity state is messier.

    NOTE: V1 is intentionally NOT animated. next/image with `priority`
    serialises the inline style into the SSR HTML, and React's runtime
    style setter doesn't replace it after mount (whitespace mismatch
    between SSR-stringified CSS and runtime CSSOM). To animate V1
    without hitting that issue, we drive its opacity via state that
    flips in a post-mount rAF — the SSR HTML ships with no inline
    style, then React's runtime style update transitions cleanly
    from 0 to 1 over 600ms. The 600ms ease-out-expo gives V1 a soft
    arrival; V2 then layers on top at 900ms with its 2.5s fade-in,
    so the two transitions stack into one composed entrance. */
function BookHeroLayers() {
  const [v1In, setV1In] = useState(false);
  const [patternIn, setPatternIn] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  // Gate V1's fade on the page transition completing, same as the
  // home HeroVideo. Without this gate, V1 fades in behind the
  // covering panel during navigation and the user only sees the
  // last few % of the fade — reads as abrupt.
  const ready = usePageReady();

  // V1 fades in once the page-transition has settled.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => setV1In(true));
    return () => cancelAnimationFrame(id);
  }, [ready]);

  // V2 starts its slow fade-in shortly after the base paints.
  useEffect(() => {
    const t = window.setTimeout(() => setPatternIn(true), 900);
    return () => clearTimeout(t);
  }, []);

  // V3 blink loop — first blink at 4.5s, repeats every 7s.
  // Asymmetric: fast close, brief hold, slow open (set per-direction
  // in the inline transition below).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let openTimeout = 0;
    const blink = () => {
      setEyesClosed(true);
      openTimeout = window.setTimeout(() => setEyesClosed(false), 220);
    };
    const first = window.setTimeout(blink, 4500);
    const interval = window.setInterval(blink, 7000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      clearTimeout(openTimeout);
    };
  }, []);

  const v1Style = {
    opacity: v1In ? 1 : 0,
    // Slow 2000ms fade — matches the home page hero so the book hero
    // arrives with the same gentleness rather than reading abruptly.
    transition: "opacity 2000ms cubic-bezier(0.16, 1, 0.3, 1)",
  };
  const patternStyle = {
    opacity: patternIn ? 1 : 0,
    // Slow ease-in so the pattern arrives like light catching on it.
    transition: "opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1)",
  };
  const eyesStyle = {
    opacity: eyesClosed ? 1 : 0,
    // Fast close, slower open — reads as a human blink.
    transition: eyesClosed
      ? "opacity 120ms cubic-bezier(0.4, 0, 1, 1)"
      : "opacity 220ms cubic-bezier(0, 0, 0.2, 1)",
  };

  return (
    <>
      {/* Mobile + tablet portrait stack (<lg).
          quality=95 because next/image otherwise recompresses at q=75
          regardless of source — at full-bleed hero scale that's
          visibly soft on the magical-Auwa artwork. */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/book/hero/portrait-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
          style={v1Style}
        />
        <Image
          src="/book/hero/portrait-2.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={patternStyle}
        />
        <Image
          src="/book/hero/portrait-3.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={eyesStyle}
        />
      </div>
      {/* lg+ landscape stack */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/book/hero/landscape-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
          style={v1Style}
        />
        <Image
          src="/book/hero/landscape-2.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={patternStyle}
        />
        <Image
          src="/book/hero/landscape-3.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={eyesStyle}
        />
      </div>
    </>
  );
}

function BeginReadingCue() {
  return (
    <button
      type="button"
      onClick={() => {
        const target = document.getElementById("begin");
        if (!target) return;
        // Same custom rAF scroll as the home hero — stops sooner so
        // the white area doesn't run flush against the wordmark, and
        // uses an expo.inOut curve over 1400ms instead of the
        // implementation-defined native "smooth" which reads abrupt.
        const stopGap = window.matchMedia("(min-width: 768px)").matches
          ? 200
          : 140;
        const targetY = Math.max(
          0,
          target.getBoundingClientRect().top + window.scrollY - stopGap
        );
        const startY = window.scrollY;
        const distance = targetY - startY;
        if (Math.abs(distance) < 4) return;
        const duration = 1400;
        const startTime = performance.now();
        const ease = (t: number) =>
          t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        const step = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          window.scrollTo(0, startY + distance * ease(t));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
      aria-label="Explore"
      className="group absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2"
    >
      <span className="relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-washi">
        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
          Explore
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
        >
          Explore
        </span>
      </span>
      <span
        aria-hidden="true"
        className="scroll-cue-line block w-px h-8 md:h-10 bg-washi/70 origin-top"
      />
    </button>
  );
}

/* Intro — mirrors the homepage intro section exactly: max-w-[880px]
   left-aligned block, eyebrow at hero-tier tracking, a ScrollFadeText
   paragraph at the home-page responsive scale (22 / 28 / 32). The
   only divergence from the homepage is colour (washi vs. void) and
   the absence of a CTA — the page itself flows downward from here. */
function Intro() {
  return (
    <section
      id="begin"
      className="px-6 md:px-12 lg:px-20 xl:px-28 space-section scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[880px]">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi/55">
            An illustrated story
          </p>
        </FadeIn>
        <ScrollFadeText
          as="p"
          className="mt-6 md:mt-10 font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[0.005em] text-washi"
        >
          Auwa is the brand. Auwa is also a small luminous being who arrives in the first illustrated book by Eko Maeda. The same name, in two places. One philosophy, written down twice: once for the world we live in, and once for a world drawn by hand.
        </ScrollFadeText>
      </div>
    </section>
  );
}

/* Opening pullquote — the one quote that reframes everything. System
   pullquote scale (clamp 1.75/2.75) is too small for a page-level
   moment; "hero-scale pullquote" (clamp 2/4.5) is the documented tier
   for moments like this. NEVER italic per system rule. */
function OpeningQuote() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-breathing">
      <div className="max-w-[900px] mx-auto text-center">
        <ScrollFadeText
          as="p"
          className="font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.15] tracking-[0.005em] text-balance text-washi"
          from={0.16}
          finishAt={0.45}
        >
          &ldquo;In one of countless galaxies, a small blue planet was waiting.&rdquo;
        </ScrollFadeText>
        <FadeIn delay={400}>
          <p className="mt-10 font-sans text-[12px] tracking-[0.16em] uppercase text-washi/45">
            At the beginning
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* Meet Auwa — enhanced demo entrance.

   The production /book version applies a soft scroll-scale (0.94 → 1.0)
   to the character wrapper. This demo replaces that with an
   approach-from-distance entrance: Auwa starts small (scale 0.35),
   below her final position (translateY +90), and invisible
   (opacity 0). As the user scrolls the section through the viewport,
   she rises, grows, and brightens until she lands at her settled
   form. After she lands she holds — no scale-down as the section
   exits, so the moment reads as a clean arrival rather than a
   reversible pulse.

   The choreography is scroll-progress driven (not time-based) so it
   plays at the user's reading pace, and never finishes off-screen.
   Same iOS-safe pattern as MeetAuwa in /book: captured viewport
   height + rAF lerp. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function MeetAuwa() {
  const sectionRef = useRef<HTMLElement>(null);
  const characterFrameRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const pointerKind = usePointerKind();
  // Touch devices have no cursor, so the "Move cursor" half of the
  // hint is meaningless. Drop it for coarse pointers; keep the full
  // hint for fine pointers (mouse / trackpad). No trailing period —
  // the cue is a hint, not a sentence.
  const cueText =
    pointerKind === "coarse" ? "Tap to glow" : "Move cursor, tap to glow";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Snap to settled state.
      if (moverRef.current) {
        moverRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        moverRef.current.style.opacity = "1";
      }
      return;
    }
    const section = sectionRef.current;
    const mover = moverRef.current;
    if (!section || !mover) return;

    let currentP = 0;
    let targetP = 0;
    let raf = 0;
    let active = true;
    let capturedVh = window.innerHeight;
    const onResize = () => {
      capturedVh = window.innerHeight;
    };

    // Anchor progress to the character frame (the non-transformed
    // wrapper around the moverRef), not the section. The section is
    // tall — heading + cue + character image — so a section-anchored
    // progress completes long before the character actually enters
    // the visible area.
    // Progress 0 = character frame top at viewport bottom (Auwa
    // about to appear). Progress 1 = character frame top at viewport
    // mid-height (Auwa fully arrived). Centre-anchored finish keeps
    // her settled comfortably in view rather than dropping out the
    // top.
    const compute = () => {
      const frame = characterFrameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const startY = capturedVh;
      const endY = capturedVh * 0.5;
      const raw = (startY - rect.top) / (startY - endY);
      targetP = Math.max(0, Math.min(1, raw));
    };

    const tick = () => {
      if (!active) return;
      currentP += (targetP - currentP) * 0.12;
      const p = smoothstep(currentP);
      const scale = 0.35 + 0.65 * p;
      const ty = (1 - p) * 90;
      mover.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      mover.style.opacity = p.toFixed(3);
      raf = requestAnimationFrame(tick);
    };

    compute();
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-20 xl:px-28 space-breathing"
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[760px] mx-auto px-4 md:px-0">
          <TextReveal as="span" className="block" stagger={STAGGER.hero}>
            Their light became Auwa,
          </TextReveal>
          <TextReveal
            as="span"
            className="block"
            stagger={STAGGER.hero}
            delay={STAGGER.hero}
          >
            with a heart full of joy.
          </TextReveal>
        </h2>
        <FadeIn delay={400}>
          <p className="mt-10 font-sans text-[12px] tracking-[0.16em] uppercase text-washi/45">
            {cueText}
          </p>
        </FadeIn>
        {/* Character. The wrapper carries the scroll-driven entrance
            transform + opacity directly (no inner FadeIn) so the JS
            owns both properties without a competing CSS opacity
            animation interpolating against our manual values. Initial
            inline state matches "progress 0" so SSR + first paint
            land at the same place the JS expects to drive from. */}
        <div
          ref={characterFrameRef}
          className="mt-2 md:mt-4 mx-auto w-full max-w-[440px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[620px]"
        >
          <div
            ref={moverRef}
            style={{
              willChange: "transform, opacity",
              opacity: 0,
              transform: "translate3d(0, 90px, 0) scale(0.35)",
            }}
          >
            <AuwaCharacter
              src="/book/character/auwa-front.webp"
              alt="Auwa, the small luminous being"
              variants={auwaVariants}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Seven Stars — demo orbital → settled entrance.

   The production component (`@/components/seven-stars`) slides each
   planet in from the right as the section enters viewport. This demo
   replaces that with an orbital arrangement that gathers into the
   production layout as the user scrolls. The SETTLED state matches
   /book exactly (planet sizes, name typography, row/column flex
   layouts, tap-to-reveal interaction) so the only delta is the
   entrance choreography.

   Design notes:
   • Wakon is the sun — fixed at the centre during the orbital phase.
     The other six planets orbit around it. In the settled layout
     Wakon sits at the middle of the row (desktop) or middle of the
     column (mobile), so its "orbital position" and "settled
     position" coincide and it never translates.
   • STARS order is rearranged so Wakon sits at index 3 (4th of 7),
     which is the natural middle slot in both layouts.
   • Production flex layout owns the settled positions. The orbital
     transform is applied per-planet as `translate(deltaX, deltaY)`
     where delta = orbitalPos - finalPos, multiplied by (1 - eased
     progress). At progress 1 the translate collapses to (0, 0) and
     each planet sits exactly where the flex layout placed it.
   • Final positions are measured via offsetLeft/offsetTop relative
     to the layout container — captured fresh on mount and on resize.
     This keeps the choreography correctly aligned across breakpoint
     changes (md row vs mobile column).
   • Scroll anchor: progress maps from "Wakon's settled position at
     viewport bottom" → "Wakon's settled position at upper third of
     viewport". This means the orbital is fully visible by the time
     the user is looking at the section, rather than firing below
     the fold.
   • Names + tap interactivity gate on progress ≥ 0.92. Before that,
     pointer-events on each planet button is `none` and names are
     opacity 0. */
const STARS = [
  { num: 2, name: "Koto", slug: "koto" },
  { num: 3, name: "Mako", slug: "mako" },
  { num: 4, name: "Kamuwa", slug: "kamuwa" },
  { num: 1, name: "Wakon", slug: "wakon" }, // SUN — centre of the system
  { num: 5, name: "Kiala", slug: "kiala" },
  { num: 6, name: "Lioma", slug: "lioma" },
  { num: 7, name: "Toamu", slug: "toamu" },
] as const;
type Star = (typeof STARS)[number];
const WAKON_INDEX = 3;

// Orbital rotation amount across the full orbital phase. The orbital
// spin is now SCROLL-driven, not time-driven — orbitalP * 2π *
// ORBITAL_TURNS is the planets' angle offset from their base
// positions. This is fully deterministic: the same scroll position
// always produces the same rotation, so every view of the section
// looks identical, regardless of how long the user has been on the
// page. The earlier time-based rotation accumulated `elapsed` since
// page mount, so subsequent visits read as more energetic / further-
// rotated than the first. ORBITAL_TURNS = 0.25 = quarter rotation
// during the orbital phase, matching the gentle motion of the
// first-view time-based version.
const ORBITAL_TURNS = 0.25;

// On mobile, the orbital cluster centre sits at this Y inside the
// container — positioned so that when the section first enters view
// (heading near the top), the cluster lands close to the heading
// with no significant gap between them. The orbital scrolls with
// the page (container-anchored, not viewport-sticky) so it's fixed
// in relation to the section title, not to the page. As the user
// continues scrolling, the cluster moves up and out, and the
// planets settle DOWN into their column positions — the visual
// reads as "the cluster expanded down into a list".
const MOBILE_ORBITAL_CENTER_Y = 180;
const EASE_BACK_OUT = "cubic-bezier(0.34, 2, 0.64, 1)";
const REVEAL_TRANSITION = `opacity 280ms ${EASING.outExpo}, transform 560ms ${EASE_BACK_OUT}`;
const REVEAL_REST_SCALE = 0.7;

// Kokoro reveal cascade — scroll-progress driven, reversible.
// • Desktop (horizontal row): all planets share the same Y, so the
//   order is thematic — Wakon (sun) first, the light radiating
//   outward to neighbours.
// • Mobile (vertical column): planets occupy a tall column where
//   top planets exit viewport before bottom planets enter, so the
//   order follows scroll direction (top → bottom) — each kokoro
//   reveals while its planet is comfortably in view.
const REVEAL_ORDER_DESKTOP = [3, 2, 4, 1, 5, 0, 6] as const;
const REVEAL_ORDER_MOBILE = [0, 1, 2, 3, 4, 5, 6] as const;
// Progress windows.
// Orbital → settled phase length differs per breakpoint.
// Desktop: 50% of scroll for orbital — the row stays in viewport
// throughout, so we can afford a long orbital beat.
// Mobile: 30% of scroll for orbital — slowed down from 20% so the
// orbital → column transition feels calmer, closer to the desktop
// version's pace. Combined with START_Y_FRACTION_MOBILE 1.05 below
// (more headroom before settling starts), this keeps the first
// kokoro reveal at a comfortable viewport position while letting
// the orbital itself unfold more gradually.
const ORBITAL_END_DESKTOP = 0.5;
const ORBITAL_END_MOBILE = 0.3;

// Cascade windows differ per breakpoint because mobile and desktop
// have different visibility geometry.
//
// Desktop (horizontal row, all planets share the same Y): cascade
// starts AFTER the planets settle (at ORBITAL_END = 0.50) and ends
// at 0.80, leaving a 0.80 → 1.0 holding beat with all kokoros
// revealed before the row scrolls off the top.
//
// Mobile (vertical column, planets at different Y positions, column
// taller than viewport): cascade overlaps with the orbital settling
// (starts at 0.15, during orbital) so the early-reveal planets are
// caught mid-flight while still in viewport. By the time the top
// planets settle into their column positions they're at or above
// the viewport top, so revealing AFTER settling would miss them.
// Cascade extends to 0.95 so the bottom planets (which enter
// viewport from below as scroll continues) also have a visible
// reveal moment.
const CASCADE_START_DESKTOP = ORBITAL_END_DESKTOP;
const CASCADE_END_DESKTOP = 0.8;
// Mobile cascade starts at ORBITAL_END_MOBILE (0.30) — Koto reveals
// right as the planets finish settling into their column positions.
// The scroll anchor (START_Y_FRACTION_MOBILE = 1.05) gives the
// orbital phase room to unfold calmly before the cascade starts.
const CASCADE_START_MOBILE = 0.3;
const CASCADE_END_MOBILE = 0.95;

// Scroll anchor — Wakon's settled viewport-Y goes from startY to
// endY across progress 0 → 1.
//
// Desktop startY 0.85, endY 0.15: Wakon enters from the lower
// portion and climbs to the upper portion, giving the orbital arc
// vertical space above the row.
//
// Mobile startY 0.55, endY 0.20: Wakon's natural column position
// sits at mid-viewport at progress 0 (rather than down at the
// bottom), so the orbital is centred IN the viewport rather than
// hanging off the bottom edge. Wakon then climbs to near the top
// as the cascade plays out down the column.
const START_Y_FRACTION_DESKTOP = 0.85;
const END_Y_FRACTION_DESKTOP = 0.15;
// Mobile startY 1.15: Wakon's natural column position at vh*1.15
// (below viewport edge) triggers settling start. Pushed up from
// 1.05 so the whole sequence fires even earlier in the user's
// scroll — guarantees the first kokoro reveal (Koto at CASCADE_START
// = 0.30) lands at viewport Y ≈ 256, well clear of the top edge
// even on shorter vertical phone screens.
const START_Y_FRACTION_MOBILE = 1.15;
const END_Y_FRACTION_MOBILE = 0.2;

// Desktop-only scroll-pin: the section is wrapped in a runway of this
// height (vh units). The inner content is `position: sticky; top: 0;
// height: 100vh`, so it stays pinned to the viewport while the user
// scrolls through the runway. Progress (0 → 1) is derived from how far
// the runway has moved past the viewport top — 0 the instant the
// runway's top edge meets the viewport top, 1 the instant the runway's
// bottom edge passes the viewport bottom.
//
// 230vh = 100vh of pinned viewport + 130vh of scrollable distance. The
// orbital phase runs 0 → 0.50 (≈ 65vh of scroll), the cascade 0.50 →
// 0.80 (≈ 39vh of scroll), and 0.80 → 1.00 is a 26vh holding beat
// where all seven kokoros sit fully revealed before the pin releases.
const RUNWAY_VH_DESKTOP = 230;

function SevenStarsOrbital() {
  const sectionRef = useRef<HTMLElement>(null);
  // Outer scroll runway — desktop only. On mobile this wrapper has
  // natural height and is not used by the progress calc; mobile keeps
  // the original Wakon-viewport-Y math (see `compute()` below).
  const runwayRef = useRef<HTMLDivElement>(null);
  // Layout containers — one per breakpoint, both rendered but
  // visibility switched via Tailwind. The active container is the
  // one whose layout matches the current viewport.
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  // Per-planet wrapper refs that the rAF loop transforms.
  const desktopWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Per-planet name refs (opacity-gated on progress).
  const desktopNameRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const mobileNameRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  // Set of indices whose kokoro is currently revealed. Driven by
  // scroll progress (see the rAF apply() below): each planet has a
  // threshold along the cascade range, and crossing it forward
  // reveals, crossing back hides. The ref shadows the state so the
  // rAF tick can compare-and-set without re-rendering every frame.
  const [revealedIndices, setRevealedIndices] = useState<readonly number[]>([]);
  const revealedSetRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mq = window.matchMedia("(min-width: 768px)");
    let isDesktop = mq.matches;

    const getActive = () => ({
      container: isDesktop ? desktopContainerRef.current : mobileContainerRef.current,
      wraps: isDesktop ? desktopWrapRefs.current : mobileWrapRefs.current,
      names: isDesktop ? desktopNameRefs.current : mobileNameRefs.current,
    });

    // Final positions are the centres of each planet's VISUAL DISC
    // (the .aspect-square div inside the button), relative to the
    // container's top-left.
    // Why the disc and not the wrap: on mobile the wrap is 280px
    // wide with the planet at the left and the name on the right,
    // so the wrap-centre sits 65px to the right of the visible
    // planet. Measuring the wrap-centre puts the orbit visually
    // off-centre. Measuring the disc-centre keeps the orbit
    // anchored on what the eye actually reads as the planet.
    let finalPositions: Array<{ x: number; y: number } | null> = [];
    const measureFinalPositions = () => {
      const { container, wraps } = getActive();
      if (!container) {
        finalPositions = [];
        return;
      }
      // Clear pending transforms so the BCR reads natural layout
      // positions, not the in-flight orbital offsets.
      wraps.forEach((w) => {
        if (w) w.style.transform = "";
      });
      const containerRect = container.getBoundingClientRect();
      finalPositions = wraps.map((w) => {
        if (!w) return null;
        const disc = w.querySelector('div[class*="aspect-square"]') as HTMLElement | null;
        const target = disc ?? w;
        const r = target.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      });
    };

    let target = 0;
    let current = 0;
    let raf = 0;
    let active = true;

    const compute = () => {
      // DESKTOP: progress is driven by the user's scroll through the
      // RUNWAY (the tall outer wrapper). Inside the runway, the
      // section is sticky-pinned to the viewport top, so the user's
      // scroll progresses the animation while the section appears to
      // stay still. progress = 0 the instant the runway's top reaches
      // viewport top (pin engages); progress = 1 the instant the
      // runway's bottom passes viewport bottom (pin releases).
      if (isDesktop) {
        const runway = runwayRef.current;
        if (!runway) return;
        const vh = window.innerHeight;
        const scrollableDistance = runway.offsetHeight - vh;
        if (scrollableDistance <= 0) {
          target = 0;
          return;
        }
        const rRect = runway.getBoundingClientRect();
        const scrolled = -rRect.top;
        target = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        return;
      }

      // MOBILE: original anchor — progress maps Wakon's settled
      // viewport-Y from START_Y_FRACTION_MOBILE → END_Y_FRACTION_MOBILE.
      // The vertical column of seven planets is taller than viewport,
      // so pinning would only show the top 3-4 planets; the original
      // scroll-through-the-column behaviour reveals all seven as they
      // pass through the viewport.
      const { container } = getActive();
      const wakonFinal = finalPositions[WAKON_INDEX];
      if (!container || !wakonFinal) return;
      const containerRect = container.getBoundingClientRect();
      const wakonViewportY = containerRect.top + wakonFinal.y;
      const vh = window.innerHeight;
      const startY = vh * START_Y_FRACTION_MOBILE;
      const endY = vh * END_Y_FRACTION_MOBILE;
      const raw = (startY - wakonViewportY) / (startY - endY);
      target = Math.max(0, Math.min(1, raw));
    };

    const apply = (now: number, p: number) => {
      const { container, wraps, names } = getActive();
      const wakonFinal = finalPositions[WAKON_INDEX];
      if (!container || !wakonFinal) return;

      // Orbital phase is compressed into the first orbitalEnd
      // fraction of progress; rescale so the orbital math sees a
      // full 0 → 1 range across that compressed band. Mobile uses
      // a shorter window so Koto lands in viewport for its reveal.
      const orbitalEnd = isDesktop ? ORBITAL_END_DESKTOP : ORBITAL_END_MOBILE;
      const orbitalP = Math.min(1, p / orbitalEnd);
      // Rotation is purely scroll-driven: each scroll position maps
      // to a fixed angle, so every visit to the section produces the
      // same spin. As orbitalP advances 0 → 1, planets rotate by
      // ORBITAL_TURNS full revolutions from their base angles.
      const rotation = orbitalP * 2 * Math.PI * ORBITAL_TURNS;
      const eased = smoothstep(orbitalP);

      // Orbit centre.
      // Desktop (horizontal row centred under the heading): orbit
      // centre = Wakon's natural column position. The row is
      // naturally centred in the viewport, so Wakon's final position
      // coincides with viewport-centre.
      // Mobile (vertical column much taller than viewport): orbit
      // centre is FIXED IN THE SECTION's LAYOUT — container-anchored
      // at MOBILE_ORBITAL_CENTER_Y. This means the cluster sits
      // just below the heading in the section and scrolls naturally
      // with the page (it's fixed RELATIVE TO THE HEADING, not to
      // the viewport). As the user scrolls past the heading, the
      // cluster continues up and out, and the planets settle DOWN
      // into their column positions — the list expands downward
      // from where the cluster sat.
      const orbitCenter = isDesktop
        ? wakonFinal
        : {
            x: container.clientWidth / 2,
            y: MOBILE_ORBITAL_CENTER_Y,
          };

      // Orbital radius — sized to fit comfortably WITHIN viewport
      // when Wakon is at the entry position (vh * 0.72). Smaller
      // values keep the entire orbit visible at the start of the
      // choreography. Desktop: 170px diameter fits with room to
      // breathe; mobile: 110px keeps the orbit within the narrower
      // width and avoids planets bumping against the edges.
      const orbitalR = isDesktop ? 170 : 110;

      STARS.forEach((_, i) => {
        const wrap = wraps[i];
        const finalPos = finalPositions[i];
        if (!wrap || !finalPos) return;

        let orbitalX: number;
        let orbitalY: number;

        if (i === WAKON_INDEX) {
          // Wakon sits exactly at the orbit centre during the
          // orbital. On desktop this equals his final position
          // (no translate). On mobile it differs from his final
          // position by the planet-vs-container-centre offset, so
          // Wakon translates rightward during orbital and slides
          // back left as planets settle.
          orbitalX = orbitCenter.x;
          orbitalY = orbitCenter.y;
        } else {
          // 6 orbiters around Wakon at evenly-spaced angles.
          // orbiterIndex skips WAKON_INDEX so the six remaining
          // planets get 0/6, 1/6, … 5/6 of a full turn. Per-planet
          // radius variation gives the orbit a "system" feel rather
          // than a perfect wheel.
          const orbiterIndex = i < WAKON_INDEX ? i : i - 1;
          const baseAngle = (orbiterIndex / 6) * 2 * Math.PI;
          const r = orbitalR * (0.88 + ((i * 7) % 5) * 0.05);
          const angle = baseAngle + rotation;
          orbitalX = orbitCenter.x + r * Math.cos(angle);
          orbitalY = orbitCenter.y + r * Math.sin(angle);
        }

        const dx = (orbitalX - finalPos.x) * (1 - eased);
        const dy = (orbitalY - finalPos.y) * (1 - eased);

        wrap.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;

        const name = names[i];
        if (name) {
          // Names fade in just after settling (window tracks
          // orbitalEnd per breakpoint): they appear right as the
          // planets arrive at their final positions, accompanying
          // the start of the kokoro cascade.
          const nameStart = orbitalEnd - 0.02;
          const nameOpacity = Math.max(0, Math.min(1, (p - nameStart) / 0.08));
          name.style.opacity = String(nameOpacity);
        }
      });

      // Scroll-driven kokoro cascade. Each planet's reveal threshold
      // is its position in the active order, mapped across the
      // cascadeStart → cascadeEnd window. Reversible: scrolling back
      // crosses thresholds in the opposite direction and the kokoros
      // fade back to planets via the same REVEAL_TRANSITION.
      // On mobile cascadeStart < ORBITAL_END so the early reveals
      // happen DURING orbital settling — necessary for the top
      // column planets to be in view at their reveal moments.
      const order = isDesktop ? REVEAL_ORDER_DESKTOP : REVEAL_ORDER_MOBILE;
      const cascadeStart = isDesktop ? CASCADE_START_DESKTOP : CASCADE_START_MOBILE;
      const cascadeEnd = isDesktop ? CASCADE_END_DESKTOP : CASCADE_END_MOBILE;
      const cascadeRange = cascadeEnd - cascadeStart;
      const stepSize = cascadeRange / (order.length - 1);
      const newRevealed = new Set<number>();
      for (let step = 0; step < order.length; step++) {
        const threshold = cascadeStart + step * stepSize;
        if (p >= threshold) newRevealed.add(order[step]);
      }
      // setState only when the set changed (avoids re-rendering on
      // every rAF tick).
      const prev = revealedSetRef.current;
      let changed = newRevealed.size !== prev.size;
      if (!changed) {
        for (const idx of newRevealed) {
          if (!prev.has(idx)) {
            changed = true;
            break;
          }
        }
      }
      if (changed) {
        revealedSetRef.current = newRevealed;
        setRevealedIndices([...newRevealed]);
      }
    };

    // First pass: measure layout positions BEFORE first render so the
    // initial paint lands at orbital, not at the flex positions. We
    // do this in a layoutEffect-ish way by reading offsets and
    // immediately applying the orbital transform.
    measureFinalPositions();

    if (reduceMotion) {
      // Snap to fully settled + all kokoros revealed.
      apply(performance.now(), 1);
      return;
    }

    compute();
    apply(performance.now(), current);

    const onMqChange = () => {
      isDesktop = mq.matches;
      measureFinalPositions();
      compute();
    };
    mq.addEventListener("change", onMqChange);

    const onResize = () => {
      measureFinalPositions();
      compute();
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (now: number) => {
      if (!active) return;
      current += (target - current) * 0.16;
      apply(now, current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* RUNWAY — outer scroll container.
          Desktop: tall (RUNWAY_VH_DESKTOP) so the user has scroll room
          for the orbital + cascade while the inner content is pinned.
          Mobile: natural height, no pinning; the inner content sits in
          flow exactly as before. */}
      <div
        ref={runwayRef}
        className="relative"
        style={{
          // Inline style so the runway height token lives next to its
          // constant. md+ only — mobile falls back to natural height.
          ["--runway-h" as string]: `${RUNWAY_VH_DESKTOP}vh`,
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .seven-stars-runway { height: var(--runway-h); }
          }
        `}</style>
        <div className="seven-stars-runway">
          {/* PINNED INNER — sticky to viewport top on desktop, in flow
              on mobile. h-screen + overflow-hidden on desktop so the
              pinned area exactly fills the viewport.
              Layout when pinned:
                top:    Separator (matches the "scroll lock when
                        separator hits viewport top" gesture)
                middle: heading + planets, vertically centred in the
                        remaining height. */}
          <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden md:flex md:flex-col">
            {/* Separator at the top of the pinned area — it freezes
                here when the pin engages, and unfreezes when the
                runway scrolls out. */}
            <div className="md:flex-shrink-0">
              <Separator />
            </div>

            {/* Main composition — centred in the pinned viewport on
                desktop. On mobile this just flows naturally inside the
                section with the original space-breathing padding. */}
            <div className="md:flex-1 md:flex md:flex-col md:justify-center px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-breathing md:!py-0">
              <div className="text-center max-w-[900px] mx-auto">
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[760px] mx-auto px-4 md:px-0">
                  <TextReveal as="span" className="block" stagger={STAGGER.hero}>
                    Seven stars gathered their light,
                  </TextReveal>
                  <TextReveal
                    as="span"
                    className="block"
                    stagger={STAGGER.hero}
                    delay={STAGGER.hero}
                  >
                    each revealing their Kokoro.
                  </TextReveal>
                </h2>
              </div>

              {/* Desktop layout — horizontal row, mirrors production.
                  Each PlanetButton wrapped in a div that the rAF loop
                  transforms into orbital position during the entrance.
                  `position: relative` on the container makes it the
                  offsetParent of the planet wrappers, so offsetLeft /
                  Top values read by the rAF loop are relative to the
                  container (which is what the orbital math assumes).
                  mt-28/32/36 (vs production's mt-16/20/24): the
                  orbital phase carries planets to the top of the orbit
                  ~170px above the row's natural position. The extra
                  ~48px gap to the heading above keeps the orbit from
                  kissing the title line when it's at its highest
                  point. */}
              <div
                ref={desktopContainerRef}
                className="hidden md:block mt-28 lg:mt-32 xl:mt-36 relative"
              >
                <div className="flex items-end justify-center gap-0">
                  {STARS.map((star, i) => (
                    <div
                      key={star.slug}
                      ref={(el) => {
                        desktopWrapRefs.current[i] = el;
                      }}
                      className="flex-shrink-0 will-change-transform"
                    >
                      <DemoPlanetButton
                        star={star}
                        isRevealed={revealedIndices.includes(i)}
                        nameRef={(el) => {
                          desktopNameRefs.current[i] = el;
                        }}
                        variant="stacked"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile layout — vertical column, mirrors production. */}
              <div ref={mobileContainerRef} className="md:hidden mt-12 relative">
                <div className="flex flex-col items-center gap-0">
                  {STARS.map((star, i) => (
                    <div
                      key={star.slug}
                      ref={(el) => {
                        mobileWrapRefs.current[i] = el;
                      }}
                      className="w-[280px] flex justify-start will-change-transform"
                    >
                      <DemoPlanetButton
                        star={star}
                        isRevealed={revealedIndices.includes(i)}
                        nameRef={(el) => {
                          mobileNameRefs.current[i] = el;
                        }}
                        variant="inline"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Mirrors production PlanetButton (sizes, typography, kokoro
   crossfade), but non-interactive — the demo replaces the tap-to-
   reveal interaction with an automatic sequenced cascade after the
   planets settle. The kokoro crossfade is driven by `isRevealed`,
   set by the parent's reveal-order timeline. */
function DemoPlanetButton({
  star,
  isRevealed,
  nameRef,
  variant,
}: {
  star: Star;
  isRevealed: boolean;
  nameRef: (el: HTMLParagraphElement | null) => void;
  variant: "stacked" | "inline";
}) {
  const isInline = variant === "inline";
  return (
    <div
      role="img"
      aria-label={`${star.name}${isRevealed ? " — kokoro revealed" : ""}`}
      className={`${
        isInline
          ? "flex flex-row items-center gap-6 py-1"
          : "flex flex-col items-center"
      } pointer-events-none`}
    >
      <div
        className={`relative aspect-square flex-shrink-0 ${
          isInline ? "w-[150px]" : "w-[clamp(92px,12vw,240px)]"
        }`}
      >
        <Image
          src={`/book/planets/${star.num}-${star.slug}-planet.webp`}
          alt=""
          fill
          sizes={isInline ? "150px" : "(min-width: 1280px) 240px, 13vw"}
          className="object-contain"
          style={{
            opacity: isRevealed ? 0 : 1,
            transform: isRevealed ? `scale(${REVEAL_REST_SCALE})` : "scale(1)",
            transition: REVEAL_TRANSITION,
          }}
        />
        <Image
          src={`/book/planets/${star.num}-${star.slug}-kokoro.webp`}
          alt=""
          fill
          sizes={isInline ? "150px" : "(min-width: 1280px) 240px, 13vw"}
          className="object-contain"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? "scale(1)" : `scale(${REVEAL_REST_SCALE})`,
            transition: REVEAL_TRANSITION,
          }}
        />
      </div>
      <p
        ref={nameRef}
        className={`font-display tracking-[0.01em] transition-colors duration-300 whitespace-nowrap ${
          isInline
            ? "text-[20px] leading-none"
            : "mt-4 lg:mt-6 text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-none"
        } ${isRevealed ? "text-washi" : "text-washi/70"}`}
        style={{ opacity: 0 }}
      >
        {star.name}
      </p>
    </div>
  );
}

/* Touch-vs-fine-pointer detection for the Auwa interaction cue.
   Initial state matches the more common case (fine pointer / desktop)
   so the SSR markup is meaningful; on mount the effect updates if
   the visitor is on a coarse-pointer device. The brief one-frame
   delta on touch is acceptable — text just shortens. */
function usePointerKind() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse ? "coarse" : "fine";
}

/* What Auwa does — uses the shared <EditorialFeature> split (text
   left, media right) with the dark theme. Video keeps its native 9:16
   aspect on mobile and crops to 4:5 on tablet/desktop, anchored
   bottom so the lower portion of the frame stays in view. Warm tint
   is off because the footage already sits in the dark page palette. */
function KokoroReveal() {
  return (
    <EditorialFeature
      theme="dark"
      warmTint={false}
      eyebrow="What Auwa does"
      heading="Auwa’s light reveals the Kokoro in all things."
      body="Every living thing has a Kokoro: heart, mind, soul, spirit, all held as one. You cannot see it. But when Auwa’s light touches it, a flower glows, a coral hums, the forest remembers itself."
      textMaxWidth="max-w-[480px]"
      // Mobile keeps the existing 9:16 portrait. Desktop (lg+) goes to
      // 2:3 — taller per the brief — but constrained via mediaMaxWidth
      // so total module height stays in proportion. Narrowed from
      // 460px to 400px so the video reads slightly shorter on desktop
      // while keeping its native ratio.
      aspectClassName="aspect-[9/16] md:aspect-[2/3]"
      mediaMaxWidth="lg:max-w-[400px]"
      image={{
        src: "/book/character/auwa-kokoro.mp4",
        alt: "Auwa revealing the Kokoro in living things",
        video: {
          poster: "/book/character/auwa-kokoro-poster.jpg",
          objectPosition: "bottom",
        },
      }}
    />
  );
}

/* Spreads — heading first, then BookPreview wrapped in a reveal so
   the carousel slides in from the right (mirrors the Journal strip
   reveal on the home page). BookPreview's internal eyebrow is hidden
   here; the page renders its own eyebrow + heading above. */
function Spreads() {
  return (
    <section className="space-section">
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi/55">
            Book preview
          </p>
        </FadeIn>
        <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[720px]">
          <TextReveal as="span" className="block" stagger={STAGGER.hero}>
            The world comes
          </TextReveal>
          <TextReveal
            as="span"
            className="block"
            stagger={STAGGER.hero}
            delay={STAGGER.hero}
          >
            to life through the book.
          </TextReveal>
        </h2>
      </div>
      <BookPreview spreads={previewSpreads} theme="dark" eyebrow={null} />
    </section>
  );
}

/* Series — four covers with the eyebrow + counter row matching the
   home page's Journal strip header. Cover-1 stays at full opacity
   because it's the first chapter; the rest are dimmed to read as
   "future." */
function Series() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      {/* Eyebrow row + h2 use the same rhythm as the Spreads section
          above (mt-6 from eyebrow → h2; mb-10 / md:mb-14 from
          heading → grid). Earlier this section had bespoke
          mb-12/16 + mb-14/20 values which read as a noticeable
          stretch compared to the rest of the page. */}
      <div className="flex items-baseline justify-between gap-6">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi/55">
            The series
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi/45">
            One world
          </p>
        </FadeIn>
      </div>
      <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[720px] mb-10 md:mb-14">
        <TextReveal as="span" className="block" stagger={STAGGER.hero} delay={200}>
          Earth, ocean, human, and the long way home.
        </TextReveal>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
        {futureBooks.map((book, i) => (
          <FadeIn
            key={book.num}
            delay={i * STAGGER.grid}
            variant="reveal"
            revealDistance={40}
          >
            <article>
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-cosmic-900">
                <Image
                  src={book.cover}
                  alt={`Auwa Book ${book.num} cover — ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="eager"
                  priority={i === 0}
                  style={{
                    opacity: i === 0 ? 1 : 0.6,
                    transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
              <p className="mt-4 md:mt-5 font-sans text-[12px] tracking-[0.16em] uppercase text-washi/45">
                {book.num} · {book.status}
              </p>
              <h3 className="mt-2 font-display text-[20px] md:text-[22px] leading-[1.25] tracking-[0.01em] text-washi max-w-[90%]">
                {book.title}
              </h3>
              <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-pretty text-washi/55 max-w-[90%]">
                {book.note}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* By Eko Maeda — quiet credit module sitting between the Series and
   Signup. Centred composition, narrow column, ends with the creator's
   name in Japanese. Uses system tokens only: 12px / 0.08em uppercase
   eyebrow, EB Garamond editorial paragraph, Noto Sans JP for the
   Japanese line. */
function Author() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="max-w-[760px] mx-auto text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi/55">
            By Eko Maeda
          </p>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="mt-8 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.5] text-balance text-washi/80">
            Born and raised in Kansai, within the philosophy that life resides in everything. Auwa began as a single drawing, ten years ago. The world grew quietly around it.
          </p>
        </FadeIn>
        <FadeIn delay={350}>
          <p className="mt-8 font-jp text-[26px] md:text-[32px] tracking-[0.08em] text-washi/60">
            エコ・マエダ
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* Signup — same shape as the "What Auwa does" module (EditorialFeature
   with the dark theme), so the page closes on the same rhythm it opens
   with. Body sits at the bottom of the text column; the signup form
   slots in below the heading where a CTA would normally go. Image
   opacity drops to 0.9 here so the photograph recedes a touch into the
   Yoru bg and the form/heading lead. */
function Signup() {
  return (
    <EditorialFeature
      theme="dark"
      warmTint={false}
      eyebrow="The first book"
      heading="Be the first to read the Auwa stories."
      body="An object made slowly, with care. Signed by Eko Maeda. Printed in a short first edition. Add your email and we’ll write when it arrives."
      textMaxWidth="max-w-[480px]"
      imageOpacity={0.9}
      // Quieter heading scale here — same as the adjacent Series h2
      // ("Earth, ocean, human, and the long way home.") so the page
      // closes at a contemplative, not announcement, scale.
      headingSizeClassName="text-[clamp(1.8rem,3vw,2.8rem)]"
      // On mobile, render text+signup BEFORE the image so the
      // photograph sits between this signup and the footer's "Quiet
      // letters." form — visual buffer prevents two signups stacking.
      mobileTextFirst
      // Image is 4:5 portrait, capped to a narrower column on lg+ so the
      // book photograph reads as a quiet object on the page rather than
      // dominating the module. Anchors to the right edge via lg:ml-auto
      // (handled inside EditorialFeature when mediaMaxWidth is set).
      aspectClassName="aspect-[4/5]"
      mediaMaxWidth="lg:max-w-[420px]"
      action={
        <SignupForm
          source="book-waitlist"
          buttonText="Notify me"
          theme="dark"
          successMessage="You’re on the list. We’ll find you when it’s time."
        />
      }
      image={{
        src: "/pillars/book.jpg",
        alt: "The first Auwa book on a wooden table",
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────
   Local helpers
   ────────────────────────────────────────────────────────────────── */

