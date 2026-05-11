"use client";

/*
  Store Character Carousel — ambient crossfade with Ken Burns drift.

  Six 4:5 portraits of the Auwa figure in different settings, presented
  with no visible controls. Each image holds for `HOLD_MS`, then crossfades
  to the next over `FADE_MS`. The active image breathes with a slow
  1.00 → 1.04 scale drift over its full cycle. When it stops being active,
  the scale reset is delayed by `FADE_MS` so the image holds its peak
  scale all the way through its outgoing crossfade, then snaps back to 1.0
  while invisible. Without that delayed reset, the previous version
  showed a visible "pop" right when each crossfade started.

  A 1px hairline at the bottom of the image fills slowly to mark progress
  through the visible window — the only UI signal, deliberately quiet.

  Disciplines:
  - One-shot IntersectionObserver gates the rotation start, so a returning
    visitor doesn't arrive mid-cycle.
  - Tap / click anywhere on the image advances to the next frame, forward
    only. The progress mark remounts and replays from zero, providing the
    only visible feedback. No back gesture, no dots, no arrows.
  - No hover-pause. With tap-to-advance and the progress bar already giving
    feedback and control, hover-pause was redundant — and it created a
    desktop/touch inconsistency (touch devices have no hover, so the
    behaviours diverged). Removed for cross-device consistency and brand
    voice; Aman, Aesop, Hoshinoya all let hero imagery run continuously.
  - Reduced-motion: hold the first image, no crossfade, no progress bar,
    no tap-to-advance (the page reads as a static image).

  Page-ready gate: the first image fades in once `usePageReady()` resolves
  and the image has loaded, matching the rest of the site's reveal rhythm.
*/

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { EASING } from "@/lib/motion";
import { usePageReady } from "./page-transition";

/**
 * `position` controls how each image is anchored when `object-cover`
 * crops it to the column. The Auwa figure tends to sit in the lower
 * portion of these compositions, so `"bottom"` keeps it in view when
 * the column ratio is taller than the image ratio (the common case on
 * desktop where the right column is ~50vw wide). Switch to `"center"`
 * for compositions where the focal point is closer to the middle.
 *
 * Maps to CSS `object-position` values: bottom → `50% 100%`,
 * center → `50% 50%`. Add more positions here if needed (e.g.
 * `"bottom-left"` → `"0% 100%"`).
 */
type Frame = { src: string; alt: string; position: "center" | "bottom" };

const FRAMES: Frame[] = [
  // Hand reaching in from the right; figure on the marble disc sits roughly
  // mid-frame, so `center` keeps the disc and the hand both in view.
  { src: "/store/insitu-1.jpg", alt: "Auwa figure on a marble disc, a hand reaching in to touch it", position: "center" },
  // Counter and figure in the lower portion; mirror dominates the top.
  { src: "/store/insitu-2.jpg", alt: "Auwa figure on a stone bathroom counter, in front of a mirror", position: "bottom" },
  // Figure on a wooden kitchen counter; garden visible top-right.
  { src: "/store/insitu-3.jpg", alt: "Auwa figure on a wooden kitchen counter beside a ceramic bowl and persimmon", position: "bottom" },
  // Figure inside a low vitrine; gallery wall behind extends above.
  { src: "/store/insitu-4a.jpg", alt: "Auwa figure inside a museum vitrine beside fossilised wood and minerals", position: "bottom" },
  // Figure on a wooden table; large window dominates the upper half.
  { src: "/store/insitu-5.jpg", alt: "Auwa figure on an old wooden table by a misty window, beside washi paper", position: "bottom" },
  // Four figures on a rug; plants and walls fill the upper portion.
  { src: "/store/insitu-6.jpg", alt: "Four Auwa figures gathered on a woven rug, surrounded by plants in afternoon light", position: "bottom" },
];

const POSITION_VALUE: Record<Frame["position"], string> = {
  center: "50% 50%",
  bottom: "50% 100%",
};

/** How long each image holds at full opacity before the crossfade begins. */
const HOLD_MS = 8000;
/** Crossfade duration — generous enough to read as a breath, not a flicker. */
const FADE_MS = 1800;
/** Full cycle length per image. */
const CYCLE_MS = HOLD_MS + FADE_MS;

