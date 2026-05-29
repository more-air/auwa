"use client";

/*
  IconButton — circular tap target for header actions, dismissals,
  toolbar items. 40x40 visible touch area, with hit-slop extending
  to 44px (Apple's minimum). Lucide icon goes inside at 20-22px.
*/

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonProps = {
  label: string;
  variant?: "default" | "filled";
} & ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, variant = "default", className = "", children, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={[
          "relative w-10 h-10 flex items-center justify-center rounded-full",
          "transition-[transform,color,background-color,opacity] duration-[var(--duration-press)]",
          "active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2",
          variant === "filled"
            ? "bg-cosmic-50/8 text-cosmic-50/85 hover:bg-cosmic-50/12 hover:text-cosmic-50 active:bg-cosmic-50/15"
            : "text-cosmic-50/65 hover:text-cosmic-50",
          // Extend hit-slop to 44px via after pseudo-element.
          "after:absolute after:inset-[-2px] after:content-['']",
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
