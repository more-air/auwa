"use client";

/*
  Onboarding (welcome) — §2.1 of context/pillar/app.md.

  Eight phases handled here (1-8); the daily flow + closing + signup
  (9-11) live in /page.tsx where the route lands next.

    1. Welcome           2. What brings you      3. Personalisation
    4. First-gift        5. When does Auwa fit   6. Pick a quality
    7. Where did you     8. Breath interlude

  Design system (rebuilt 29 May 2026 per Tom's craft pass):
  - The simple Auwa character accompanies every screen (Finch-style);
    on personalisation it visibly gains the user's motifs; the full
    Kokoro (motifs + first gift) is the reveal at the first-gift beat.
  - Chrome is centralised in OnboardingShell: Stoic-style equal-segment
    progress at top, a back chevron from step 2 on, and the circle-arrow
    AdvanceButton bottom-right (one consistent advance affordance).
  - Titles use t-display (the one screen-title rule). Option tiles use
    the TapCard primitive at the shared card radius.
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { PlaceholderAsset } from "@/components/placeholder-asset";
import { StepProgress } from "@/components/step-progress";
import { AdvanceButton } from "@/components/advance-button";
import { ChevronLeft } from "lucide-react";
import { FIRST_GIFT_MOTIF, MOTIFS, type MotifCategory } from "@/lib/motifs";
import {
  updateOnboarding,
  useAppStore,
  useStoreReady,
  type Source,
  type Trait,
  type WhatBrings,
  type WhenFits,
} from "@/lib/app-store";

type Phase =
  | "welcome"
  | "whatBrings"
  | "personalisation"
  | "firstGift"
  | "whenFits"
  | "trait"
  | "source"
  | "breath";

const MOTIF_CATEGORIES: MotifCategory[] = [
  "creatures",
  "places",
  "elements",
  "objects",
];

/* The five question/selection steps share the progress track. The
   atmospheric beats (welcome, firstGift, breath) sit outside it. */
const STEP_INDEX: Partial<Record<Phase, number>> = {
  whatBrings: 0,
  personalisation: 1,
  whenFits: 2,
  trait: 3,
  source: 4,
};
const TOTAL_STEPS = 5;

export default function Welcome() {
  const router = useRouter();
  const store = useAppStore();
  const ready = useStoreReady();
  const [phase, setPhase] = useState<Phase>("welcome");

  useEffect(() => {
    if (ready && store.onboarding.completed) {
      router.replace("/");
    }
  }, [ready, store.onboarding.completed, router]);

  const finishWelcome = () => router.push("/");

  return (
    <main
      id="main-content"
      className="h-svh relative overflow-hidden flex flex-col"
    >
      {phase === "welcome" && (
        <WelcomePhase onNext={() => setPhase("whatBrings")} />
      )}
      {phase === "whatBrings" && (
        <WhatBringsPhase
          selected={store.onboarding.whatBrings}
          onBack={() => setPhase("welcome")}
          onSelect={(v) => updateOnboarding({ whatBrings: v })}
          onNext={() => setPhase("personalisation")}
        />
      )}
      {phase === "personalisation" && (
        <PersonalisationPhase
          picked={store.onboarding.motifs}
          onBack={() => setPhase("whatBrings")}
          onNext={(motifs) => {
            updateOnboarding({ motifs });
            setPhase("firstGift");
          }}
        />
      )}
      {phase === "firstGift" && (
        <FirstGiftPhase
          motifs={store.onboarding.motifs}
          onNext={() => {
            updateOnboarding({ firstGiftMotif: FIRST_GIFT_MOTIF.key });
            setPhase("whenFits");
          }}
        />
      )}
      {phase === "whenFits" && (
        <WhenFitsPhase
          selected={store.onboarding.whenFits}
          onBack={() => setPhase("firstGift")}
          onNext={(v) => {
            updateOnboarding({ whenFits: v });
            setPhase("trait");
          }}
        />
      )}
      {phase === "trait" && (
        <TraitPhase
          selected={store.onboarding.trait}
          onBack={() => setPhase("whenFits")}
          onSelect={(v) => updateOnboarding({ trait: v })}
          onNext={() => setPhase("source")}
        />
      )}
      {phase === "source" && (
        <SourcePhase
          selected={store.onboarding.source}
          onBack={() => setPhase("trait")}
          onSelect={(v) => updateOnboarding({ source: v })}
          onNext={() => setPhase("breath")}
        />
      )}
      {phase === "breath" && <BreathPhase onNext={finishWelcome} />}
    </main>
  );
}

