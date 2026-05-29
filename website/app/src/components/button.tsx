"use client";

/*
  Button — the workhorse interactive primitive.

  Variants:
    primary    — full-width pill, cosmic-50 filled, void text.
                 The one primary action on the screen, sitting in
                 the safe-area bottom (Continue, Begin, Save).
    secondary  — outlined cosmic-50/22, used for confirming actions
                 that aren't the page's primary.
    tertiary   — text-only, no border, used for skip / cancel.
    ghost      — text-only, lower opacity, used for dismiss / quiet
                 actions that should not pull the eye.

  Sizes:
    lg (default)  — 56px tall, full bold presence. Used for primary
                    page actions.
    md            — 48px tall, comfortable thumb target.
    sm            — 40px tall, used inside dense rows.

  States: rest, pressed (scale 0.97 + opacity dip), disabled.

  Reach for this primitive on every surface. Bespoke buttons are
  drift.
*/

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "lg" | "md" | "sm";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-cosmic-50 text-[var(--color-void)] hover:bg-white active:bg-cosmic-100 disabled:bg-cosmic-50/15 disabled:text-cosmic-50/30",
  secondary:
    "border border-cosmic-50/22 text-cosmic-50 hover:border-cosmic-50/45 active:bg-cosmic-50/5 disabled:border-cosmic-50/10 disabled:text-cosmic-50/25",
  tertiary:
    "text-cosmic-50/72 hover:text-cosmic-50 active:text-cosmic-50/85 disabled:text-cosmic-50/25",
  ghost:
    "text-cosmic-50/55 hover:text-cosmic-50/85 active:text-cosmic-50/70 disabled:text-cosmic-50/20",
};

const SIZE_CLASSES: Record<Size, string> = {
  lg: "h-14 px-7 rounded-full t-button text-[17px]",
  md: "h-12 px-6 rounded-full t-button",
  sm: "h-10 px-5 rounded-full t-meta",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "lg",
    fullWidth = false,
    leadingIcon,
    trailingIcon,
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
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "font-medium",
        "transition-[transform,opacity,background-color,border-color,color] duration-[var(--duration-press)] ease-out",
        "active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        SIZE_CLASSES[size],
        fullWidth ? "w-full" : "",
        VARIANT_CLASSES[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {leadingIcon ? <span className="-ml-1 flex shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="-mr-1 flex shrink-0">{trailingIcon}</span> : null}
    </button>
  );
});
