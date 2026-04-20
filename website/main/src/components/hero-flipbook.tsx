"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  V4b: Stacked-card flipbook with VIDEO as first card +
  curated mix of product and editorial images covering all 4 pillars.
  Obsidian Assembly-style layout. Header stays visible during flipbook.
  Cards vertically centred below header. Mobile uses near-full-screen 9:16 card.
  Only 1-2 cards visible behind active card, slightly narrower for depth.
*/

const PILLAR_LINKS: Record<string, string> = {
  AUWA: "/about",
  Character: "/about",
  Book: "/book",
  App: "/app",
  Store: "/store",
  Journal: "/journal",
};

type Card = {
  type: "image" | "video";
  src: string;
  poster?: string;
  label: string;
  heading: string;
  sub?: string;
  pillar: string;
};

// MAX 28 CHARS per heading (fits 2 lines at 2.2rem in 260px column)
// 8 cards: clear narrative arc for a cold visitor
const CARDS: Card[] = [
  {
    type: "video",
    src: "/hero/portrait.mp4",
    poster: "/hero/poster-portrait.jpg",
    label: "Craftsman objects",
    heading: "Objects made with love.",
    pillar: "Store",
  },
  {
    type: "image",
    src: "/hero/frames/v2/02.jpg",
    label: "Illustrated stories",
    heading: "Stories that open\u00A0the\u00A0eyes.",
    pillar: "Book",
  },
  {
    type: "image",
    src: "/hero/frames/v2/washi.jpg",
    label: "Travel writing",
    heading: "Travel writing from Japan.",
    pillar: "Journal",
  },
  {
    type: "image",
    src: "/hero/frames/v2/03.jpg",
    label: "How you feel",
    heading: "Daily awareness practice.",
    pillar: "App",
  },
];

const CARD_COUNT = CARDS.length;

