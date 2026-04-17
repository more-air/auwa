"use client";

import { useEffect, useRef, useState } from "react";

/*
  Full-bleed AUWA face video hero.
  Mobile: portrait video at natural aspect, pinned to the bottom of the
    visible area. Beige shows above if video is shorter; if taller, the
    top is clipped (overflow-hidden on the stage).
  Desktop: landscape 16:9 video, native aspect ratio.
  Parallax zoom on scroll, chevron + "Explore" label fades on scroll.
*/

export function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Pick which video to drive based on viewport. Avoid double playback.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let currentRef = mq.matches ? mobileVideoRef : desktopVideoRef;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = currentRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    const onMqChange = () => {
      currentRef.current?.pause();
      currentRef = mq.matches ? mobileVideoRef : desktopVideoRef;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        currentRef.current?.play().catch(() => {});
      }
    };

    observer.observe(section);
    mq.addEventListener("change", onMqChange);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax zoom-in on scroll
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
      <div
        className="relative h-[100svh] md:h-auto md:aspect-[16/9] w-full overflow-hidden"
        style={{ backgroundColor: "#e9dcc3" }}
      >
        <div ref={scaleRef} className="absolute inset-0 will-change-transform">
          {/* Mobile: video fills the screen, anchored to the bottom.
              object-fit cover scales up to cover; object-position keeps
              the character visible while the top crops off. */}
          <video
            ref={mobileVideoRef}
            className="md:hidden absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
            poster="/hero/poster-auwa-portrait.jpg"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero/portrait-auwa.mp4" type="video/mp4" />
          </video>

          {/* Desktop: landscape, object-cover fills the 16:9 stage */}
          <video
            ref={desktopVideoRef}
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            poster="/hero/poster-auwa.jpg"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero/landscape-auwa.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Explore label + chevron */}
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
            <path
              d="M1 1l10 10L21 1"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
