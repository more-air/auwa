"use client";

/*
  Daily Revelation Spine + onboarding tail.

  Phases:
    arrival   → tap a Yamato state on the arc
    refining  → optional sub-expression refinement (tap or skip)
    context   → optional "what were you up to" tag (tap or skip)
    shower    → 3.6s light shower covers any classification latency
    revelation → gradient bloom, Kokoro hero, reflection text
    light     → optional Daily Light capture (DailyLightCapture)
    closing   → (first-run only) "Auwa will be here when you return."
    signup    → (first-run only) signup prompt with continue-as-guest

  On mount, redirects to /welcome if onboarding is incomplete.
  After the first revelation, completeOnboarding fires before the
  user lands back on arrival.

  Secondary destinations (archive, trove, sanctuary, senshin, kokoro,
  letter, settings) live at their own routes — reachable via the
  header icons and the quiet entries strip.

  Design language (May 2026 redesign): app-native, not editorial.
  Type uses the t-* utilities; tap targets sit at native sizes;
  layout groups cluster instead of spreading.
*/

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { History, Settings as SettingsIcon, ChevronLeft } from "lucide-react";
import { Orb } from "@/components/orb";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { StatePicker } from "@/components/state-picker";
import { SubExpressionRow } from "@/components/sub-expression-row";
import { ContextGrid, type ContextResult } from "@/components/context-grid";
import { LightShower } from "@/components/light-shower";
import { GradientField } from "@/components/gradient-field";
import { DailyLightCapture } from "@/components/daily-light-capture";
import { QuietEntries } from "@/components/quiet-entries";
import { IconButton } from "@/components/icon-button";
import { Button } from "@/components/button";
import { StackCard } from "@/components/stack-card";
import { pickCurrentLetter } from "@/lib/letters";
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
  | "home"
  | "picker"
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

  const [phase, setPhase] = useState<Phase>("home");
  const [state, setState] = useState<YamatoState | null>(null);
  const [subExpression, setSubExpression] = useState<SubExpression | null>(null);
  const [contextResult, setContextResult] = useState<ContextResult | null>(null);
  const [reflection, setReflection] = useState<string>("");

  useEffect(() => {
    if (!ready) return;
    if (store.onboarding.motifs.length === 0) {
      router.replace("/welcome");
    }
  }, [ready, store.onboarding.motifs.length, router]);

  const stateDef = state ? getYamatoState(state) : null;
  const isFirstRun = ready && !store.onboarding.completed;
  const last = lastRevelation(store);

  const handleBeginCheckIn = useCallback(() => {
    setPhase("picker");
  }, []);

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

  const handleStartOver = useCallback(() => {
    setState(null);
    setSubExpression(null);
    setContextResult(null);
    setReflection("");
    setPhase("home");
  }, []);

  const handleBackToHome = useCallback(() => {
    setState(null);
    setSubExpression(null);
    setPhase("home");
  }, []);

  const handleLightDone = useCallback(() => {
    if (isFirstRun) {
      setPhase("closing");
    } else {
      handleStartOver();
    }
  }, [isFirstRun, handleStartOver]);

  const handleClosingContinue = useCallback(() => {
    setPhase("signup");
  }, []);

  const handleSignupContinue = useCallback(() => {
    completeOnboarding();
    handleStartOver();
  }, [handleStartOver]);

  const screen = useMemo(() => {
    switch (phase) {
      case "home":
        return (
          <HomeScreen
            onBeginCheckIn={handleBeginCheckIn}
            lastState={last?.state ?? null}
            lastAt={last?.createdAt ?? null}
            motifs={store.onboarding.motifs}
          />
        );
      case "picker":
        return (
          <PickerScreen
            onBack={handleBackToHome}
            onSelectState={handleStateSelect}
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
            motifs={store.onboarding.motifs}
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
            motifs={store.onboarding.motifs}
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
    store.onboarding.motifs,
    handleBeginCheckIn,
    handleBackToHome,
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

/* ============================================================
   HOME — scene + stacked cards.

   Top half is the Kokoro scene: Auwa character centred in a soft
   cosmic environment with the user's motifs as fireflies floating
   around. Bottom half is a stack of action cards led by the primary
   "Begin today's reflection" CTA. Tab bar persists at the foot.
   ============================================================ */

function HomeScreen({
  onBeginCheckIn,
  lastState,
  lastAt,
  motifs,
}: {
  onBeginCheckIn: () => void;
  lastState: YamatoState | null;
  lastAt: string | null;
  motifs: string[];
}) {
  const lastDef = lastState ? getYamatoState(lastState) : null;
  const store = useAppStore();
  const letter = pickCurrentLetter();
  const letterUnread = letter ? !store.lettersSeen.includes(letter.id) : false;

  const lastDateLabel = lastAt
    ? new Date(lastAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <section
      className="min-h-svh flex flex-col px-safe"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Header band — Archive left, Settings right. */}
      <header className="h-12 px-2 flex items-center justify-between flex-none">
        <Link href="/archive" aria-label="Archive">
          <IconButton label="Archive">
            <History size={20} strokeWidth={1.5} />
          </IconButton>
        </Link>
        <Link href="/settings" aria-label="Settings">
          <IconButton label="Settings">
            <SettingsIcon size={20} strokeWidth={1.5} />
          </IconButton>
        </Link>
      </header>

      {/* Hero scene — Auwa character in cosmic environment with
          motifs floating as fireflies. Background subtly tinted by
          the last revelation's state. Tap → Kokoro view. */}
      <KokoroScene
        state={lastState ?? undefined}
        motifs={motifs}
      />

      {/* Stacked cards below the scene. The Begin CTA is the
          primary action; secondary cards (letter notification,
          status) sit below. */}
      <div className="flex-1 flex flex-col gap-3 px-4 pb-4 pt-2 overflow-y-auto">
        <StackCard
          variant="raised"
          eyebrow="Today"
          title="How are you feeling?"
          body="Begin a moment with Auwa."
          trailing={
            <Button size="sm" onClick={onBeginCheckIn}>
              Begin
            </Button>
          }
        />

        {letterUnread && letter ? (
          <StackCard
            eyebrow="Letter from Auwa"
            title={letter.body[0].split(",")[0]}
            body={letter.body[0].slice(letter.body[0].indexOf(",") + 2)}
            href="/letter"
          />
        ) : null}

        {lastDef && lastDateLabel ? (
          <StackCard
            eyebrow="Last visit"
            title={lastDef.english}
            body={lastDateLabel}
            href="/archive"
          />
        ) : null}
      </div>

      {/* Tab bar with hairline divider above. */}
      <div
        className="flex-none border-t border-cosmic-50/8 px-3 bg-[var(--color-void)]"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <QuietEntries />
      </div>
    </section>
  );
}

/* The cosmic scene that hosts the Kokoro on Home. Three layers:
   1. a subtle radial wash tinted by the last revelation's state,
   2. the Auwa character centred with a soft halo,
   3. motifs floating as small fireflies around the inner orbit.

   When Rieko delivers per-state illustrated environments, the
   wash layer becomes an <Image> behind the character. */
function KokoroScene({
  state,
  motifs,
}: {
  state?: YamatoState;
  motifs: string[];
}) {
  const tint = state
    ? `radial-gradient(ellipse 70% 50% at 50% 38%, var(--gradient-${state}-mid) 0%, transparent 60%)`
    : "radial-gradient(ellipse 70% 50% at 50% 38%, oklch(0.86 0.14 95 / 0.18) 0%, transparent 60%)";

  return (
    <Link
      href="/kokoro"
      aria-label="Open Kokoro view"
      className="flex-none relative w-full h-[42svh] min-h-[280px] active:scale-[0.995] transition-transform duration-[var(--duration-press)]"
    >
      {/* State-tinted wash. z-0 keeps it behind the character. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: tint, opacity: 0.55 }}
      />
      {/* Centred Kokoro. z-10 puts it above the tint. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <KokoroSilhouette size="lg" motifs={motifs} />
      </div>
    </Link>
  );
}

/* ============================================================
   PICKER — the dedicated feeling check-in screen.
   ============================================================ */

function PickerScreen({
  onBack,
  onSelectState,
}: {
  onBack: () => void;
  onSelectState: (s: YamatoState) => void;
}) {
  return (
    <section
      className="min-h-svh flex flex-col px-safe"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <header className="h-12 px-2 flex items-center justify-between flex-none">
        <IconButton label="Back" onClick={onBack}>
          <ChevronLeft size={22} strokeWidth={1.6} />
        </IconButton>
        <span className="t-eyebrow text-cosmic-50/44">Today</span>
        <span className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center px-5 pt-4 pb-2">
        <h1 className="t-display text-cosmic-50/96 text-center max-w-[18rem] mb-7">
          How are you feeling right now?
        </h1>
        <div className="w-full flex-1 flex items-start">
          <StatePicker selected={null} onSelect={onSelectState} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REFINING — selected state, sub-expression row, continue.
   ============================================================ */

function RefiningScreen({
  state,
  subExpression,
  onSelectSub,
  onProceed,
  motifs,
}: {
  state: YamatoState;
  subExpression: SubExpression | null;
  onSelectSub: (sub: SubExpression | null) => void;
  onProceed: () => void;
  motifs: string[];
}) {
  const def = getYamatoState(state);
  return (
    <section
      className="min-h-svh flex flex-col px-safe"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
      }}
    >
      <header className="h-12 flex-none" />

      <div className="flex-1 flex flex-col items-center justify-between px-6 pb-6">
        <div className="flex flex-col items-center gap-4 mt-4">
          <Orb size="sm" />
          <KokoroSilhouette size="sm" motifs={motifs} halo={false} />
        </div>

        <div className="w-full flex flex-col items-center gap-8 max-w-md">
          <div className="flex flex-col items-center gap-1">
            <span className="t-voice-l text-cosmic-50">{def.english}</span>
            <span className="t-jp text-cosmic-50/48">
              {def.kanji} {def.romaji}
            </span>
          </div>
          <p className="t-meta text-cosmic-50/55 text-center max-w-[14rem]">
            Closer to anything in particular?
          </p>
          <SubExpressionRow
            state={state}
            selected={subExpression?.key ?? null}
            onSelect={onSelectSub}
          />
        </div>

        <Button variant="primary" onClick={onProceed}>
          Continue
        </Button>
      </div>
    </section>
  );
}

/* ============================================================
   CONTEXT — what were you up to.
   ============================================================ */

function ContextScreen({
  onSelect,
  onSkip,
}: {
  onSelect: (r: ContextResult) => void;
  onSkip: () => void;
}) {
  return (
    <section
      className="min-h-svh flex items-center justify-center px-6"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 64px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 64px)",
      }}
    >
      <ContextGrid onSelect={onSelect} onSkip={onSkip} />
    </section>
  );
}

/* ============================================================
   REVELATION — gradient, Kokoro hero, reflection, share+continue.
   ============================================================ */

function RevelationScreen({
  state,
  reflection,
  onContinue,
  motifs,
}: {
  state: YamatoState;
  reflection: string;
  onContinue: () => void;
  motifs: string[];
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
        /* user cancelled */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };
  return (
    <section className="min-h-svh relative">
      <GradientField state={state} />
      <div
        className="relative z-10 min-h-svh flex flex-col items-center justify-between px-6"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 32px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 32px)",
        }}
      >
        <Orb size="sm" />

        <div className="flex flex-col items-center gap-10 max-w-md">
          <KokoroSilhouette size="lg" motifs={motifs} />
          <p className="t-voice-xl text-cosmic-50/98 text-center text-balance max-w-[22rem]">
            {reflection}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Button variant="primary" onClick={onContinue}>
            Continue
          </Button>
          <Button variant="ghost" size="sm" onClick={share}>
            Share
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CLOSING + SIGNUP — first-run only.
   ============================================================ */

function ClosingScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="min-h-svh w-full flex flex-col items-center justify-center px-8 gap-10 active:opacity-90 transition-opacity"
    >
      <Orb size="lg" />
      <p className="t-voice-l text-cosmic-50/92 text-center max-w-[16rem]">
        Auwa will be here when you return.
      </p>
      <span className="t-eyebrow text-cosmic-50/38">Tap to continue</span>
    </button>
  );
}

function SignupScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section
      className="min-h-svh flex flex-col items-center justify-between px-8"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 64px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 40px)",
      }}
    >
      <Orb size="md" />

      <div className="flex flex-col items-center gap-5 max-w-sm">
        <h2 className="t-voice-xl text-cosmic-50 text-center">
          Your Kokoro is yours.
        </h2>
        <p className="t-body text-cosmic-50/65 text-center text-balance">
          To carry it across devices, across time, across small forgettings,
          give Auwa a way to find you again. For now, you can continue as a
          guest. Your Kokoro lives on this device.
        </p>
      </div>

      <Button variant="primary" fullWidth onClick={onContinue}>
        Continue as guest
      </Button>
    </section>
  );
}
