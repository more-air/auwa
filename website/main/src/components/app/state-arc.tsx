"use client";

/*
  StateArc — the five Yamato character variants arranged in a gentle
  arc below the Kokoro on the arrival screen. The user taps the one
  that feels like the right one right now.

  UI presentation rule (Section 4 of app.md): English label leads as
  the primary label, Yamato sits underneath in smaller subtext. The
  Yamato anchors the brand culturally; the English ensures the meaning
  is never opaque.

  Spec source: §5.3 Arrival in context/pillar/app.md.

  Arc shape: five items, the middle one slightly higher than the outer
  two, so the row reads as a soft smile rather than a flat list. Pure
  CSS translate per item — no JS layout, no fragile measurement.
*/

import { useState } from "react";
import { YAMATO_STATES, type YamatoState } from "@/lib/yamato";
import { AuwaCharacter } from "./auwa-character";

// Y-offset per arc position (0..4). Index 2 (middle) sits lowest in
// the arc visually but highest on the page (negative translateY), so
// the row reads as a shallow concave dip — the centre variant is the
// natural rest position, the outer two reach toward the user.
const ARC_OFFSETS_PX = [0, -8, -14, -8, 0];

export type StateArcProps = {
  /** Optional initial state. If provided, that variant starts focused. */
  initial?: YamatoState;
  /** Fires when the user taps a variant. Parent owns the state. */
  onSelect: (state: YamatoState) => void;
  className?: string;
};

export function StateArc({ initial, onSelect, className = "" }: StateArcProps) {
  const [focused, setFocused] = useState<YamatoState | null>(initial ?? null);

  return (
    <div
      className={[
        "w-full max-w-md mx-auto flex items-end justify-between sm:justify-center sm:gap-5",
        className,
      ].join(" ")}
      role="radiogroup"
      aria-label="How are you feeling right now?"
    >
      {YAMATO_STATES.map((s, i) => {
        const isFocused = focused === s.key;
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
              "group flex flex-col items-center px-1 py-1",
              // Constrain the item to the character's footprint on
              // mobile so the labels wrap to two lines inside the
              // column instead of pushing siblings off-viewport.
              "w-[64px] sm:w-auto",
              "transition-opacity duration-300",
              isFocused
                ? "opacity-100"
                : focused === null
                  ? "opacity-90 hover:opacity-100"
                  : "opacity-45 hover:opacity-80",
            ].join(" ")}
            style={{ transform: `translateY(${ARC_OFFSETS_PX[i]}px)` }}
          >
            <AuwaCharacter state={s.key} size="sm" />
            <span className="flex flex-col items-center leading-tight mt-2">
              <span className="font-display text-[14px] sm:text-[17px] text-cosmic-50 tracking-[0.005em] text-center leading-[1.15]">
                {s.english}
              </span>
              <span
                className="font-jp-serif text-[10px] sm:text-[11px] tracking-[0.04em] text-cosmic-50/50 mt-1 text-center"
                style={{ fontFamily: "var(--font-jp-serif)" }}
              >
                {s.kanji} {s.romaji}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
