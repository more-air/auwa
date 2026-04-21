"use client";

/*
  Editorial Frames — desktop four-pillar module.
  "Magazine index" tab gallery that crossfades between four pillar frames.
  No scroll-hijacking, no sticky transforms. Auto-advances every 7s,
  pauses on hover, resets on interaction. Safe on iOS by design.

  Inside each active frame the content is revealed with a staggered
  choreography: eyebrow fades first, heading cascades word-by-word via
  TextReveal, body text follows, and the CTA lands last.
*/

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";

type Frame = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href: string;
  type: "image" | "video";
  src: string;
  poster?: string;
};

const FRAMES: Frame[] = [
  {
    eyebrow: "Store",
    heading: "Lifetime objects.",
    body: "A home for Japanese craftsman objects, chosen slowly and kept for a lifetime. Pieces carrying the patience of the hands that made them. Quietly gathered, quietly arriving.",
    cta: "Visit store",
    href: "/store",
    type: "video",
    src: "/hero/portrait.mp4",
    poster: "/hero/poster-portrait.jpg",
  },
  {
    eyebrow: "Book",
    heading: "Open the eyes.",
    body: "An illustrated universe following AUWA, a luminous being who reveals the Kokoro sleeping inside rivers, bowls, and strangers. The deeper world behind everything we make.",
    cta: "Join waitlist",
    href: "/book",
    type: "image",
    src: "/hero/frames/v2/02.jpg",
  },
  {
    eyebrow: "Journal",
    heading: "Quiet moments.",
    body: "Travel essays, craftsmen encounters, onsen mornings, and the slow turning of the 72 micro-seasons. A living editorial written between London and Japan, quietly and patiently.",
    cta: "Explore journal",
    href: "/journal",
    type: "image",
    src: "/hero/frames/v2/washi.jpg",
  },
  {
    eyebrow: "App",
    heading: "Awareness, daily.",
    body: "A Kokoro mirror. Share how you feel, receive a quiet reflection drawn from an ancient Japanese emotional framework. No advice, no streaks, no numbers. Just daily attention.",
    cta: "Join waitlist",
    href: "/app",
    type: "image",
    src: "/hero/frames/v2/03.jpg",
  },
];

const ADVANCE_MS = 7000;

