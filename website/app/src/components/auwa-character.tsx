"use client";

/*
  AuwaCharacter — visual placeholder for the five Yamato variants
  Rieko will illustrate.

  v1 design: an elegant tonal disc tinted with the state's seed
  colour, with the state's kanji as a faint watermark at the centre.
  The disc is a three-stop radial wash so each variant has its own
  emotional temperature without any illustration yet.

  When Rieko's character art lands, swap the inner content. The disc
  shape, size, and surrounding margins stay constant so the
  consumers (StateArc, RefiningScreen, Revelation) need zero change.

  This treatment is intentionally restrained — it should feel like a
  considered placeholder, not a wireframe. The earlier "AUWA / HARE
  VARIANT" labelled rectangle was reading "unfinished" in every
  screenshot.
*/

import type { YamatoState } from "@/lib/yamato";

const KANJI: Record<YamatoState, string> = {
  hare: "晴",
  takaburi: "昂",
  aware: "哀",
  yuragi: "揺",
  nagomi: "和",
};

const SIZES = {
  sm: { box: "w-14 h-14", kanji: "text-[20px]" },
  md: { box: "w-24 h-24", kanji: "text-[32px]" },
  lg: { box: "w-64 h-64", kanji: "text-[88px]" },
} as const;

export type AuwaCharacterProps = {
  state: YamatoState;
  size?: keyof typeof SIZES;
  /** When true, the character reads as the active focused one —
   *  full bloom + soft surround glow. Default false. */
  active?: boolean;
  className?: string;
};

export function AuwaCharacter({
  state,
  size = "sm",
  active = false,
  className = "",
}: AuwaCharacterProps) {
  const sizeCfg = SIZES[size];
  return (
    <div
      role="img"
      aria-label={`Auwa, ${state}`}
      className={[
        "relative rounded-full",
        sizeCfg.box,
        "transition-[transform,opacity,box-shadow] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)]",
        className,
      ].join(" ")}
      style={{
        background: `radial-gradient(circle at 38% 32%, var(--gradient-${state}-mid) 0%, var(--gradient-${state}-deep) 58%, var(--gradient-${state}-edge) 92%, var(--color-void) 100%)`,
        opacity: active ? 1 : 0.82,
        boxShadow: active
          ? `0 0 28px -2px var(--color-${state}), 0 0 0 1px oklch(1 0 0 / 0.08) inset`
          : "0 0 0 1px oklch(1 0 0 / 0.05) inset",
      }}
    >
      {/* Subtle highlight at the upper-left, giving the disc dimension. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 32% 20%, oklch(1 0 0 / 0.20) 0%, transparent 38%)",
        }}
      />
      {/* Kanji watermark, very faint. Becomes slightly more visible
          when active so the tap registers. */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 flex items-center justify-center select-none pointer-events-none",
          sizeCfg.kanji,
        ].join(" ")}
        style={{
          fontFamily: "var(--font-jp-serif)",
          color: "oklch(1 0 0)",
          opacity: active ? 0.48 : 0.28,
          textShadow: "0 1px 1px rgba(0,0,0,0.18)",
          fontWeight: 400,
        }}
      >
        {KANJI[state]}
      </span>
    </div>
  );
}
