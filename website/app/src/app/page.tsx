"use client";

/*
  Daily Revelation Spine + onboarding tail (closing + signup).

  Phases:
    arrival   → tap a Yamato state on the arc
    refining  → optional sub-expression refinement (tap or skip)
    context   → optional "what were you up to" tag (tap or skip)
    shower    → 3.6s light shower covers any classification latency
    revelation → gradient bloom, Kokoro hero, reflection text
    light     → optional Daily Light capture (DailyLightCapture)
    closing   → (first-run only) "Auwa will be here when you return."
    signup    → (first-run only) signup prompt with continue-as-guest

  On mount, redirects to /welcome if the user has not yet
  picked motifs (welcome incomplete). On the first revelation, the
  store still has onboarding.completed = false; the closing + signup
  phases land after the Daily Light capture, then completeOnboarding
  fires and the user returns to arrival.

  Secondary destinations (archive, trove, sanctuary, senshin, kokoro,
  letter, settings) live at their own routes — wired via the quiet
  entries row.
*/

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { StateArc } from "@/components/state-arc";
import { SubExpressionRow } from "@/components/sub-expression-row";
import { ContextGrid, type ContextResult } from "@/components/context-grid";
import { LightShower } from "@/components/light-shower";
import { GradientField } from "@/components/gradient-field";
import { DailyLightCapture } from "@/components/daily-light-capture";
import { QuietEntries } from "@/components/quiet-entries";
import {
  getYamatoState,
  type YamatoState,
  type SubExpression,
} from "@/lib/yamato";
import { pickPlaceholderReflection } from "@/lib/reflections-placeholder";
import {
  addRevelation,
  completeOnboarding,
  lastRevelation,
  useAppStore,
  useStoreReady,
} from "@/lib/app-store";

type Phase =
  | "arrival"
  | "refining"
  | "context"
  | "shower"
  | "revelation"
  | "light"
  | "closing"
  | "signup";

