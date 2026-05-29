"use client";

/*
  StatePicker — the feeling tap surface on Arrival.

  Replaces the v1 arc with a 2×2 + 1 grid laid out by valence and
  energy. Yuragi (Unsettled) sits centred between the four corners
  as the unstable middle.

      Radiant 晴       Intense 昂
       [HE+ pos]       [HE+ neg]

           Unsettled 揺
           [centre — Y]

      Serene  和       Reflective 哀
       [LE+ pos]       [LE+ neg]

  Each card carries the state's gradient as its background, with the
  Auwa character variant centred at ~64px, English name in bold sans
  below, kanji + romaji as a small caption. Tap → cross-fade to the
  glow variant, gentle scale-up to 1.02, primary action button at the
  screen bottom enables.

  Card surfaces:
    - 22px radius
    - Card bg = state gradient (mid → deep, radial from upper-left)
    - Hairline cosmic-50/8 border for soft edge definition
    - Selected: cosmic-50/22 border + scale 1.02 + character glows
*/

import type { YamatoState } from "@/lib/yamato";
import { YAMATO_STATES, getYamatoState } from "@/lib/yamato";
import { AuwaCharacter } from "./auwa-character";

export type StatePickerProps = {
  selected: YamatoState | null;
  onSelect: (state: YamatoState) => void;
  className?: string;
};

// Grid placement: row-col coordinates in a 3x2 grid, with Yuragi
// spanning the full width on row 2.
//
//   row 1 (top):    [Hare]      [Takaburi]
//   row 2 (mid):    [   Yuragi (full)   ]
//   row 3 (bot):    [Nagomi]    [Aware]

export function StatePicker({
  selected,
  onSelect,
  className = "",
}: StatePickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="How are you feeling right now?"
      className={[
        "w-full grid grid-cols-2 gap-3",
        className,
      ].join(" ")}
    >
      <StateCard state="hare" selected={selected === "hare"} onSelect={onSelect} />
      <StateCard state="takaburi" selected={selected === "takaburi"} onSelect={onSelect} />
      <div className="col-span-2">
        <StateCard
          state="yuragi"
          selected={selected === "yuragi"}
          onSelect={onSelect}
          wide
        />
      </div>
      <StateCard state="nagomi" selected={selected === "nagomi"} onSelect={onSelect} />
      <StateCard state="aware" selected={selected === "aware"} onSelect={onSelect} />
    </div>
  );
}

function StateCard({
  state,
  selected,
  onSelect,
  wide = false,
}: {
  state: YamatoState;
  selected: boolean;
  onSelect: (s: YamatoState) => void;
  wide?: boolean;
}) {
  const def = getYamatoState(state);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(state)}
      className={[
        "relative w-full overflow-hidden",
        wide ? "h-24" : "h-36",
        "rounded-[22px]",
        "transition-[transform,border-color] duration-[var(--duration-press)] ease-out",
        "active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        selected ? "scale-[1.02]" : "scale-100",
      ].join(" ")}
      style={{
        // Bigger explicit-radius radial so the mid stop fills most of
        // the card. The previous default-radius gradient compressed
        // the bright colour into a tiny upper-left spot and the
        // edge-to-void fade dominated, making every card read black.
        background: `radial-gradient(circle 240px at 28% 18%, var(--gradient-${state}-mid) 0%, var(--gradient-${state}-deep) 55%, var(--gradient-${state}-edge) 100%)`,
        boxShadow: selected
          ? `0 0 0 1.5px oklch(0.97 0.005 250 / 0.42) inset, 0 16px 40px -8px var(--color-${state})`
          : `0 0 0 1px oklch(0.97 0.005 250 / 0.10) inset, 0 4px 18px -8px oklch(0 0 0 / 0.4)`,
      }}
    >
      {/* Inner gloss — gives the card depth without paint cost. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, oklch(1 0 0 / 0.16) 0%, transparent 38%)",
        }}
      />

      {wide ? (
        // Wide Yuragi card — character left, text right.
        <div className="relative h-full flex items-center px-6 gap-4">
          <AuwaCharacter state={state} size="md" active={selected} />
          <div className="flex-1 text-left">
            <p className="t-title text-cosmic-50 text-[18px]">
              {def.english}
            </p>
            <p
              className="t-jp text-cosmic-50/65 mt-0.5"
              style={{ fontFamily: "var(--font-jp-serif)" }}
            >
              {def.kanji} {def.romaji}
            </p>
          </div>
        </div>
      ) : (
        // Standard 2-up card — character top, text below.
        <div className="relative h-full flex flex-col items-center justify-between py-4">
          <AuwaCharacter state={state} size="md" active={selected} />
          <div className="text-center">
            <p className="t-title text-cosmic-50 text-[16px]">
              {def.english}
            </p>
            <p
              className="t-jp text-cosmic-50/65 mt-0.5"
              style={{ fontFamily: "var(--font-jp-serif)" }}
            >
              {def.kanji} {def.romaji}
            </p>
          </div>
        </div>
      )}
    </button>
  );
}
