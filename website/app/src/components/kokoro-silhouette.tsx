"use client";

/*
  KokoroSilhouette — the user's Kokoro.

  In Auwa's canon, the Kokoro takes an Auwa-shape that carries the
  user's feelings, personality, and noticed details. v1 renders this
  as the real Auwa silhouette (sized appropriately for the surface)
  with the user's accumulated motifs as small luminous marks
  floating around the inner orbit. A soft warm halo sits behind
  the character so it reads as a presence, not a sticker.

  When the user has a recent revelation, the variant matches that
  state (so the Kokoro reflects how the user was carrying
  themselves last time). With no revelation yet, the calm
  forward-facing Auwa renders.

  Motifs sit on a deterministic ring inside the halo so the same
  Kokoro renders identically across renders. Each motif is a small
  warm dot with a soft glow shadow — these are placeholder visuals;
  Rieko will deliver per-motif illustrations later.
*/

import { useMemo } from "react";
import type { YamatoState } from "@/lib/yamato";

const STATE_VARIANT: Record<YamatoState, string> = {
  hare: "/character/auwa-up.webp",
  takaburi: "/character/auwa-front-glow.webp",
  aware: "/character/auwa-down.webp",
  yuragi: "/character/auwa-left.webp",
  nagomi: "/character/auwa-right.webp",
};

const DEFAULT_VARIANT = "/character/auwa-front.webp";

const SIZES = {
  xs: { box: "w-16 h-16", halo: 14, dot: 4 },
  sm: { box: "w-24 h-24", halo: 18, dot: 5 },
  md: { box: "w-36 h-36", halo: 24, dot: 6 },
  lg: { box: "w-56 h-56", halo: 32, dot: 8 },
  xl: { box: "w-72 h-72", halo: 40, dot: 10 },
} as const;

export type KokoroSilhouetteProps = {
  size?: keyof typeof SIZES;
  /** The state to use as the Kokoro's current form. If undefined,
   *  renders the calm forward-facing variant. */
  state?: YamatoState;
  /** Motif keys the Kokoro carries (from onboarding personalisation
   *  + first-gift + accumulation). Rendered as small lights orbiting
   *  the character. */
  motifs?: string[];
  /** Render the soft warm halo behind the character. Default true. */
  halo?: boolean;
  className?: string;
};

export function KokoroSilhouette({
  size = "md",
  state,
  motifs = [],
  halo = true,
  className = "",
}: KokoroSilhouetteProps) {
  const sizeCfg = SIZES[size];
  const variant = state ? STATE_VARIANT[state] : DEFAULT_VARIANT;
  const dotPositions = useMemo(
    () => motifs.slice(0, 7).map((key, i) => motifPosition(key, i, motifs.slice(0, 7).length)),
    [motifs]
  );

  return (
    <div className={[sizeCfg.box, "relative", className].join(" ")}>
      {/* Soft warm halo behind the character. */}
      {halo ? (
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: `-${sizeCfg.halo}px`,
            background:
              "radial-gradient(circle, oklch(0.86 0.14 95 / 0.10) 0%, oklch(0.86 0.14 95 / 0.04) 38%, transparent 72%)",
          }}
        />
      ) : null}

      {/* Auwa silhouette — fills the box. The character has its own
          transparent background so it sits cleanly on cosmic. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant}
        alt={
          motifs.length > 0
            ? `Your Kokoro, carrying ${motifs.length} ${motifs.length === 1 ? "motif" : "motifs"}`
            : "Your Kokoro"
        }
        className="absolute inset-0 w-full h-full object-contain"
        decoding="async"
      />

      {/* Motif marks — small warm lights orbiting the inner ring. */}
      {dotPositions.map(({ left, top }, i) => (
        <span
          key={motifs[i]}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: sizeCfg.dot,
            height: sizeCfg.dot,
            marginLeft: -sizeCfg.dot / 2,
            marginTop: -sizeCfg.dot / 2,
            background:
              "radial-gradient(circle, oklch(0.92 0.14 95) 0%, oklch(0.75 0.12 95) 55%, transparent 100%)",
            boxShadow: `0 0 ${sizeCfg.dot}px 0 oklch(0.86 0.14 95 / 0.50)`,
            opacity: 0.92,
          }}
        />
      ))}
    </div>
  );
}

/* Position motifs on a ring orbiting just outside the character's
   bounding rectangle (the halo region). Seeded by motif key so each
   motif's slot stays consistent across renders. */
function motifPosition(
  motifKey: string,
  index: number,
  total: number
): { left: number; top: number } {
  const radius = 56; // % from centre, outside the character's body
  const baseAngle = (index / Math.max(1, total)) * Math.PI * 2;
  const offset = (hash(motifKey) % 30) / 30 - 0.5;
  const angle = baseAngle + offset * 0.3 - Math.PI / 2;
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
