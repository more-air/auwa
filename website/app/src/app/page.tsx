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
import { History, Settings as SettingsIcon, ChevronLeft, Share2 } from "lucide-react";
import { Orb } from "@/components/orb";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { AuwaCharacter } from "@/components/auwa-character";
import { StatePicker } from "@/components/state-picker";
import { SubExpressionRow } from "@/components/sub-expression-row";
import { ContextGrid, type ContextResult } from "@/components/context-grid";
import { LightShower } from "@/components/light-shower";
import { GradientField } from "@/components/gradient-field";
import { DailyLightCapture } from "@/components/daily-light-capture";
import { QuietEntries } from "@/components/quiet-entries";
import { IconButton } from "@/components/icon-button";
import { Button } from "@/components/button";
import { AdvanceButton } from "@/components/advance-button";
import { ShareCard } from "@/components/share-card";
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
  | "share"
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

  const handleOpenShare = useCallback(() => setPhase("share"), []);
  const handleCloseShare = useCallback(() => setPhase("revelation"), []);

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

  const handleBackToPicker = useCallback(() => {
    setSubExpression(null);
    setPhase("picker");
  }, []);

  const handleBackToRefining = useCallback(() => setPhase("refining"), []);

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
            onBack={handleBackToPicker}
          />
        );
      case "context":
        return (
          <ContextScreen
            onSelect={handleContextSelect}
            onSkip={handleContextSkip}
            onBack={handleBackToRefining}
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
            onShare={handleOpenShare}
            motifs={store.onboarding.motifs}
          />
        );
      case "share":
        if (!state) return null;
        return (
          <ShareCard
            state={state}
            reflection={reflection}
            motifs={store.onboarding.motifs}
            onClose={handleCloseShare}
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
    handleBackToPicker,
    handleBackToRefining,
    handleStateSelect,
    handleProceedFromRefine,
    handleContextSelect,
    handleContextSkip,
    handleRevelationContinue,
    handleOpenShare,
    handleCloseShare,
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
  onBack,
}: {
  state: YamatoState;
  subExpression: SubExpression | null;
  onSelectSub: (sub: SubExpression | null) => void;
  onProceed: () => void;
  onBack: () => void;
}) {
  const def = getYamatoState(state);
  return (
    <section
      className="h-svh relative flex flex-col px-6"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <GradientField state={state} intent="soft" />

      <div className="relative z-10 flex flex-col h-full min-h-0">
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
          <AuwaCharacter state={state} size="xl" active />
          <div className="flex flex-col items-center gap-1">
            <h1 className="t-display text-cosmic-50/95 text-center">{def.english}</h1>
            <span className="t-jp text-cosmic-50/55">
              {def.kanji} {def.romaji}
            </span>
          </div>
          <div className="w-full max-w-sm flex flex-col items-center gap-4">
            <p className="t-meta text-cosmic-50/55 text-center">
              Closer to anything in particular?
            </p>
            <SubExpressionRow
              state={state}
              selected={subExpression?.key ?? null}
              onSelect={onSelectSub}
            />
          </div>
        </div>

        <div className="flex-none flex justify-end pt-4">
          <AdvanceButton direction="next" onClick={onProceed} aria-label="Continue" />
        </div>
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
  onBack,
}: {
  onSelect: (r: ContextResult) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  return <ContextGrid onSelect={onSelect} onSkip={onSkip} onBack={onBack} />;
}

/* ============================================================
   REVELATION — gradient, Kokoro hero, reflection, share+continue.
   ============================================================ */

function RevelationScreen({
  state,
  reflection,
  onContinue,
  onShare,
  motifs,
}: {
  state: YamatoState;
  reflection: string;
  onContinue: () => void;
  onShare: () => void;
  motifs: string[];
}) {
  return (
    <section className="h-svh relative">
      <GradientField state={state} />
      {/* Celebratory bloom — a one-shot radial flash behind the
          character on arrival, in the state's own colour, settling
          to a soft glow. The moment of revelation gets a beat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `radial-gradient(circle 320px at 50% 42%, var(--gradient-${state}-mid) 0%, transparent 65%)`,
          animation: "auwa-reveal-bloom 1800ms var(--ease-out-expo) forwards",
          opacity: 0,
        }}
      />
      <div
        className="relative z-10 h-full flex flex-col items-center justify-between px-6"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 40px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
        }}
      >
        {/* No orb — the Kokoro is the hero of the reveal. */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10 max-w-md">
          <div
            style={{
              animation: "auwa-reveal-emerge 1400ms var(--ease-out-expo) forwards",
              opacity: 0,
            }}
          >
            <KokoroSilhouette size="lg" state={state} motifs={motifs} />
          </div>
          <p
            className="t-voice-xl text-cosmic-50/98 text-center text-balance max-w-[22rem]"
            style={{
              animation: "auwa-rise 900ms var(--ease-out-expo) 700ms forwards",
              opacity: 0,
            }}
          >
            {reflection}
          </p>
        </div>

        {/* Share leads (we want it shared); Continue is the quieter
            circle-arrow advance, bottom-right. */}
        <div
          className="w-full flex items-center justify-between gap-4"
          style={{
            animation: "auwa-fade-in 800ms ease-out 1300ms forwards",
            opacity: 0,
          }}
        >
          <Button
            variant="secondary"
            leadingIcon={<Share2 size={18} strokeWidth={1.75} />}
            onClick={onShare}
          >
            Share
          </Button>
          <AdvanceButton direction="next" onClick={onContinue} aria-label="Continue" />
        </div>
      </div>

      <style>{`
        @keyframes auwa-reveal-bloom {
          0%   { opacity: 0;    transform: scale(0.85); }
          35%  { opacity: 0.9;  transform: scale(1.05); }
          100% { opacity: 0.45; transform: scale(1); }
        }
        @keyframes auwa-reveal-emerge {
          0%   { opacity: 0; transform: scale(0.9)  translateY(10px); }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
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
