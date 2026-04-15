"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  V4a: Stacked-card flipbook with VIDEO as the first card.
  The first card plays the portrait video in the same card frame.
  Remaining cards are static images. Same layout as v3.
*/

const PILLAR_LINKS: Record<string, string> = {
  AUWA: "/about",
  Book: "/book",
  App: "/app",
  Store: "/store",
};

type Card = {
  type: "image" | "video";
  portrait: string;
  poster?: string; // for video cards
  label: string;
  heading: string;
  sub?: string;
  pillar: string;
};

const CARDS: Card[] = [
  {
    type: "video",
    portrait: "/hero/portrait.mp4",
    poster: "/hero/poster-portrait.jpg",
    label: "The Character",
    heading: "Everything has Kokoro.",
    pillar: "AUWA",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/02.jpg",
    label: "The Book",
    heading: "A story ten years\nin the making.",
    pillar: "Book",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/03.jpg",
    label: "The App",
    heading: "How are you feeling\nright now?",
    pillar: "App",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/04.jpg",
    label: "The Character",
    heading: "A life force\nin all things.",
    pillar: "AUWA",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/05.jpg",
    label: "The Objects",
    heading: "In the things\nyou keep close.",
    pillar: "Store",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/06.jpg",
    label: "The App",
    heading: "Reveal your kokoro.",
    sub: "A daily awareness practice.",
    pillar: "App",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/07.jpg",
    label: "The Craft",
    heading: "In the hands\nthat made them.",
    pillar: "Store",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/08.jpg",
    label: "The Book",
    heading: "Four stories.\nOne world.",
    pillar: "Book",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/09.jpg",
    label: "The App",
    heading: "No advice.\nNo tracking.\nJust awareness.",
    pillar: "App",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/10.jpg",
    label: "The Objects",
    heading: "Lifetime objects\nwith soul.",
    pillar: "Store",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/11.jpg",
    label: "The Story",
    heading: "Japanese philosophical\nawareness.",
    sub: "Applied to modern life.",
    pillar: "Book",
  },
  {
    type: "image",
    portrait: "/hero/frames/portrait/12.jpg",
    label: "The World",
    heading: "Begin here.",
    pillar: "AUWA",
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

export function HeroFlipbookV4a() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orders, setOrders] = useState<number[]>(CARDS.map((_, i) => i));

  // Preload images (skip video cards)
  useEffect(() => {
    CARDS.forEach((card) => {
      if (card.type === "image") {
        const img = new Image();
        img.src = card.portrait;
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const idx = Math.min(CARD_COUNT - 1, Math.floor(progress * CARD_COUNT));
    setActiveIndex(idx);
    setOrders(CARDS.map((_, i) => i - idx));
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
      style={{ height: `${CARD_COUNT * 70}vh` }}
    >
      <div className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-white">
        <div className="relative h-full w-full flex items-center justify-center">

          {/* ── Left text column ── */}
          <div className="hidden md:flex absolute left-8 lg:left-20 top-1/2 -translate-y-1/2 flex-col items-start gap-6 w-[200px] lg:w-[240px]">
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
                <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
                  {card.pillar}
                </span>
                <div className="mt-3 w-8 h-[1px] bg-void/12" />
                <p className="mt-4 font-sans text-[12px] tracking-[0.08em] uppercase text-void/50">
                  {card.label}
                </p>
              </div>
            ))}
            <div className="absolute top-24 left-0">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[28px] tracking-[0.01em] text-void/20 tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[11px] text-void/20">/</span>
                <span className="font-sans text-[11px] text-void/20">{CARD_COUNT}</span>
              </div>
            </div>
          </div>

          {/* ── Centre: stacked cards ── */}
          <div className="relative" style={{ width: "min(55vh, 44vw)", height: "min(72vh, 58vw)" }}>
            {/* Desktop + Mobile cards (both use portrait) */}
            {CARDS.map((card, i) => {
              const order = orders[i];
              const absOrder = Math.abs(order);
              const scale = Math.max(0.85, 1 - absOrder * 0.03);
              const translateY = order * 3.5;
              const zIndex = 20 - absOrder;
              const opacity = absOrder > 3 ? 0 : 1;
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
                    transform: `translateY(${translateY}vh) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
                  }}
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="absolute inset-0 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)] transition-shadow duration-400" />
                  {card.type === "video" ? (
                    <VideoCard src={card.portrait} poster={card.poster} isActive={isActive} />
                  ) : (
                    <img
                      src={card.portrait}
                      alt={card.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-400 rounded-xl" />
                </a>
              );
            })}
          </div>

          {/* ── Right text column ── */}
          <div className="hidden md:block absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 w-[260px] lg:w-[320px]">
            {CARDS.map((card, i) => (
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
                <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.4rem)] leading-[1.15] tracking-[0.01em] text-void whitespace-pre-line">
                  {card.heading}
                </h2>
                {card.sub && (
                  <p className="mt-2 font-display text-[clamp(1rem,1.5vw,1.3rem)] leading-[1.3] text-void/50">
                    {card.sub}
                  </p>
                )}
                {i === CARD_COUNT - 1 && (
                  <a
                    href="/journal/yaoyorozu-no-kami"
                    className="inline-block mt-6 font-sans text-[13px] tracking-[0.04em] text-void/40 hover:text-void/70 transition-colors duration-300"
                  >
                    Read the essay &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ── Mobile text overlay ── */}
          <div className="md:hidden absolute bottom-0 inset-x-0 z-30">
            <div className="h-[35%] bg-gradient-to-t from-white via-white/80 to-transparent absolute inset-x-0 bottom-0" />
            <div className="relative px-6 pb-6">
              {CARDS.map((card, i) => (
                <div
                  key={`mtext-${i}`}
                  className={`transition-all duration-600 ease-out ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 absolute bottom-0 left-0 right-0 px-6 pb-6"
                  }`}
                >
                  {i === activeIndex && (
                    <>
                      <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
                        {card.pillar} / {card.label}
                      </span>
                      <h2 className="mt-2 font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-void whitespace-pre-line">
                        {card.heading}
                      </h2>
                      {card.sub && (
                        <p className="mt-1 font-display text-[clamp(0.95rem,3.5vw,1.15rem)] leading-[1.3] text-void/50">
                          {card.sub}
                        </p>
                      )}
                      {i === CARD_COUNT - 1 && (
                        <a
                          href="/journal/yaoyorozu-no-kami"
                          className="inline-block mt-4 font-sans text-[13px] tracking-[0.04em] text-void/40 hover:text-void/70 transition-colors duration-300"
                        >
                          Read the essay &rarr;
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Decorative lines ── */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <div
              className="absolute top-[15%] bottom-[15%] w-[1px] bg-void/5"
              style={{ left: "calc(50% - min(27.5vh, 22vw) - 40px)" }}
            />
            <div
              className="absolute top-[15%] bottom-[15%] w-[1px] bg-void/5"
              style={{ right: "calc(50% - min(27.5vh, 22vw) - 40px)" }}
            />
          </div>

          {/* ── Progress bar ── */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-3 z-20">
            <div className="w-24 h-[1px] bg-void/8 overflow-hidden">
              <div
                className="h-full bg-void/30 transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / CARD_COUNT) * 100}%` }}
              />
            </div>
          </div>

          {/* ── Mobile progress ── */}
          <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
            {CARDS.map((_, i) => (
              <div
                key={`dot-${i}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-3 h-[2px] bg-void/40" : "w-[3px] h-[2px] bg-void/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 pointer-events-none ${
          activeIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-void/25">
            Scroll to explore
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce opacity-25">
            <path d="M8 3v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
