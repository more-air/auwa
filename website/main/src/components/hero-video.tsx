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
  const [pressed, setPressed] = useState(false);

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
        className="relative h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: "#e9dcc3" }}
        onPointerDown={(e) => {
          // Ignore clicks that originate from the scroll cue button — we
          // don't want the whole stage to swell when the user taps the
          // bottom-centre CTA.
          if ((e.target as HTMLElement).closest("button")) return;
          setPressed(true);
        }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
      >
        <div
          ref={scaleRef}
          className="absolute inset-0 will-change-transform"
          style={{
            // Press response — a very subtle swell + saturation lift that
            // makes the AUWA face feel alive to touch. Stacks on top of the
            // parallax scroll transform which is applied directly to
            // scaleEl.style.transform by the scroll handler.
            filter: pressed ? "saturate(1.25)" : "saturate(1)",
            transition: "filter 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Mobile: video fills the screen, anchored to the bottom.
              object-fit cover scales up to cover; object-position keeps
              the character visible while the top crops off. */}
          {/*
            Only the video matching the current viewport preloads its bytes.
            The other one still downloads its poster frame for instant
            first-paint on orientation / window resize, but defers the ~2MB
            video payload until it actually needs to play.
          */}
          <video
            ref={mobileVideoRef}
            className="md:hidden absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
            poster="/hero/poster-auwa-portrait.jpg"
            loop
            muted
            playsInline
            preload="metadata"
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
            preload="metadata"
          >
            <source src="/hero/landscape-auwa.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Subtle gradient from top — keeps the white header legible over the video */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black/15 to-transparent z-[5]"
        />

        {/* Explore label + breathing line — tappable, scrolls to intro.
            A longer Lenis scroll (2.4s) gives the intro's character-by-
            character fade time to play under the viewer's gaze rather than
            arriving with the reveal already underway.
            The bouncing chevron was replaced with a thin vertical line that
            slowly breathes — reads as quieter and more authored than the
            default bounce. */}
        <button
          type="button"
          onClick={() => {
            const intro = document.getElementById("intro");
            if (!intro) return;
            const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 80 : 64;
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number; duration?: number }) => void } }).__lenis;
            if (lenis) {
              lenis.scrollTo(intro, { offset: -headerOffset, duration: 2.4 });
            } else {
              const y = intro.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
            }
          }}
          aria-label="Scroll to introduction"
          className="group absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2"
          style={{
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? "none" : "auto",
            transition: "opacity 0.7s ease-out",
          }}
        >
          <span className="relative inline-flex overflow-hidden font-sans text-[12px] md:text-[13px] tracking-[0.26em] uppercase text-white">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
              Scroll
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
            >
              Scroll
            </span>
          </span>
          <span
            aria-hidden="true"
            className="scroll-cue-line block w-px h-8 md:h-10 bg-white/70 origin-top"
          />
        </button>
      </div>
    </section>
  );
}
