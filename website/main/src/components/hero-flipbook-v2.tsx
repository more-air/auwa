"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 12;
const LANDSCAPE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/hero/frames/landscape/${String(i + 1).padStart(2, "0")}.jpg`
);
const PORTRAIT_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/hero/frames/portrait/${String(i + 1).padStart(2, "0")}.jpg`
);

/*
  Each frame has:
  - text: headline
  - sub: optional second line
  - position: where text sits (changes per frame based on image composition)
  - kenBurns: subtle motion while on this frame
  - origin: transform-origin for the Ken Burns (zoom towards this point)
*/
const FRAMES: {
  text: string;
  sub?: string;
  position: string; // Tailwind classes for text placement
  kenBurns: { from: string; to: string };
  origin: string;
}[] = [
  {
    // 01: AUWA character close-up, clean wall top-right
    text: "Everything has Kokoro.",
    position: "top-8 right-8 md:top-16 md:right-20 text-right",
    kenBurns: { from: "scale-[1.08]", to: "scale-100" },
    origin: "center center",
  },
  {
    // 02: Book flat-lay with coffee
    text: "A story ten years in the making.",
    position: "bottom-8 left-8 md:bottom-16 md:left-20 text-left",
    kenBurns: { from: "scale-100 translate-x-0", to: "scale-[1.04] translate-x-[1%]" },
    origin: "right center",
  },
  {
    // 03: App on round table, slats behind
    text: "How are you feeling right now?",
    position: "top-8 left-8 md:top-16 md:left-20 text-left",
    kenBurns: { from: "scale-100", to: "scale-[1.06]" },
    origin: "30% 60%",
  },
  {
    // 04: AUWA figure close-up, bowl behind
    text: "A life force in all things.",
    position: "bottom-8 right-8 md:bottom-16 md:right-20 text-right",
    kenBurns: { from: "scale-[1.06]", to: "scale-100" },
    origin: "40% 40%",
  },
  {
    // 05: Books close-up on table
    text: "In the objects you keep close.",
    position: "top-8 right-8 md:top-16 md:right-20 text-right",
    kenBurns: { from: "scale-100", to: "scale-[1.05]" },
    origin: "60% 50%",
  },
  {
    // 06: App wider, round table
    text: "Reveal your kokoro.",
    sub: "A daily awareness practice.",
    position: "bottom-8 left-8 md:bottom-16 md:left-20 text-left",
    kenBurns: { from: "scale-100 translate-y-0", to: "scale-[1.03] -translate-y-[1%]" },
    origin: "center top",
  },
  {
    // 07: Bowl + AUWA feet detail
    text: "In the hands that made them.",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
    kenBurns: { from: "scale-[1.06]", to: "scale-100" },
    origin: "center center",
  },
  {
    // 08: Book + coffee angle
    text: "Four stories. One world.",
    position: "top-8 left-8 md:top-16 md:left-20 text-left",
    kenBurns: { from: "scale-100", to: "scale-[1.05]" },
    origin: "70% 70%",
  },
  {
    // 09: App different angle
    text: "No advice. No tracking.",
    sub: "Just awareness.",
    position: "bottom-8 right-8 md:bottom-16 md:right-20 text-right",
    kenBurns: { from: "scale-100", to: "scale-[1.04]" },
    origin: "30% 50%",
  },
  {
    // 10: Tea caddy centred, AUWA peeking
    text: "Lifetime objects with soul.",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
    kenBurns: { from: "scale-[1.05]", to: "scale-100" },
    origin: "center center",
  },
  {
    // 11: Book close-up angled
    text: "Japanese philosophical awareness.",
    sub: "Applied to modern life.",
    position: "top-8 right-8 md:top-16 md:right-20 text-right",
    kenBurns: { from: "scale-100 translate-x-0", to: "scale-[1.04] -translate-x-[1%]" },
    origin: "left center",
  },
  {
    // 12: Full bench scene, wide
    text: "Begin here.",
    position: "bottom-8 left-1/2 -translate-x-1/2 text-center",
    kenBurns: { from: "scale-100", to: "scale-[1.06]" },
    origin: "center 40%",
  },
];