/*
  One frame's editorial content (eyebrow, heading, body, CTA) with a
  staggered reveal choreography. `isActive` drives the animation retrigger:
  each time the frame becomes active, animKey bumps so FadeIn/TextReveal
  remount and play from their initial states.
*/
function FrameContent({ frame, isActive }: { frame: Frame; isActive: boolean }) {
  const [animKey, setAnimKey] = useState(0);
  const wasActiveRef = useRef(isActive);

  useEffect(() => {
    if (isActive && !wasActiveRef.current) {
      setAnimKey((k) => k + 1);
    }
    wasActiveRef.current = isActive;
  }, [isActive]);

  return (
    // Centre the stack on tablet (single-column layout) so the title,
    // body and CTA sit beneath the centred image as one composition.
    // Reverts to left-aligned at lg once the 2-column grid takes over.
    <div key={animKey} className="text-center lg:text-left">
      <FadeIn delay={0}>
        <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-void/40">
          {frame.eyebrow}
        </span>
      </FadeIn>

      <div className="mt-5 md:mt-7">
        <TextReveal
          as="h3"
          delay={150}
          stagger={80}
          className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-[0.005em] text-void"
        >
          {frame.heading}
        </TextReveal>
      </div>

      {/* Softer arrival for the paragraph — long duration, barely any
          rise (3px), and a later start so it arrives after the heading
          has finished settling. Feels like a slow sigh rather than a
          swing into place. */}
      <FadeIn delay={500} duration={1600} translateY={3}>
        <p className="mt-6 md:mt-8 font-display text-[18px] md:text-[19px] leading-[1.55] tracking-[0.005em] text-void/70 max-w-[460px] mx-auto lg:mx-0">
          {frame.body}
        </p>
      </FadeIn>

      <FadeIn delay={650} duration={700}>
        <div className="mt-8 md:mt-10">
          <Link
            href={frame.href}
            className="group relative inline-flex overflow-hidden font-sans text-[13px] tracking-[0.14em] uppercase text-void border border-void/20 hover:border-void/60 transition-colors duration-300"
          >
            <span className="block px-6 py-3 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
              {frame.cta}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
            >
              {frame.cta}
            </span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

export function EditorialFrames() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % FRAMES.length);
      setTick((t) => t + 1);
    }, ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, tick, active]);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <section
      className="relative bg-white"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        setPaused(false);
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-20 md:pt-32 pb-20 md:pb-8">
        <div className="mb-12 md:mb-20 max-w-[720px]">
          <FadeIn>
            <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-void/40">
              Our world
            </span>
          </FadeIn>
          <div className="mt-4">
            <TextReveal
              as="h2"
              delay={180}
              stagger={80}
              className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-void"
            >
              Four ways in.
            </TextReveal>
          </div>
        </div>

        {/* Outer max-width keeps the whole image/text composition sitting
            centrally in the viewport on wide screens rather than anchored
            to the left gutter. Grid template is fixed 480px image column +
            flexible text column so the image never stretches past its
            intended size. Horizontal gap on lg+ (112px) gives the image
            and editorial column clear visual separation — the vertical
            80px mb-20 under the section header reads generous, so the
            horizontal gap has to be a touch larger to feel balanced. */}
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-10 md:gap-14 lg:gap-28 items-center max-w-[1100px] lg:mx-auto">
          {/* Image frame.
              On tablet (single column) the image is centred as a
              framed editorial element. On desktop the grid template
              pins the image column at 480px, so no internal centering
              is needed. The frame is a link to the currently-active
              pillar's page and triggers the "Open" cursor disc. */}
          <div>
            <Link
              href={FRAMES[active].href}
              data-cursor="Open"
              aria-label={`Open ${FRAMES[active].eyebrow}`}
              className="block relative w-full max-w-[480px] mx-auto aspect-[4/5] rounded-xl overflow-hidden"
            >
              {FRAMES.map((f, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === active ? 1 : 0,
                    /* Gentle, symmetric ease-in-out so the leaving frame
                       and the entering frame fade through each other
                       without either one jumping. Longer duration keeps
                       the transition unhurried. */
                    transition: "opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {f.type === "video" ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={f.poster}
                      preload="metadata"
                    >
                      <source src={f.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={f.src}
                      alt={f.heading}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
              {/* Index + pillar label overlay */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-baseline gap-2 pointer-events-none">
                <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-none tracking-[0.01em] text-white tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-white/70">
                  / {String(FRAMES.length).padStart(2, "0")}
                </span>
              </div>
            </Link>
          </div>

          {/* Editorial column */}
          <div>
            {/* Tighter min-height on tablet (single column) — content is
                only ~280px tall per frame, so the desktop-era 440px left
                ~150px of dead air between the CTA and the tab row. Full
                440px reservation returns at lg when the crossfade sits
                beside the 480px portrait image. */}
            <div className="relative min-h-[300px] lg:min-h-[440px]">
              {FRAMES.map((f, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="absolute inset-x-0 top-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      transition:
                        "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    aria-hidden={!isActive}
                  >
                    <FrameContent frame={f} isActive={isActive} />
                  </div>
                );
              })}
            </div>

            {/* Pillar tab row. On tablet, the row is centred beneath the
                composition; on lg it anchors to the left of the editorial
                column. mt-10 keeps the tabs close to the CTA on tablet —
                mt-24 on lg matches the desktop rhythm. */}
            <div className="mt-10 lg:mt-24">
              <div className="flex items-end gap-5 md:gap-8 max-w-[450px] mx-auto lg:mx-0">
                {FRAMES.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className="group flex-1 text-left relative pt-3 cursor-pointer"
                    aria-label={`Show ${f.eyebrow}`}
                    aria-current={i === active ? "true" : undefined}
                  >
                    <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-void/10 overflow-hidden rounded-full">
                      <span
                        key={`bar-${i}-${tick}`}
                        className="absolute inset-y-0 left-0 bg-void"
                        style={{
                          width: i === active ? "100%" : "0%",
                          transition:
                            i === active && !paused
                              ? `width ${ADVANCE_MS}ms linear`
                              : "width 200ms ease-out",
                        }}
                      />
                    </span>
                    <span
                      className={`block font-sans text-[11px] md:text-[12px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
                        i === active
                          ? "text-void"
                          : "text-void/35 group-hover:text-void/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} &middot; {f.eyebrow}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
