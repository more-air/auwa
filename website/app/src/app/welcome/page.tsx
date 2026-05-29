"use client";

/*
  Onboarding (welcome) — §2.1 of context/pillar/app.md.

  This page handles eight of the eleven onboarding phases:
    1. Welcome
    2. What brings you to Auwa?
    3. Motif personalisation
    4. First-gift moment
    5. When does Auwa fit?
    6. Pick a quality
    7. Where did you find Auwa?
    8. Breath interlude

  The remaining three phases live in /page.tsx (the root daily flow) where the user
  arrives next:
    9. First daily flow (the spine)
    10. Closing
    11. Signup prompt

  Splitting at this seam means onboarding doesn't have to embed the
  full daily flow — the route change from /welcome → / is invisible
  (both cosmic surfaces) and step 9 just is the daily flow rendering
  naturally.

  The store records `welcomeDone: true` (via setting motifs + trait
  + source) before the route change; the daily flow page checks
  `onboarding.completed` to decide whether to show the closing +
  signup overlays after the first revelation.
*/

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { PlaceholderAsset } from "@/components/placeholder-asset";
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

export default function Welcome() {
  const router = useRouter();
  const store = useAppStore();
  const ready = useStoreReady();
  const [phase, setPhase] = useState<Phase>("welcome");

  // If the user has already finished welcome, skip them to the auwa.app cosmic surface.
  // We only redirect when the store has hydrated so we don't bounce
  // a real new user on their very first render.
  useEffect(() => {
    if (ready && store.onboarding.completed) {
      router.replace("/");
    }
  }, [ready, store.onboarding.completed, router]);

  const finishWelcome = () => {
    // Welcome phases done. Daily flow + closing + signup live on
    // / next. Onboarding.completed flips true after the
    // first revelation lands.
    router.push("/");
  };

  return (
    <main
      id="main-content"
      className="min-h-svh relative overflow-hidden flex flex-col"
    >
      {phase === "welcome" && (
        <WelcomePhase onNext={() => setPhase("whatBrings")} />
      )}
      {phase === "whatBrings" && (
        <WhatBringsPhase
          selected={store.onboarding.whatBrings}
          onNext={(v) => {
            updateOnboarding({ whatBrings: v });
            setPhase("personalisation");
          }}
        />
      )}
      {phase === "personalisation" && (
        <PersonalisationPhase
          picked={store.onboarding.motifs}
          onNext={(motifs) => {
            updateOnboarding({ motifs });
            setPhase("firstGift");
          }}
        />
      )}
      {phase === "firstGift" && (
        <FirstGiftPhase
          onNext={() => {
            updateOnboarding({ firstGiftMotif: FIRST_GIFT_MOTIF.key });
            setPhase("whenFits");
          }}
        />
      )}
      {phase === "whenFits" && (
        <WhenFitsPhase
          selected={store.onboarding.whenFits}
          onNext={(v) => {
            updateOnboarding({ whenFits: v });
            setPhase("trait");
          }}
        />
      )}
      {phase === "trait" && (
        <TraitPhase
          selected={store.onboarding.trait}
          onNext={(v) => {
            updateOnboarding({ trait: v });
            setPhase("source");
          }}
        />
      )}
      {phase === "source" && (
        <SourcePhase
          selected={store.onboarding.source}
          onNext={(v) => {
            updateOnboarding({ source: v });
            setPhase("breath");
          }}
        />
      )}
      {phase === "breath" && <BreathPhase onNext={finishWelcome} />}
    </main>
  );
}

/* ---------- phases ---------- */

function PhaseShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "flex-1 flex flex-col items-center justify-between px-6 pt-16 pb-12",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

function WelcomePhase({ onNext }: { onNext: () => void }) {
  return (
    <PhaseShell>
      <div className="flex-1 flex items-center justify-center">
        <Orb size="lg" />
      </div>
      <div className="flex flex-col items-center gap-8 max-w-sm">
        <div className="text-center font-display text-[19px] text-cosmic-50/90 leading-[1.55]">
          <p>Auwa reveals what is there in you.</p>
          <p className="mt-3">Choose a few things you love.</p>
          <p className="mt-3">Your Kokoro starts here.</p>
        </div>
        <ContinueButton label="Begin" onClick={onNext} />
      </div>
    </PhaseShell>
  );
}

