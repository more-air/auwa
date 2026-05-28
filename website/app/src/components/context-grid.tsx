"use client";

/*
  ContextGrid — the optional "What were you up to?" tap surface that
  sits between sub-expression refinement and the light shower.

  Spec: §3 (context options) and §5.5 (context tap screen) of
  context/pillar/app.md.

  The tags drive the archive's correlation observations (Section 3 of
  the spec). The user gets nothing for tagging; the observations are
  intrinsically valuable, not extrinsically rewarded. Skipping is
  always allowed.

  v1 keeps the "Something else" tap simple — it inserts an inline
  caption asking for a short note. Free text is captured but capped
  at 60 characters (soft enforcement); the cap prevents the screen
  from turning into a journaling surface, which belongs to the journal
  entry surface, not the daily flow.
*/

import { useState } from "react";

export type ContextTag =
  | "working"
  | "with-people"
  | "alone"
  | "outside"
  | "moving"
  | "eating"
  | "online"
  | "in-transit"
  | "something-else";

export type ContextResult = {
  tag: ContextTag;
  note?: string;
};

const TAGS: { key: ContextTag; label: string }[] = [
  { key: "working", label: "Working" },
  { key: "with-people", label: "With people" },
  { key: "alone", label: "Alone" },
  { key: "outside", label: "Outside" },
  { key: "moving", label: "Moving" },
  { key: "eating", label: "Eating" },
  { key: "online", label: "Online" },
  { key: "in-transit", label: "In transit" },
  { key: "something-else", label: "Something else" },
];

export type ContextGridProps = {
  onSelect: (result: ContextResult) => void;
  onSkip: () => void;
  className?: string;
};

export function ContextGrid({ onSelect, onSkip, className = "" }: ContextGridProps) {
  const [openOther, setOpenOther] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div className={["w-full max-w-md mx-auto", className].join(" ")}>
      <h2 className="font-display text-[20px] text-cosmic-50 text-center mb-6">
        What were you up to?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {TAGS.map((t) => {
          const isOther = t.key === "something-else";
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                if (isOther) {
                  setOpenOther(true);
                } else {
                  onSelect({ tag: t.key });
                }
              }}
              className={[
                "py-4 px-4 rounded-md border border-cosmic-50/15",
                "font-display text-[15px] text-cosmic-50/90",
                "transition-colors duration-200",
                "hover:border-cosmic-50/35 hover:bg-cosmic-50/5",
                "active:bg-cosmic-50/10",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {openOther ? (
        <div className="mt-5">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 60))}
            placeholder="A few words"
            autoFocus
            className={[
              "w-full bg-transparent border-b border-cosmic-50/25 py-2 px-1",
              "font-display text-[16px] text-cosmic-50",
              "placeholder:text-cosmic-50/30",
              "focus:outline-none focus:border-cosmic-50/55",
            ].join(" ")}
          />
          <div className="flex items-center justify-between mt-3">
            <button
              type="button"
              onClick={() => {
                setOpenOther(false);
                setNote("");
              }}
              className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/35 hover:text-cosmic-50/65 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() =>
                onSelect({
                  tag: "something-else",
                  note: note.trim() || undefined,
                })
              }
              className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/85 hover:text-cosmic-50 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onSkip}
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/35 hover:text-cosmic-50/65 transition-colors"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}
