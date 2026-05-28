"use client";

/*
  Daily Revelation Spine.

  Single state-managed page that flows:
    arrival   → tap a Yamato state on the arc
    refining  → optional sub-expression refinement (tap or skip)
    context   → optional "what were you up to" tag (tap or skip)
    shower    → 3.6s light shower covers any classification latency
    revelation → gradient bloom, Kokoro hero, reflection text

  No route changes between phases. The light shower needs to be an
  in-page transition, not a route navigation, so it never reads as a
  loading state (§11 design principles: "No loading spinners. The
  light shower covers all API latency").

  Secondary destinations (archive, trove, sanctuary, senshin, kokoro
  view) live at their own routes — to be added.

  Reflection text comes from the placeholder library for now
  (lib/reflections-placeholder.ts). Stage 6 swaps to the real
  Rieko-authored library served from Sanity.
*/

import { useCallback, useMemo, useState } from "react";
import { Orb } from "@/components/app/orb";
import { KokoroSilhouette } from "@/components/app/kokoro-silhouette";
import { StateArc } from "@/components/app/state-arc";
import { SubExpressionRow } from "@/components/app/sub-expression-row";
import { ContextGrid, type ContextResult } from "@/components/app/context-grid";
import { LightShower } from "@/components/app/light-shower";
import { GradientField } from "@/components/app/gradient-field";
import { getYamatoState, type YamatoState, type SubExpression } from "@/lib/yamato";
import { pickPlaceholderReflection } from "@/lib/reflections-placeholder";

type Phase = "arrival" | "refining" | "context" | "shower" | "revelation";

export default function KokoroMirror() {
  const [phase, setPhase] = useState<Phase>("arrival");
  const [state, setState] = useState<YamatoState | null>(null);
  const [subExpression, setSubExpression] = useState<SubExpression | null>(null);
  const [contextResult, setContextResult] = useState<ContextResult | null>(null);
  const [reflection, setReflection] = useState<string>("");

  const stateDef = state ? getYamatoState(state) : null;

  const handleStateSelect = useCallback((s: YamatoState) => {
    setState(s);
    setSubExpression(null);
    setPhase("refining");
  }, []);

  const handleProceedFromRefine = useCallback(() => {
    setPhase("context");
  }, []);

  const handleContextSelect = useCallback((result: ContextResult) => {
    setContextResult(result);
    if (state) {
      setReflection(pickPlaceholderReflection(state));
    }
    setPhase("shower");
  }, [state]);

  const handleContextSkip = useCallback(() => {
    setContextResult(null);
    if (state) {
      setReflection(pickPlaceholderReflection(state));
    }
    setPhase("shower");
  }, [state]);

  const handleShowerComplete = useCallback(() => {
    setPhase("revelation");
  }, []);

  const handleStartOver = useCallback(() => {
    setState(null);
    setSubExpression(null);
    setContextResult(null);
    setReflection("");
    setPhase("arrival");
  }, []);

  // Memoise the screen content per phase so React doesn't re-mount
  // them on unrelated re-renders.
  const screen = useMemo(() => {
    switch (phase) {
      case "arrival":
        return <ArrivalScreen onSelectState={handleStateSelect} />;
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
        return null; // LightShower renders as a fixed overlay below
      case "revelation":
        if (!state) return null;
        return (
          <RevelationScreen
            state={state}
            reflection={reflection}
            onContinue={handleStartOver}
          />
        );
    }
  }, [
    phase,
    state,
    stateDef,
    subExpression,
    reflection,
    handleStateSelect,
    handleProceedFromRefine,
    handleContextSelect,
    handleContextSkip,
    handleStartOver,
  ]);

  return (
    <main
      id="main-content"
      className="min-h-svh relative overflow-hidden"
    >
      {/* Phase content. The shower phase renders only the overlay
          (below), so the screen is null and the previous phase's
          residue would show through; we render a black-out underneath
          to prevent that flash. */}
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
}: {
  onSelectState: (s: YamatoState) => void;
}) {
  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12">
      {/* Top third — Kokoro */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <Orb size="sm" />
        <KokoroSilhouette size="md" />
      </div>

      {/* Middle — state arc + prompt */}
      <div className="w-full flex flex-col items-center gap-6">
        <p className="font-display text-[18px] text-cosmic-50/85 text-center">
          How are you feeling right now?
        </p>
        <StateArc onSelect={onSelectState} />
      </div>

      {/* Bottom — quiet entries. Placed inline rather than via the
          QuietEntries component because the arrival page wires them
          to in-page state (sanctuary, etc.) which are not yet routes.
          The component will be used once those surfaces exist. */}
      <div className="flex items-center justify-center gap-6 pt-4">
        {(["light", "rest", "trove", "senshin"] as const).map((q) => (
          <span
            key={q}
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/30"
            aria-disabled="true"
            title="Surface in build — see context/pillar/app.md §5.11–5.18"
          >
            {q}
          </span>
        ))}
      </div>
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
  return (
    <section className="min-h-svh relative">
      <GradientField state={state} />

      <div className="relative z-10 min-h-svh flex flex-col items-center justify-between px-6 pt-16 pb-12">
        <Orb size="sm" />

        <div className="flex flex-col items-center gap-8 max-w-md">
          {/* Kokoro hero. Spec §5.7: 280-360px on mobile, soft halo,
              text below as supporting copy. */}
          <KokoroSilhouette size="lg" />
          <p className="font-display text-[17px] sm:text-[18px] text-cosmic-50/95 text-center leading-[1.45] tracking-[0.005em]">
            {reflection}
          </p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/40 hover:text-cosmic-50/80 transition-colors duration-300"
        >
          Tap to continue
        </button>
      </div>
    </section>
  );
}
