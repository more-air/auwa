"use client";

/*
  ContextGrid — the "What were you up to?" tap surface that sits
  between sub-expression refinement and the light shower.

  Renders the eight context tags + "Something else" as Chips,
  consistent with sub-expressions and every other selection in the
  app. Tap once → confirms and proceeds; tap "Something else" to
  open the short free-text capture.

  Spec: §3 (context options) and §5.5 (context tap screen) of
  context/pillar/app.md.
*/

import { useState } from "react";
import { Chip } from "./chip";
import { Button } from "./button";

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
  const [selected, setSelected] = useState<ContextTag | null>(null);

  return (
    <div className={["w-full max-w-md mx-auto flex flex-col gap-7", className].join(" ")}>
      <h2 className="t-display text-cosmic-50/96 text-center text-[26px]">
        What were you up to?
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {TAGS.map((t) => {
          const isOther = t.key === "something-else";
          const isSelected = selected === t.key;
          return (
            <Chip
              key={t.key}
              selected={isSelected}
              onClick={() => {
                if (isOther) {
                  setSelected("something-else");
                  setOpenOther(true);
                } else {
                  setSelected(t.key);
                  onSelect({ tag: t.key });
                }
              }}
            >
              {t.label}
            </Chip>
          );
        })}
      </div>

      {openOther ? (
        <div className="flex flex-col items-stretch gap-4 mt-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 60))}
            placeholder="A few words"
            autoFocus
            className={[
              "w-full bg-transparent border-b border-cosmic-50/22 py-2 px-1",
              "t-body text-[17px] text-cosmic-50 text-center",
              "placeholder:text-cosmic-50/30",
              "focus:outline-none focus:border-cosmic-50/55",
            ].join(" ")}
          />
          <div className="flex items-center justify-center gap-3 mt-2">
            <Button
              variant="tertiary"
              size="md"
              onClick={() => {
                setOpenOther(false);
                setNote("");
                setSelected(null);
              }}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() =>
                onSelect({
                  tag: "something-else",
                  note: note.trim() || undefined,
                })
              }
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-2">
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}
