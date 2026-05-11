"use client";

/*
  Store Character Carousel — ambient crossfade with Ken Burns drift.

  Six 4:5 portraits of the Auwa figure in different settings, presented
  with no visible controls. Each image holds for `HOLD_MS`, then crossfades
  to the next over `FADE_MS`. The active image breathes with a slow
  scale drift (1.0 → 1.04) over its visible window so each "frame" has a
  cinematic feel without ever feeling animated. A 1px hairline at the
  bottom of the image fills slowly to mark progress through the visible
  window — the only UI signal, deliberately quiet.

  Disciplines (match `EditorialFrames`):
  - One-shot IntersectionObserver gates the rotation start, so a returning
    visitor doesn't arrive mid-cycle.
  - Pause on hover (desktop).
  - Reduced-motion: hold the first image, no crossfade, no progress bar,
    no scale.

  Page-ready gate: the first image fades in once `usePageReady()` resolves
  and the image has loaded, matching the rest of the site's reveal rhythm.
*/

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EASING } from "@/lib/motion";
import { usePageReady } from "./page-transition";

type Frame = { src: string; alt: string };

const FRAMES: Frame[] = [
  { src: "/store/insitu-1.jpg", alt: "Auwa figure on a marble disc, a hand reaching in to touch it" },
  { src: "/store/insitu-2.jpg", alt: "Auwa figure on a stone bathroom counter, in front of a mirror" },
  { src: "/store/insitu-3.jpg", alt: "Auwa figure on a wooden kitchen counter beside a ceramic bowl and persimmon" },
  { src: "/store/insitu-4a.jpg", alt: "Auwa figure inside a museum vitrine beside fossilised wood and minerals" },
  { src: "/store/insitu-5.jpg", alt: "Auwa figure on an old wooden table by a misty window, beside washi paper" },
  { src: "/store/insitu-6.jpg", alt: "Four Auwa figures gathered on a woven rug, surrounded by plants in afternoon light" },
];

/** How long each image holds at full opacity before the crossfade begins. */
const HOLD_MS = 8000;
/** Crossfade duration — generous enough to read as a breath, not a flicker. */
const FADE_MS = 1800;
/** Full cycle length per image. */
const CYCLE_MS = HOLD_MS + FADE_MS;

export function StoreCharacterCarousel() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(() => FRAMES.map(() => false));
  const containerRef = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const firstReady = ready && loaded[0];

  // Detect prefers-reduced-motion. Hold image 1, no animation.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // One-shot IntersectionObserver — only start rotating once the module is
  // actually visible (cheap insurance against the page being open in a
  // background tab for minutes before a visitor finds it).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rotation tick. Gated on inView, !paused, !reducedMotion, and page-ready.
  useEffect(() => {
    if (!inView || paused || reducedMotion || !firstReady) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % FRAMES.length);
      setTick((t) => t + 1);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [inView, paused, reducedMotion, firstReady, tick]);

  const markLoaded = (i: number) =>
    setLoaded((prev) => {
      if (prev[i]) return prev;
      const next = prev.slice();
      next[i] = true;
      return next;
    });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {FRAMES.map((f, i) => {
        const isActive = i === active;
        const isLoaded = loaded[i];
        // The reveal gate: image 0 waits for page-ready + onLoad; subsequent
        // images just wait for their own onLoad. Without this, a slow-to-load
        // frame would flash in mid-cycle as a hard cut.
        const visible = isActive && (i === 0 ? firstReady : isLoaded);
        return (
          <div
            key={i}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ${EASING.inOut}`,
            }}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={95}
              priority={i === 0}
              onLoad={() => markLoaded(i)}
              className="object-cover"
              style={{
                // Ken Burns drift. The active image scales from 1.0 → 1.04
                // over its full visible window (hold + fade). The inactive
                // images snap back to 1.0 with no transition, so they re-arm
                // for their next turn without a visible reset.
                transform: isActive ? "scale(1.04)" : "scale(1)",
                transformOrigin: "50% 50%",
                transition: isActive
                  ? `transform ${CYCLE_MS}ms linear`
                  : "none",
              }}
            />
          </div>
        );
      })}

      {/* Top scrim — matches the previous static image, keeps the floating
          Surface-toned header legible over bright upper regions in some of
          the frames (the bathroom mirror, the kitchen window). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--color-yoru) 12%, transparent) 0%, color-mix(in oklch, var(--color-yoru) 6%, transparent) 50%, transparent 100%)",
          opacity: firstReady ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ${EASING.inOut}`,
        }}
      />

      {/* Hairline progress mark. A 1px line at the bottom of the frame,
          filling left → right over the visible window. The inner span is
          keyed on `tick` so it remounts on every cycle and replays its
          width transition cleanly — no manual reset required.

          Hidden under reduced-motion (nothing's moving, so a progress bar
          would just sit half-filled and look broken) and until the first
          image is ready (no point indicating progress before there's
          anything to look at). */}
      {!reducedMotion && firstReady && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ backgroundColor: "color-mix(in oklch, var(--color-surface) 25%, transparent)" }}
        >
          <span
            key={`bar-${tick}`}
            className="absolute inset-y-0 left-0 bg-surface"
            style={{
              width: paused ? "var(--paused-width, 100%)" : "100%",
              // Start at 0% (key change remounts the element), animate to
              // 100% over the cycle duration linearly. Pause on hover by
              // freezing the animation via `animation-play-state` would be
              // cleaner but transitions don't support pause; instead we
              // run the timeline through and accept that hover-pause holds
              // the bar at its current position naturally (the transition
              // continues to its end, but the rotation is paused so the
              // bar's full width stays in sync with the held image).
              animation: `store-progress ${CYCLE_MS}ms linear`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
          <style>{`
            @keyframes store-progress {
              from { width: 0%; }
              to   { width: 100%; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