/* ============================================================
   OnboardingShell — the consistent chrome for every step.

   [progress]                          (back chevron, step ≥ 2)
   [            companion + content            ]   (flex-1)
                              [ ← advance circle-arrow ]
   ============================================================ */

function OnboardingShell({
  step,
  onBack,
  onAdvance,
  canAdvance = true,
  advanceLabel = "Continue",
  children,
}: {
  /** Zero-based step index — shows the progress track when set. */
  step?: number;
  onBack?: () => void;
  onAdvance?: () => void;
  canAdvance?: boolean;
  advanceLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative flex-1 min-h-0 flex flex-col px-6"
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
        {typeof step === "number" ? (
          <StepProgress total={TOTAL_STEPS} current={step} />
        ) : null}
      </div>

      <div className="flex-1 flex flex-col min-h-0">{children}</div>

      {onAdvance ? (
        <div className="flex-none flex justify-end pt-4">
          <AdvanceButton
            direction="next"
            onClick={onAdvance}
            disabled={!canAdvance}
            aria-label={advanceLabel}
          />
        </div>
      ) : null}
    </section>
  );
}

/* A consistent body: companion up top, serif title, then content.
   Sparse screens centre; the personalisation screen overrides this. */
function StepBody({
  companion,
  title,
  children,
}: {
  companion: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-9 py-4">
      {companion}
      <div className="w-full flex flex-col items-center gap-7 max-w-sm">
        <h1 className="t-display text-cosmic-50/95 text-center text-balance">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

/* ---------- phases ---------- */

function WelcomePhase({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingShell onAdvance={onNext} advanceLabel="Begin">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-4">
        <KokoroSilhouette size="lg" halo />
        <div className="text-center t-voice-l text-cosmic-50/90 leading-[1.45] max-w-[17rem]">
          <p>Auwa reveals what is there in you.</p>
          <p className="mt-2">Choose a few things you love.</p>
          <p className="mt-2">Your Kokoro starts here.</p>
        </div>
      </div>
    </OnboardingShell>
  );
}

function WhatBringsPhase({
  selected,
  onBack,
  onSelect,
  onNext,
}: {
  selected: WhatBrings | undefined;
  onBack: () => void;
  onSelect: (v: WhatBrings) => void;
  onNext: () => void;
}) {
  const options: { key: WhatBrings; label: string }[] = [
    { key: "curiosity", label: "Curiosity" },
    { key: "restlessness", label: "A restlessness" },
    { key: "change", label: "A recent change" },
    { key: "something-else", label: "Something else" },
  ];
  return (
    <OnboardingShell
      step={STEP_INDEX.whatBrings}
      onBack={onBack}
      onAdvance={onNext}
      canAdvance={Boolean(selected)}
    >
      <StepBody
        companion={<KokoroSilhouette size="md" halo />}
        title="What brings you to Auwa?"
      >
        <div className="w-full flex flex-col gap-2.5">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              selected={selected === o.key}
              onClick={() => onSelect(o.key)}
            />
          ))}
        </div>
      </StepBody>
    </OnboardingShell>
  );
}

