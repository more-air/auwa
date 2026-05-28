"use client";

/*
  Senshin entry flow (§5.17, §9).

  The Mind Wash. Five framed steps + paper-first guidance + an
  in-app fallback + atmospheric closure + optional Sanctuary handoff.

  v1 storage notes (per task scope):
  - Senshin metadata (categories, emotion, status) goes to plain
    localStorage so friends-release testers can walk the full flow.
  - Production replaces with end-to-end encryption per
    context/business/privacy.md §3 (libsodium-wrappers, Argon2id key
    derivation). The plain-text fallback in this v1 build MUST NOT
    ship to public release without that crypto layer.

  Crisis link is persistent across every Senshin page.
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/app/orb";
import {
  YAMATO_STATES,
  getYamatoState,
  type YamatoState,
} from "@/lib/yamato";
import { addSenshin } from "@/lib/app-store";

type Phase =
  | "breath"
  | "categorise"
  | "emotion"
  | "guidance"
  | "write"
  | "closure"
  | "handoff";

const CATEGORIES: { key: string; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "money", label: "Money" },
  { key: "family", label: "Family" },
  { key: "friend", label: "Friend" },
  { key: "relationship", label: "Relationship" },
  { key: "health", label: "Health" },
  { key: "grief", label: "Grief" },
  { key: "self", label: "Self" },
  { key: "future", label: "Future" },
  { key: "something-else", label: "Something else" },
];

export default function Senshin() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("breath");
  const [categories, setCategories] = useState<string[]>([]);
  const [otherNote, setOtherNote] = useState("");
  const [state, setState] = useState<YamatoState | null>(null);
  const [subExpression, setSubExpression] = useState<{
    key: string;
    english: string;
  } | null>(null);
  const [worryText, setWorryText] = useState("");
  const [realityText, setRealityText] = useState("");

  const persist = (extra: { worry?: string; reality?: string } = {}) => {
    if (!state) return;
    const cleaned = [...categories];
    if (otherNote.trim()) cleaned.push(`other:${otherNote.trim()}`);
    addSenshin({
      categories: cleaned,
      state,
      subExpressionEnglish: subExpression?.english,
      worryText: extra.worry,
      realityText: extra.reality,
    });
  };

  return (
    <main id="main-content" className="min-h-svh relative overflow-hidden">
      <SenshinHeader onExit={() => router.push("/app/pwa")} />

      {phase === "breath" && (
        <BreathPhase onNext={() => setPhase("categorise")} />
      )}

      {phase === "categorise" && (
        <CategorisePhase
          selected={categories}
          otherNote={otherNote}
          onToggle={(k) =>
            setCategories((c) =>
              c.includes(k) ? c.filter((x) => x !== k) : [...c, k]
            )
          }
          onChangeOther={setOtherNote}
          onNext={() => setPhase("emotion")}
        />
      )}

      {phase === "emotion" && (
        <EmotionPhase
          state={state}
          subExpression={subExpression}
          onSelectState={setState}
          onSelectSub={setSubExpression}
          onNext={() => setPhase("guidance")}
        />
      )}

      {phase === "guidance" && (
        <GuidancePhase
          onPaper={() => {
            persist();
            setPhase("closure");
          }}
          onTypeInstead={() => setPhase("write")}
        />
      )}

      {phase === "write" && (
        <WritePhase
          worry={worryText}
          reality={realityText}
          onChangeWorry={setWorryText}
          onChangeReality={setRealityText}
          onSave={() => {
            persist({
              worry: worryText.trim() || undefined,
              reality: realityText.trim() || undefined,
            });
            setPhase("closure");
          }}
        />
      )}

      {phase === "closure" && (
        <ClosurePhase onNext={() => setPhase("handoff")} />
      )}

      {phase === "handoff" && (
        <HandoffPhase
          onRest={() => router.push("/app/pwa/rest")}
          onLeave={() => router.push("/app/pwa")}
        />
      )}

      <CrisisLink />
    </main>
  );
}

/* ---------- chrome ---------- */

function SenshinHeader({ onExit }: { onExit: () => void }) {
  return (
    <header className="absolute top-0 inset-x-0 z-20 px-6 pt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onExit}
        className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45 hover:text-cosmic-50/80 transition-colors"
        aria-label="Exit Senshin"
      >
        ← Exit
      </button>
      <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45">
        Senshin
      </span>
      <Link
        href="/app/pwa/senshin/about"
        className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45 hover:text-cosmic-50/80 transition-colors"
      >
        About
      </Link>
    </header>
  );
}

function CrisisLink() {
  return (
    <Link
      href="/app/pwa/senshin/help"
      className="absolute bottom-4 inset-x-0 z-20 mx-auto block text-center font-sans text-[10px] tracking-[0.16em] uppercase text-cosmic-50/30 hover:text-cosmic-50/55 transition-colors px-6"
    >
      If this is heavier than the page can hold, find someone to talk to.
    </Link>
  );
}

