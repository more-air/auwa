"use client";

/*
  Button — the workhorse interactive primitive.

  Variants:
    primary    — filled cosmic-50 on void, used for the one primary
                 action on a screen (Continue, Begin, Save).
    secondary  — outlined cosmic-50/22, used for confirming actions
                 that aren't the page's primary.
    tertiary   — text-only, no border, used for skip / cancel.
    ghost      — text-only, cosmic-50/55, used for dismiss / quiet
                 actions that should not pull the eye.

  Sizes:
    md (default)  — 48px tall, comfortable thumb target.
    sm            — 40px tall, used inside dense rows.

  States: rest, pressed (scale 0.97 + opacity dip), disabled.

  This component is the most-used primitive on auwa.app — every
  surface should reach for it before defining a bespoke button.
*/

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "md" | "sm";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-cosmic-50 text-[var(--color-void)] active:bg-cosmic-100 disabled:bg-cosmic-50/15 disabled:text-cosmic-50/30",
  secondary:
    "border border-cosmic-50/22 text-cosmic-50 hover:border-cosmic-50/45 active:bg-cosmic-50/5 disabled:border-cosmic-50/10 disabled:text-cosmic-50/25",
  tertiary:
    "text-cosmic-50/70 hover:text-cosmic-50 active:text-cosmic-50/85 disabled:text-cosmic-50/25",
  ghost:
    "text-cosmic-50/55 hover:text-cosmic-50/85 active:text-cosmic-50/70 disabled:text-cosmic-50/20",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "h-12 px-6 rounded-full",
  sm: "h-10 px-5 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
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
        // base
        "t-button",
        "inline-flex items-center justify-center gap-2",
        "transition-[transform,opacity,background-color,border-color,color] duration-[var(--duration-press)] ease-out",
        "active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        // layout
        SIZE_CLASSES[size],
        fullWidth ? "w-full" : "",
        // variant
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
