"use client";

/*
  Sanctuary (§2.3, §5.11) — a place to rest, not a practice to do.

  Reworked 29 May 2026 per Tom's craft pass:
  - One presence, not two: the user's Kokoro hovers and breathes at
    centre (the orb is gone here).
  - Calm sound controls with clear status: a quiet row of named ambient
    tracks, the playing one marked, with a play / pause toggle.
  - A clear way out: a round close button bottom-right (the shared
    AdvanceButton), so tapping the sound controls never dismisses.

  The surface blooms in the user's recent emotional weather, or rests
  in neutral cosmic dark if there's no revelation yet. Nothing here is
  recorded. v1 ships the controls; actual audio playback lands with the
  Suno track assets (deferred per app/CLAUDE.md).
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pause, Play } from "lucide-react";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { GradientField } from "@/components/gradient-field";
import { AdvanceButton } from "@/components/advance-button";
import { lastRevelation, useAppStore } from "@/lib/app-store";

const TRACKS = ["Moss", "Rain on stones", "Bell at dawn", "Snowfall", "Pine in wind"];

export default function Sanctuary() {
  const router = useRouter();
  const store = useAppStore();
  const last = lastRevelation(store);

  const [track, setTrack] = useState("Bell at dawn");
  const [playing, setPlaying] = useState(true);

  return (
    <main
      id="main-content"
      className="h-svh relative overflow-hidden bg-[var(--color-void)]"
    >
      {last ? (
        <GradientField state={last.state} intent="soft" />
      ) : null}

      {/* Breathing Kokoro at centre. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div style={{ animation: "auwa-orb-breath 6000ms ease-in-out infinite" }}>
          <KokoroSilhouette size="md" state={last?.state} />
        </div>
      </div>

      {/* Sound controls — quiet, near the foot. */}
      <div
        className="absolute inset-x-0 z-20 flex flex-col items-center gap-4 px-6"
        style={{ bottom: "max(env(safe-area-inset-bottom), 28px)" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause sound" : "Play sound"}
            className="w-9 h-9 flex items-center justify-center rounded-pill border border-cosmic-50/20 text-cosmic-50/75 hover:text-cosmic-50 hover:border-cosmic-50/40 active:scale-[0.92] transition-[transform,color,border-color] duration-[var(--duration-press)]"
          >
            {playing ? (
              <Pause size={15} strokeWidth={1.75} />
            ) : (
              <Play size={15} strokeWidth={1.75} className="ml-0.5" />
            )}
          </button>
          <span className="t-meta text-cosmic-50/55">
            {playing ? "Playing" : "Paused"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-xs">
          {TRACKS.map((t) => {
            const active = t === track;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTrack(t);
                  setPlaying(true);
                }}
                className={[
                  "t-meta transition-colors",
                  active
                    ? "text-cosmic-50 underline underline-offset-4 decoration-cosmic-50/40"
                    : "text-cosmic-50/40 hover:text-cosmic-50/70",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear way out. */}
      <div
        className="absolute right-6 z-20"
        style={{ bottom: "max(env(safe-area-inset-bottom), 28px)" }}
      >
        <AdvanceButton
          direction="close"
          tone="subtle"
          onClick={() => router.push("/")}
          aria-label="Leave sanctuary"
        />
      </div>
    </main>
  );
}