export function StoreCharacterCarousel() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
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

  // Rotation tick. Gated on inView, !reducedMotion, and page-ready.
  useEffect(() => {
    if (!inView || reducedMotion || !firstReady) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % FRAMES.length);
      setTick((t) => t + 1);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [inView, reducedMotion, firstReady, tick]);

  const markLoaded = (i: number) =>
    setLoaded((prev) => {
      if (prev[i]) return prev;
      const next = prev.slice();
      next[i] = true;
      return next;
    });

  // Tap / click anywhere on the carousel to advance to the next frame.
  // Bumping `tick` resets the rotation timer AND remounts the progress bar
  // span (via its `key={bar-${tick}}`) so the bar replays from 0 — giving
  // the user feedback that their action registered. The new image gets its
  // full hold time.
  //
  // No back-gesture, no dots, no arrows. The page stays editorial; the
  // affordance is discovered by trying.
  const advance = () => {
    if (reducedMotion) return;
    setActive((a) => (a + 1) % FRAMES.length);
    setTick((t) => t + 1);
  };

  // Interactivity is only attached when motion is allowed. Under
  // prefers-reduced-motion the carousel is a static image (frame 1 held)
  // and shouldn't behave like a button. `cursor: pointer` is set
  // unconditionally — on touch devices it's a no-op since cursors aren't
  // rendered, on desktop it signals the tap affordance.
  const interactiveProps = reducedMotion
    ? {}
    : {
        onClick: advance,
        role: "button" as const,
        tabIndex: 0,
        "aria-label": "Show next image",
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            advance();
          }
        },
        style: { cursor: "pointer" },
      };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      {...interactiveProps}
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
                objectPosition: POSITION_VALUE[f.position],
                // Subtle Ken Burns drift on the active image: scale 1.00 →
                // 1.04 linearly over the full cycle.
                //
                // Keyed on `visible`, not `isActive`. Image 0 is active from
                // first mount (active starts at 0), so if we keyed on
                // isActive, image 0's transform would commit at scale(1.04)
                // on initial render with no preceding scale(1) value to
                // transition from — and the browser would silently skip the
                // animation. By keying on `visible` (which starts false for
                // image 0 thanks to the firstReady gate), image 0 mounts at
                // scale(1) while invisible, then transitions to scale(1.04)
                // the moment firstReady flips and the image fades in. Every
                // image now gets the zoom on its first showing.
                //
                // When an image stops being visible, the reset to scale(1)
                // is DELAYED by FADE_MS (the crossfade duration) and runs
                // with 0ms duration — the image holds its peak scale through
                // its outgoing fade, then snaps back to 1.0 silently while
                // already invisible. Without that delayed reset, the
                // previous implementation showed a visible "pop" at every
                // crossfade start.
                transform: visible && !reducedMotion ? "scale(1.04)" : "scale(1)",
                transformOrigin: "50% 50%",
                transition: reducedMotion
                  ? "none"
                  : visible
                  ? `transform ${CYCLE_MS}ms linear`
                  : `transform 0ms linear ${FADE_MS}ms`,
              }}
            />

            {/* Top scrim, baked into THIS image's wrapper so it inherits the
                same opacity gate as the image itself. Keeps the floating
                Surface-toned header legible over bright upper regions in
                some of the frames (the bathroom mirror, the kitchen
                window). Previously a separate sibling, which on slow
                networks could appear briefly over an empty surface before
                the image painted. Inheriting the wrapper's opacity makes
                that state impossible: the scrim and the image are now one
                atomic fade. Two adjacent frames' scrims compound mid-
                crossfade, but alpha compositing of the same colour
                converges to within a fraction of a percent of the single-
                scrim coverage, so the visual is identical. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklch, var(--color-yoru) 12%, transparent) 0%, color-mix(in oklch, var(--color-yoru) 6%, transparent) 50%, transparent 100%)",
              }}
            />
          </div>
        );
      })}

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
              // Animate width 0% → 100% over the cycle linearly. The `key`
              // prop change remounts the element on every tick (auto-advance
              // or tap-to-advance), so the keyframe always replays cleanly
              // from zero — no manual reset required, no need to toggle
              // animation-play-state.
              animation: `store-progress ${CYCLE_MS}ms linear`,
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
