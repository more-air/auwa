"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 12;
const LANDSCAPE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/hero/frames/landscape/${String(i + 1).padStart(2, "0")}.jpg`
);
const PORTRAIT_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/hero/frames/portrait/${String(i + 1).padStart(2, "0")}.jpg`
);

/* Text overlays per frame — short, evocative, AUWA voice */
const FRAME_TEXT: { heading: string; sub?: string }[] = [
  { heading: "Everything has Kokoro." },
  { heading: "A life force in all things." },
  { heading: "In the objects you live with." },
  { heading: "In the hands that made them." },
  { heading: "In the seasons you almost missed." },
  { heading: "A daily awareness practice." },
  { heading: "Reveal what you feel." },
  { heading: "Craftsman objects with soul." },
  { heading: "Stories that open the eyes." },
  { heading: "Four doors. One world." },
  { heading: "Japanese philosophical awareness.", sub: "Applied to modern life." },
  { heading: "Begin here." },
];

export function HeroFlipbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Preload all frames
  useEffect(() => {
    const allSrcs = [...LANDSCAPE_FRAMES, ...PORTRAIT_FRAMES];
    let loaded = 0;
    allSrcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === allSrcs.length) setImagesLoaded(true);
      };
      img.src = src;
    });
  }, []);

  // Scroll-driven frame progression
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(progress * FRAME_COUNT)
    );
    setCurrentFrame(frameIndex);
    setIsComplete(progress >= 0.98);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Scroll container: height determines how much scroll is needed to play through all frames */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${FRAME_COUNT * 60}vh` }}
      >
        {/* Sticky viewport that locks the visual in place while scrolling */}
        <div className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-white">
          {/* Desktop layout: image left, text right */}
          <div className="hidden md:flex h-full">
            {/* Image panel — left 60% */}
            <div className="relative w-[60%] h-full bg-surface-raised overflow-hidden">
              {LANDSCAPE_FRAMES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                    i === currentFrame ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== currentFrame}
                />
              ))}
            </div>

            {/* Text panel — right 40% */}
            <div className="relative w-[40%] h-full flex items-center justify-center px-12 lg:px-20">
              {FRAME_TEXT.map((text, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col items-start justify-center px-12 lg:px-20 transition-all duration-500 ease-out ${
                    i === currentFrame
                      ? "opacity-100 translate-y-0"
                      : i < currentFrame
                      ? "opacity-0 -translate-y-4"
                      : "opacity-0 translate-y-4"
                  }`}
                  aria-hidden={i !== currentFrame}
                >
                  <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] leading-[1.15] tracking-[0.01em] text-void">
                    {text.heading}
                  </h2>
                  {text.sub && (
                    <p className="mt-3 font-display text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.3] text-void/60">
                      {text.sub}
                    </p>
                  )}
                  {i === FRAME_COUNT - 1 && (
                    <a
                      href="/journal/yaoyorozu-no-kami"
                      className="inline-block mt-8 font-sans text-[14px] tracking-[0.04em] text-void/45 hover:text-void/70 transition-colors duration-300"
                    >
                      Read the essay &rarr;
                    </a>
                  )}
                </div>
              ))}

              {/* Scroll progress indicator */}
              <div className="absolute bottom-10 left-12 lg:left-20 flex items-center gap-3">
                <div className="w-16 h-[1.5px] bg-void/10 overflow-hidden">
                  <div
                    className="h-full bg-void/40 transition-all duration-300 ease-out"
                    style={{
                      width: `${((currentFrame + 1) / FRAME_COUNT) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/30">
                  {String(currentFrame + 1).padStart(2, "0")} / {FRAME_COUNT}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile layout: full-bleed image with text overlay at bottom */}
          <div className="md:hidden relative h-full w-full">
            {/* Portrait frames */}
            <div className="absolute inset-0">
              {PORTRAIT_FRAMES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                    i === currentFrame ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== currentFrame}
                />
              ))}
            </div>

            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
              {FRAME_TEXT.map((text, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ease-out ${
                    i === currentFrame
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute bottom-0 left-0 right-0 p-6 pb-10"
                  }`}
                  aria-hidden={i !== currentFrame}
                >
                  {i === currentFrame && (
                    <>
                      <h2 className="font-display text-[clamp(1.8rem,6vw,2.5rem)] leading-[1.15] tracking-[0.01em] text-white pr-12">
                        {text.heading}
                      </h2>
                      {text.sub && (
                        <p className="mt-2 font-display text-[clamp(1.1rem,4vw,1.5rem)] leading-[1.3] text-white/60">
                          {text.sub}
                        </p>
                      )}
                      {i === FRAME_COUNT - 1 && (
                        <a
                          href="/journal/yaoyorozu-no-kami"
                          className="inline-block mt-6 font-sans text-[14px] tracking-[0.04em] text-white/50 hover:text-white/80 transition-colors duration-300"
                        >
                          Read the essay &rarr;
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Mobile progress dots */}
              <div className="flex items-center gap-1.5 mt-6">
                {Array.from({ length: FRAME_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      i === currentFrame
                        ? "w-4 bg-white/70"
                        : i < currentFrame
                        ? "w-1.5 bg-white/30"
                        : "w-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — visible when first arriving */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 pointer-events-none ${
          currentFrame === 0 && !isComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-sans text-[11px] tracking-[0.1em] uppercase text-void/30 md:text-void/30">
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-bounce opacity-30"
          >
            <path
              d="M8 3v10m0 0l-3-3m3 3l3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