export default function KokoroMirror() {
  const router = useRouter();
  const store = useAppStore();
  const ready = useStoreReady();

  const [phase, setPhase] = useState<Phase>("arrival");
  const [state, setState] = useState<YamatoState | null>(null);
  const [subExpression, setSubExpression] = useState<SubExpression | null>(null);
  const [contextResult, setContextResult] = useState<ContextResult | null>(null);
  const [reflection, setReflection] = useState<string>("");

  // Onboarding welcome incomplete → bounce to /welcome.
  // We only redirect after hydration, so a real user with an
  // existing store doesn't get bounced mid-render.
  useEffect(() => {
    if (!ready) return;
    if (store.onboarding.motifs.length === 0) {
      router.replace("/welcome");
    }
  }, [ready, store.onboarding.motifs.length, router]);

  const stateDef = state ? getYamatoState(state) : null;
  const isFirstRun = ready && !store.onboarding.completed;
  const last = lastRevelation(store);

  const handleStateSelect = useCallback((s: YamatoState) => {
    setState(s);
    setSubExpression(null);
    setPhase("refining");
  }, []);

  const handleProceedFromRefine = useCallback(() => {
    setPhase("context");
  }, []);

  const handleContextSelect = useCallback(
    (result: ContextResult) => {
      setContextResult(result);
      if (state) setReflection(pickPlaceholderReflection(state));
      setPhase("shower");
    },
    [state]
  );

  const handleContextSkip = useCallback(() => {
    setContextResult(null);
    if (state) setReflection(pickPlaceholderReflection(state));
    setPhase("shower");
  }, [state]);

  const handleShowerComplete = useCallback(() => {
    // Persist the revelation as the shower completes — by the time
    // the user reads the text, it's already in the archive.
    if (state && reflection) {
      addRevelation({
        state,
        subExpressionKey: subExpression?.key,
        subExpressionEnglish: subExpression?.english,
        contextTag: contextResult?.tag,
        contextNote: contextResult?.note,
        reflection,
      });
    }
    setPhase("revelation");
  }, [state, reflection, subExpression, contextResult]);

  const handleRevelationContinue = useCallback(() => {
    setPhase("light");
  }, []);

  const handleLightDone = useCallback(() => {
    if (isFirstRun) {
      setPhase("closing");
    } else {
      handleStartOver();
    }
  }, [isFirstRun]);

  const handleClosingContinue = useCallback(() => {
    setPhase("signup");
  }, []);

  const handleSignupContinue = useCallback(() => {
    completeOnboarding();
    handleStartOver();
  }, []);

  const handleStartOver = useCallback(() => {
    setState(null);
    setSubExpression(null);
    setContextResult(null);
    setReflection("");
    setPhase("arrival");
  }, []);

  const screen = useMemo(() => {
    switch (phase) {
      case "arrival":
        return (
          <ArrivalScreen
            onSelectState={handleStateSelect}
            lastState={last?.state ?? null}
          />
        );
      case "refining":
        if (!stateDef || !state) return null;
        return (
          <RefiningScreen
            state={state}
            subExpression={subExpression}
            onSelectSub={setSubExpression}
            onProceed={handleProceedFromRefine}
          />
        );
      case "context":
        return (
          <ContextScreen
            onSelect={handleContextSelect}
            onSkip={handleContextSkip}
          />
        );
      case "shower":
        return null;
      case "revelation":
        if (!state) return null;
        return (
          <RevelationScreen
            state={state}
            reflection={reflection}
            onContinue={handleRevelationContinue}
          />
        );
      case "light":
        return (
          <DailyLightCapture
            onSkip={handleLightDone}
            onCaptured={handleLightDone}
          />
        );
      case "closing":
        return <ClosingScreen onContinue={handleClosingContinue} />;
      case "signup":
        return <SignupScreen onContinue={handleSignupContinue} />;
    }
  }, [
    phase,
    state,
    stateDef,
    subExpression,
    reflection,
    last,
    handleStateSelect,
    handleProceedFromRefine,
    handleContextSelect,
    handleContextSkip,
    handleRevelationContinue,
    handleLightDone,
    handleClosingContinue,
    handleSignupContinue,
  ]);

  return (
    <main id="main-content" className="min-h-svh relative overflow-hidden">
      {phase === "shower" ? (
        <div className="absolute inset-0 bg-[var(--color-void)]" />
      ) : null}
      {screen}
      {phase === "shower" && state ? (
        <LightShower state={state} onComplete={handleShowerComplete} />
      ) : null}
    </main>
  );
}

/* ---------- screens ---------- */

function ArrivalScreen({
  onSelectState,
  lastState,
}: {
  onSelectState: (s: YamatoState) => void;
  lastState: YamatoState | null;
}) {
  const lastDef = lastState ? getYamatoState(lastState) : null;
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12 relative">
      {/* Quiet corner links — settings sits top-right, archive
          top-left. Both are intentionally small and low-opacity so
          arrival reads as Kokoro + arc + entries primarily. */}
      <Link
        href="/archive"
        className="absolute top-5 left-5 font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/30 hover:text-cosmic-50/65 transition-colors"
      >
        Archive
      </Link>
      <Link
        href="/settings"
        className="absolute top-5 right-5 font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/30 hover:text-cosmic-50/65 transition-colors"
      >
        Settings
      </Link>

      <Link
        href="/kokoro"
        className="flex flex-col items-center gap-4 pt-4"
        aria-label="Open Kokoro view"
      >
        <Orb size="sm" />
        <KokoroSilhouette size="md" />
      </Link>

      <div className="w-full flex flex-col items-center gap-6">
        {lastDef ? (
          <Link
            href="/archive"
            className="font-sans text-[11px] tracking-[0.16em] uppercase text-cosmic-50/40 hover:text-cosmic-50/70 -mb-2 text-center transition-colors"
          >
            Your last visit, you carried {lastDef.english}
          </Link>
        ) : null}
        <p className="font-display text-[18px] text-cosmic-50/85 text-center">
          How are you feeling right now?
        </p>
        <StateArc onSelect={onSelectState} />
      </div>

      <QuietEntries />
    </section>
  );
}

