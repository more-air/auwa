"use client";

/*
  Orb — Auwa's presence before the character appears.

  Constant subtle anchor on every surface. Two concentric layers
  (outer halo + core glow) breathe in opposing phase via CSS
  animations declared in globals.css. No React state, no rAF.

  Sizes:
    xs  — 24px. Inline next to header titles.
    sm  — 32px. Top-of-surface anchors.
    md  — 56px. Arrival, refining.
    lg  — 112px. First-gift beat, sanctuary, senshin closure.
    xl  — 200px. Welcome, pre-shower moments.

  `still` halts the breath at full glow — used during the light
  shower's bloom phase where the orb scales but does not breathe.
*/

const SIZES = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-14 h-14",
  lg: "w-28 h-28",
  xl: "w-[200px] h-[200px]",
} as const;

export type OrbProps = {
  size?: keyof typeof SIZES;
  /** Hold the orb at full glow without breathing. */
  still?: boolean;
  className?: string;
};

export function Orb({ size = "md", still = false, className = "" }: OrbProps) {
  return (
    <div
      aria-hidden="true"
      className={["relative pointer-events-none", SIZES[size], className].join(" ")}
    >
      {/* Outer halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-glow) 0%, var(--color-glow-dim) 35%, transparent 70%)",
          opacity: still ? 0.85 : undefined,
          animation: still
            ? "none"
            : "auwa-orb-breath var(--duration-orb-breath) ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />
      {/* Core */}
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, oklch(0.98 0.04 95) 0%, var(--color-glow) 40%, var(--color-glow-dim) 90%, transparent 100%)",
          opacity: still ? 1 : undefined,
          animation: still
            ? "none"
            : "auwa-orb-core var(--duration-orb-breath) ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />
    </div>
  );
}
