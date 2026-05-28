"use client";

/*
  LightShower — the 3.6s transition between input and revelation.

  Phases (timed against --duration-light-shower = 3600ms):
    0ms     orb still and centred
    300ms   orb scales up, halo intensifies
    900ms   gradient field begins to bloom out of void
    1800ms  bloom peak; orb begins to dissolve into the gradient
    2400ms  Kokoro begins to scale in from centre, gradient settles
    3600ms  shower complete, parent transitions to Revelation

  This component renders the full 3.6s as a self-contained motion
  sequence. The parent owns whether the shower is mounted; while it's
  mounted, the user sees only the shower (no chrome, no skip).

  The shower covers any API latency for Haiku classification — the
  parent fires the classification request when the shower starts and
  the result arrives before the shower ends in the common case. If
  the response is slower, the shower's bloom phase extends until the
  result lands (deferred to v1 polish — for now the duration is fixed
  and the request runs in parallel).
*/

import { useEffect } from "react";
import { Orb } from "./orb";
import { GradientField } from "./gradient-field";
import type { YamatoState } from "@/lib/yamato";

export type LightShowerProps = {
  state: YamatoState;
  onComplete: () => void;
};

export function LightShower({ state, onComplete }: LightShowerProps) {
  useEffect(() => {
    const t = window.setTimeout(onComplete, 3600);
    return () => window.clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-[var(--color-void)]">
      {/* Gradient bloom — opacity-fades in over 1.8s starting at 0.9s */}
      <div
        className="absolute inset-0"
        style={{
          animation:
            "auwa-shower-bloom 2700ms cubic-bezier(0.16, 1, 0.3, 1) 900ms forwards",
          opacity: 0,
        }}
      >
        <GradientField state={state} />
      </div>

      {/* Orb — sits centred, scales up gently from 1.0 to 1.6, then
          fades out into the bloom around the 2.4s mark. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          animation:
            "auwa-shower-orb 3600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <Orb size="lg" still />
      </div>

      <style>{`
        @keyframes auwa-shower-bloom {
          0%   { opacity: 0; }
          70%  { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes auwa-shower-orb {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
          25%  { transform: translate(-50%, -50%) scale(1.35); opacity: 1; }
          60%  { transform: translate(-50%, -50%) scale(1.6);  opacity: 0.85; }
          85%  { transform: translate(-50%, -50%) scale(1.2);  opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1);    opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .light-shower-reduced div { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