export function HeroFlipbookV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frameProgress, setFrameProgress] = useState(0); // 0-1 progress within current frame
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const exactFrame = progress * FRAME_COUNT;
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(exactFrame));
    const withinFrame = exactFrame - frameIndex; // 0-1 within this frame

    setCurrentFrame(frameIndex);
    setFrameProgress(Math.min(1, withinFrame));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${FRAME_COUNT * 70}vh` }}
      >
        <div className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-white">
          {/* Image layers with Ken Burns */}
          {LANDSCAPE_FRAMES.map((src, i) => {
            const isActive = i === currentFrame;
            const isPrev = i === currentFrame - 1;
            const frame = FRAMES[i];

            return (
              <div
                key={`l-${i}`}
                className={`hidden md:block absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? "opacity-100" : isPrev ? "opacity-0" : "opacity-0"
                }`}
                style={{ zIndex: isActive ? 2 : 1 }}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                  style={{
                    transformOrigin: frame.origin,
                    transform: isActive
                      ? interpolateTransform(frame.kenBurns.from, frame.kenBurns.to, frameProgress)
                      : frame.kenBurns.from,
                    transition: isActive ? "none" : "opacity 700ms ease-out",
                  }}
                />
              </div>
            );
          })}

          {PORTRAIT_FRAMES.map((src, i) => {
            const isActive = i === currentFrame;
            const frame = FRAMES[i];

            return (
              <div
                key={`p-${i}`}
                className={`md:hidden absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ zIndex: isActive ? 2 : 1 }}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                  style={{
                    transformOrigin: frame.origin,
                    transform: isActive
                      ? interpolateTransform(frame.kenBurns.from, frame.kenBurns.to, frameProgress)
                      : frame.kenBurns.from,
                    transition: isActive ? "none" : "opacity 700ms ease-out",
                  }}
                />
              </div>
            );
          })}

          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Text overlays — desktop: positioned per frame against image */}
          <div className="hidden md:block absolute inset-0 z-20">
            {FRAMES.map((frame, i) => (
              <div
                key={`dt-${i}`}
                className={`absolute ${frame.position} max-w-[500px] transition-all duration-700 ease-out ${
                  i === currentFrame
                    ? "opacity-100 blur-0"
                    : "opacity-0 blur-[2px]"
                }`}
                style={{
                  transitionDelay: i === currentFrame ? "100ms" : "0ms",
                }}
              >
                <h2
                  className="font-display leading-[1.1] tracking-[0.01em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
                >
                  {frame.text}
                </h2>
                {frame.sub && (
                  <p
                    className="mt-2 font-display leading-[1.2] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
                  >
                    {frame.sub}
                  </p>
                )}
                {i === FRAME_COUNT - 1 && (
                  <a
                    href="/journal/yaoyorozu-no-kami"
                    className="inline-block mt-6 font-sans text-[14px] tracking-[0.04em] text-white/60 hover:text-white/90 transition-colors duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                  >
                    Read the essay &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Text overlays — mobile: always bottom with gradient */}
          <div className="md:hidden absolute inset-0 z-20">
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            {FRAMES.map((frame, i) => (
              <div
                key={`mt-${i}`}
                className={`absolute bottom-0 left-0 right-0 p-6 pb-8 transition-all duration-600 ease-out ${
                  i === currentFrame
                    ? "opacity-100 translate-y-0"
                    : i < currentFrame
                    ? "opacity-0 -translate-y-3"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <h2 className="font-display text-[clamp(1.6rem,6vw,2.2rem)] leading-[1.15] tracking-[0.01em] text-white pr-8">
                  {frame.text}
                </h2>
                {frame.sub && (
                  <p className="mt-1.5 font-display text-[clamp(1rem,4vw,1.3rem)] leading-[1.3] text-white/65">
                    {frame.sub}
                  </p>
                )}
                {i === FRAME_COUNT - 1 && (
                  <a
                    href="/journal/yaoyorozu-no-kami"
                    className="inline-block mt-5 font-sans text-[14px] tracking-[0.04em] text-white/50 hover:text-white/80 transition-colors duration-300"
                  >
                    Read the essay &rarr;
                  </a>
                )}
              </div>
            ))}

            {/* Mobile progress: thin line */}
            <div className="absolute bottom-3 left-6 right-6 z-30">
              <div className="h-[1px] bg-white/10 w-full overflow-hidden rounded-full">
                <div
                  className="h-full bg-white/40 transition-all duration-200 ease-out rounded-full"
                  style={{
                    width: `${((currentFrame + frameProgress) / FRAME_COUNT) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop progress: frame counter bottom-left */}
          <div className="hidden md:flex absolute bottom-8 left-8 md:bottom-12 md:left-20 z-20 items-center gap-3">
            <div className="w-20 h-[1px] bg-white/15 overflow-hidden">
              <div
                className="h-full bg-white/50 transition-all duration-200 ease-out"
                style={{
                  width: `${((currentFrame + frameProgress) / FRAME_COUNT) * 100}%`,
                }}
              />
            </div>
            <span className="font-sans text-[11px] tracking-[0.1em] uppercase text-white/35">
              {String(currentFrame + 1).padStart(2, "0")} / {FRAME_COUNT}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 pointer-events-none ${
          currentFrame === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M10 4v12m0 0l-4-4m4 4l4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

/* Utility: interpolate between two CSS transform strings based on progress 0-1 */
function interpolateTransform(from: string, to: string, progress: number): string {
  const fromValues = parseTransformValues(from);
  const toValues = parseTransformValues(to);

  const result: string[] = [];

  // Merge all transform functions
  const allKeys = new Set([...Object.keys(fromValues), ...Object.keys(toValues)]);
  for (const key of allKeys) {
    const fromVal = fromValues[key] ?? getDefaultValue(key);
    const toVal = toValues[key] ?? getDefaultValue(key);
    const interpolated = fromVal + (toVal - fromVal) * easeOutCubic(progress);

    if (key === "scale") {
      result.push(`scale(${interpolated.toFixed(4)})`);
    } else if (key === "translateX") {
      result.push(`translateX(${interpolated.toFixed(2)}%)`);
    } else if (key === "translateY") {
      result.push(`translateY(${interpolated.toFixed(2)}%)`);
    }
  }

  return result.join(" ") || "none";
}

function parseTransformValues(str: string): Record<string, number> {
  const values: Record<string, number> = {};

  // scale-[1.06] or scale-100 or scale-[1]
  const scaleMatch = str.match(/scale-\[([^\]]+)\]|scale-(\d+)/);
  if (scaleMatch) {
    values.scale = scaleMatch[1]
      ? parseFloat(scaleMatch[1])
      : parseInt(scaleMatch[2]) / 100;
  }

  // translate-x-[1%] or -translate-x-[1%]
  const txMatch = str.match(/(-?)translate-x-\[([^\]]+)\]/);
  if (txMatch) {
    values.translateX = parseFloat(txMatch[2]) * (txMatch[1] === "-" ? -1 : 1);
  }

  // translate-y-[1%] or -translate-y-[1%]
  const tyMatch = str.match(/(-?)translate-y-\[([^\]]+)\]/);
  if (tyMatch) {
    values.translateY = parseFloat(tyMatch[2]) * (tyMatch[1] === "-" ? -1 : 1);
  }

  // translate-x-0 / translate-y-0
  if (str.includes("translate-x-0")) values.translateX = 0;
  if (str.includes("translate-y-0")) values.translateY = 0;

  return values;
}

function getDefaultValue(key: string): number {
  if (key === "scale") return 1;
  return 0;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
