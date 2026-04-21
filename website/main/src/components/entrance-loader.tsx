"use client";

/*
  Entrance loader.

  Shows once per session. Three Noto Serif JP characters (あ う わ) fade up
  in order against a warm off-white field, hold briefly, then fade out in
  reverse order (わ first, あ last) before the overlay itself clears.

  Implementation notes:
  - All opacities are driven by React state, not CSS keyframes. Mixing a
    keyframe animation's `forwards` fill with an inline opacity override
    caused the exit transition to be ignored.
  - sessionStorage flag (set at the end) prevents the loader from running
    on subsequent navigations inside the same tab.
  - prefers-reduced-motion: reduce → the loader is skipped entirely.
*/

import { useEffect, useState } from "react";

const STORAGE_KEY = "auwa.loader-shown";

// Warm off-white pulled from the hero scene's palette. Sits between pure
// white and the hero video's #e9dcc3 beige, reading as a quieter earlier
// beat of the same world.
const LOADER_BG = "#f8f2e5";

// Timeline (all times in ms, relative to mount).
// Entry and exit share the same duration + easing so the fade-out feels as
// graceful as the fade-in. The subtle translate mirrors too: chars rise
// into place on entry, and drift upward slightly as they fade on exit.
const ENTER_DURATION = 1100;
const EXIT_DURATION = 1100;
const ENTER_STAGGER = 180; // between あ → う → わ starts
const EXIT_STAGGER = 180; // between わ → う → あ exits (reverse of entrance)
const HOLD = 140; // beat between the last char arriving and the first leaving
const OVERLAY_GAP = 40; // beat between the last char leaving and overlay fading
const OVERLAY_DURATION = 700;

// Each char moves through three explicit phases so the transform can
// differ between "below, waiting to rise" and "above, drifting away".
// Using opacity alone couldn't tell those two states apart.
type CharPhase = "initial" | "visible" | "exited";

export function EntranceLoader() {
  const [chars, setChars] = useState<CharPhase[]>([
    "initial",
    "initial",
    "initial",
  ]);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduced || alreadyShown) {
      setGone(true);
      return;
    }

    // Lock scroll while the loader is playing so the user can't interact
    // with content hidden behind it.
    document.body.style.overflow = "hidden";

    // Timeline
    const enterA = 100;
    const enterU = enterA + ENTER_STAGGER;
    const enterWa = enterA + ENTER_STAGGER * 2;
    const lastCharIn = enterWa + ENTER_DURATION; // ~1560ms

    const exitWa = lastCharIn + HOLD; // ~1700ms — reverse stagger starts
    const exitU = exitWa + EXIT_STAGGER;
    const exitA = exitWa + EXIT_STAGGER * 2;
    const lastCharOut = exitA + EXIT_DURATION; // ~2960ms

    const overlayStart = lastCharOut + OVERLAY_GAP; // ~3000ms
    const doneTime = overlayStart + OVERLAY_DURATION; // ~3700ms

    const timers: number[] = [
      window.setTimeout(
        () => setChars((c) => ["visible", c[1], c[2]]),
        enterA
      ),
      window.setTimeout(
        () => setChars((c) => [c[0], "visible", c[2]]),
        enterU
      ),
      window.setTimeout(
        () => setChars((c) => [c[0], c[1], "visible"]),
        enterWa
      ),
      window.setTimeout(
        () => setChars((c) => [c[0], c[1], "exited"]),
        exitWa
      ),
      window.setTimeout(
        () => setChars((c) => [c[0], "exited", c[2]]),
        exitU
      ),
      window.setTimeout(
        () => setChars((c) => ["exited", c[1], c[2]]),
        exitA
      ),
      window.setTimeout(() => setOverlayVisible(false), overlayStart),
      window.setTimeout(() => {
        setGone(true);
        // Set the flag only once the full animation has played — writing
        // it at the start would race against React StrictMode's double-
        // invoke of this effect (run 1 sets flag, cleanup, run 2 reads
        // flag and skips).
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.body.style.overflow = "";
      }, doneTime),
    ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  // Entry: char rises up from 10px below as it fades in.
  // Exit:  char drifts up 10px as it fades out (mirrors the entry's lift).
  // Duration + curve match on both halves so the in/out feel symmetric.
  // `will-change` + translate3d keep the element on its own compositor
  // layer so the browser composites rather than repaints on each frame —
  // avoids the "stepped / jerky" look on weaker GPUs.
  const charStyle = (phase: CharPhase): React.CSSProperties => {
    const opacity = phase === "visible" ? 1 : 0;
    const translateY =
      phase === "initial" ? 10 : phase === "exited" ? -10 : 0;
    const duration = phase === "exited" ? EXIT_DURATION : ENTER_DURATION;
    return {
      display: "inline-block",
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      willChange: "opacity, transform",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    };
  };

  return (
    <div
      aria-hidden="true"
      className="entrance-loader fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: LOADER_BG,
        opacity: overlayVisible ? 1 : 0,
        pointerEvents: overlayVisible ? "auto" : "none",
        transition: `opacity ${OVERLAY_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <div
        className="flex items-baseline text-void font-jp-serif"
        style={{
          fontSize: "clamp(3.25rem, 10.5vw, 7.5rem)",
          letterSpacing: "0.18em",
        }}
      >
        <span style={charStyle(chars[0])}>あ</span>
        <span style={charStyle(chars[1])}>う</span>
        <span style={charStyle(chars[2])}>わ</span>
      </div>
    </div>
  );
}
