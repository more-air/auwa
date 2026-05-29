"use client";

/*
  PageHeader — unified navigation chrome for every secondary surface.

  One component, used everywhere. Replaces the bespoke "← BACK / TITLE /
  ACTION" patterns sprinkled across surfaces in the v1 build.

  Composition:
    [back] [           title           ] [trailing action]
      40px              flex-1                40px

  The trailing-action slot is optional — pass a node (Link, Button,
  Icon button) for surfaces that need it (About on Senshin, Look Back
  link, etc.). Title can also be omitted (some surfaces lead with
  an Orb and prefer a clean header band).

  Sits in safe-area space (pt-safe). z-30 to clear floating content
  underneath without ever clipping bottom sheets above it.
*/

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

export type PageHeaderProps = {
  /** Title shown in the centre. Omit for surfaces without a title. */
  title?: string;
  /** Override the default router.back() behaviour. */
  onBack?: () => void;
  /** Hide the back button entirely (used on top-level surfaces). */
  hideBack?: boolean;
  /** Right-aligned action slot. Pass a Link, Button, or icon button. */
  trailing?: ReactNode;
  /** Apply transparent bg (the surface beneath shows through). */
  transparent?: boolean;
};

export function PageHeader({
  title,
  onBack,
  hideBack = false,
  trailing,
  transparent = false,
}: PageHeaderProps) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <header
      className={[
        "sticky top-0 z-30 px-safe pt-safe",
        transparent ? "bg-transparent" : "bg-[var(--color-void)]/85 backdrop-blur-lg",
      ].join(" ")}
    >
      <div className="h-12 px-3 flex items-center justify-between gap-2">
        <div className="w-10 flex justify-start">
          {!hideBack ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className={[
                "w-10 h-10 -ml-1 flex items-center justify-center",
                "text-cosmic-50/70 hover:text-cosmic-50 active:scale-[0.92]",
                "transition-[color,transform] duration-[var(--duration-press)]",
                "rounded-full",
              ].join(" ")}
            >
              <ChevronLeft size={22} strokeWidth={1.75} />
            </button>
          ) : null}
        </div>

        {title ? (
          <h1 className="t-title text-cosmic-50/92 flex-1 text-center truncate">
            {title}
          </h1>
        ) : (
          <div className="flex-1" />
        )}

        <div className="w-10 flex justify-end">{trailing}</div>
      </div>
    </header>
  );
}
