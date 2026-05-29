"use client";

/*
  StateArc — five Yamato character variants in a gentle arc.

  Tap any one to commit to that state. The selected variant brightens
  and the others quiet down. The prompt sits above the arc as a
  serif voice line; the English-primary label sits underneath each
  disc, with the romaji as a small subtext companion.

  Arc shape: a shallow concave dip — middle variant rests low, outer
  two reach up toward the eye. The spec asks for this gentle smile;
  pure CSS translate-Y per item handles it.

  v2 refinement (May 2026): the AuwaCharacter discs are now elegant
  tonal placeholders, not labelled rectangles. State labels are
  serif (t-voice ladder) with romaji subtext in Noto Serif JP. The
  arc is constrained to 320px max so the items group tightly on
  phones rather than spreading across the viewport.
*/

import { useState } from "react";
import { YAMATO_STATES, type YamatoState } from "@/lib/yamato";
import { AuwaCharacter } from "./auwa-character";

// Y-offset per arc position. Middle = highest on page (negative Y).
const ARC_OFFSETS_PX = [4, -6, -12, -6, 4];

export type StateArcProps = {
  initial?: YamatoState;
  onSelect: (state: YamatoState) => void;
  className?: string;
};

export function StateArc({ initial, onSelect, className = "" }: StateArcProps) {
  const [focused, setFocused] = useState<YamatoState | null>(initial ?? null);

  return (
    <div
      className={[
        "w-full max-w-[340px] mx-auto flex items-end justify-between",
        className,
      ].join(" ")}
      role="radiogroup"
      aria-label="How are you feeling right now?"
    >
      {YAMATO_STATES.map((s, i) => {
        const isFocused = focused === s.key;
        const isDimmed = focused !== null && !isFocused;
        return (
          <button
            key={s.key}
            type="button"
            role="radio"
            aria-checked={isFocused}
            onClick={() => {
              setFocused(s.key);
              onSelect(s.key);
            }}
            className={[
              "group flex flex-col items-center gap-2.5 px-0.5 py-1",
              "w-[60px]",
              "transition-opacity duration-300 ease-[var(--ease-out-expo)]",
              "active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2",
              isDimmed ? "opacity-40" : "opacity-100",
            ].join(" ")}
            style={{
              transform: `translateY(${ARC_OFFSETS_PX[i]}px)`,
              transition: "transform 300ms var(--ease-out-expo), opacity 300ms ease-out",
            }}
          >
            <AuwaCharacter state={s.key} size="sm" active={isFocused} />
            <span className="flex flex-col items-center leading-tight">
              <span
                className={[
                  "t-voice text-[14px] leading-[1.1] text-center",
                  isFocused ? "text-cosmic-50" : "text-cosmic-50/82",
                ].join(" ")}
              >
                {s.english}
              </span>
              <span
                className={[
                  "t-jp leading-[1.1] mt-0.5 text-center",
                  isFocused ? "text-cosmic-50/55" : "text-cosmic-50/38",
                ].join(" ")}
              >
                {s.romaji}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
