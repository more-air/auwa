"use client";

/*
  SubExpressionRow — sub-expression refinement on the Refining
  screen. Renders the first four sub-expressions for the selected
  Yamato state as Chips, using the same on/off language as every
  other selection across the app.

  v1 keeps the row to four chips so it fits one line on a phone.
  The reflection library is still queried by state + sub-expression
  even if the user never sees the full list.
*/

import { Chip } from "./chip";
import {
  getYamatoState,
  type SubExpression,
  type YamatoState,
} from "@/lib/yamato";

export type SubExpressionRowProps = {
  state: YamatoState;
  selected: string | null;
  onSelect: (sub: SubExpression | null) => void;
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
      role="radiogroup"
      aria-label={`Refine ${def.english}`}
      className={[
        "w-full flex flex-wrap items-center justify-center gap-2",
        className,
      ].join(" ")}
    >
      {items.map((sub) => {
        const isSelected = selected === sub.key;
        return (
          <Chip
            key={sub.key}
            selected={isSelected}
            onClick={() => onSelect(isSelected ? null : sub)}
          >
            {sub.english}
          </Chip>
        );
      })}
    </div>
  );
}
