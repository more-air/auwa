"use client";

/*
  Firefly Trove (§5.15, §8.4).

  Dark cosmic field. Each captured firefly drifts and pulses on its
  own rhythm. Tap to inspect (the surrounding fireflies dim); tap
  again to release. Period toggle changes which fireflies are
  visible; counts are visible because abundance numbers, not progress.

  v1 simplifications (per task scope):
  - Pulse + drift via per-firefly CSS animation with seeded offsets;
    real Boids flocking deferred to v1 polish (§8.4).
  - Weekly + monthly reflection cards deferred (§5.15 fourth and
    fifth paragraphs).

  Empty state: single Auwa orb at centre.
*/

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import {
  fireflysIn,
  useAppStore,
  type Firefly,
} from "@/lib/app-store";

type Period = "week" | "month" | "year" | "all";

const PERIOD_LABELS: Record<Period, string> = {
  week: "Week",
  month: "Month",
  year: "Year",
  all: "All",
};

export default function FireflyTrove() {
  const router = useRouter();
  const store = useAppStore();
  const [period, setPeriod] = useState<Period>("month");
  const [focused, setFocused] = useState<Firefly | null>(null);

  const visible = useMemo(
    () => fireflysIn(store.fireflies, period),
    [store.fireflies, period]
  );

  // Deterministic per-firefly drift parameters so each firefly's
  // position and pulse stay stable across renders (and across period
  // toggles for fireflies that remain in scope).
  const drift = useMemo(() => buildDriftMap(store.fireflies), [store.fireflies]);

  return (
    <main id="main-content" className="min-h-svh relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-void)]" />
      {/* faint star field via a very low-opacity radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, oklch(0.18 0.03 250) 0%, var(--color-void) 70%)",
        }}
      />

      <div className="relative z-10 min-h-svh flex flex-col">
        <header className="px-6 pt-6 pb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
            aria-label="Back to arrival"
          >
            ← Back
          </button>
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55">
            Trove
          </span>
          <span className="w-12" />
        </header>

        <div className="px-6 mb-4 flex items-center justify-center gap-5">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={[
                "font-sans text-[11px] tracking-[0.18em] uppercase transition-colors",
                period === p
                  ? "text-cosmic-50"
                  : "text-cosmic-50/35 hover:text-cosmic-50/65",
              ].join(" ")}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="text-center mb-4">
          <span className="font-display text-[16px] text-cosmic-50/85">
            {visible.length}
          </span>
          <span className="font-display text-[16px] text-cosmic-50/55 ml-2">
            {visible.length === 1 ? "firefly" : "fireflies"}
          </span>
        </div>

        <div className="flex-1 relative overflow-hidden">
          {visible.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="absolute inset-0">
              {visible.map((fly) => {
                const d = drift[fly.id];
                const isFocused = focused?.id === fly.id;
                const isDimmed = focused !== null && !isFocused;
                return (
                  <FireflyDot
                    key={fly.id}
                    fly={fly}
                    drift={d}
                    dimmed={isDimmed}
                    focused={isFocused}
                    onClick={() => setFocused(fly)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {focused ? (
          <FireflyInspector
            fly={focused}
            onClose={() => setFocused(null)}
          />
        ) : null}
      </div>

      <style>{`
        @keyframes firefly-pulse {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.15); }
        }
        @keyframes firefly-drift {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(8px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </main>
  );
}

/* ---------- pieces ---------- */

function EmptyState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
      <Orb size="md" />
      <p className="font-display text-[18px] text-cosmic-50/65 text-center max-w-xs">
        Your trove is empty. What did you notice today?
      </p>
    </div>
  );
}

type Drift = {
  xPct: number; // 0..100
  yPct: number;
  size: number; // 8..14 px
  pulseDuration: number; // 1400..2100 ms
  pulseDelay: number;
  driftDuration: number; // 6000..12000 ms
  driftDelay: number;
  warmth: number; // 80..110 (hue)
};

function buildDriftMap(fireflies: Firefly[]): Record<string, Drift> {
  const map: Record<string, Drift> = {};
  for (const fly of fireflies) {
    const seed = hash(fly.id);
    const rand = (i: number) => ((seed >> (i * 3)) & 0xff) / 255;
    map[fly.id] = {
      xPct: 5 + rand(0) * 90,
      yPct: 5 + rand(1) * 90,
      size: 8 + Math.floor(rand(2) * 6),
      pulseDuration: 1400 + Math.floor(rand(3) * 700),
      pulseDelay: Math.floor(rand(4) * 1500),
      driftDuration: 6000 + Math.floor(rand(5) * 6000),
      driftDelay: Math.floor(rand(6) * 4000),
      warmth: 80 + Math.floor(rand(7) * 30),
    };
  }
  return map;
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function FireflyDot({
  fly,
  drift,
  dimmed,
  focused,
  onClick,
}: {
  fly: Firefly;
  drift: Drift;
  dimmed: boolean;
  focused: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Firefly: ${fly.question}`}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${drift.xPct}%`,
        top: `${drift.yPct}%`,
        opacity: dimmed ? 0.18 : 1,
        transition: "opacity 600ms ease-out",
        animation: `firefly-drift ${drift.driftDuration}ms ease-in-out ${drift.driftDelay}ms infinite`,
      }}
    >
      <span
        className="block rounded-full"
        style={{
          width: focused ? drift.size + 8 : drift.size,
          height: focused ? drift.size + 8 : drift.size,
          background: `radial-gradient(circle, oklch(0.88 0.16 ${drift.warmth}) 0%, oklch(0.65 0.10 ${drift.warmth}) 60%, transparent 100%)`,
          boxShadow: `0 0 ${drift.size * 2}px oklch(0.85 0.15 ${drift.warmth} / 0.5)`,
          animation: `firefly-pulse ${drift.pulseDuration}ms ease-in-out ${drift.pulseDelay}ms infinite`,
          transition: "width 400ms ease-out, height 400ms ease-out",
        }}
      />
    </button>
  );
}

function FireflyInspector({
  fly,
  onClose,
}: {
  fly: Firefly;
  onClose: () => void;
}) {
  const when = new Date(fly.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
  return (
    <div
      role="dialog"
      aria-label="Firefly"
      className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 pt-8 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/95 to-transparent"
    >
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-4">
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45">
          {when}
        </span>
        <p className="font-display text-[15px] text-cosmic-50/75 max-w-xs leading-[1.5]">
          {fly.question}
        </p>
        <p className="font-display text-[18px] text-cosmic-50 max-w-sm leading-[1.45]">
          {fly.answer}
        </p>
        {fly.photoDataUrl ? (
          <img
            src={fly.photoDataUrl}
            alt=""
            className="w-32 h-32 rounded-md object-cover border border-cosmic-50/15"
          />
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors mt-2"
        >
          Tap to release
        </button>
      </div>
    </div>
  );
}
