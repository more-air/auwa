"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AuwaCharacter } from "@/components/auwa-character";
import { BookPreview } from "@/components/book-preview";
import { DarkPageTheme } from "@/components/dark-page-theme";
import { EditorialFeature } from "@/components/editorial-feature";
import { FadeIn } from "@/components/fade-in";
import { Footer } from "@/components/footer";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { SignupForm } from "@/components/signup-form";
import { TextReveal } from "@/components/text-reveal";
import { STAGGER } from "@/lib/motion";

/*
  /demo-world — production-ready candidate for the dark book / world
  pillar. Promotes to /book by replacing /book/page.tsx with this
  content (URL stays /book; existing OG image, sitemap entry, and
  book-waitlist segment all continue working).

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
  up: "/book/character/auwa-up.png",
  down: "/book/character/auwa-down.png",
  left: "/book/character/auwa-left.png",
  right: "/book/character/auwa-right.png",
  glow: {
    front: "/book/character/auwa-front-glow.png",
    up: "/book/character/auwa-up-glow.png",
    down: "/book/character/auwa-down-glow.png",
    left: "/book/character/auwa-left-glow.png",
    right: "/book/character/auwa-right-glow.png",
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

export default function DemoWorldPage() {
  return (
    <>
      <DarkPageTheme />
      <main>
        <Hero />
        <Intro />
        <Separator />
        <OpeningQuote />
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
    <section className="-mt-16 md:-mt-20 relative">
      <div className="relative h-[100svh] w-full overflow-hidden">
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
        {/* Hero copy. Padding mirrors the header (px-6 md:px-12
            lg:px-20 xl:px-28) so the title's left edge aligns with
            the Auwa wordmark on every viewport — no inner max-w
            wrapper that would centre the block on wide screens. */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 lg:px-20 xl:px-28 pb-40 md:pb-44">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-washi/70">
              Auwa World
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 md:mt-8 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[0.01em] text-washi"
            stagger={STAGGER.hero}
          >
            The Books.
          </TextReveal>
        </div>
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
    between SSR-stringified CSS and runtime CSSOM). So V1 stays at
    opacity 1 always — which matches Rieko's framing anyway: "starts
    on dark, pattern fades in beautifully." The pattern arrival is
    the entrance moment; the base just needs to be there. */
