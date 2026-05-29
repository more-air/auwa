"use client";

/*
  AuwaCharacter — the real Auwa silhouette, in its five Yamato
  variants. Used inside the state picker cards on Arrival, inside
  the Revelation hero, and anywhere a single state needs to be
  embodied.

  Asset mapping (sourced from /book/character — the canonical Auwa
  established in the book and on the website):

    Hare      (Radiant)      up         + up-glow
    Takaburi  (Intense)      front      + front-glow
    Aware     (Reflective)   down       + down-glow
    Yuragi    (Unsettled)    left       + left-glow
    Nagomi    (Serene)       right      + right-glow

  When Rieko delivers definitive state-specific variants, drop them
  into /public/character/ with the same filenames or update the
  mapping. Consumers (StateCard, KokoroSilhouette, RevelationScreen)
  don't change.

  The `active` prop controls calm vs glow. Default false renders the
  calm variant; true cross-fades to the glow variant. The cross-fade
  duration matches the brand's candle-warmth easing.
*/

import type { YamatoState } from "@/lib/yamato";

const VARIANT: Record<YamatoState, { calm: string; glow: string }> = {
  hare: {
    calm: "/character/auwa-up.webp",
    glow: "/character/auwa-up-glow.webp",
  },
  takaburi: {
    calm: "/character/auwa-front.webp",
    glow: "/character/auwa-front-glow.webp",
  },
  aware: {
    calm: "/character/auwa-down.webp",
    glow: "/character/auwa-down-glow.webp",
  },
  yuragi: {
    calm: "/character/auwa-left.webp",
    glow: "/character/auwa-left-glow.webp",
  },
  nagomi: {
    calm: "/character/auwa-right.webp",
    glow: "/character/auwa-right-glow.webp",
  },
};

const SIZES = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
  xxl: "w-64 h-64",
} as const;

export type AuwaCharacterProps = {
  state: YamatoState;
  size?: keyof typeof SIZES;
  /** Show the glow variant when true (selected / focused / active). */
  active?: boolean;
  className?: string;
};

export function AuwaCharacter({
  state,
  size = "md",
  active = false,
  className = "",
}: AuwaCharacterProps) {
  const variant = VARIANT[state];
  return (
    <div
      role="img"
      aria-label={`Auwa, ${state}`}
      className={[
        "relative pointer-events-none",
        SIZES[size],
        className,
      ].join(" ")}
    >
      {/* Calm variant — always rendered, opacity-modulated. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant.calm}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[520ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ opacity: active ? 0 : 1 }}
        decoding="async"
      />
      {/* Glow variant — opacity-modulated. Both layers stay mounted so
          the cross-fade is seamless and the bitmap stays decoded. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant.glow}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[520ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ opacity: active ? 1 : 0 }}
        decoding="async"
      />
    </div>
  );
}