function RefiningScreen({
  state,
  subExpression,
  onSelectSub,
  onProceed,
}: {
  state: YamatoState;
  subExpression: SubExpression | null;
  onSelectSub: (sub: SubExpression | null) => void;
  onProceed: () => void;
}) {
  const def = getYamatoState(state);
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12">
      <div className="flex flex-col items-center gap-3">
        <Orb size="sm" />
        <KokoroSilhouette size="sm" />
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="font-display text-[22px] text-cosmic-50">
            {def.english}
          </span>
          <span
            className="font-jp-serif text-[12px] tracking-[0.04em] text-cosmic-50/55 mt-1"
            style={{ fontFamily: "var(--font-jp-serif)" }}
          >
            {def.kanji} {def.romaji}
          </span>
        </div>
        <p className="font-display text-[15px] text-cosmic-50/55 text-center max-w-xs">
          Closer to anything in particular?
        </p>
        <SubExpressionRow
          state={state}
          selected={subExpression?.key ?? null}
          onSelect={onSelectSub}
        />
      </div>

      <button
        type="button"
        onClick={onProceed}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/70 hover:text-cosmic-50 border border-cosmic-50/20 hover:border-cosmic-50/40 px-6 py-3 rounded-sm transition-colors duration-300"
      >
        Continue
      </button>
    </section>
  );
}

function ContextScreen({
  onSelect,
  onSkip,
}: {
  onSelect: (r: ContextResult) => void;
  onSkip: () => void;
}) {
  return (
    <section className="min-h-svh flex items-center justify-center px-6 py-16">
      <ContextGrid onSelect={onSelect} onSkip={onSkip} />
    </section>
  );
}

function RevelationScreen({
  state,
  reflection,
  onContinue,
}: {
  state: YamatoState;
  reflection: string;
  onContinue: () => void;
}) {
  const def = getYamatoState(state);
  const share = async () => {
    const text = `${reflection}\n\nRevealed by Auwa.`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: `Auwa: ${def.english}`,
          text,
          url: "https://auwa.app",
        });
        return;
      } catch {
        // user cancelled — fall through to clipboard fallback
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };
  return (
    <section className="min-h-svh relative">
      <GradientField state={state} />
      <div className="relative z-10 min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12">
        <Orb size="sm" />
        <div className="flex flex-col items-center gap-8 max-w-md">
          <KokoroSilhouette size="lg" />
          <p className="font-display text-[17px] sm:text-[18px] text-cosmic-50/95 text-center leading-[1.45] tracking-[0.005em]">
            {reflection}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={share}
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors duration-300"
          >
            Share
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/40 hover:text-cosmic-50/80 transition-colors duration-300"
          >
            Tap to continue
          </button>
        </div>
      </div>
    </section>
  );
}

function ClosingScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="min-h-svh w-full flex flex-col items-center justify-center px-6"
    >
      <Orb size="lg" />
      <p className="font-display text-[19px] text-cosmic-50/85 text-center mt-12 max-w-xs leading-[1.5]">
        Auwa will be here when you return.
      </p>
      <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/35 mt-8">
        Tap to continue
      </span>
    </button>
  );
}

function SignupScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12">
      <Orb size="md" />
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <p className="font-display text-[20px] text-cosmic-50 text-center leading-[1.4]">
          Your Kokoro is yours.
        </p>
        <p className="font-display text-[15px] text-cosmic-50/65 text-center leading-[1.55]">
          To carry it across devices, across time, across small forgettings,
          give Auwa a way to find you again. For now, you can continue as a
          guest. Your Kokoro lives on this device.
        </p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-cosmic-50/85 hover:text-cosmic-50 border border-cosmic-50/30 hover:border-cosmic-50/60 px-6 py-3 rounded-sm transition-colors duration-300"
      >
        Continue as guest
      </button>
    </section>
  );
}