function VideoCard({ src, poster, isActive }: { src: string; poster?: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <>
      {poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}

export function HeroFlipbook({ fullHeight = false }: { fullHeight?: boolean } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useRef(0); // Stable height, captured on mount
  const activeIndexRef = useRef(0); // Gate scroll-driven state updates to prevent iOS flicker
  const [activeIndex, setActiveIndex] = useState(0);
  const [orders, setOrders] = useState<number[]>(CARDS.map((_, i) => i));
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progressVisible, setProgressVisible] = useState(true);

  // Preload images
  useEffect(() => {
    CARDS.forEach((card) => {
      if (card.type === "image") {
        const img = new Image();
        img.src = card.src;
      }
    });
  }, []);

  // Capture stable viewport height on mount, then mark as ready
  // Double rAF ensures scroll handler has run and cards are sorted before revealing
  useEffect(() => {
    viewportHeight.current = window.innerHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

  // Keep header visible while flipbook is active
  useEffect(() => {
    if (inView) {
      document.body.setAttribute("data-flipbook-active", "");
    } else {
      document.body.removeAttribute("data-flipbook-active");
    }
    return () => document.body.removeAttribute("data-flipbook-active");
  }, [inView]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const vh = viewportHeight.current || window.innerHeight;
    const scrollableHeight = container.offsetHeight - vh;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    // Release header before the last card scrolls under it (end margin negative)
    setInView(scrolled >= -100 && scrolled <= scrollableHeight - 200);

    // Fade progress bar near the end of the flipbook and once past
    setProgressVisible(progress < 0.92 && scrolled < scrollableHeight);

    const idx = Math.min(CARD_COUNT - 1, Math.floor(progress * CARD_COUNT));
    // Only re-render when the active card actually changes.
    // Previously setOrders created a new array every scroll tick, forcing
    // React to re-apply inline styles on every card on every scroll frame,
    // which caused visible flicker on iOS Safari.
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
      setOrders(CARDS.map((_, i) => i - idx));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${CARD_COUNT * 80}vh` }}
    >
      {/* Sits below the header so content is vertically centred in visible area.
          Using svh avoids snap-back when mobile browser chrome hides/shows.
          Hidden until mounted to prevent flash of unsorted cards on load/back-nav. */}
      {/*
        Sticky uses dvh so the flipbook area always fills the visible
        viewport. With svh, when Android/iOS chrome retracts the visible
        viewport grows but the sticky stayed at the smaller svh size,
        leaving a large empty gap below the card+text. dvh re-sizes once
        when chrome retracts — a single gentle reflow, not continuous.
      */}
      <div
        className={`sticky top-16 lg:top-20 z-10 w-full overflow-hidden bg-white flex items-center justify-center transition-opacity duration-300 h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-5rem)] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative w-full max-w-[1400px] mx-auto h-full">

          {/* ── Left text column (desktop) — aligned to card centre ── */}
          <div className="hidden lg:flex absolute left-8 lg:left-16 xl:left-[8%] top-[40%] -translate-y-1/2 flex-col items-start w-[200px] lg:w-[240px]">
            {CARDS.map((card, i) => (
              <div
                key={`label-${i}`}
                className={`absolute top-0 left-0 transition-all duration-700 ease-out ${
                  i === activeIndex
                    ? "opacity-100 translate-y-0"
                    : i < activeIndex
                    ? "opacity-0 -translate-y-4"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/30">
                  {card.pillar}
                </span>
                <div className="mt-3 w-8 h-[1px] bg-void/12" />
                <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-void/80 mt-4">
                  {card.label}
                </p>
              </div>
            ))}
            <div className="absolute top-[72px] left-0">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[38px] tracking-[0.01em] text-void/18 tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[13px] text-void/18 ml-0.5">/</span>
                <span className="font-sans text-[13px] text-void/18 ml-0.5">{CARD_COUNT}</span>
              </div>
            </div>
          </div>

          {/* ── Centre: stacked cards (desktop) ── */}
          {/* Centred with slight upward offset to leave room for stacked card + scroll hint below */}
          <div
            className="hidden lg:block absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
            style={{ width: "min(48vh, 38vw)", height: "min(58vh, 46vw)" }}
          >
            {CARDS.map((card, i) => {
              const order = orders[i];
              const absOrder = Math.abs(order);
              // Only 1 card visible behind, clearly narrower
              const scale = 1 - absOrder * 0.03;
              const scaleX = 1 - absOrder * 0.1; // much narrower behind
              // Convert vh-based offset to stable pixels using the viewport
              // height captured on mount. Using live vh in the transform
              // causes iOS jitter whenever the URL bar retracts or expands.
              const vhPx = viewportHeight.current || 800;
              const translateYPx = (order * 4 * vhPx) / 100;
              const zIndex = 20 - absOrder;
              const opacity = absOrder > 1 ? 0 : 1; // only 1 behind
              const isActive = i === activeIndex;
              const href = PILLAR_LINKS[card.pillar] || "/about";

              return (
                <a
                  key={`card-${i}`}
                  href={href}
                  className={`absolute inset-0 rounded-xl overflow-hidden group ${
                    isActive ? "cursor-pointer" : "pointer-events-none"
                  }`}
                  style={{
                    transform: `translate3d(0, ${translateYPx}px, 0) scale(${scaleX}, ${scale})`,
                    zIndex,
                    opacity,
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
                  }}
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="absolute inset-0 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)] transition-shadow duration-400" />
                  {card.type === "video" ? (
                    <VideoCard src={card.src} poster={card.poster} isActive={isActive} />
                  ) : (
                    <img
                      src={card.src}
                      alt={card.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-400 rounded-xl" />
                </a>
              );
            })}
          </div>

          {/* ── Mobile: card + text stacked and centred vertically ── */}
          {/*
            gap uses a fixed rem instead of 5vh so the layout doesn't
            shift when the iOS URL bar retracts mid-scroll. The maxHeight
            reservation and max-width leave reliable breathing above the
            card (clearing the separator above the flipbook) and below
            the text on every mobile viewport height.
          */}
          <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center gap-10 px-6">
            <div
              className="relative w-full max-w-[360px]"
              style={{ aspectRatio: "9/16", maxHeight: "calc(100dvh - 17rem)" }}
            >
              {CARDS.map((card, i) => {
                const order = orders[i];
                const absOrder = Math.abs(order);
                const scale = 1 - absOrder * 0.03;
                const scaleX = 1 - absOrder * 0.1;
                // Convert vh-based peek offset to fixed pixels using the
                // viewport height captured on mount. Live vh inside the
                // transform caused visible jitter on iOS whenever the URL
                // bar retracted during scroll.
                const vhPx = viewportHeight.current || 800;
                const translateYPx = (order * 4 * vhPx) / 100;
                const zIndex = 20 - absOrder;
                const opacity = absOrder > 1 ? 0 : 1;
                const isActive = i === activeIndex;
                const href = PILLAR_LINKS[card.pillar] || "/about";

                return (
                  <a
                    key={`mcard-${i}`}
                    href={href}
                    className={`absolute inset-0 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] active:scale-[0.98] ${
                      isActive ? "" : "pointer-events-none"
                    }`}
                    style={{
                      transform: `translate3d(0, ${translateYPx}px, 0) scale(${scaleX}, ${scale})`,
                      zIndex,
                      opacity,
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
                    }}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {card.type === "video" ? (
                      <VideoCard src={card.src} poster={card.poster} isActive={isActive} />
                    ) : (
                      <img
                        src={card.src}
                        alt={card.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile text + progress, directly below the card */}
            <div className="w-full text-center">
              <div className="relative h-[58px]">
                {CARDS.map((card, i) => (
                  <div
                    key={`mtext-${i}`}
                    className={`absolute inset-x-0 top-0 text-center transition-[opacity,transform] duration-500 ease-out ${
                      i === activeIndex
                        ? "opacity-100 translate-y-0"
                        : i < activeIndex
                          ? "opacity-0 -translate-y-3"
                          : "opacity-0 translate-y-3"
                    }`}
                  >
                    {i === activeIndex && (
                      <>
                        <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-void/30">
                          {card.pillar}
                        </span>
                        <h2 className="mt-1 font-display text-[clamp(1.2rem,4.5vw,1.6rem)] leading-[1.15] tracking-[0.01em] text-void">
                          {card.heading}
                        </h2>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative flex justify-center h-5 mt-1">
                <div className={`absolute inset-0 flex justify-center transition-opacity duration-500 ${activeIndex === 0 ? "opacity-100" : "opacity-0"}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce opacity-30">
                    <path d="M8 3v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${activeIndex === 0 || !progressVisible ? "opacity-0" : "opacity-100"}`}>
                  <div className="w-20 h-[2px] bg-void/10 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-void transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${((activeIndex + 1) / CARD_COUNT) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right text column (desktop) — clickable heading, aligned to card centre ── */}
          <div className="hidden lg:block absolute right-8 lg:right-16 xl:right-[8%] top-[40%] -translate-y-1/2 w-[200px] lg:w-[240px]">
            {CARDS.map((card, i) => {
              const href = PILLAR_LINKS[card.pillar] || "/about";
              return (
                <div
                  key={`text-${i}`}
                  className={`absolute top-0 right-0 text-right transition-all duration-700 ease-out ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : i < activeIndex
                      ? "opacity-0 -translate-y-6"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <a
                    href={href}
                    className="group/text"
                    tabIndex={i === activeIndex ? 0 : -1}
                  >
                    <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.15] tracking-[0.01em] text-void group-hover/text:text-void/70 transition-colors duration-300">
                      {card.heading}
                    </h2>
                  </a>
                  {card.sub && (
                    <p className="mt-2 font-display text-[clamp(1rem,1.5vw,1.3rem)] leading-[1.3] text-void/50">
                      {card.sub}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Decorative lines (desktop) — closer to card ── */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <div
              className="absolute top-[15%] bottom-[15%] w-[1px] bg-void/5"
              style={{ left: "calc(50% - min(27.5vh, 22vw) - 24px)" }}
            />
            <div
              className="absolute top-[15%] bottom-[15%] w-[1px] bg-void/5"
              style={{ right: "calc(50% - min(27.5vh, 22vw) - 24px)" }}
            />
          </div>

          {/* ── Progress bar + scroll hint (desktop) ── */}
          <div className={`hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-5 z-20 transition-opacity duration-500 ${progressVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-3">
              <div className="w-28 h-[2px] bg-void/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-void transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((activeIndex + 1) / CARD_COUNT) * 100}%` }}
                />
              </div>
            </div>
            <div
              className={`flex flex-col items-center gap-1 transition-opacity duration-500 ${
                activeIndex === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-void/25">
                Scroll
              </span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-bounce opacity-25">
                <path d="M8 3v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
