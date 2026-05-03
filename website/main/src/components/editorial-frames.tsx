"use client";

/*
  Editorial Frames — desktop four-pillar module.
  "Magazine index" tab gallery that crossfades between four pillar frames.
  No scroll-hijacking, no sticky transforms. Auto-advances every 10s
  (long enough for the pillar-01 video, ~9s, to play through before
  rotating),
  pauses on hover, resets on interaction. Safe on iOS by design.

  Reveal: each frame's content is static. The only animation is the outer
  wrapper's 700ms opacity crossfade between frames. Nesting FadeIn /
  TextReveal inside that wrapper caused visible subpixel jitter in Safari,
  as the compositor re-rasterised layers when opacities compounded.
*/

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { CtaLink } from "@/components/cta-link";
import { DURATION, EASING } from "@/lib/motion";

// Note: inside FrameContent we deliberately DO NOT use FadeIn or TextReveal.
// The parent wrapper is already opacity-fading between frames (700ms
// crossfade). Nesting further opacity+transform animations underneath it
// causes visible subpixel jitter in Safari — the compositor re-rasterises
// the layers as opacities compound. The section heading ("Four ways in.")
// still uses TextReveal because it plays once on scroll-in, with no outer
// animation wrapping it.

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
    cta: "Join waitlist",
    href: "/store",
    type: "video",
    src: "/intro/store.mp4",
    poster: "/intro/store-poster.jpg",
  },
  {
    eyebrow: "Book",
    heading: "Open the eyes.",
    body: "An illustrated universe following Auwa, a luminous being who reveals the Kokoro sleeping inside rivers, bowls, and strangers. The deeper world behind everything we make.",
    cta: "Explore World",
    href: "/book",
    type: "image",
    src: "/intro/book.jpg",
  },
  {
    eyebrow: "Journal",
    heading: "Quiet moments.",
    body: "Travel essays, craftsmen encounters, onsen mornings, and the slow turning of the 72 micro-seasons. A living editorial written between London and Japan, quietly and patiently.",
    cta: "Explore journal",
    href: "/journal",
    type: "image",
    src: "/intro/journal.jpg",
  },
  {
    eyebrow: "App",
    heading: "Awareness, daily.",
    body: "A Kokoro mirror. Share how you feel, receive a quiet reflection drawn from an ancient Japanese emotional framework. No advice, no streaks, no numbers. Just daily attention.",
    cta: "Join waitlist",
    href: "/app",
    type: "image",
    src: "/intro/app.jpg",
  },
];

const ADVANCE_MS = 10000;

/*
  One frame's editorial content. Static — no inner animation. The parent
  wrapper's opacity crossfade (700ms) is the entire reveal. See the note
  at the top of the file for why nested fades were removed.
*/
function FrameContent({ frame }: { frame: Frame }) {
  return (
    // Centre the stack on tablet (single-column layout) so the title,
    // body and CTA sit beneath the centred image as one composition.
    // Reverts to left-aligned at lg once the 2-column grid takes over.
    <div className="text-center lg:text-left">
      <span className="block font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45">
        {frame.eyebrow}
      </span>

      <h3 className="mt-5 md:mt-7 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-[0.005em] text-sumi">
        {frame.heading}
      </h3>

      <p className="mt-6 md:mt-8 font-display text-[18px] md:text-[19px] leading-[1.55] tracking-[0.005em] text-sumi/70 max-w-[520px] mx-auto lg:mx-0">
        {frame.body}
      </p>

      <div className="mt-8 md:mt-10">
        <CtaLink href={frame.href} variant="primary">{frame.cta}</CtaLink>
      </div>
    </div>
  );
}

export function EditorialFrames() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const hoveredRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Don't start the auto-advance rotation until the module scrolls into
  // view. If we started the timer on mount, a visitor sitting on the hero
  // video for 20 seconds would arrive at this section already showing
  // pillar 3 or 4. Judges (and first-time visitors) should always see
  // pillar 01 / Store first, played from its opening frame.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // one-shot; from here on hover-pause is the only gate
        }
      },
      { rootMargin: "0px 0px -200px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % FRAMES.length);
      setTick((t) => t + 1);
    }, ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, tick, active, inView]);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        setPaused(false);
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
        <div className="mb-10 md:mb-14 max-w-[720px]">
          <TextReveal
            as="h2"
            stagger={80}
            className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi"
          >
            Four ways in.
          </TextReveal>
        </div>

        {/* Two equal columns at lg+: image anchored to the left of the
            page (within the gutter), text column starting at the page
            midline. Gap is 0 on lg so the text's left edge lands exactly
            at 50% — the natural breathing room comes from the image
            capping at 480px inside a wider half-page column. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-0 items-center">
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
              className="block relative w-full max-w-[480px] mx-auto lg:mx-0 aspect-[4/5] overflow-hidden rounded-md"
            >
              {FRAMES.map((f, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === active ? 1 : 0,
                    /* Symmetric ease-in-out so the leaving frame and the
                       entering frame fade through each other without
                       either one jumping. DURATION.reveal (the image
                       reveal token) keeps it unhurried. */
                    transition: `opacity ${DURATION.reveal}ms ${EASING.inOut}`,
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
                    <Image
                      src={f.src}
                      alt={f.heading}
                      fill
                      sizes="480px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
              {/* Index + pillar label overlay */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-baseline gap-2 pointer-events-none">
                <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-none tracking-[0.01em] text-surface tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-surface/70">
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
                      transition: `opacity ${DURATION.enter}ms ${EASING.outExpo}`,
                    }}
                    aria-hidden={!isActive}
                  >
                    <FrameContent frame={f} />
                  </div>
                );
              })}
            </div>

            {/* Pillar tab row. On tablet, the row is centred beneath the
                composition; on lg it anchors to the left of the editorial
                column. mt-10 keeps the tabs close to the CTA on tablet —
                mt-24 on lg matches the desktop rhythm. */}
            <div className="mt-10 lg:mt-24">
              <div className="flex items-end gap-5 md:gap-8 max-w-[520px] mx-auto lg:mx-0">
                {FRAMES.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className="group flex-1 text-left relative pt-3 cursor-pointer"
                    aria-label={`Show ${f.eyebrow}`}
                    aria-current={i === active ? "true" : undefined}
                  >
                    <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-sumi/10 overflow-hidden rounded-full">
                      <span
                        key={`bar-${i}-${tick}`}
                        className="absolute inset-y-0 left-0 bg-sumi"
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
                      className={`block font-sans text-[11px] md:text-[12px] tracking-[0.18em] md:tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-300 ${
                        i === active
                          ? "text-sumi"
                          : "text-sumi/40 group-hover:text-sumi/70"
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
