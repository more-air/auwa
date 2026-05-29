"use client";

/*
  Light — the merged capture + collection surface (spec §5.14 + §5.15,
  combined per Tom's One Year reference, 29 May 2026).

  One section, two views toggled at the top:
    Capture — notice one good moment today (DailyLightCapture).
    Trove   — the dot-grid of everything caught: faint placeholder dots
              where fireflies will land, collected ones glowing. Tap a
              firefly to inspect.

  A primary destination, so the bottom tab bar stays visible. Reachable
  from the tab bar and as the natural follow-on after a revelation.
*/

import { useMemo, useState } from "react";
import { SegmentedControl } from "@/components/segmented-control";
import { DailyLightCapture } from "@/components/daily-light-capture";
import { QuietEntries } from "@/components/quiet-entries";
import { useAppStore, type Firefly } from "@/lib/app-store";

type View = "capture" | "trove";

export default function LightSection() {
  const [view, setView] = useState<View>("capture");

  return (
    <main
      id="main-content"
      className="h-svh flex flex-col bg-[var(--color-void)] px-safe"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <header className="h-12 flex items-center justify-center flex-none">
        <h1 className="t-title text-cosmic-50/92">Light</h1>
      </header>

      <div className="flex-none flex justify-center px-6 pb-3">
        <SegmentedControl<View>
          value={view}
          onChange={setView}
          options={[
            { value: "capture", label: "Capture" },
            { value: "trove", label: "Trove" },
          ]}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {view === "capture" ? (
          <DailyLightCapture
            embedded
            onCaptured={() => setView("trove")}
            onSkip={() => setView("trove")}
          />
        ) : (
          <TroveView onCapture={() => setView("capture")} />
        )}
      </div>

      <div
        className="flex-none border-t border-cosmic-50/8 px-3 bg-[var(--color-void)]"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
      >
        <QuietEntries />
      </div>
    </main>
  );
}

/* ---------- Trove view: the dot-grid ---------- */

const COLS = 7;
const MIN_SLOTS = 35; // a generous field so the trove never feels empty

function TroveView({ onCapture }: { onCapture: () => void }) {
  const store = useAppStore();
  const fireflies = store.fireflies;
  const [focused, setFocused] = useState<Firefly | null>(null);

  // Glowing fireflies first, then faint placeholder dots filling out
  // full rows so the user sees the space their noticing will fill.
  const slots = useMemo(() => {
    const filled = fireflies.length;
    const total = Math.max(
      MIN_SLOTS,
      Math.ceil((filled + 6) / COLS) * COLS
    );
    return total;
  }, [fireflies.length]);

  if (fireflies.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6 px-6 text-center">
        <DotField slots={MIN_SLOTS} fireflies={[]} onTap={() => {}} faded />
        <p className="t-voice-l text-cosmic-50/65 max-w-xs">
          Your trove is empty. What did you notice today?
        </p>
        <button
          type="button"
          onClick={onCapture}
          className="t-button text-cosmic-50/85 hover:text-cosmic-50 transition-colors"
        >
          Catch a light
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none text-center pb-4">
        <span className="t-voice-l text-cosmic-50/85 tabular-nums">
          {fireflies.length}
        </span>
        <span className="t-voice text-cosmic-50/55 ml-2">
          {fireflies.length === 1 ? "firefly" : "fireflies"}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-8 pb-6">
        <DotField slots={slots} fireflies={fireflies} onTap={setFocused} />
      </div>

      {focused ? (
        <FireflyInspector fly={focused} onClose={() => setFocused(null)} />
      ) : null}
    </div>
  );
}

function DotField({
  slots,
  fireflies,
  onTap,
  faded = false,
}: {
  slots: number;
  fireflies: Firefly[];
  onTap: (f: Firefly) => void;
  faded?: boolean;
}) {
  return (
    <div
      className="grid gap-y-5 gap-x-4 mx-auto w-full max-w-[280px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: slots }).map((_, i) => {
        const fly = fireflies[i];
        if (fly) {
          return (
            <button
              key={fly.id}
              type="button"
              onClick={() => onTap(fly)}
              aria-label={`Firefly: ${fly.answer}`}
              className="flex items-center justify-center py-1 active:scale-90 transition-transform"
            >
              <span
                className="block rounded-full"
                style={{
                  width: 11,
                  height: 11,
                  background:
                    "radial-gradient(circle, oklch(0.92 0.16 95) 0%, oklch(0.68 0.12 95) 60%, transparent 100%)",
                  boxShadow: "0 0 12px 1px oklch(0.85 0.15 95 / 0.5)",
                  animation: `auwa-firefly-pulse ${1500 + (i % 7) * 90}ms ease-in-out ${(i % 5) * 120}ms infinite`,
                }}
              />
            </button>
          );
        }
        return (
          <span
            key={`empty-${i}`}
            aria-hidden="true"
            className="flex items-center justify-center py-1"
          >
            <span
              className="block rounded-full bg-cosmic-50/12"
              style={{ width: 5, height: 5, opacity: faded ? 0.5 : 1 }}
            />
          </span>
        );
      })}
    </div>
  );
}

function FireflyInspector({ fly, onClose }: { fly: Firefly; onClose: () => void }) {
  const when = new Date(fly.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex-none w-full text-center px-6 pt-6 pb-4 bg-gradient-to-t from-[var(--color-void)] to-transparent"
    >
      <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
        <span className="t-eyebrow text-cosmic-50/45">{when}</span>
        <p className="t-voice text-cosmic-50/60 max-w-xs">{fly.question}</p>
        <p className="t-voice-l text-cosmic-50 max-w-sm">{fly.answer}</p>
        {fly.photoDataUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={fly.photoDataUrl}
            alt=""
            className="w-28 h-28 rounded-card object-cover border border-cosmic-50/15 mt-1"
          />
        ) : null}
        <span className="t-eyebrow text-cosmic-50/40 mt-1">Tap to release</span>
      </div>
    </button>
  );
}