function BookHeroLayers() {
  const [patternIn, setPatternIn] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);

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
      {/* Mobile portrait stack.
          quality=95 because next/image otherwise recompresses at q=75
          regardless of source — at full-bleed hero scale that's
          visibly soft on the magical-Auwa artwork. */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/book/hero/portrait-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
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
      {/* Desktop landscape stack */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/book/hero/landscape-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
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
        const headerOffset = window.matchMedia("(min-width: 768px)").matches
          ? 80
          : 64;
        const y =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }}
      aria-label="Explore"
      className="group absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2"
    >
      <span className="relative inline-flex overflow-hidden font-sans text-[12px] md:text-[13px] tracking-[0.26em] uppercase text-washi">
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
          <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-washi/55">
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
          <p className="mt-10 font-sans text-[12px] tracking-[0.08em] uppercase text-washi/45">
            At the beginning
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* Meet Auwa — the delight moment. The character holds the centre of
   the section while a soft scroll-driven scale on her wrapper makes
   her feel alive as the section enters the viewport. Scale lerps via
   RAF (the same iOS-safe pattern used by HeroVideo's parallax) so
   URL-bar retraction on iOS Safari can't nudge it. */
function MeetAuwa() {
  const sectionRef = useRef<HTMLElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const pointerKind = usePointerKind();
  // Touch devices have no cursor, so the "Move cursor" half of the
  // hint is meaningless. Drop it for coarse pointers; keep the full
  // hint for fine pointers (mouse / trackpad). No trailing period —
  // the cue is a hint, not a sentence.
  const cueText =
    pointerKind === "coarse" ? "Tap to glow" : "Move cursor, tap to glow";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const mover = moverRef.current;
    if (!section || !mover) return;

    let currentScale = 0.94;
    let targetScale = 0.94;
    let raf = 0;
    let active = true;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section out of viewport; 1 = section centre at viewport
      // centre. Subtle 6% scale travel (0.94 → 1.0) so the entrance
      // breathes rather than pops; previous 0.88 → 1.0 range read as
      // a noticeable size jump.
      const sectionMid = rect.top + rect.height / 2;
      const viewportMid = vh / 2;
      const distance = Math.abs(sectionMid - viewportMid);
      const max = vh / 2 + rect.height / 2;
      const progress = Math.max(0, Math.min(1, 1 - distance / max));
      targetScale = 0.94 + 0.06 * progress;
    };

    const tick = () => {
      if (!active) return;
      // Lerp factor 0.08 (was 0.12) — slightly slower follow so the
      // scale settles smoothly behind the FadeIn rise rather than
      // catching up in 300ms.
      currentScale += (targetScale - currentScale) * 0.08;
      mover.style.transform = `scale(${currentScale.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };

    compute();
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-20 xl:px-28 space-section"
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.08em] uppercase text-washi/55">
            Meet Auwa
          </p>
        </FadeIn>
        <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[640px] mx-auto px-4 md:px-0">
          <TextReveal as="span" className="block" stagger={STAGGER.hero}>
            A being made of seven stars,
          </TextReveal>
          <TextReveal
            as="span"
            className="block"
            stagger={STAGGER.hero}
            delay={STAGGER.hero}
          >
            drawn to a small blue planet.
          </TextReveal>
        </h2>
        {/* Interaction cue — same Meet-Auwa-eyebrow size (12px tracking
            0.08em uppercase) and same washi/65 opacity as the subtitle
            paragraph above, so it pops on its own merit rather than
            shouting. mt-6 spacing matches the eyebrow→h2→subtitle rhythm
            of the rest of the section. Copy switches by pointer kind:
            "Move cursor, tap to glow" on fine pointers; "Tap to glow"
            on touch devices (no cursor to move). No trailing period —
            it's a hint, not a sentence. */}
        <FadeIn delay={650}>
          <p className="mt-6 font-sans text-[12px] tracking-[0.08em] uppercase text-washi/65">
            {cueText}
          </p>
        </FadeIn>
        {/* Character. Wrapper carries the scroll-driven scale;
            AuwaCharacter handles cursor-follow + tap-to-glow
            internally. Sized generously on xl+ since Auwa was reading
            small on large displays. Entrance starts earlier (delay
            500) and runs longer (1500ms) than the default reveal so
            Auwa breathes into the page across the moment the cue
            settles, rather than appearing abruptly after everything
            else is in place. translateY 40 = slightly more pronounced
            rise. */}
        <FadeIn delay={500} duration={1500} translateY={40}>
          <div className="mt-2 md:mt-4 mx-auto w-full max-w-[440px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[620px]">
            <div ref={moverRef} style={{ willChange: "transform" }}>
              <AuwaCharacter
                src="/book/character/auwa-front.png"
                alt="Auwa, the small luminous being"
                variants={auwaVariants}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
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
          <p className="font-sans text-[12px] tracking-[0.08em] uppercase text-washi/55">
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
          <p className="font-sans text-[12px] tracking-[0.08em] uppercase text-washi/55">
            The series
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="font-sans text-[12px] tracking-[0.08em] uppercase text-washi/45">
            One world
          </p>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[720px] mb-10 md:mb-14">
          Earth, ocean, human, and the long way home.
        </h2>
      </FadeIn>
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
              <p className="mt-4 md:mt-5 font-sans text-[12px] tracking-[0.08em] uppercase text-washi/45">
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
          <p className="font-sans text-[12px] tracking-[0.08em] uppercase text-washi/55">
            By Eko Maeda
          </p>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="mt-8 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.5] text-balance text-washi/85">
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

