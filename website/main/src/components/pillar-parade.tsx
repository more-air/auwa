"use client";

/*
  Pillar Parade — mobile four-pillar module.

  Mirrors the Journal strip's behaviour exactly: a plain flex row with
  native overflow-x-auto, flex-shrink-0 cards, and a FadeIn slide-in-
  from-right entrance. No scroll-snap, no touch-action overrides, no
  data-lenis-prevent. That module has zero jitter on iOS, so this one
  adopts the same contract.

  Dot indicators sit below the scroller and update via a scroll listener
  on the scroller element itself — never the window — so page scroll is
  never affected.
*/

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";

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
    src: "/hero/portrait.mp4",
    poster: "/hero/poster-portrait.jpg",
  },
  {
    eyebrow: "02 / Book",
    heading: "Open the eyes.",
    href: "/book",
    type: "image",
    src: "/hero/frames/v2/02.jpg",
  },
  {
    eyebrow: "03 / Journal",
    heading: "Quiet moments.",
    href: "/journal",
    type: "image",
    src: "/hero/frames/v2/washi.jpg",
  },
  {
    eyebrow: "04 / App",
    heading: "Awareness, daily.",
    href: "/app",
    type: "image",
    src: "/hero/frames/v2/03.jpg",
  },
];

export function PillarParade() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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

  return (
    <section className="relative py-20 md:py-28">
      {/* Heading row */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
        <FadeIn>
          <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-void/40">
            Our world
          </span>
        </FadeIn>
        <FadeIn delay={120}>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-void">
            One philosophy. Four ways in.
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
          // Plain `fade` variant (not `reveal`) so the cards rise in place
          // rather than slide in from 80px to the right. The slide-from-
          // right transform pushes later cards off-viewport on mobile,
          // which prevents the IntersectionObserver inside FadeIn from
          // firing — the result was only card 1 being visible on first
          // load with no peek of card 2.
          <FadeIn
            key={i}
            delay={i * 80}
            variant="fade"
            translateY={8}
            className="flex-shrink-0 w-[72vw] sm:w-[320px] max-w-[360px]"
          >
            <Link
              href={card.href}
              data-cursor="Open"
              className="group relative block aspect-[3/4] rounded-xl overflow-hidden"
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
                <img
                  src={card.src}
                  alt={card.heading}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {/* Readability gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent pointer-events-none" />
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="block font-sans text-[11px] tracking-[0.16em] uppercase text-white/70">
                  {card.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.1] tracking-[0.005em] text-white whitespace-nowrap">
                  {card.heading}
                </h3>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Dot indicators — active pill widens and deepens in colour. */}
      <div className="mt-8 flex items-center justify-center gap-3 px-6">
        {CARDS.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === active ? "w-10 bg-void" : "w-5 bg-void/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
