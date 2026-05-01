"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DURATION, EASING, STAGGER } from "@/lib/motion";

type Spread = {
  src: string;
  alt: string;
  /**
   * "spread" (default) — landscape 5:3 page-pair from the book.
   * "cover" — portrait single-page cover. Rendered at roughly half the
   * width of a spread, with the cover's natural 4:5 aspect, so the
   * front of the book reads correctly alongside the open spreads.
   */
  type?: "spread" | "cover";
};

interface BookPreviewProps {
  spreads: Spread[];
  /** Tone of arrow + indicator UI. "dark" for light controls on a dark page. */
  theme?: "light" | "dark";
  /**
   * Eyebrow text shown alongside the spread counter. Defaults to "Flick
   * through" for backwards compatibility with existing demo pages. Pass
   * `null` to hide the eyebrow entirely (e.g. when the page renders its
   * own eyebrow + heading above the carousel).
   */
  eyebrow?: string | null;
}

/*
  In-page book flick-through.

  Native horizontal scroll-snap (mandatory snap, center align). Reads as a
  page-flip on mobile (swipe), and on desktop the arrow buttons step ±1
  via scrollBy. The active-spread counter updates on scroll using the
  scroller's left scroll position. Keyboard ← / → also work when the
  module has focus.

  Why scroll-snap rather than a JS-driven slider: snap is buttery on iOS,
  preserves momentum, and never desyncs from the user's input. The arrows
  call scrollBy with smooth behavior; native engines complete the snap at
  the end. No transform-driven slider library, no Lenis dependency.
*/
export function BookPreview({
  spreads,
  theme = "dark",
  eyebrow = "Flick through",
}: BookPreviewProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Module-level reveal — same pattern as StripReveal. When the
  // scroller enters viewport, each card cascades in from the right
  // with STAGGER.strip ms between each. Replaces wrapping the whole
  // component in <FadeIn variant="reveal">, which only animated the
  // container as one unit (no per-card stagger).
  const [revealed, setRevealed] = useState(false);

  const isDark = theme === "dark";
  const total = spreads.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sync active index with scroll position.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-spread]");
      if (cards.length === 0) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-spread]");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const stride = card.clientWidth + gap;
    el.scrollBy({ left: dir * stride, behavior: "smooth" });
  }, []);

  // Keyboard arrows when the wrapper is focused.
  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  const arrowColor = isDark ? "text-washi" : "text-sumi";
  const arrowHover = isDark ? "hover:bg-washi/10" : "hover:bg-sumi/10";
  const arrowBorder = isDark ? "border-washi/15" : "border-sumi/15";
  const dotActive = isDark ? "bg-washi" : "bg-sumi";
  const dotIdle = isDark ? "bg-washi/25" : "bg-sumi/25";
  const counterColor = isDark ? "text-washi/55" : "text-sumi/55";

  return (
    <div
      role="region"
      aria-label="Book preview — flick through key spreads"
      tabIndex={0}
      onKeyDown={onKey}
      className="relative"
    >
      {/* counter top-right; eyebrow on the left when provided */}
      <div className={`px-6 md:px-12 lg:px-20 xl:px-28 mb-6 md:mb-8 flex items-baseline gap-6 ${eyebrow ? "justify-between" : "justify-end"}`}>
        {eyebrow ? (
          <p className={`font-sans text-[12px] tracking-[0.16em] uppercase ${counterColor}`}>
            {eyebrow}
          </p>
        ) : null}
        <p className={`font-sans tabular-nums text-[12px] tracking-[0.16em] uppercase ${counterColor}`}>
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* scroller — pb-12 so the spread shadow has room to fade out
          fully inside the auto-scroll bounds (overflow-x:auto forces
          overflow-y:auto, which would otherwise clip the shadow). */}
      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto px-6 md:px-12 lg:px-20 xl:px-28 pb-12 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          // Inertial scrolling on iOS for a smooth flick.
          WebkitOverflowScrolling: "touch",
        }}
      >
        {spreads.map((s, i) => {
          const isCover = s.type === "cover";
          // Cover and spread cards land on the SAME card height. The
          // spread aspect is 5:3 (h = 0.6 × w); the cover aspect is
          // 4:5 portrait (h = 1.25 × w). To match heights, the cover
          // width is set to (spread_w × 0.48) so its 4:5 height equals
          // the spread's 5:3 height. Ratios checked at every viewport
          // breakpoint:
          //   88vw spread → 52.8vw tall → 42vw cover ≈ matched
          //   80vw spread → 48vw tall   → 38vw cover ≈ matched
          //   72vw spread → 43.2vw tall → 34vw cover ≈ matched
          //   820px spread → 492px tall → 394px cover = matched
          const widthClasses = isCover
            ? "w-[42vw] sm:w-[38vw] md:w-[34vw] lg:w-[394px] max-w-[440px]"
            : "w-[88vw] sm:w-[80vw] md:w-[72vw] lg:w-[820px] max-w-[920px]";
          const aspectClasses = isCover ? "aspect-[4/5]" : "aspect-[5/3]";
          return (
            <div
              key={s.src}
              data-spread
              className={`flex-shrink-0 ${widthClasses} flex items-center`}
              style={{
                scrollSnapAlign: "center",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translate3d(60px, 0, 0)",
                transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo} ${i * STAGGER.strip}ms, transform ${DURATION.reveal}ms ${EASING.outExpo} ${i * STAGGER.strip}ms`,
              }}
            >
              <div
                className={`relative ${aspectClasses} w-full overflow-hidden rounded-md shadow-[0_10px_30px_-14px_rgba(0,0,0,0.28)]`}
                style={{
                  // Match the page bg behind the card so the rounded
                  // corners' anti-aliased pixels don't flash a brighter
                  // colour during image load. On dark pages → Yoru;
                  // on light pages → cream paper, which the spread
                  // imagery itself is printed on.
                  backgroundColor: isDark ? "var(--color-yoru)" : "#fdfaf2",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes={
                    isCover
                      ? "(max-width: 640px) 44vw, (max-width: 1024px) 38vw, 500px"
                      : "(max-width: 640px) 88vw, (max-width: 1024px) 78vw, 1000px"
                  }
                  className="object-cover"
                  loading={i < 2 ? "eager" : undefined}
                  priority={i < 2}
                />
                {/* Book-gutter shadow — tight vertical band at the spine
                    of two-page spreads. Narrow (≈10% of width) and a
                    soft mid-grey peak via multiply so it reads as the
                    crease where pages meet without dominating the
                    illustration. Covers stay clean. */}
                {!isCover && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 47%, rgba(0,0,0,0.28) 50%, transparent 53%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* controls — arrows (desktop) + dots (always) */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mt-6 md:mt-8 flex items-center justify-between gap-6">
        {/* dots */}
        <div className="flex items-center gap-2">
          {spreads.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to spread ${i + 1}`}
              onClick={() => {
                const el = scrollerRef.current;
                if (!el) return;
                const cards = el.querySelectorAll<HTMLElement>("[data-spread]");
                const target = cards[i];
                if (!target) return;
                el.scrollTo({
                  left:
                    target.offsetLeft -
                    (el.clientWidth - target.clientWidth) / 2,
                  behavior: "smooth",
                });
              }}
              className="p-1.5 -m-1.5 cursor-pointer"
            >
              <span
                className={`block h-[6px] rounded-full transition-all duration-300 ${
                  i === active ? `w-6 ${dotActive}` : `w-[6px] ${dotIdle}`
                }`}
              />
            </button>
          ))}
        </div>
        {/* arrows */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous spread"
            onClick={() => step(-1)}
            disabled={active === 0}
            className={`group w-12 h-12 rounded-full border ${arrowBorder} ${arrowColor} ${arrowHover} flex items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next spread"
            onClick={() => step(1)}
            disabled={active === total - 1}
            className={`group w-12 h-12 rounded-full border ${arrowBorder} ${arrowColor} ${arrowHover} flex items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