function PersonalisationPhase({
  picked,
  onBack,
  onNext,
}: {
  picked: string[];
  onBack: () => void;
  onNext: (motifs: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(picked);
  const enough = selected.length >= 5;
  const limit = 7;
  const remaining = Math.max(0, 5 - selected.length);

  return (
    <OnboardingShell
      step={STEP_INDEX.personalisation}
      onBack={onBack}
      onAdvance={() => enough && onNext(selected)}
      canAdvance={enough}
    >
      {/* Companion pinned at the top with breathing room so the motifs
          visibly land on the Kokoro as they're picked. */}
      <div className="flex-none flex flex-col items-center gap-3 pt-2 pb-4">
        <KokoroSilhouette size="md" motifs={selected} />
        <p className="t-voice-l text-cosmic-50/90 text-center max-w-xs">
          {enough
            ? "Your Kokoro is taking shape."
            : `Choose ${remaining} or more things that feel like you.`}
        </p>
      </div>

      {/* Scrollable motif grid fills the remaining space; the advance
          button stays pinned and visible the whole time. */}
      <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-md mx-auto flex flex-col gap-5 py-1">
        {MOTIF_CATEGORIES.map((cat) => {
          const items = MOTIFS.filter((m) => m.category === cat);
          return (
            <div key={cat}>
              <h3 className="t-eyebrow text-cosmic-50/40 mb-2">{cat}</h3>
              <div className="grid grid-cols-3 gap-2">
                {items.map((m) => {
                  const isSelected = selected.includes(m.key);
                  const disabled = !isSelected && selected.length >= limit;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        setSelected((s) =>
                          isSelected
                            ? s.filter((k) => k !== m.key)
                            : [...s, m.key]
                        )
                      }
                      className={[
                        "aspect-square rounded-card border transition-colors duration-200",
                        "flex items-center justify-center text-center px-2",
                        isSelected
                          ? "border-cosmic-50/55 bg-cosmic-50/10"
                          : disabled
                            ? "border-cosmic-50/8 opacity-30"
                            : "border-cosmic-50/15 hover:border-cosmic-50/35",
                      ].join(" ")}
                    >
                      <span className="t-meta text-cosmic-50/90 leading-tight">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </OnboardingShell>
  );
}

function FirstGiftPhase({
  motifs,
  onNext,
}: {
  motifs: string[];
  onNext: () => void;
}) {
  // Atmospheric beat: the Kokoro sits in its just-personalised state,
  // and one more motif (Auwa's gift) drifts down and settles. No orb.
  const [tapEnabled, setTapEnabled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setTapEnabled(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <OnboardingShell
      onAdvance={tapEnabled ? onNext : undefined}
      canAdvance={tapEnabled}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-4">
        <div className="relative">
          <KokoroSilhouette size="lg" motifs={motifs} halo />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-12 h-12"
            style={{
              top: "-16%",
              animation:
                "auwa-first-gift 3500ms cubic-bezier(0.16, 1, 0.3, 1) 600ms forwards",
              opacity: 0,
            }}
          >
            <PlaceholderAsset
              label={FIRST_GIFT_MOTIF.label}
              tone="cosmic-800"
              rounded
            />
          </div>
        </div>
        <p
          className="t-display text-cosmic-50/90 text-center text-balance max-w-[16rem]"
          style={{
            animation: "auwa-fade-in 1800ms ease-out 2000ms forwards",
            opacity: 0,
          }}
        >
          Auwa noticed something else in you.
        </p>
      </div>
      <style>{`
        @keyframes auwa-first-gift {
          0%   { opacity: 0; transform: translate(-50%, -52px) scale(0.7); }
          30%  { opacity: 1; transform: translate(-50%, -52px) scale(1);   }
          80%  { opacity: 1; transform: translate(2.6rem, 150px) scale(0.9); }
          100% { opacity: 1; transform: translate(2.6rem, 150px) scale(0.9); }
        }
        @keyframes auwa-fade-in { to { opacity: 1; } }
      `}</style>
    </OnboardingShell>
  );
}

function WhenFitsPhase({
  selected,
  onBack,
  onNext,
}: {
  selected: WhenFits[];
  onBack: () => void;
  onNext: (v: WhenFits[]) => void;
}) {
  const [picks, setPicks] = useState<WhenFits[]>(selected);
  return (
    <OnboardingShell
      step={STEP_INDEX.whenFits}
      onBack={onBack}
      onAdvance={() => picks.length > 0 && onNext(picks)}
      canAdvance={picks.length > 0}
    >
      <StepBody
        companion={<KokoroSilhouette size="md" halo />}
        title="When does Auwa fit your day?"
      >
        <div className="w-full grid grid-cols-2 gap-2.5">
          {(["morning", "evening"] as WhenFits[]).map((k) => (
            <TapCard
              key={k}
              label={k === "morning" ? "Morning" : "Evening"}
              selected={picks.includes(k)}
              onClick={() =>
                setPicks((p) =>
                  p.includes(k) ? p.filter((x) => x !== k) : [...p, k]
                )
              }
            />
          ))}
        </div>
      </StepBody>
    </OnboardingShell>
  );
}

function TraitPhase({
  selected,
  onBack,
  onSelect,
  onNext,
}: {
  selected: Trait | undefined;
  onBack: () => void;
  onSelect: (v: Trait) => void;
  onNext: () => void;
}) {
  const options: { key: Trait; label: string; descr: string }[] = [
    { key: "quiet", label: "Quiet", descr: "still water" },
    { key: "curious", label: "Curious", descr: "always looking" },
    { key: "steadfast", label: "Steadfast", descr: "slow and sure" },
    { key: "open", label: "Open", descr: "weather-ready" },
  ];
  return (
    <OnboardingShell
      step={STEP_INDEX.trait}
      onBack={onBack}
      onAdvance={onNext}
      canAdvance={Boolean(selected)}
    >
      <StepBody
        companion={<KokoroSilhouette size="md" halo />}
        title="Pick a quality your Kokoro carries."
      >
        <div className="w-full grid grid-cols-2 gap-2.5">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              sublabel={o.descr}
              selected={selected === o.key}
              onClick={() => onSelect(o.key)}
            />
          ))}
        </div>
      </StepBody>
    </OnboardingShell>
  );
}

function SourcePhase({
  selected,
  onBack,
  onSelect,
  onNext,
}: {
  selected: Source | undefined;
  onBack: () => void;
  onSelect: (v: Source) => void;
  onNext: () => void;
}) {
  const options: { key: Source; label: string }[] = [
    { key: "instagram", label: "Instagram" },
    { key: "tiktok", label: "TikTok" },
    { key: "friend", label: "A friend" },
    { key: "podcast", label: "A podcast" },
    { key: "journal", label: "A journal article" },
    { key: "app-store", label: "App Store" },
    { key: "somewhere-else", label: "Somewhere else" },
  ];
  return (
    <OnboardingShell
      step={STEP_INDEX.source}
      onBack={onBack}
      onAdvance={onNext}
      canAdvance={Boolean(selected)}
    >
      <StepBody
        companion={<KokoroSilhouette size="md" halo />}
        title="Where did you find Auwa?"
      >
        <div className="w-full grid grid-cols-2 gap-2.5">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              selected={selected === o.key}
              onClick={() => onSelect(o.key)}
            />
          ))}
        </div>
      </StepBody>
    </OnboardingShell>
  );
}

function BreathPhase({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingShell onAdvance={onNext} advanceLabel="Continue">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-4">
        <KokoroSilhouette size="lg" halo />
        <p className="t-display text-cosmic-50/90 text-center text-balance max-w-[17rem]">
          In a moment, Auwa will reveal what is there in you.
        </p>
      </div>
    </OnboardingShell>
  );
}

/* ---------- shared option tile ---------- */

function TapCard({
  label,
  sublabel,
  selected = false,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "py-4 px-4 rounded-card border transition-[background-color,border-color,transform] duration-[var(--duration-press)]",
        "flex flex-col items-center justify-center text-center active:scale-[0.98]",
        selected
          ? "border-cosmic-50/55 bg-cosmic-50/10"
          : "border-cosmic-50/15 bg-cosmic-50/[0.03] hover:border-cosmic-50/35 hover:bg-cosmic-50/[0.06]",
      ].join(" ")}
    >
      <span className="t-button text-cosmic-50/95">{label}</span>
      {sublabel ? (
        <span className="t-eyebrow text-cosmic-50/40 mt-1">{sublabel}</span>
      ) : null}
    </button>
  );
}
