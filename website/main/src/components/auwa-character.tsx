"use client";

import { useEffect, useRef, useState } from "react";

/*
  Auwa character — the delight moment.

  Auwa holds her position and scale completely still. The only motion
  comes from variant image swaps, organised into two stacked slots:

  • Slot 1 (calm) — always at opacity 1. Renders the five calm
    directional variants (front / up / down / left / right) as
    siblings. The active direction sits at opacity 1, the four
    inactive at opacity 0.001 (high enough that the browser keeps
    each rendered at the display size, so the bitmap stays decoded
    and direction swaps cost nothing).
  • Slot 2 (glow) — the wrapper's opacity transitions over
    GLOW_FADE_MS for the symmetric tap-on / tap-off candle fade.
    Renders the five glow variants the same way: active glow at
    opacity 1, others at 0.001.

  Both slots live inside a "mover" that translates softly toward
  the cursor on a rAF lerp, so Auwa leans toward the visitor as
  they hover. The button wrapper has overflow:visible — the soft
  halo painted into each variant must never be clipped by Auwa's
  own layout box, since the page should read as if she is sitting
  on the canvas, not pasted into a frame.

  Direction swaps inside either slot are an instant opacity flip on
  the inner imgs (no transition). The glow toggle is a single slot-
  level opacity transition, so direction changes during a glow on
  don't compound transitions or cause alpha dimming. Because every
  variant <img> is mounted at full size at all times, no first-time
  decode happens during interaction — the user can play with all ten
  variants from frame one without flicker.
*/

export type AuwaGlowVariants = {
  front?: string;
  up?: string;
  down?: string;
  left?: string;
  right?: string;
};

interface AuwaCharacterProps {
  /** Default forward-facing image. */
  src: string;
  alt: string;
  /**
   * Optional directional + tap variants. `glow` is a per-direction
   * map: tapping Auwa while looking left plays `glow.left`, with a
   * fallback to `glow.front`.
   */
  variants?: {
    up?: string;
    down?: string;
    left?: string;
    right?: string;
    glow?: AuwaGlowVariants;
  };
}

type Direction = "idle" | "up" | "down" | "left" | "right";
type CalmKey = "front" | "up" | "down" | "left" | "right";
type GlowKey = "front-glow" | "up-glow" | "down-glow" | "left-glow" | "right-glow";

const GLOW_FADE_MS = 520;
// Inactive variants render at this near-zero opacity to keep their
// decoded bitmaps hot in the browser cache without contributing
// visibly to the composite. Five layers × 0.001 ≈ 0.5% accumulated
// — undetectable.
const PRELOAD_OPACITY = 0.001;
// Maximum pixels of cursor lean. Small enough that Auwa reads as
// gently turning toward the visitor rather than chasing the cursor.
const FOLLOW_X = 16;
const FOLLOW_Y = 10;
// Maximum degrees of body tilt — rotates with the horizontal lean,
// so cursor in top-right gives a slight right tilt, bottom-left a
// slight left tilt, and pure-vertical positions stay upright.
const TILT_MAX = 4;

