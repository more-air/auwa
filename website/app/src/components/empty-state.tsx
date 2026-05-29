"use client";

/*
  EmptyState — surfaces with no data yet (Trove before fireflies,
  Archive before revelations, Look Back before Senshin entries).

  Composition: a small Orb (or motif), a single voice line, optional
  metadata line. Centred in the surface. No CTA — the path to filling
  the state is via the natural daily flow, not a button.

  Apps that get empty states right: Things 3 (gentle, contextual),
  Linear (iconic + instructive), Day One (warm). We err toward
  Things' restraint: the absence of content is itself meaningful in
  Auwa's voice (the user has not yet noticed something today).
*/

import type { ReactNode } from "react";
import { Orb } from "./orb";

export type EmptyStateProps = {
  /** Voice line, EB Garamond. 1-2 sentences. */
  message: string;
  /** Optional small line below the message. */
  hint?: string;
  /** Replace the default Orb with a custom visual. */
  visual?: ReactNode;
  /** Outer padding. Defaults to comfortable centring. */
  className?: string;
};

export function EmptyState({ message, hint, visual, className = "" }: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center gap-7 px-8",
        className,
      ].join(" ")}
    >
      <div className="opacity-95">{visual ?? <Orb size="md" />}</div>
      <p className="t-voice-l text-cosmic-50/82 max-w-[18rem]">{message}</p>
      {hint ? <p className="t-meta text-cosmic-50/44 max-w-[16rem]">{hint}</p> : null}
    </div>
  );
}