/* ---------- phases ---------- */

function BreathPhase({ onNext }: { onNext: () => void }) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="min-h-svh w-full flex flex-col items-center justify-center px-6 gap-10"
    >
      <Orb size="lg" />
      <div className="text-center max-w-xs">
        <p className="font-display text-[20px] text-cosmic-50/90 leading-[1.4]">
          Take a breath.
        </p>
        <p className="font-display text-[19px] text-cosmic-50/65 leading-[1.4] mt-3">
          What needs washing?
        </p>
      </div>
      <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/30">
        Tap to continue
      </span>
    </button>
  );
}

function CategorisePhase({
  selected,
  otherNote,
  onToggle,
  onChangeOther,
  onNext,
}: {
  selected: string[];
  otherNote: string;
  onToggle: (k: string) => void;
  onChangeOther: (v: string) => void;
  onNext: () => void;
}) {
  const otherSelected = selected.includes("something-else");
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-20 pb-20">
      <div className="flex flex-col items-center gap-3 max-w-sm">
        <Orb size="sm" />
        <p className="font-display text-[18px] text-cosmic-50/90 text-center mt-4">
          What kind of thing is this?
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((c) => {
            const isSelected = selected.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onToggle(c.key)}
                className={[
                  "py-3 px-3 rounded-md border transition-colors duration-200",
                  "font-display text-[15px]",
                  isSelected
                    ? "border-cosmic-50/55 bg-cosmic-50/8 text-cosmic-50"
                    : "border-cosmic-50/15 text-cosmic-50/85 hover:border-cosmic-50/35",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {otherSelected ? (
          <input
            type="text"
            value={otherNote}
            onChange={(e) => onChangeOther(e.target.value.slice(0, 60))}
            placeholder="A few words"
            className="w-full bg-transparent border-b border-cosmic-50/25 py-2 px-1 font-display text-[16px] text-cosmic-50 placeholder:text-cosmic-50/30 focus:outline-none focus:border-cosmic-50/55"
          />
        ) : null}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={selected.length === 0}
        className={[
          "font-sans text-[12px] tracking-[0.16em] uppercase",
          "border rounded-sm px-6 py-3",
          "transition-colors duration-300",
          selected.length === 0
            ? "text-cosmic-50/25 border-cosmic-50/10 cursor-not-allowed"
            : "text-cosmic-50/85 border-cosmic-50/30 hover:text-cosmic-50 hover:border-cosmic-50/60",
        ].join(" ")}
      >
        Continue
      </button>
    </section>
  );
}

function EmotionPhase({
  state,
  subExpression,
  onSelectState,
  onSelectSub,
  onNext,
}: {
  state: YamatoState | null;
  subExpression: { key: string; english: string } | null;
  onSelectState: (s: YamatoState) => void;
  onSelectSub: (s: { key: string; english: string } | null) => void;
  onNext: () => void;
}) {
  const def = state ? getYamatoState(state) : null;
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-20 pb-20">
      <div className="flex flex-col items-center gap-3">
        <Orb size="sm" />
        <p className="font-display text-[18px] text-cosmic-50/90 text-center mt-4 max-w-xs">
          How does this feel right now?
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="w-full flex items-center justify-between sm:justify-center sm:gap-4">
          {YAMATO_STATES.map((s) => {
            const isFocused = state === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  onSelectState(s.key);
                  onSelectSub(null);
                }}
                className={[
                  "flex flex-col items-center px-1 py-1 w-[60px]",
                  "transition-opacity duration-300",
                  isFocused
                    ? "opacity-100"
                    : state === null
                      ? "opacity-85 hover:opacity-100"
                      : "opacity-40 hover:opacity-80",
                ].join(" ")}
              >
                <span className="font-display text-[13px] sm:text-[15px] text-cosmic-50 text-center leading-[1.15]">
                  {s.english}
                </span>
                <span
                  className="font-jp-serif text-[10px] tracking-[0.04em] text-cosmic-50/45 mt-1 text-center"
                  style={{ fontFamily: "var(--font-jp-serif)" }}
                >
                  {s.kanji}
                </span>
              </button>
            );
          })}
        </div>

        {def ? (
          <div className="w-full flex flex-wrap items-start justify-center gap-x-4 gap-y-2 mt-2">
            {def.subExpressions.slice(0, 4).map((sub) => {
              const isSelected = subExpression?.key === sub.key;
              return (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() =>
                    onSelectSub(
                      isSelected ? null : { key: sub.key, english: sub.english }
                    )
                  }
                  className={[
                    "px-2 py-1 transition-opacity duration-300",
                    isSelected
                      ? "opacity-100"
                      : "opacity-55 hover:opacity-90",
                  ].join(" ")}
                >
                  <span className="font-display text-[14px] text-cosmic-50/90">
                    {sub.english}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={state === null}
        className={[
          "font-sans text-[12px] tracking-[0.16em] uppercase",
          "border rounded-sm px-6 py-3",
          "transition-colors duration-300",
          state === null
            ? "text-cosmic-50/25 border-cosmic-50/10 cursor-not-allowed"
            : "text-cosmic-50/85 border-cosmic-50/30 hover:text-cosmic-50 hover:border-cosmic-50/60",
        ].join(" ")}
      >
        Continue
      </button>
    </section>
  );
}

function GuidancePhase({
  onPaper,
  onTypeInstead,
}: {
  onPaper: () => void;
  onTypeInstead: () => void;
}) {
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-20 pb-20">
      <Orb size="sm" />

      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="font-display text-[17px] text-cosmic-50/90 leading-[1.6] text-center">
          <p>Now reach for your notebook.</p>
          <p className="mt-4">Write the worry through, then write what is actually true.</p>
          <p className="mt-4 text-cosmic-50/65">
            Often, when we write it down, we see it differently. What facts
            would your future self want you to remember?
          </p>
          <p className="mt-4 text-cosmic-50/65">
            When you are finished, you do not need to return here.
          </p>
        </div>
        <button
          type="button"
          onClick={onTypeInstead}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45 hover:text-cosmic-50/75 transition-colors underline-offset-4 hover:underline"
        >
          Type here instead
        </button>
      </div>

      <button
        type="button"
        onClick={onPaper}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/85 hover:text-cosmic-50 border border-cosmic-50/30 hover:border-cosmic-50/60 px-6 py-3 rounded-sm transition-colors duration-300"
      >
        I'm done
      </button>
    </section>
  );
}

function WritePhase({
  worry,
  reality,
  onChangeWorry,
  onChangeReality,
  onSave,
}: {
  worry: string;
  reality: string;
  onChangeWorry: (v: string) => void;
  onChangeReality: (v: string) => void;
  onSave: () => void;
}) {
  return (
    <section className="min-h-svh flex flex-col items-stretch px-6 pt-20 pb-20 gap-5">
      <div className="text-center">
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45">
          Mind Wash
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-4 max-w-md w-full mx-auto">
        <label className="block">
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55">
            The worry
          </span>
          <textarea
            value={worry}
            onChange={(e) => onChangeWorry(e.target.value)}
            placeholder="Write it through."
            rows={5}
            className="w-full mt-2 bg-transparent border border-cosmic-50/15 rounded-md p-3 font-display text-[15px] text-cosmic-50 placeholder:text-cosmic-50/25 focus:outline-none focus:border-cosmic-50/40"
          />
        </label>
        <p className="font-display text-[13px] text-cosmic-50/55 leading-[1.55] px-1">
          Often, when we write it down, we see it differently. What facts
          would your future self want you to remember?
        </p>
        <label className="block">
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55">
            The reality
          </span>
          <textarea
            value={reality}
            onChange={(e) => onChangeReality(e.target.value)}
            placeholder="What is actually true."
            rows={5}
            className="w-full mt-2 bg-transparent border border-cosmic-50/15 rounded-md p-3 font-display text-[15px] text-cosmic-50 placeholder:text-cosmic-50/25 focus:outline-none focus:border-cosmic-50/40"
          />
        </label>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSave}
          className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/85 hover:text-cosmic-50 border border-cosmic-50/30 hover:border-cosmic-50/60 px-6 py-3 rounded-sm transition-colors duration-300"
        >
          Save
        </button>
      </div>
    </section>
  );
}

function ClosurePhase({ onNext }: { onNext: () => void }) {
  // Atmospheric only. Five seconds before tap is enabled.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setEnabled(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <button
      type="button"
      onClick={enabled ? onNext : undefined}
      className="min-h-svh w-full flex flex-col items-center justify-center px-6"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.45 0.05 80 / 0.4) 0%, transparent 70%)",
          animation: "auwa-closure-bloom 4500ms ease-in-out forwards",
          opacity: 0,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <Orb size="md" still />
        <p className="font-display text-[22px] text-cosmic-50/95 text-center max-w-xs leading-[1.4]">
          Held.
        </p>
        <p className="font-display text-[18px] text-cosmic-50/65 text-center max-w-xs leading-[1.5]">
          Go gently.
        </p>
      </div>
      <style>{`
        @keyframes auwa-closure-bloom {
          0%   { opacity: 0; }
          25%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </button>
  );
}

function HandoffPhase({
  onRest,
  onLeave,
}: {
  onRest: () => void;
  onLeave: () => void;
}) {
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-20 pb-20">
      <Orb size="sm" />
      <p className="font-display text-[19px] text-cosmic-50/85 text-center max-w-xs leading-[1.5]">
        Would you like a moment to settle?
      </p>
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={onLeave}
          className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={onRest}
          className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/85 hover:text-cosmic-50 border border-cosmic-50/30 hover:border-cosmic-50/60 px-6 py-3 rounded-sm transition-colors duration-300"
        >
          Yes, sit a moment
        </button>
      </div>
    </section>
  );
}
