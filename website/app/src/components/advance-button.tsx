"use client";

/*
  AdvanceButton — the circular action affordance, modelled on Stoic.

  A solid disc with a single glyph: the primary way to move through a
  sequence (onboarding steps, the daily flow, Senshin) and to dismiss
  atmospheric surfaces (the X on Rest). One primitive, four glyphs, two
  tones — so the "next" button looks identical everywhere and a single
  edit here restyles every flow.

    direction: next | back | close | done   (chevron / chevron / x / check)
    tone:      primary (filled cosmic-50)  | subtle (outlined, quiet)

  Placement (bottom-right, bottom-left, centred) is the caller's job;
  this component only owns the disc itself.
*/

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { ChevronRight, ChevronLeft, X, Check } from "lucide-react";

type Direction = "next" | "back" | "close" | "done";
type Tone = "primary" | "subtle";

export type AdvanceButtonProps = {
  direction?: Direction;
  tone?: Tone;
  /** Diameter in px. Default 56 (comfortable thumb target). */
  size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const GLYPH = { next: ChevronRight, back: ChevronLeft, close: X, done: Check };

export const AdvanceButton = forwardRef<HTMLButtonElement, AdvanceButtonProps>(
  function AdvanceButton(
    {
      direction = "next",
      tone = "primary",
      size = 56,
      className = "",
      disabled,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) {
    const Glyph = GLYPH[direction];
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel ?? direction}
        className={[
          "inline-flex items-center justify-center rounded-pill shrink-0",
          "transition-[transform,opacity,background-color,border-color,color] duration-[var(--duration-press)] ease-out",
          "active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:active:scale-100",
          tone === "primary"
            ? "bg-cosmic-50 text-[var(--color-void)] hover:bg-white active:bg-cosmic-100 disabled:bg-cosmic-50/15 disabled:text-cosmic-50/30"
            : "border border-cosmic-50/20 text-cosmic-50/70 hover:text-cosmic-50 hover:border-cosmic-50/40 active:bg-cosmic-50/5 disabled:opacity-40",
          className,
        ].join(" ")}
        style={{ width: size, height: size }}
        {...rest}
      >
        <Glyph size={Math.round(size * 0.4)} strokeWidth={2} />
      </button>
    );
  }
);
