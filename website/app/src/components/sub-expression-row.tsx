"use client";

/*
  SubExpressionRow — optional refinement under a selected Yamato
  state. The user has tapped a variant; this surfaces a small row of
  the state's sub-expressions so they can refine, or proceed without
  refining.

  Spec: §5.4 of context/pillar/app.md.

  UI rule (Section 4): English label leads, Yamato in smaller subtext.

  v1 simplification: shows the first four sub-expressions for the
  state. The full sets are 4-7 long per state; for a thumb-friendly
  arc on a phone, four is the right count. The remaining sub-
  expressions are reached internally by classification when the user
  proceeds without refining. (The reflection library is still queried
  by state + sub-expression even if the user never sees the full list.)
*/

import { getYamatoState, type YamatoState, type SubExpression } from "@/lib/yamato";

export type SubExpressionRowProps = {
  state: YamatoState;
  /** Currently selected sub-expression key, or null for "no refinement". */
  selected: string | null;
  onSelect: (sub: SubExpression | null) => void;
  /** Whether to truncate to the first four. Default true. */
  truncate?: boolean;
  className?: string;
};

export function SubExpressionRow({
  state,
  selected,
  onSelect,
  truncate = true,
  className = "",
}: SubExpressionRowProps) {
  const def = getYamatoState(state);
  const items = truncate ? def.subExpressions.slice(0, 4) : def.subExpressions;

  return (
    <div
      className={[
        "w-full flex flex-wrap items-start justify-center gap-x-5 gap-y-3",
        className,
      ].join(" ")}
      role="radiogroup"
      aria-label={`Refine ${def.english}`}
    >
      {items.map((sub) => {
        const isSelected = selected === sub.key;
        return (
          <button
            key={sub.key}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(isSelected ? null : sub)}
            className={[
              "flex flex-col items-center px-2 py-1 leading-tight",
              "transition-opacity duration-300",
              isSelected
                ? "opacity-100"
                : "opacity-55 hover:opacity-90",
            ].join(" ")}
          >
            <span className="font-display text-[15px] text-cosmic-50 tracking-[0.005em]">
              {sub.english}
            </span>
            <span
              className="font-jp-serif text-[10px] tracking-[0.04em] text-cosmic-50/45 mt-0.5"
              style={{ fontFamily: "var(--font-jp-serif)" }}
            >
              {sub.kanji} {sub.romaji}
            </span>
          </button>
        );
      })}
    </div>
  );
}
