"use client";

/*
  Sanctuary (§2.3, §5.11).

  A place to rest, not a practice to do. The page opens to a slow
  gradient bloom in the user's recent emotional weather (the last
  revelation's state) or neutral cosmic dark if there is no revelation
  yet. The breathing orb sits above the Kokoro hovering at centre.
  No prompts, no timer, no state tap, no reflection. Tap anywhere to
  leave. Nothing is recorded.

  Sound library and the lantern surface are deferred to Phase 4.
*/

import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { GradientField } from "@/components/gradient-field";
import { lastRevelation, useAppStore } from "@/lib/app-store";

export default function Sanctuary() {
  const router = useRouter();
  const store = useAppStore();
  const last = lastRevelation(store);

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="min-h-svh w-full relative block"
      aria-label="Leave sanctuary"
    >
      {last ? (
        <GradientField state={last.state} intent="soft" />
      ) : (
        // No revelation yet — neutral cosmic dark with a single
        // ambient halo. Sanctuary remains a place to be even with
        // no emotional weather to colour it.
        <div className="absolute inset-0 bg-[var(--color-void)]" />
      )}
      <div className="relative z-10 min-h-svh flex flex-col items-center justify-center gap-10 px-6">
        <Orb size="md" />
        <KokoroSilhouette size="md" />
        <span className="t-eyebrow text-cosmic-50/25 absolute bottom-10">
          Tap anywhere to leave
        </span>
      </div>
    </button>
  );
}
