"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AuwaCharacter } from "@/components/auwa-character";
import { BookPreview } from "@/components/book-preview";
import { DarkPageTheme } from "@/components/dark-page-theme";
import { FadeIn } from "@/components/fade-in";
import { Footer } from "@/components/footer";
import { ImageFade } from "@/components/image-fade";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { SignupForm } from "@/components/signup-form";
import { TextReveal } from "@/components/text-reveal";
import { STAGGER } from "@/lib/motion";

/*
  /demo-book-3 — proposed dark-theme book pillar.

  Hero borrows demo-book-2's two-column layout (text left, book right);
  the title always wraps after "The" via two stacked TextReveal lines,
  and the book stacks UNDER the text on small screens. The body of the
  page introduces Auwa the character (cursor-follow delight moment),
  the Kokoro reveal mechanic via a looped video, the spread teaser
  (cover + four interior pages), the Eko Maeda credit in Katakana,
  the four-book series, and the signup. The footer renders in the
  Yoru tone so the whole page reads as one continuous dark canvas.

  All structural primitives (DarkPageTheme, Separator, spacing utility
  classes, Tailwind colour tokens `yoru`/`washi`) sit in shared files
  so this template can be promoted to the live `/book` route by
  replacing the path and removing the noindex layout.
*/

type Spread = { src: string; alt: string; type?: "spread" | "cover" };

/* Single source of truth for the Yoru tone in inline gradients. Mirrors
   --color-yoru in globals.css. Tuning the page tint is one edit here
   instead of hunting through multiple section files. */
const YORU_OKLCH = "0.265 0.022 235";
const yoruAlpha = (a: number) => `oklch(${YORU_OKLCH} / ${a})`;

/* Directional + tap-glow variants by Eko Maeda. Each direction has a
   matching glow that plays on tap, so Auwa glows in the direction
   she's looking. */
const auwaVariants = {
  up: "/demo-book/auwa-up.png",
  down: "/demo-book/auwa-down.png",
  left: "/demo-book/auwa-left.png",
  right: "/demo-book/auwa-right.png",
  glow: {
    front: "/demo-book/auwa-front-glow.png",
    up: "/demo-book/auwa-up-glow.png",
    down: "/demo-book/auwa-down-glow.png",
    left: "/demo-book/auwa-left-glow.png",
    right: "/demo-book/auwa-right-glow.png",
  },
};

const previewSpreads: Spread[] = [
  { src: "/book/1/page-01.jpg", alt: "Auwa Book One — cover", type: "cover" },
  { src: "/book/1/page-06.jpg", alt: "Earth speaks to Auwa" },
  { src: "/book/1/page-14.jpg", alt: "Bluu lit, the forest answering" },
  { src: "/book/1/page-16.jpg", alt: "Auwa listens to the song" },
];

const futureBooks = [
  {
    num: "01",
    title: "The Beginning",
    cover: "/demo-book/cover-1.jpg",
    status: "First chapter",
    note: "A blue flower in a quiet forest.",
  },
  {
    num: "02",
    title: "Ocean",
    cover: "/demo-book/cover-2.jpg",
    status: "Coming next",
    note: "Auwa descends below the surface.",
  },
  {
    num: "03",
    title: "Human",
    cover: "/demo-book/cover-3.jpg",
    status: "In progress",
    note: "The strangest beings of all.",
  },
  {
    num: "04",
    title: "Lioma",
    cover: "/demo-book/cover-4.jpg",
    status: "In progress",
    note: "The longest way home.",
  },
] as const;

/* Subtle dark-mode separator. Same horizontal gutters as the home
   page Separator, so module boundaries align visually across the
   light and dark templates. */
function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-px bg-washi/[0.07]" />
    </div>
  );
}

