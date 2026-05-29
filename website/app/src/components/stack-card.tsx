"use client";

/*
  StackCard — the action/status card pattern used on Home below the
  scene, on Archive (revelation rows), Look Back, Settings sections,
  and anywhere a tappable surface needs to feel like a defined card.

  Three slots:
    eyebrow — small label above the title (optional)
    title   — primary text
    body    — secondary text (optional)
    leading — visual on the left (icon, motif, small character)
    trailing — chevron, badge, or action on the right (optional)

  Two variants:
    plain   — bg cosmic-50/4, no border. Quietest surface.
    raised  — bg cosmic-900 with subtle inner ring, slight elevation.
              Used for the primary CTA card on Home where the action
              needs to pull the eye.

  Tap behaviour: if `href` or `onClick` is provided, the whole card
  is a single tap target with the press-scale feedback. Without
  either, the card is a static panel.
*/

import { forwardRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "plain" | "raised";

export type StackCardProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  /** If provided, the card becomes a Next.js Link to this route. */
  href?: string;
  /** If provided (and no href), the card becomes a button. */
  onClick?: () => void;
  variant?: Variant;
  /** Render children below the title/body row — used for embedded
   *  CTAs or longer content. */
  children?: ReactNode;
  className?: string;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  plain:
    "bg-cosmic-50/[0.04] hover:bg-cosmic-50/[0.06] active:bg-cosmic-50/[0.08]",
  raised:
    "bg-cosmic-900 hover:bg-cosmic-800/80 active:bg-cosmic-800",
};

export const StackCard = forwardRef<HTMLElement, StackCardProps>(function StackCard(
  {
    eyebrow,
    title,
    body,
    leading,
    trailing,
    href,
    onClick,
    variant = "plain",
    children,
    className = "",
  },
  ref
) {
  const interactive = Boolean(href || onClick);
  const showChevron = interactive && !trailing;

  const inner = (
    <>
      {leading ? <div className="flex-none">{leading}</div> : null}
      <div className="flex-1 min-w-0 text-left">
        {eyebrow ? (
          <p className="t-eyebrow text-cosmic-50/44 mb-1">{eyebrow}</p>
        ) : null}
        {title ? (
          <p className="t-title text-cosmic-50/92 text-[16px] truncate">{title}</p>
        ) : null}
        {body ? (
          <p className="t-meta text-cosmic-50/62 mt-1 leading-snug">{body}</p>
        ) : null}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
      {trailing ? <div className="flex-none">{trailing}</div> : null}
      {showChevron ? (
        <ChevronRight
          size={18}
          strokeWidth={1.5}
          className="flex-none text-cosmic-50/35"
        />
      ) : null}
    </>
  );

  const baseClasses = [
    "w-full flex items-center gap-4 rounded-[20px] px-4 py-4",
    "transition-[transform,background-color] duration-[var(--duration-press)]",
    interactive ? "active:scale-[0.985]" : "",
    VARIANT_CLASSES[variant],
    "shadow-[inset_0_0_0_1px_oklch(0.97_0.005_250_/_0.05)]",
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
      >
        {inner}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={baseClasses}
      >
        {inner}
      </button>
    );
  }
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={baseClasses}>
      {inner}
    </div>
  );
});