function WhatBringsPhase({
  selected,
  onNext,
}: {
  selected: WhatBrings | undefined;
  onNext: (v: WhatBrings) => void;
}) {
  const options: { key: WhatBrings; label: string }[] = [
    { key: "curiosity", label: "Curiosity" },
    { key: "restlessness", label: "A restlessness" },
    { key: "change", label: "A recent change" },
    { key: "something-else", label: "Something else" },
  ];
  return (
    <PhaseShell>
      <div className="flex-1 flex items-center justify-center">
        <Orb size="md" />
      </div>
      <div className="w-full flex flex-col items-center gap-8 max-w-sm">
        <p className="font-display text-[20px] text-cosmic-50 text-center">
          What brings you to Auwa?
        </p>
        <div className="w-full grid grid-cols-1 gap-3">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              selected={selected === o.key}
              onClick={() => onNext(o.key)}
            />
          ))}
        </div>
      </div>
      <div />
    </PhaseShell>
  );
}

function PersonalisationPhase({
  picked,
  onNext,
}: {
  picked: string[];
  onNext: (motifs: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(picked);
  const enough = selected.length >= 5;
  const limit = 7;
  return (
    <PhaseShell>
      <div className="flex flex-col items-center gap-3 mb-4">
        <KokoroSilhouette size="sm" motifs={selected} halo={false} />
        <p className="font-display text-[17px] text-cosmic-50/90 text-center max-w-xs">
          Choose 5 to 7 things that feel like you.
        </p>
      </div>
      <div className="w-full max-w-md flex flex-col gap-6 overflow-y-auto py-2">
        {MOTIF_CATEGORIES.map((cat) => {
          const items = MOTIFS.filter((m) => m.category === cat);
          return (
            <div key={cat}>
              <h3 className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/40 mb-2">
                {cat}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {items.map((m) => {
                  const isSelected = selected.includes(m.key);
                  const disabled = !isSelected && selected.length >= limit;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelected((s) =>
                          isSelected
                            ? s.filter((k) => k !== m.key)
                            : [...s, m.key]
                        );
                      }}
                      className={[
                        "aspect-square rounded-md border transition-colors duration-200",
                        "flex items-center justify-center text-center px-2",
                        isSelected
                          ? "border-cosmic-50/60 bg-cosmic-50/10"
                          : disabled
                            ? "border-cosmic-50/8 opacity-30"
                            : "border-cosmic-50/15 hover:border-cosmic-50/35",
                      ].join(" ")}
                    >
                      <span className="font-display text-[13px] text-cosmic-50/90 leading-tight">
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
      <ContinueButton
        label={enough ? "Continue" : `Pick at least ${5 - selected.length} more`}
        onClick={() => enough && onNext(selected)}
        disabled={!enough}
      />
    </PhaseShell>
  );
}

function FirstGiftPhase({ onNext }: { onNext: () => void }) {
  // Five-second atmospheric beat. The motif "arrives" from above and
  // "settles" on the Kokoro. The line appears half-way through. Tap
  // to proceed at any time after 1.5s. No skip during the first
  // half-beat so the moment can land.
  const [tapEnabled, setTapEnabled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setTapEnabled(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <button
      type="button"
      onClick={tapEnabled ? onNext : undefined}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 w-full"
      aria-label="Continue"
    >
      <div className="relative flex flex-col items-center max-w-sm">
        <div className="mb-4">
          <Orb size="md" />
        </div>
        <div className="relative">
          <KokoroSilhouette size="md" motifs={[]} halo />
          {/* The arriving motif. Drops from above the Kokoro to its
              surface over 3.5s, then sits. */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-12 h-12"
            style={{
              top: "-20%",
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
          className="font-display text-[18px] text-cosmic-50/85 text-center mt-10 leading-[1.5]"
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
          0%   { opacity: 0; transform: translate(-50%, -40px) scale(0.7); }
          30%  { opacity: 1; transform: translate(-50%, -40px) scale(1);   }
          80%  { opacity: 1; transform: translate(-50%, 90px) scale(1);    }
          100% { opacity: 1; transform: translate(-50%, 90px) scale(1);    }
        }
        @keyframes auwa-fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </button>
  );
}

function WhenFitsPhase({
  selected,
  onNext,
}: {
  selected: WhenFits[];
  onNext: (v: WhenFits[]) => void;
}) {
  const [picks, setPicks] = useState<WhenFits[]>(selected);
  return (
    <PhaseShell>
      <div className="flex-1 flex items-center justify-center">
        <Orb size="md" />
      </div>
      <div className="w-full flex flex-col items-center gap-8 max-w-sm">
        <p className="font-display text-[20px] text-cosmic-50 text-center">
          When does Auwa fit your day?
        </p>
        <div className="w-full grid grid-cols-2 gap-3">
          {(["morning", "evening"] as WhenFits[]).map((k) => {
            const isSelected = picks.includes(k);
            return (
              <TapCard
                key={k}
                label={k === "morning" ? "Morning" : "Evening"}
                selected={isSelected}
                onClick={() =>
                  setPicks((p) =>
                    p.includes(k) ? p.filter((x) => x !== k) : [...p, k]
                  )
                }
              />
            );
          })}
        </div>
        <ContinueButton
          label="Continue"
          onClick={() => picks.length > 0 && onNext(picks)}
          disabled={picks.length === 0}
        />
      </div>
      <div />
    </PhaseShell>
  );
}

function TraitPhase({
  selected,
  onNext,
}: {
  selected: Trait | undefined;
  onNext: (v: Trait) => void;
}) {
  const options: { key: Trait; label: string; descr: string }[] = [
    { key: "quiet", label: "Quiet", descr: "still water" },
    { key: "curious", label: "Curious", descr: "always looking" },
    { key: "steadfast", label: "Steadfast", descr: "slow and sure" },
    { key: "open", label: "Open", descr: "weather-ready" },
  ];
  return (
    <PhaseShell>
      <div className="flex-1 flex items-center justify-center gap-4">
        <Orb size="sm" />
        <KokoroSilhouette size="sm" />
      </div>
      <div className="w-full flex flex-col items-center gap-8 max-w-sm">
        <p className="font-display text-[20px] text-cosmic-50 text-center">
          Pick a quality your Kokoro carries.
        </p>
        <div className="w-full grid grid-cols-2 gap-3">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              sublabel={o.descr}
              selected={selected === o.key}
              onClick={() => onNext(o.key)}
            />
          ))}
        </div>
      </div>
      <div />
    </PhaseShell>
  );
}

function SourcePhase({
  selected,
  onNext,
}: {
  selected: Source | undefined;
  onNext: (v: Source) => void;
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
    <PhaseShell>
      <div className="flex-1 flex items-center justify-center">
        <Orb size="sm" />
      </div>
      <div className="w-full flex flex-col items-center gap-8 max-w-sm">
        <p className="font-display text-[20px] text-cosmic-50 text-center">
          Where did you find Auwa?
        </p>
        <div className="w-full grid grid-cols-2 gap-3">
          {options.map((o) => (
            <TapCard
              key={o.key}
              label={o.label}
              selected={selected === o.key}
              onClick={() => onNext(o.key)}
            />
          ))}
        </div>
      </div>
      <div />
    </PhaseShell>
  );
}

function BreathPhase({ onNext }: { onNext: () => void }) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 w-full"
    >
      <Orb size="lg" />
      <p className="font-display text-[19px] text-cosmic-50/85 text-center mt-12 max-w-xs leading-[1.5]">
        In a moment, you will see Auwa for the first time.
      </p>
      <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/35 mt-8">
        Tap to continue
      </span>
    </button>
  );
}

/* ---------- shared bits ---------- */

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
      className={[
        "py-4 px-4 rounded-md border transition-colors duration-200",
        "flex flex-col items-center justify-center text-center",
        selected
          ? "border-cosmic-50/55 bg-cosmic-50/8"
          : "border-cosmic-50/15 hover:border-cosmic-50/35 hover:bg-cosmic-50/5",
      ].join(" ")}
    >
      <span className="font-display text-[16px] text-cosmic-50/95">
        {label}
      </span>
      {sublabel ? (
        <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-cosmic-50/40 mt-1">
          {sublabel}
        </span>
      ) : null}
    </button>
  );
}

function ContinueButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "font-sans text-[12px] tracking-[0.16em] uppercase",
        "border rounded-sm px-6 py-3",
        "transition-colors duration-300",
        disabled
          ? "text-cosmic-50/25 border-cosmic-50/10 cursor-not-allowed"
          : "text-cosmic-50/85 border-cosmic-50/25 hover:text-cosmic-50 hover:border-cosmic-50/55",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