export default function DemoBookThreePage() {
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
        <PhilosophyQuote />
        <Separator />
        <Spreads />
        <Separator />
        <Author />
        <Separator />
        <Series />
        <Signup />
        {/* Trailing breath before the (sticky) footer reveals. */}
        <div className="h-12 md:h-20" aria-hidden="true" />
      </main>
      {/* Footer rendered in Yoru so the page reads as one continuous
          dark canvas. Parallax reveal is muted because main and footer
          share a colour — the trade-off Rieko prefers. */}
      <Footer bgColor="var(--color-yoru)" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Sections
   ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="-mt-16 md:-mt-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[100svh] items-stretch">
        {/* Left — copy. Title always wraps after "The" via two stacked
            TextReveal lines. */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-28 md:pt-0 pb-12 md:pb-0 md:flex md:flex-col md:justify-center">
          <FadeIn>
            <p className="font-sans text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-washi/60">
              Book one
            </p>
          </FadeIn>
          <h1 className="mt-6 md:mt-8 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.98] tracking-[0.005em] text-balance text-washi">
            <TextReveal as="span" className="block" stagger={100} delay={120}>
              The
            </TextReveal>
            <TextReveal as="span" className="block" stagger={100} delay={300}>
              Beginning.
            </TextReveal>
          </h1>
          <FadeIn delay={750}>
            <p className="mt-8 md:mt-10 font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.55] text-pretty text-washi/80 max-w-[460px]">
              An illustrated story by Eko Maeda. A small luminous being arrives on Earth, finds a flower no one has seen for a long time, and the world begins to glow.
            </p>
          </FadeIn>
          <FadeIn delay={950}>
            <div className="mt-12 md:mt-16">
              <BeginReadingCue />
            </div>
          </FadeIn>
        </div>
        {/* Right — book on table. */}
        <div className="relative h-[68svh] md:h-auto">
          <ImageFade
            src="/pillars/book.jpg"
            alt="Auwa Book One on a wooden table"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Soft wash on the seam side so the photograph blends into the
              copy column without a hard edge. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${yoruAlpha(0.55)} 0%, ${yoruAlpha(0)} 25%, ${yoruAlpha(0)} 100%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* "Begin reading" cue — scrolls the visitor to the intro section.
   Mirrors the home-page hero's breathing-line treatment so the
   cross-page motion grammar stays consistent. */
function BeginReadingCue() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        const target = document.getElementById("begin");
        if (!target) return;
        const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 80 : 64;
        const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }}
      aria-label="Begin reading the introduction"
      className="group inline-flex items-center gap-4 cursor-pointer p-1 -ml-1"
    >
      <span className="relative inline-flex overflow-hidden font-sans text-[11px] tracking-[0.3em] uppercase text-washi/70">
        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
          Begin reading
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
        >
          Begin reading
        </span>
      </span>
      <span
        aria-hidden="true"
        className="scroll-cue-line block w-px h-7 bg-washi/60 origin-top"
      />
    </button>
  );
}

function Intro() {
  return (
    <section
      id="begin"
      className="px-6 md:px-12 lg:px-20 xl:px-28 pt-24 md:pt-40 pb-16 md:pb-24 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[1100px]">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
            An illustrated story
          </p>
        </FadeIn>
        <ScrollFadeText
          as="p"
          className="mt-8 md:mt-10 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.3] tracking-[0.005em] text-pretty text-washi"
          from={0.18}
          finishAt={0.4}
        >
          Auwa is the brand. Auwa is also a small luminous being who arrives in the first illustrated book by Eko Maeda. The same name in two places, and the same idea written down twice: once for the world we live in, and once for a world drawn by hand.
        </ScrollFadeText>
      </div>
    </section>
  );
}

function OpeningQuote() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-breathing">
      <div className="max-w-[840px] mx-auto text-center">
        <ScrollFadeText
          as="p"
          className="font-display italic text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.15] tracking-[0.005em] text-balance text-washi"
          from={0.16}
          finishAt={0.45}
        >
          &ldquo;In one of countless galaxies, a small blue planet was waiting.&rdquo;
        </ScrollFadeText>
        <FadeIn delay={400}>
          <p className="mt-10 font-sans text-[12px] tracking-[0.18em] uppercase text-washi/45">
            The first line of the book
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* Meet Auwa — centred poster moment. The character is the centre of
   the section: visitors play with the cursor and the tap-to-glow.
   The header sets the frame and the cue invites the interaction;
   no body copy below would compete with what Auwa is doing. */
function MeetAuwa() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="max-w-[1100px] mx-auto text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
            Meet Auwa
          </p>
        </FadeIn>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[0.005em] text-balance text-washi">
          <TextReveal as="span" className="block" stagger={100}>
            A being made
          </TextReveal>
          <TextReveal as="span" className="block" stagger={100} delay={200}>
            of seven stars.
          </TextReveal>
        </h2>
        <FadeIn delay={500}>
          <p className="mt-5 font-display italic text-[15px] md:text-[16px] tracking-[0.005em] text-washi/55">
            Move your cursor. Tap to glow.
          </p>
        </FadeIn>
        {/* Sized so the full character + glow fits inside a typical
            MacBook Pro viewport (~810px viewport after browser
            chrome) without scrolling. Halo extends naturally outside
            the box because the wrapper now uses overflow:visible. */}
        <FadeIn delay={650}>
          <div className="mt-6 md:mt-8 mx-auto w-full max-w-[420px] md:max-w-[440px] lg:max-w-[460px] xl:max-w-[500px]">
            <AuwaCharacter
              src="/demo-book/auwa-front.png"
              alt="Auwa, the small luminous being"
              variants={auwaVariants}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* Kokoro reveal — side-by-side: 9:16 portrait video on the left,
   text on the right. Mirrors the "Meet Auwa" video moment on the
   live home page so the layout reads as familiar even though the
   content is new. The video's portrait shape pairs naturally with
   a column of text rather than a centred-below stack. */
