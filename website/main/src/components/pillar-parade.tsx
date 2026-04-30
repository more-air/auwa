"use client";

/*
  Pillar Parade — mobile four-pillar module.

  Mirrors the Journal strip's behaviour exactly: a plain flex row with
  native overflow-x-auto, flex-shrink-0 cards, and a FadeIn slide-in-
  from-right entrance. No scroll-snap, no touch-action overrides. That
  module has zero jitter on iOS, so this one adopts the same contract.

  Dot indicators sit below the scroller and update via a scroll listener
  on the scroller element itself — never the window — so page scroll is
  never affected.
*/

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { DURATION, EASING, STAGGER } from "@/lib/motion";

type Card = {
  eyebrow: string;
  heading: string;
  href: string;
  type: "image" | "video";
  src: string;
  poster?: string;
};

const CARDS: Card[] = [
  {
    eyebrow: "01 / Store",
    heading: "Lifetime objects.",
    href: "/store",
    type: "video",
    src: "/intro/store.mp4",
    poster: "/intro/store-poster.jpg",
  },
  {
    eyebrow: "02 / Book",
    heading: "Open the eyes.",
    href: "/book",
    type: "image",
    src: "/intro/book.jpg",
  },
  {
    eyebrow: "03 / Journal",
    heading: "Quiet moments.",
    href: "/journal",
    type: "image",
    src: "/intro/journal.jpg",
  },
  {
    eyebrow: "04 / App",
    heading: "Awareness, daily.",
    href: "/app",
    type: "image",
    src: "/intro/app.jpg",
  },
];

export function PillarParade() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /**
   * Single reveal fires once when the MODULE (not the individual card)
   * enters viewport. All four cards slide in together with a CSS
   * transition-delay stagger. After first reveal they stay visible — so
   * swiping right doesn't re-trigger the animation; users see the cards
   * already in place, exactly as intended.
   */
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let last = 0;
    const onScroll = () => {
      const children = el.children;
      if (!children.length) return;
      // Pick the card whose left edge is closest to the scroller's
      // current left viewport edge.
      const viewLeft = el.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const c = children[i] as HTMLElement;
        const dist = Math.abs(c.offsetLeft - viewLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      if (closest !== last) {
        last = closest;
        setActive(closest);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative space-section">
      {/* Heading row */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
        <FadeIn>
          <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-sumi/45">
            Our world
          </span>
        </FadeIn>
        <FadeIn delay={120}>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
            Four ways in.
          </h2>
        </FadeIn>
      </div>

      {/* Horizontal scroller — pure native, no snap, no JS scroll
          hijacking. Matches the Journal strip so the scroll feel is
          identical. Width tuned so the next card always peeks on
          mobile, signalling the carousel is swipeable. */}
      <div
        ref={scrollerRef}
        className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide"
      >
        {CARDS.map((card, i) => (
          // One module-level reveal drives all four cards. Each card uses
          // inline transition-delay for staggered entrance — the slide-in
          // fires once (when the module enters viewport) and then stays
          // revealed. Swiping right shows already-loaded cards, no repeat
          // animation. Fixes the "second image missing" behaviour where
          // each card had its own IntersectionObserver that never fired
          // for off-viewport-right cards.
          <div
            key={i}
            className="flex-shrink-0 w-[72vw] sm:w-[320px] max-w-[360px]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "none"
                : "translate3d(40px, 0, 0)",
              transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo} ${i * STAGGER.strip}ms, transform ${DURATION.reveal}ms ${EASING.outExpo} ${i * STAGGER.strip}ms`,
            }}
          >
            <Link
              href={card.href}
              data-cursor="Open"
              className="group relative block aspect-[3/4] overflow-hidden rounded-md"
            >
              {card.type === "video" ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={card.poster}
                  preload="metadata"
                >
                  <source src={card.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={card.src}
                  alt={card.heading}
                  fill
                  sizes="(max-width: 768px) 72vw, 360px"
                  className="object-cover"
                  loading="eager"
                  priority={i < 2}
                />
              )}
              {/* Readability gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/70 via-sumi/10 to-transparent pointer-events-none" />
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="block font-sans text-[11px] tracking-[0.16em] uppercase text-surface/70">
                  {card.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.25rem)] leading-[1.1] tracking-[0.005em] text-surface whitespace-nowrap">
                  {card.heading}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Dot indicators — active pill widens and deepens in colour. */}
      <div className="mt-8 flex items-center justify-center gap-3 px-6">
        {CARDS.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              transition: `all ${DURATION.page}ms ${EASING.outExpo}`,
            }}
            className={`block h-[2px] ${
              i === active ? "w-10 bg-sumi" : "w-5 bg-sumi/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