export function AuwaCharacter({ src, alt, variants = {} }: AuwaCharacterProps) {
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [direction, setDirection] = useState<Direction>("idle");
  const [glowing, setGlowing] = useState(false);

  // Detect pointer + reduced motion. Direction tracking + cursor
  // follow only run on a fine pointer (mice / trackpads); touch
  // devices stay idle.
  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setHasFinePointer(fineMq.matches && !reducedMq.matches);
    update();
    fineMq.addEventListener("change", update);
    reducedMq.addEventListener("change", update);
    return () => {
      fineMq.removeEventListener("change", update);
      reducedMq.removeEventListener("change", update);
    };
  }, []);

  // Single mousemove handler driving both:
  //   - direction state (with hysteresis), used to swap the active
  //     variant on each slot;
  //   - the rAF lerped translate applied to the mover wrapper, so
  //     Auwa leans softly toward the cursor.
  useEffect(() => {
    if (!hasFinePointer) {
      setDirection("idle");
      // Reset translate when fine pointer is no longer available.
      if (moverRef.current) moverRef.current.style.transform = "";
      return;
    }
    const wrapper = wrapperRef.current;
    const mover = moverRef.current;
    if (!wrapper || !mover) return;

    // Lerp state.
    let cx = 0;
    let cy = 0; // current
    let tx = 0;
    let ty = 0; // target
    let lastDirection: Direction = "idle";
    let raf = 0;
    let active = true;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      // Direction (with hysteresis).
      const next = resolveDirection(dx, dy, lastDirection);
      if (next !== lastDirection) {
        lastDirection = next;
        setDirection(next);
      }

      // Translate target — pure direction, no distance falloff. Auwa
      // leans toward the cursor at full strength whenever it's
      // anywhere on the page, matching the eye-direction tracking
      // which also has no distance limit. The lerp on `cx` / `cy`
      // smooths out any sudden cursor jumps.
      const distance = Math.hypot(dx, dy);
      const nx = distance === 0 ? 0 : dx / distance;
      const ny = distance === 0 ? 0 : dy / distance;
      tx = nx * FOLLOW_X;
      ty = ny * FOLLOW_Y;
    };

    const onLeave = () => {
      if (lastDirection !== "idle") {
        lastDirection = "idle";
        setDirection("idle");
      }
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      if (!active) return;
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      // Tilt scales with the lerped horizontal lean: cx / FOLLOW_X
      // is in [-1, 1] when the lean is at full strength, so the
      // tilt clamps to ±TILT_MAX and stays in sync with the body
      // motion. Pure-vertical positions (cx ≈ 0) stay upright.
      const tilt = (cx / FOLLOW_X) * TILT_MAX;
      mover.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [hasFinePointer]);

  // Calm and glow slot variant lists. Filter out missing variants up
  // front so we don't render empty <img>s.
  const calmLayers: { key: CalmKey; src: string }[] = [
    { key: "front", src },
    ...(variants.up ? ([{ key: "up", src: variants.up }] as const) : []),
    ...(variants.down ? ([{ key: "down", src: variants.down }] as const) : []),
    ...(variants.left ? ([{ key: "left", src: variants.left }] as const) : []),
    ...(variants.right ? ([{ key: "right", src: variants.right }] as const) : []),
  ];
  const glow = variants.glow ?? {};
  const glowLayers: { key: GlowKey; src: string }[] = [];
  if (glow.front) glowLayers.push({ key: "front-glow", src: glow.front });
  if (glow.up) glowLayers.push({ key: "up-glow", src: glow.up });
  if (glow.down) glowLayers.push({ key: "down-glow", src: glow.down });
  if (glow.left) glowLayers.push({ key: "left-glow", src: glow.left });
  if (glow.right) glowLayers.push({ key: "right-glow", src: glow.right });
  const hasCalmFor = (k: CalmKey) => calmLayers.some((l) => l.key === k);
  const hasGlowFor = (k: GlowKey) => glowLayers.some((l) => l.key === k);

  // Active calm direction.
  let bottomKey: CalmKey = "front";
  if (direction === "up" && hasCalmFor("up")) bottomKey = "up";
  else if (direction === "down" && hasCalmFor("down")) bottomKey = "down";
  else if (direction === "left" && hasCalmFor("left")) bottomKey = "left";
  else if (direction === "right" && hasCalmFor("right")) bottomKey = "right";

  // Active glow variant — falls back to front-glow if the matching
  // direction-glow isn't provided.
  const desiredGlowKey = `${bottomKey}-glow` as GlowKey;
  const topKey: GlowKey | null = hasGlowFor(desiredGlowKey)
    ? desiredGlowKey
    : hasGlowFor("front-glow")
      ? "front-glow"
      : null;

  const hasGlow = glowLayers.length > 0;
  const showGlow = glowing && topKey !== null;

  const calmAlt = (k: CalmKey) => (k === "front" ? alt : `${alt} (${k})`);
  const glowAlt = (k: GlowKey) => `${alt} (${k})`;

  return (
    <button
      ref={wrapperRef}
      type="button"
      onClick={() => {
        if (hasGlow) setGlowing((g) => !g);
      }}
      aria-label={alt}
      aria-pressed={hasGlow ? glowing : undefined}
      // Cursor label reads this attribute (see <CursorLabel />). Shows
      // "GLOW" while Auwa is calm; "DIM" once she's lit so the
      // visitor knows tapping again will turn the light back down.
      data-cursor={hasGlow ? (glowing ? "Dim" : "Glow") : undefined}
      // overflow:visible (no `overflow-hidden`) — the soft halo of
      // each glow variant must never be clipped by the layout box,
      // and the cursor-lean translation can take Auwa a few px past
      // the box edge.
      className="relative w-full aspect-square cursor-pointer focus:outline-none focus-visible:outline-none bg-transparent border-0 p-0"
    >
      {/* Mover — receives the lerped cursor-follow translate. Both
          slots live inside it so the calm and glow layers move as
          one character. */}
      <div
        ref={moverRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {/* Slot 1 — calm direction variants. Always opacity 1. */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {calmLayers.map((layer) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={layer.key}
              src={layer.src}
              alt={layer.key === bottomKey ? calmAlt(layer.key) : ""}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: layer.key === bottomKey ? 1 : PRELOAD_OPACITY,
                pointerEvents: "none",
              }}
              decoding="sync"
            />
          ))}
        </div>

        {/* Slot 2 — glow variants. Wrapper opacity transitions for
            the symmetric on / off candle fade; the inner imgs swap
            direction instantly via opacity flip. */}
        {hasGlow && (
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              opacity: showGlow ? 1 : 0,
              transition: `opacity ${GLOW_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: "opacity",
            }}
          >
            {glowLayers.map((layer) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={layer.key}
                src={layer.src}
                alt={layer.key === topKey ? glowAlt(layer.key) : ""}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  opacity: layer.key === topKey ? 1 : PRELOAD_OPACITY,
                  pointerEvents: "none",
                }}
                decoding="sync"
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

/* Map the cursor offset to one of four cardinal directions.
   - Deadzone radius around the centre keeps Auwa idle for cursors
     near the character, with hysteresis: 60px to enter idle, 30px
     to leave, so a cursor sitting on the edge doesn't twitch.
   - Up/down only when the cursor is clearly vertical (1.5× ratio
     normally, 1.0× while already up/down — same stickiness keeps
     her looking up if you wobble back and forth a little).
   - Everything else past the deadzone — including all four
     diagonal corners — falls to left or right based on the sign of
     dx. Auwa biases toward left/right because we have left/right
     variants but no diagonals; this keeps her looking somewhere
     reasonable instead of snapping back to front whenever the
     cursor strays into a corner. */
function resolveDirection(dx: number, dy: number, current: Direction): Direction {
  const magnitude = Math.hypot(dx, dy);
  if (current === "idle") {
    if (magnitude < 60) return "idle";
  } else {
    if (magnitude < 30) return "idle";
  }
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const verticalRatio = current === "up" || current === "down" ? 1.0 : 1.5;
  if (absDy > absDx * verticalRatio) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
}