function KokoroReveal() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-center">
        <div className="md:col-span-5">
          <KokoroVideo />
        </div>
        <div className="md:col-span-7">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
              What Auwa does
            </p>
          </FadeIn>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[0.005em] text-balance text-washi">
            <TextReveal as="span" className="block" stagger={90}>
              A gentle light.
            </TextReveal>
            <TextReveal as="span" className="block" stagger={90} delay={180}>
              A Kokoro appears.
            </TextReveal>
          </h2>
          <FadeIn delay={500}>
            <p className="mt-8 font-display text-[17px] md:text-[18px] leading-[1.7] text-pretty text-washi/70 max-w-[460px]">
              Every living thing has a Kokoro: a heart, a soul, a felt centre that English splits into four words and Japanese keeps as one. You cannot see it. But when Auwa&rsquo;s light touches it, a flower glows, a coral hums, the forest remembers itself.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PhilosophyQuote() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-breathing">
      <div className="max-w-[900px] mx-auto text-center">
        <ScrollFadeText
          as="p"
          className="font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.1] tracking-[0.003em] text-balance text-washi"
          from={0.18}
          finishAt={0.45}
        >
          &ldquo;We are all connected, though you cannot see it.&rdquo;
        </ScrollFadeText>
        <FadeIn delay={500}>
          <p className="mt-10 font-sans text-[12px] tracking-[0.18em] uppercase text-washi/45">
            From the soil microbes
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Spreads() {
  return (
    <section className="space-section">
      {/* Header padding matches BookPreview's so eyebrow + title align
          flush with the carousel below. No inner max-width here for
          the same reason. */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
            Open the book
          </p>
        </FadeIn>
        <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[0.005em] text-balance text-washi max-w-[760px]">
          <TextReveal as="span" className="block" stagger={90}>
            A glimpse of the
          </TextReveal>
          <TextReveal as="span" className="block" stagger={90} delay={200}>
            world inside.
          </TextReveal>
        </h2>
      </div>
      <FadeIn delay={400}>
        <BookPreview spreads={previewSpreads} theme="dark" />
      </FadeIn>
    </section>
  );
}

function Author() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="max-w-[760px] mx-auto text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
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

function Series() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="flex items-baseline justify-between gap-6 mb-12 md:mb-16">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
            The series
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-washi/45">
            Four books · One world
          </p>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-balance text-washi max-w-[760px] mb-14 md:mb-20">
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
              <div className="relative aspect-[4/3] overflow-hidden bg-cosmic-900">
                <Image
                  src={book.cover}
                  alt={`Auwa Book ${book.num} cover — ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="eager"
                  priority={i === 0}
                  style={{
                    opacity: i === 0 ? 1 : 0.65,
                    transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
              <p className="mt-4 md:mt-5 font-sans text-[11px] tracking-[0.2em] uppercase text-washi/45">
                {book.num} · {book.status}
              </p>
              <h3 className="mt-2 font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.005em] text-washi">
                {book.title}
              </h3>
              <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-pretty text-washi/55">
                {book.note}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 space-breathing overflow-hidden">
      {/* Soft warm glow behind the form so the CTA lifts off the canvas
          without a hard edge. Kept very subtle — a held breath, not a
          spotlight. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(218,205,170,0.045) 0%, ${yoruAlpha(0)} 70%)`,
        }}
      />
      <div className="relative max-w-[640px] mx-auto text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-washi/55">
            The first arrival
          </p>
        </FadeIn>
        <TextReveal
          as="h2"
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] tracking-[0.005em] text-balance text-washi"
          stagger={90}
        >
          Be there when it lands.
        </TextReveal>
        <FadeIn delay={500}>
          <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.65] text-pretty text-washi/70 max-w-[440px] mx-auto">
            We&rsquo;ll send a quiet note when the first book is ready. No louder than that.
          </p>
        </FadeIn>
        <FadeIn delay={700}>
          <div className="mt-12 md:mt-14 mx-auto max-w-[440px]">
            <SignupForm
              source="book-waitlist"
              buttonText="Notify me"
              theme="dark"
              successMessage="You&rsquo;re on the list. We&rsquo;ll find you when it&rsquo;s time."
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Local helpers
   ────────────────────────────────────────────────────────────────── */

/** Looped Kokoro reveal video. Plays only when on screen (saves
    decode + battery), pauses otherwise. The container uses a
    vertical mask gradient so the video emerges out of the page
    canvas instead of sitting as a hard rectangle on top of it —
    no drop-shadow needed. */
function KokoroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Vertical mask: top and bottom 18% of the video fade into the
  // page bg. Repeated as `WebkitMaskImage` so Safari + iOS pick it up.
  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] max-w-[420px] mx-auto overflow-hidden"
      style={{
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster="/demo-book/auwa-kokoro-poster.jpg"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/demo-book/auwa-kokoro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
