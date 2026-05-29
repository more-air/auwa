"use client";

/*
  Chip — the consistent selection primitive.

  One pill-shaped component used across every surface where the user
  picks one or more from a small set: sub-expression refinement,
  context tags, Senshin categories, onboarding (when-fits / trait /
  source), Look Back filters.

  Pattern modelled on How We Feel + Bloom: subtle dark surface at
  rest, brighter surface + bold text when selected. Clear on / off
  legibility without colour-coding the selection (the cosmic surface
  carries the colour; chips carry the chrome).

  States:
    rest      — bg cosmic-50/6, text cosmic-50/68, border transparent
    selected  — bg cosmic-50/14, text cosmic-50/96 bold, glow ring
    disabled  — opacity 0.4, cursor not-allowed

  Sizes:
    md (default) — 40px tall, t-button label
    sm           — 32px tall, t-meta label (used in dense rows)

  This component replaces the bespoke text-button patterns in
  sub-expression-row, the bordered tap cards in context-grid, the
  square tap targets in senshin and onboarding.
*/

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Size = "md" | "sm";

export type ChipProps = {
  selected?: boolean;
  size?: Size;
  /** Multi-line layout — used by context tags that show a secondary
   *  romaji line below the English label. Default false. */
  multiline?: boolean;
  /** Optional small icon before the label. */
  leadingIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SIZE_CLASSES: Record<Size, string> = {
  md: "h-10 px-4 t-button text-[15px]",
  sm: "h-8 px-3 t-meta",
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    selected = false,
    size = "md",
    multiline = false,
    leadingIcon,
    className = "",
    children,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-1.5",
        "rounded-full",
        multiline ? "py-2 h-auto leading-[1.2]" : SIZE_CLASSES[size].replace(/h-\d+/, ""),
        !multiline ? SIZE_CLASSES[size] : "px-4 t-button text-[15px]",
        "transition-[transform,background-color,color,box-shadow] duration-[var(--duration-press)] ease-out",
        "active:scale-[0.96]",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
        selected
          ? "bg-cosmic-50/14 text-cosmic-50 font-medium"
          : "bg-cosmic-50/[0.06] text-cosmic-50/68 hover:text-cosmic-50/92 hover:bg-cosmic-50/[0.09]",
        className,
      ].join(" ")}
      style={{
        boxShadow: selected
          ? "0 0 0 1px oklch(0.97 0.005 250 / 0.20) inset, 0 0 18px -4px oklch(0.86 0.14 95 / 0.32)"
          : "0 0 0 1px oklch(0.97 0.005 250 / 0.04) inset",
      }}
      {...rest}
    >
      {leadingIcon ? <span className="-ml-0.5 flex shrink-0">{leadingIcon}</span> : null}
      <span className={multiline ? "flex flex-col items-center text-center" : ""}>
        {children}
      </span>
    </button>
  );
});
