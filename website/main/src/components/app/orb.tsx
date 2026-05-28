"use client";

/*
  Orb — Auwa's presence before the character appears.

  A small breathing glow that anchors every app surface (arrival,
  sanctuary, senshin, the letter, the first-gift beat). The orb is
  Auwa's constant presence; the five character variants are how
  Auwa appears in a particular state.

  Implementation: a circle with a radial-gradient soft halo, scaled
  and opacity-pulsed on `--duration-orb-breath`. Pure CSS animation,
  no React state, no rAF — the orb breathes whether anything else
  is happening or not.

  Sizes:
    sm  — 32px. Quiet entry markers, header presence.
    md  — 64px. Arrival anchor above the state arc.
    lg  — 128px. First-gift beat, sanctuary, senshin closure.
    xl  — 220px. Welcome, paused / pre-shower moments.

  Placeholder note: the orb itself is brand-canonical (already on the
  teaser page) — this component is the real implementation, not a
  placeholder. Rieko's character variants are the placeholders.
*/

const SIZES = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-32 h-32",
  xl: "w-[220px] h-[220px]",
} as const;

export type OrbProps = {
  size?: keyof typeof SIZES;
  className?: string;
  /** Hold the orb at full glow without breathing — used during the
   *  light shower's bloom phase. Default false. */
  still?: boolean;
};

export function Orb({ size = "md", className = "", still = false }: OrbProps) {
  return (
    <div
      className={[
        SIZES[size],
        "relative pointer-events-none",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Outer halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-glow) 0%, transparent 65%)",
          opacity: 0.55,
          animation: still
            ? "none"
            : "auwa-orb-breath var(--duration-orb-breath) ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />
      {/* Core glow */}
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-glow) 0%, var(--color-glow-dim) 70%, transparent 100%)",
          opacity: 0.85,
          animation: still
            ? "none"
            : "auwa-orb-core var(--duration-orb-breath) ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />
      {/* Local keyframes — declared inline so the orb component is
          self-contained. globals.css doesn't need to know about it. */}
      <style>{`
        @keyframes auwa-orb-breath {
          0%, 100% { transform: scale(0.94); opacity: 0.45; }
          50%      { transform: scale(1.06); opacity: 0.75; }
        }
        @keyframes auwa-orb-core {
          0%, 100% { transform: scale(0.96); opacity: 0.7; }
          50%      { transform: scale(1.04); opacity: 1;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
