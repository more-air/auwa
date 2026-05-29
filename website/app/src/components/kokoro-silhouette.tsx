"use client";

/*
  KokoroSilhouette — the user's accumulating self-portrait.

  v1 placeholder: a soft tonal disc that reads as a quiet presence
  rather than a labelled rectangle. Layered glow + faint inner halo,
  with accumulated motifs sprinkled as small dots around the inner
  ring. When Rieko's silhouette art lands, the inner content is
  swapped; the outer disc and motif positioning stay.

  The dashed-ring / text-label placeholder used in v1 was reading as
  "wireframe" in every screenshot. This treatment reads as a
  considered placeholder that could plausibly be the final visual
  language during the friends-release window.

  Motifs the user has picked at onboarding land as small bright
  marks on the inner ring at deterministic positions (seeded by
  motif key, so the same Kokoro renders identically across visits).
*/

import { useMemo } from "react";

const SIZES = {
  sm: "w-24 h-24",
  md: "w-[200px] h-[200px]",
  lg: "w-[300px] h-[300px]",
} as const;

const MOTIF_DOT_SIZE: Record<keyof typeof SIZES, number> = {
  sm: 5,
  md: 7,
  lg: 9,
};

export type KokoroSilhouetteProps = {
  size?: keyof typeof SIZES;
  /** Motif keys the Kokoro carries — placed as small dots around the
   *  inner ring. The first 7 are rendered; further are deferred to
   *  emotional-weather marks (not in v1). */
  motifs?: string[];
  /** Show the soft halo around the disc. Default true for arrival,
   *  set false on the smaller archive markers. */
  halo?: boolean;
  className?: string;
};

export function KokoroSilhouette({
  size = "md",
  motifs = [],
  halo = true,
  className = "",
}: KokoroSilhouetteProps) {
  const dotPositions = useMemo(
    () => motifs.slice(0, 7).map((key, i) => motifPosition(key, i, motifs.length)),
    [motifs]
  );
  const dotSize = MOTIF_DOT_SIZE[size];

  return (
    <div className={[SIZES[size], "relative", className].join(" ")}>
      {/* Outer halo */}
      {halo ? (
        <div
          aria-hidden="true"
          className="absolute -inset-[14%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.97 0.005 250 / 0.06) 0%, oklch(0.86 0.14 95 / 0.04) 38%, transparent 70%)",
          }}
        />
      ) : null}

      {/* Disc */}
      <div
        role="img"
        aria-label={
          motifs.length > 0
            ? `Your Kokoro, carrying ${motifs.length} ${motifs.length === 1 ? "motif" : "motifs"}`
            : "Your Kokoro"
        }
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, oklch(0.32 0.018 250) 0%, oklch(0.18 0.018 250) 55%, oklch(0.10 0.020 250) 92%)",
          boxShadow:
            "0 0 0 1px oklch(0.97 0.005 250 / 0.06) inset, 0 0 24px -8px oklch(0.97 0.005 250 / 0.10)",
        }}
      >
        {/* Inner highlight */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 32% 22%, oklch(1 0 0 / 0.10) 0%, transparent 42%)",
          }}
        />

        {/* Motif marks */}
        {dotPositions.map(({ left, top }, i) => (
          <span
            key={motifs[i]}
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: dotSize,
              height: dotSize,
              marginLeft: -dotSize / 2,
              marginTop: -dotSize / 2,
              background:
                "radial-gradient(circle, oklch(0.86 0.14 95) 0%, oklch(0.70 0.10 95) 60%, transparent 100%)",
              boxShadow: "0 0 6px 0 oklch(0.86 0.14 95 / 0.40)",
              opacity: 0.85,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* Deterministic ring layout — motifs placed on a circle at 64%
   radius (inside the inner ring), evenly distributed across the
   number of motifs, with a small offset hash so each Kokoro looks
   unique even with the same motif count. */
function motifPosition(
  motifKey: string,
  index: number,
  total: number
): { left: number; top: number } {
  const radius = 32; // percent from centre
  const baseAngle = (index / Math.max(1, total)) * Math.PI * 2;
  const offset = (hash(motifKey) % 30) / 30 - 0.5; // -0.5..0.5
  const angle = baseAngle + offset * 0.25 - Math.PI / 2; // start at top
  return {
    left: 50 + Math.cos(angle) * radius,
    top: 50 + Math.sin(angle) * radius,
  };
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
