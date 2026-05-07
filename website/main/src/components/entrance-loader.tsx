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
import { EASING } from "@/lib/motion";

const STORAGE_KEY = "auwa.loader-shown";

// Pulls from --color-surface so the loader, the page, the hero pre-
// paint, and the email body always share one warm off-white. Change
// the token in globals.css; everything else follows.
const LOADER_BG = "var(--color-surface)";

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
// Overlay fade tuned long and symmetric so the warm field drains through
// the hero rather than lifts off it — feels like dawn rising, not a
// curtain pulled back. Uses an ease-in-out curve (not the brand ease-out-
// expo) so the first and last moments of the fade are equally gentle.
const OVERLAY_DURATION = 1800;
const OVERLAY_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

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
    // with content hidden behind it. Use a wheel/touch event listener
    // (preventDefault on non-passive listeners) instead of toggling
    // body.style.overflow — toggling overflow forces the browser to
    // re-anchor sticky elements when overflow changes, and that re-anchor
    // is what produced the velocity-dependent first-scroll wobble on the
    // homepage's sticky hero after the loader unmounted (May 2026). With
    // event-based locking the scroll container never changes.
    const blockScroll = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      // Space, PageUp, PageDown, End, Home, Arrow keys — common scroll keys.
      if ([" ", "PageUp", "PageDown", "End", "Home", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys);

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
        window.removeEventListener("wheel", blockScroll);
        window.removeEventListener("touchmove", blockScroll);
        window.removeEventListener("keydown", blockKeys);
      }, doneTime),
    ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeys);
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
      transition: `opacity ${duration}ms ${EASING.outExpo}, transform ${duration}ms ${EASING.outExpo}`,
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
        transition: `opacity ${OVERLAY_DURATION}ms ${OVERLAY_EASING}`,
      }}
    >
      <div
        // Characters sit at 80% of text-sumi rather than 100%. Full
        // strength felt stamped onto the warm cream field; at /80 they
        // read as part of the scene and match the Aesop/Aman restraint
        // the rest of the brand is tuned to.
        className="flex items-baseline text-sumi/80 font-jp-serif"
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
