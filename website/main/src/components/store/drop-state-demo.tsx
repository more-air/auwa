"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BuyBlock } from "./buy-block";
import type { DropState, Figure } from "@/lib/commerce";

/*
  Preview-only wrapper.

  Lets Tom flip the buy block between its three states without a code
  change, so all three can be judged in one sitting rather than
  imagined. The switcher is deliberately styled as a tool, not as part
  of the page — it must never read as a design element, and it does not
  ship to /store.
*/

const STATES: { id: DropState; label: string }[] = [
  { id: "upcoming", label: "Before" },
  { id: "live", label: "Live" },
  { id: "sold-out", label: "Sold out" },
];

export function DropStateDemo({ figure }: { figure: Figure }) {
  const [state, setState] = useState<DropState>(figure.state);

  // In "live", pretend a few have gone so the remaining-count line can
  // be judged with a realistic number rather than a full edition.
  const previewFigure: Figure = {
    ...figure,
    state,
    colourways: figure.colourways.map((c, i) =>
      state === "sold-out"
        ? { ...c, claimed: c.editionSize }
        : state === "live"
        ? { ...c, claimed: i === 0 ? 6 : 2 }
        : c
    ),
  };

  // Portal the switcher to <body>. It cannot simply be `position:
  // fixed` in place: this component renders inside a <FadeIn>, and
  // FadeIn deliberately HOLDS `translate3d(0, 0, 0)` at rest (see
  // patterns.md — removing it causes a Safari subpixel settle). Any
  // transform makes that wrapper the containing block for fixed
  // descendants, so the pill anchored to the panel column instead of
  // the viewport. Same fix, same reason, as the header's menu overlay.
  //
  // Bottom-RIGHT: bottom-left sat over the gallery column and the
  // scroll content below it. The bottom-right corner is free on this
  // page — the SoundToggle lives up in the header band, and the
  // FigureHook strip is suppressed on /store-preview via its HIDE_ON
  // list.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const switcher = (
    <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-1 rounded-full bg-sumi/90 p-1 backdrop-blur-sm">
      {/* The "Preview" label is decoration — the pill reads as a tool
          without it. Dropped below sm, where it was costing ~70px of a
          375px screen and pushing the switcher across most of the
          viewport width. */}
      <span className="hidden px-3 font-sans text-[10px] uppercase tracking-[0.14em] text-surface/40 sm:inline">
        Preview
      </span>
      {STATES.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => setState(s.id)}
          className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1.5 font-sans text-[11px] tracking-[0.08em] transition-colors duration-200 sm:px-3 ${
            state === s.id
              ? "bg-surface text-sumi"
              : "text-surface/60 hover:text-surface"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <BuyBlock figure={previewFigure} />
      {mounted ? createPortal(switcher, document.body) : null}
    </>
  );
}
