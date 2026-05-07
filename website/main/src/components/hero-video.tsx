"use client";

import { useEffect, useRef, useState } from "react";
import { EASING } from "@/lib/motion";
import { HeaderTone } from "./header-tone";
import { usePageReady } from "./page-transition";

/*
  Full-bleed Auwa face video hero.
  Mobile: portrait video at natural aspect, pinned to the bottom of the
    visible area. Beige shows above if video is shorter; if taller, the
    top is clipped (overflow-hidden on the stage).
  Desktop: landscape 16:9 video, native aspect ratio.
  "Scroll" cue + breathing line fades on scroll.

  Fade-in: video + its poster fade from opacity 0 to 1 over DURATION.reveal
  (1200ms) once the first frame is ready. Matches the ImageFade timing used
  on every other hero on the site (article, teaser pages) so navigating
  between pages reads as one consistent entrance grammar.

  Scroll frost: as the user scrolls past the hero, a frosted-glass overlay
  thickens over the video — backdrop-filter blur ramps from 0 → MAX_BLUR_PX
  and a faint Surface wash ramps from 0 → MAX_TINT_ALPHA. The overlay is a
  sibling above the videos (not a filter on the videos themselves) so the
  video stays sharp underneath; what you see is the world through a window
  pane gathering frost. A radial-gradient mask softens the effect at the
  corners so the centre frosts most heavily and the edges keep more
  clarity, matching the falloff in the denomination.com reference. RAF
  lerp smoothing matches the iOS pattern described in patterns.md (direct
  per-scroll-event assignment reads as a sudden zoom on iPhone when iOS
  Safari batches scroll events around URL-bar retraction).
*/

const MAX_BLUR_PX = 28;
const MAX_TINT_ALPHA = 0.18;
// Full opacity in the centre, fading to transparent in the corners. The
// inner stop sits a long way out (60%) so most of the frame is fully
// frosted; the outer 30% fades. Tuned by eye against the denomination
// reference.
const FROST_MASK = "radial-gradient(ellipse 78% 75% at 50% 52%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)";

