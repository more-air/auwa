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
import { AdvanceButton } from "./advance-button";

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
  onBack: () => void;
};

export function ContextGrid({ onSelect, onSkip, onBack }: ContextGridProps) {
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<ContextTag | null>(null);
  const isOther = selected === "something-else";

  const advance = () => {
    if (!selected) return;
    onSelect({
      tag: selected,
      note: isOther ? note.trim() || undefined : undefined,
    });
  };

  return (
    <section
      className="h-svh relative flex flex-col px-6"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <div className="h-10 flex items-center flex-none">
        <AdvanceButton
          direction="back"
          tone="subtle"
          size={40}
          onClick={onBack}
          aria-label="Back"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 min-h-0">
        <h1 className="t-display text-cosmic-50/95 text-center">
          What were you up to?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
          {TAGS.map((t) => (
            <Chip
              key={t.key}
              selected={selected === t.key}
              onClick={() => setSelected(t.key)}
            >
              {t.label}
            </Chip>
          ))}
        </div>

        {isOther ? (
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 60))}
            placeholder="A few words"
            autoFocus
            className={[
              "w-full max-w-xs bg-transparent border-b border-cosmic-50/22 py-2 px-1",
              "t-body text-[17px] text-cosmic-50 text-center",
              "placeholder:text-cosmic-50/30",
              "focus:outline-none focus:border-cosmic-50/55",
            ].join(" ")}
          />
        ) : null}
      </div>

      <div className="flex-none flex items-center justify-between pt-4">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip
        </Button>
        <AdvanceButton
          direction="next"
          onClick={advance}
          disabled={!selected}
          aria-label="Continue"
        />
      </div>
    </section>
  );
}
