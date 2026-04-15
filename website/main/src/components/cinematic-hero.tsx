"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface HeroImage {
  src: string;
  alt: string;
}

interface CinematicHeroProps {
  images: HeroImage[];
  duration?: number;
  transitionDuration?: number;
  headline?: string;
  subtitle?: string;
  subtitleHref?: string;
}

export function CinematicHero({
  images,
  duration = 6000,
  transitionDuration = 1800,
  headline = "Everything has\nKokoro.",
  subtitle = "Begin here",
  subtitleHref = "/journal/yaoyorozu-no-kami",
}: CinematicHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [p, setP] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    images.forEach((img) => {
      const image = new Image();
      image.onload = () => { loaded++; if (loaded === images.length) setImagesLoaded(true); };
      image.onerror = () => { loaded++; if (loaded === images.length) setImagesLoaded(true); };
      image.src = img.src;
    });
  }, [images]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setP(Math.max(0, Math.min(1, -rect.top / scrollable)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Auto-advance images
  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % images.length);
      setIsTransitioning(false);
    }, transitionDuration);
  }, [nextIndex, images.length, transitionDuration]);

  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(advance, duration);
    return () => clearInterval(timer);
  }, [imagesLoaded, advance, duration]);

  // Eased progress
  const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

  // Image scale (subtle Ken Burns)
  const scale = 1 + p * 0.1;

  // Text
  const textAlpha = Math.max(0, 1 - p * 2.5);
  const textY = -p * 30;

  // Text colour: void → white
  const textColour = p < 0.4
    ? `oklch(0.08 0.025 250 / ${textAlpha})`
    : `rgba(255,255,255,${Math.min(1, (p - 0.3) * 3)})`;
  const subtitleColour = p < 0.4
    ? `oklch(0.08 0.025 250 / ${textAlpha * 0.45})`
    : `rgba(255,255,255,${Math.min(0.6, (p - 0.3) * 2)})`;

  // Final text fade
  const headlineOpacity = p > 0.7 ? Math.max(0, 1 - (p - 0.7) * 5) : 1;

  // Overlay strength
  const overlay = 0.15 + ep * 0.3;

  return (
    <section ref={sectionRef} style={{ height: "180vh" }}>
      <div className="sticky top-0 w-full h-dvh overflow-hidden bg-surface">

        {/* Image container — starts as portrait card, expands to fill viewport */}
        <div
          className="absolute overflow-hidden"
          style={{
            // Percentage-based inset (relative to parent which is 100vw × 100dvh)
            // Start: centred card (~38% wide, ~55% tall)
            // End: full viewport (0% inset on all sides)
            top: `${22.5 * (1 - ep)}%`,
            left: `${31 * (1 - ep)}%`,
            right: `${31 * (1 - ep)}%`,
            bottom: `${22.5 * (1 - ep)}%`,
            borderRadius: `${Math.round(6 * (1 - ep))}px`,
            willChange: "top, left, right, bottom, border-radius",
          }}
        >
          {/* Current image */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.65, 0, 0.35, 1)`,
            }}
          >
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt || ""}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: `scale(${scale})` }}
              key={`cur-${currentIndex}`}
            />
          </div>

          {/* Next image */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isTransitioning ? 1 : 0,
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.65, 0, 0.35, 1)`,
            }}
          >
            <img
              src={images[nextIndex]?.src}
              alt={images[nextIndex]?.alt || ""}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: `scale(${scale})` }}
              key={`nxt-${nextIndex}`}
            />
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,${overlay}) 0%, transparent 50%, rgba(0,0,0,${overlay * 0.2}) 100%)`,
            }}
          />
        </div>

        {/* Headline — bottom-left of viewport */}
        <div
          className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 xl:p-28 pb-12 md:pb-16 lg:pb-20 pointer-events-none z-10"
          style={{
            opacity: imagesLoaded ? headlineOpacity : 0,
            transition: imagesLoaded ? "none" : "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
          }}
        >
          <h1
            className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] max-w-[680px] pr-12 md:pr-0 whitespace-pre-line"
            style={{
              color: textColour,
              transform: `translateY(${textY}px)`,
            }}
          >
            {headline}
          </h1>
          {subtitle && subtitleHref && (
            <a
              href={subtitleHref}
              className="inline-block mt-5 md:mt-6 font-sans text-[14px] tracking-[0.04em] pointer-events-auto"
              style={{
                color: subtitleColour,
                transform: `translateY(${textY}px)`,
                opacity: p > 0.6 ? Math.max(0, 1 - (p - 0.6) * 4) : 1,
              }}
            >
              {subtitle} &rarr;
            </a>
          )}
        </div>

        {/* Progress dots — bottom-right */}
        <div
          className="absolute bottom-6 md:bottom-8 right-6 md:right-12 lg:right-20 xl:right-28 flex gap-2 items-center z-10"
          style={{ opacity: Math.max(0, 1 - p * 3) * 0.7 }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              className="relative h-[2px] overflow-hidden rounded-full"
              style={{ width: i === currentIndex ? 32 : 12 }}
            >
              <div className="absolute inset-0 bg-void/15 rounded-full" />
              {i === currentIndex && (
                <div
                  className="absolute inset-y-0 left-0 bg-void/50 rounded-full"
                  style={{
                    animation: imagesLoaded ? `hero-progress ${duration}ms linear forwards` : undefined,
                  }}
                  key={`p-${currentIndex}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: Math.max(0, 0.35 - p * 2) }}
        >
          <div className="w-[1px] h-8 bg-void/20 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
}
