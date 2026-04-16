"use client";

import { useEffect, useRef, useState } from "react";

/*
  Full-bleed AUWA face video hero.
  Edge-to-edge, sits under the header (header has transparent bg over this).
  Square crop on mobile, 16:9 on desktop.
  Subtle parallax scale on scroll.
  Text overlay and gradient currently disabled for visual testing.
*/

export function HeroVideoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showText, setShowText] = useState(false);

  // Auto-play video when visible
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

  // Show text (mobile) and scroll indicator after delays
  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 800);
    const scrollTimer = setTimeout(() => setShowScroll(true), 2000);
    return () => { clearTimeout(textTimer); clearTimeout(scrollTimer); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax: slow upward drift + gentle zoom as user scrolls away
  useEffect(() => {
    const section = sectionRef.current;
    const scaleEl = scaleRef.current;
    if (!section || !scaleEl) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        // Progress 0 = section top at viewport top, 1 = section fully scrolled past
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        // Gentle zoom in as you scroll past (always covers container, no gaps)
        const scale = 1 + progress * 0.06;
        scaleEl.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Set initial state
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="-mt-16 md:-mt-20"
    >
      <div className="relative aspect-square md:aspect-[16/9] w-full overflow-hidden bg-surface-raised">
        <div ref={scaleRef} className="absolute inset-0 will-change-transform">
          <img
            src="/hero/poster-auwa.jpg"
            alt="AUWA"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
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

        {/* Scroll indicator (desktop only) — fades in after delay, fades out on scroll */}
        <div
          className={`absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 transition-opacity duration-700 ${
            showScroll && !scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-white">
            Scroll
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-bounce text-white">
            <path d="M8 3v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
