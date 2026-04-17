"use client";

import { useEffect, useRef, useState } from "react";

/*
  Full-bleed AUWA face video hero, variant 2.
  Differences from hero-video-intro.tsx:
  - "Explore" label is larger and clearer on both mobile and desktop
  - Chevron (v-shape) below the label instead of the down-arrow
  - Mobile fills the viewport height (svh) rather than a square crop,
    with the Explore + chevron shown on mobile too
  - Square -> landscape responsive behaviour preserved for desktop
*/

export function HeroVideoIntroV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Preload poster; avoids brief grey flash by waiting until image is ready
  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterLoaded(true);
    img.src = "/hero/poster-auwa.jpg";
    if (img.complete) setPosterLoaded(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const scaleEl = scaleRef.current;
    if (!section || !scaleEl) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        const scale = 1 + progress * 0.06;
        scaleEl.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="-mt-16 md:-mt-20">
      <div className="relative h-[100svh] md:h-auto md:aspect-[16/9] w-full overflow-hidden" style={{ backgroundColor: "#e9dcc3" }}>
        <div ref={scaleRef} className="absolute inset-0 will-change-transform">
          <img
            src="/hero/poster-auwa.jpg"
            alt="AUWA"
            onLoad={() => setPosterLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: playing ? 0 : posterLoaded ? 1 : 0,
              transition: "opacity 1.2s ease-out",
            }}
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            poster="/hero/poster-auwa.jpg"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero/landscape-auwa.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Explore label + chevron (both mobile and desktop) */}
        <div
          className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 md:gap-4"
          style={{
            opacity: scrolled ? 0 : 1,
            transition: "opacity 0.7s ease-out",
          }}
        >
          <span className="font-sans text-[13px] md:text-[14px] tracking-[0.22em] uppercase text-white">
            Explore
          </span>
          <svg
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            className="text-white animate-bounce"
            aria-hidden="true"
          >
            <path d="M1 1l10 10L21 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
