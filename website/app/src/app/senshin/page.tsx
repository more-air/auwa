"use client";

/*
  Senshin entry flow (§5.17, §9) — the Mind Wash.

  Rebuilt 29 May 2026 to share the app's flow chrome: a SenshinShell
  (back chevron + equal-segment progress + circle-arrow advance) so the
  sequence matches onboarding and the daily flow exactly. Adds a first-
  time intro that explains what Senshin is (a first-timer used to land
  straight on "what needs washing?" with no context). Crisis support is
  a short, quiet link, present where it's needed.

  v1 storage: plain localStorage so testers can walk the flow. The
  paper-first path keeps the worst content off-device; the in-app
  fallback MUST gain end-to-end encryption (context/business/privacy.md
  §3) before public release.
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { StepProgress } from "@/components/step-progress";
import { AdvanceButton } from "@/components/advance-button";
import {
  YAMATO_STATES,
  getYamatoState,
  type YamatoState,
} from "@/lib/yamato";
import { addSenshin } from "@/lib/app-store";

type Phase =
  | "intro"
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
  const [phase, setPhase] = useState<Phase>("intro");
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
    <main id="main-content" className="h-svh relative overflow-hidden bg-[var(--color-void)]">
      {phase === "intro" && (
        <IntroPhase
          onExit={() => router.push("/")}
          onNext={() => setPhase("categorise")}
        />
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
          onBack={() => setPhase("intro")}
          onNext={() => setPhase("emotion")}
        />
      )}
      {phase === "emotion" && (
        <EmotionPhase
          state={state}
          subExpression={subExpression}
          onSelectState={setState}
          onSelectSub={setSubExpression}
          onBack={() => setPhase("categorise")}
          onNext={() => setPhase("guidance")}
        />
      )}
      {phase === "guidance" && (
        <GuidancePhase
          onBack={() => setPhase("emotion")}
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
          onBack={() => setPhase("guidance")}
          onSave={() => {
            persist({
              worry: worryText.trim() || undefined,
              reality: realityText.trim() || undefined,
            });
            setPhase("closure");
          }}
        />
      )}
      {phase === "closure" && <ClosurePhase onNext={() => setPhase("handoff")} />}
      {phase === "handoff" && (
        <HandoffPhase
          onRest={() => router.push("/rest")}
          onLeave={() => router.push("/")}
        />
      )}
    </main>
  );
}

/* ============================================================
   SenshinShell — shared chrome for the working steps.
   ============================================================ */

function SenshinShell({
  step,
  onBack,
  onAdvance,
  canAdvance = true,
  advanceLabel = "Continue",
  footerLeft,
  children,
}: {
  step?: number;
  onBack?: () => void;
  onAdvance?: () => void;
  canAdvance?: boolean;
  advanceLabel?: string;
  footerLeft?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className="h-svh flex flex-col px-6"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <div className="relative h-10 flex items-center justify-center flex-none">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="absolute left-0 w-10 h-10 -ml-1 flex items-center justify-center text-cosmic-50/55 hover:text-cosmic-50 active:scale-[0.92] transition-[color,transform] duration-[var(--duration-press)] rounded-pill"
          >
            <ChevronLeft size={22} strokeWidth={1.75} />
          </button>
        ) : null}
        {typeof step === "number" ? <StepProgress total={3} current={step} /> : null}
      </div>

      <div className="flex-1 flex flex-col min-h-0">{children}</div>

      <div className="flex-none flex items-center justify-between pt-4 min-h-[56px]">
        <div className="flex-1">{footerLeft}</div>
        {onAdvance ? (
          <AdvanceButton
            direction="next"
            onClick={onAdvance}
            disabled={!canAdvance}
            aria-label={advanceLabel}
          />
        ) : null}
      </div>
    </section>
  );
}

function CrisisLink() {
  return (
    <Link
      href="/senshin/help"
      className="t-meta text-cosmic-50/40 hover:text-cosmic-50/70 transition-colors"
    >
      Need to talk to someone?
    </Link>
  );
}

/* ---------- phases ---------- */