export function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Defer the fade-in until the page-transition wipe has settled.
  // Without this gate, the hero fades up while the transition panel is
  // still covering — by the time the panel exits, the video is already
  // at opacity 1 and reads as an abrupt "appears". Gated on ready, the
  // fade starts after the panel snaps off and the user sees the warm
  // 2000ms breath we want.
  const ready = usePageReady();
  const visible = loaded && ready;

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    // Longer than DURATION.reveal (1200ms) — hero deserves a softer
    // breath than article cards. 2000ms reads "considered" without
    // dragging.
    transition: `opacity 2000ms ${EASING.outExpo}`,
  };

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
    // Ref-gate the setState so it only fires when `scrolled` actually
    // changes (not every scroll frame). Per-frame setState with a fresh
    // value forces React to re-apply inline styles, which iOS Safari
    // re-rasterises into a visible flicker.
    const scrolledRef = { current: false };
    const onScroll = () => {
      const next = window.scrollY > 50;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-driven frost. Cache the section height on mount + resize so
  // the progress calc doesn't read live `clientHeight` on every scroll
  // event (cheaper, and stable through iOS URL-bar retraction). RAF lerp
  // toward the targets keeps the easing soft on iPhone where scroll
  // events arrive batched. Both backdrop-filter blur AND background-tint
  // alpha ramp together — neither alone reads as "frosted glass".
  useEffect(() => {
    const section = sectionRef.current;
    const frostEl = frostRef.current;
    if (!section || !frostEl) return;

    let sectionHeight = section.clientHeight || window.innerHeight;
    const measure = () => {
      sectionHeight = section.clientHeight || window.innerHeight;
    };

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = 0;

    const apply = (p: number) => {
      const blur = p * MAX_BLUR_PX;
      const alpha = p * MAX_TINT_ALPHA;
      // Setting both blur and saturate gives the frost a hint of life;
      // pure blur alone reads as out-of-focus.
      frostEl.style.backdropFilter = `blur(${blur.toFixed(2)}px) saturate(1.05)`;
      // Vendor prefix for older Safari builds. webkitBackdropFilter is
      // typed on CSSStyleDeclaration but TypeScript is conservative; cast
      // to the indexed form to set it without a type error.
      (frostEl.style as CSSStyleDeclaration & Record<string, string>)["webkitBackdropFilter"] = `blur(${blur.toFixed(2)}px) saturate(1.05)`;
      frostEl.style.backgroundColor = `rgba(248, 247, 244, ${alpha.toFixed(3)})`;
    };

    const tick = () => {
      const diff = targetProgress - currentProgress;
      // Lerp factor 0.16 lands the frost in ~180ms after a scroll burst.
      if (Math.abs(diff) > 0.001) {
        currentProgress += diff * 0.16;
        apply(currentProgress);
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        apply(currentProgress);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onScroll = () => {
      targetProgress = Math.min(1, Math.max(0, window.scrollY / sectionHeight));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    onScroll();
    apply(0);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Trigger the fade on mount. The video has preload="metadata" so
  // `loadeddata` only fires once data starts downloading (after play()
  // is called) — if we wait for that event, the fade can stay at
  // opacity 0 for seconds. The poster image renders immediately with
  // the element anyway, so we can start the fade as soon as the
  // component mounts. One frame delay via rAF ensures the first paint
  // captures opacity 0 before the transition begins.
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 z-0">
      <div
        className="relative h-[100svh] w-full overflow-hidden bg-surface"
      >
        {/* Header tone sentinel — full-bleed photographic hero, both
            sides of the floating header sit on imagery. */}
        <HeaderTone tone="surface" />
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
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            ...fadeStyle,
          }}
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
          style={fadeStyle}
          poster="/hero/poster-auwa.jpg"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/hero/landscape-auwa.mp4" type="video/mp4" />
        </video>

        {/* Frosted-glass overlay. Sits between the videos and the top
            gradient / Scroll cue. backdrop-filter applies to whatever's
            painted behind this element — the videos. Mask creates the
            edge falloff so the centre frosts most heavily and the
            corners keep clarity, matching the denomination.com
            reference. pointer-events-none so clicks pass through to the
            Scroll button below. will-change hints the compositor to
            keep this on its own layer. */}
        <div
          ref={frostRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            willChange: "backdrop-filter, background-color",
            maskImage: FROST_MASK,
            WebkitMaskImage: FROST_MASK,
          }}
        />

        {/* Subtle gradient from top — fades in with the video so the
            scrim doesn't sit alone over the warm-paper bg before the
            video paints. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black/15 to-transparent z-[5]"
          style={fadeStyle}
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
            // Stop sooner — leave breathing room above the intro so
            // the white area doesn't run flush against the wordmark.
            // 200px (md+) places the intro well below the floating
            // logo area; 140px on mobile keeps it tasteful.
            const stopGap = window.matchMedia("(min-width: 768px)").matches
              ? 200
              : 140;
            const targetY = Math.max(
              0,
              intro.getBoundingClientRect().top + window.scrollY - stopGap
            );
            // Custom rAF scroll — the native behavior:"smooth" is
            // implementation-defined and reads abrupt on Safari.
            // 1400ms expo.inOut matches the page-transition pace.
            const startY = window.scrollY;
            const distance = targetY - startY;
            if (Math.abs(distance) < 4) return;
            const duration = 1400;
            const startTime = performance.now();
            const ease = (t: number) =>
              t < 0.5
                ? 8 * t * t * t * t
                : 1 - Math.pow(-2 * t + 2, 4) / 2; // expo.inOut-ish
            const step = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(1, elapsed / duration);
              window.scrollTo(0, startY + distance * ease(t));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }}
          aria-label="Scroll to introduction"
          className="group absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2"
          style={{
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? "none" : "auto",
            transition: "opacity 0.7s ease-out",
          }}
        >
          <span className="relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-surface">
            <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
              Scroll
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
            >
              Scroll
            </span>
          </span>
          <span
            aria-hidden="true"
            className="scroll-cue-line block w-px h-8 md:h-10 bg-surface/70 origin-top"
          />
        </button>
      </div>
    </section>
  );
}