function IntroPhase({ onExit, onNext }: { onExit: () => void; onNext: () => void }) {
  return (
    <SenshinShell onBack={onExit} onAdvance={onNext} advanceLabel="Begin" footerLeft={<CrisisLink />}>
      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <KokoroSilhouette size="md" halo />
        <div className="flex flex-col items-center gap-4 max-w-sm">
          <h1 className="t-display text-cosmic-50/95">What needs washing?</h1>
          <p className="t-voice text-cosmic-50/65 leading-[1.6]">
            When a worry will not let go, set it down here. Name what it is,
            sit with how it feels, then write it through and leave it at the
            gate. A few quiet minutes. Nothing is kept but the shape of it.
          </p>
          <Link
            href="/senshin/about"
            className="t-eyebrow text-cosmic-50/45 hover:text-cosmic-50/75 transition-colors mt-1"
          >
            About this practice
          </Link>
        </div>
      </div>
    </SenshinShell>
  );
}

function CategorisePhase({
  selected,
  otherNote,
  onToggle,
  onChangeOther,
  onBack,
  onNext,
}: {
  selected: string[];
  otherNote: string;
  onToggle: (k: string) => void;
  onChangeOther: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const otherSelected = selected.includes("something-else");
  return (
    <SenshinShell
      step={0}
      onBack={onBack}
      onAdvance={onNext}
      canAdvance={selected.length > 0}
      footerLeft={<CrisisLink />}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <h1 className="t-display text-cosmic-50/95 text-center">
          What kind of thing is this?
        </h1>
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((c) => (
              <Chip
                key={c.key}
                selected={selected.includes(c.key)}
                onClick={() => onToggle(c.key)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
          {otherSelected ? (
            <input
              type="text"
              value={otherNote}
              onChange={(e) => onChangeOther(e.target.value.slice(0, 60))}
              placeholder="A few words"
              className="w-full max-w-xs bg-transparent border-b border-cosmic-50/25 py-2 px-1 t-body text-[16px] text-cosmic-50 placeholder:text-cosmic-50/30 focus:outline-none focus:border-cosmic-50/55 text-center"
            />
          ) : null}
        </div>
      </div>
    </SenshinShell>
  );
}

function EmotionPhase({
  state,
  subExpression,
  onSelectState,
  onSelectSub,
  onBack,
  onNext,
}: {
  state: YamatoState | null;
  subExpression: { key: string; english: string } | null;
  onSelectState: (s: YamatoState) => void;
  onSelectSub: (s: { key: string; english: string } | null) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const def = state ? getYamatoState(state) : null;
  return (
    <SenshinShell
      step={1}
      onBack={onBack}
      onAdvance={onNext}
      canAdvance={state !== null}
      footerLeft={<CrisisLink />}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-9">
        <h1 className="t-display text-cosmic-50/95 text-center max-w-xs">
          How does this feel right now?
        </h1>

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
                  <span className="t-title text-[13px] sm:text-[15px] text-cosmic-50 text-center leading-[1.15]">
                    {s.english}
                  </span>
                  <span
                    className="t-jp text-cosmic-50/45 mt-1 text-center"
                    style={{ fontFamily: "var(--font-jp-serif)" }}
                  >
                    {s.kanji}
                  </span>
                </button>
              );
            })}
          </div>

          {def ? (
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-2">
              {def.subExpressions.slice(0, 4).map((sub) => {
                const isSelected = subExpression?.key === sub.key;
                return (
                  <Chip
                    key={sub.key}
                    size="sm"
                    selected={isSelected}
                    onClick={() =>
                      onSelectSub(
                        isSelected ? null : { key: sub.key, english: sub.english }
                      )
                    }
                  >
                    {sub.english}
                  </Chip>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </SenshinShell>
  );
}

function GuidancePhase({
  onBack,
  onPaper,
  onTypeInstead,
}: {
  onBack: () => void;
  onPaper: () => void;
  onTypeInstead: () => void;
}) {
  return (
    <SenshinShell
      step={2}
      onBack={onBack}
      onAdvance={onPaper}
      advanceLabel="Done"
      footerLeft={
        <button
          type="button"
          onClick={onTypeInstead}
          className="t-meta text-cosmic-50/45 hover:text-cosmic-50/75 transition-colors underline-offset-4 hover:underline"
        >
          Type here instead
        </button>
      }
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="t-display text-cosmic-50/95 max-w-sm">
          Reach for your notebook.
        </h1>
        <div className="t-voice text-cosmic-50/70 leading-[1.7] max-w-sm">
          <p>Write the worry through, then write what is actually true.</p>
          <p className="mt-4 text-cosmic-50/55">
            Often, when we write it down, we see it differently. What facts
            would your future self want you to remember?
          </p>
          <p className="mt-4 text-cosmic-50/55">
            When you are finished, you do not need to return here.
          </p>
        </div>
      </div>
    </SenshinShell>
  );
}

function WritePhase({
  worry,
  reality,
  onChangeWorry,
  onChangeReality,
  onBack,
  onSave,
}: {
  worry: string;
  reality: string;
  onChangeWorry: (v: string) => void;
  onChangeReality: (v: string) => void;
  onBack: () => void;
  onSave: () => void;
}) {
  return (
    <SenshinShell onBack={onBack} onAdvance={onSave} advanceLabel="Save">
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 max-w-md w-full mx-auto pt-2">
        <h1 className="t-display text-cosmic-50/95 text-center mb-2">Wash it through</h1>
        <label className="block">
          <span className="t-eyebrow text-cosmic-50/55">The worry</span>
          <textarea
            value={worry}
            onChange={(e) => onChangeWorry(e.target.value)}
            placeholder="Write it through."
            rows={4}
            className="w-full mt-2 bg-transparent border border-cosmic-50/15 rounded-card p-3 t-body text-cosmic-50 placeholder:text-cosmic-50/25 focus:outline-none focus:border-cosmic-50/40"
          />
        </label>
        <p className="t-voice text-cosmic-50/55 px-1">
          Often, when we write it down, we see it differently. What facts
          would your future self want you to remember?
        </p>
        <label className="block">
          <span className="t-eyebrow text-cosmic-50/55">The reality</span>
          <textarea
            value={reality}
            onChange={(e) => onChangeReality(e.target.value)}
            placeholder="What is actually true."
            rows={4}
            className="w-full mt-2 bg-transparent border border-cosmic-50/15 rounded-card p-3 t-body text-cosmic-50 placeholder:text-cosmic-50/25 focus:outline-none focus:border-cosmic-50/40"
          />
        </label>
      </div>
    </SenshinShell>
  );
}

function ClosurePhase({ onNext }: { onNext: () => void }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setEnabled(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className="h-svh relative flex flex-col items-center justify-center px-6"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, oklch(0.45 0.05 80 / 0.4) 0%, transparent 70%)",
          animation: "auwa-closure-bloom 4500ms ease-in-out forwards",
          opacity: 0,
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5">
        <KokoroSilhouette size="md" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="t-display text-cosmic-50/95 text-center">Held.</h1>
          <p className="t-body text-cosmic-50/55 text-center">Go gently.</p>
        </div>
      </div>
      <div
        className="relative z-10 flex justify-center transition-opacity duration-500"
        style={{ opacity: enabled ? 1 : 0 }}
      >
        <AdvanceButton direction="next" onClick={enabled ? onNext : undefined} aria-label="Continue" />
      </div>
      <style>{`
        @keyframes auwa-closure-bloom {
          0%   { opacity: 0; }
          25%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}

function HandoffPhase({ onRest, onLeave }: { onRest: () => void; onLeave: () => void }) {
  return (
    <section
      className="h-svh flex flex-col items-center justify-center px-6 gap-9"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
    >
      <KokoroSilhouette size="md" />
      <h1 className="t-display text-cosmic-50/95 text-center max-w-xs">
        Would you like a moment to settle?
      </h1>
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <Button variant="primary" fullWidth onClick={onRest}>
          Yes, sit a moment
        </Button>
        <Button variant="ghost" size="sm" onClick={onLeave}>
          Not now
        </Button>
      </div>
    </section>
  );
}
