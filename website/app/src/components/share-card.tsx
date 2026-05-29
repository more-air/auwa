"use client";

/*
  ShareCard — the share-preview surface (spec §5.10).

  Opened from the Revelation's Share action. Shows the revelation as a
  shareable card in Auwa's two Instagram formats — Story (9:16) and
  Feed (1:1) — with a format toggle and a Share action. The card is
  character-dominant by design: the Kokoro is the hero, the reflection
  supports, the wordmark sits quiet at the foot. That composition is
  what spreads in a feed (§5.10 rationale).

  v1 shares via the Web Share API (text + link) with a clipboard
  fallback; server-rendered card images land later. The preview here
  is the real composition the rendered image will match.
*/

import { useState } from "react";
import { GradientField } from "./gradient-field";
import { KokoroSilhouette } from "./kokoro-silhouette";
import { SegmentedControl } from "./segmented-control";
import { Button } from "./button";
import { AdvanceButton } from "./advance-button";
import { getYamatoState, type YamatoState } from "@/lib/yamato";

type Format = "story" | "feed";

export type ShareCardProps = {
  state: YamatoState;
  reflection: string;
  motifs: string[];
  onClose: () => void;
};

export function ShareCard({ state, reflection, motifs, onClose }: ShareCardProps) {
  const [format, setFormat] = useState<Format>("story");
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
    <section
      className="h-svh flex flex-col bg-[var(--color-void)] px-safe"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <div className="h-12 px-3 flex items-center justify-between flex-none">
        <span className="t-eyebrow text-cosmic-50/45">Share</span>
        <AdvanceButton direction="close" tone="subtle" size={40} onClick={onClose} aria-label="Close" />
      </div>

      <div className="flex-none flex justify-center pb-5">
        <SegmentedControl<Format>
          value={format}
          onChange={setFormat}
          options={[
            { value: "story", label: "Story" },
            { value: "feed", label: "Feed" },
          ]}
        />
      </div>

      {/* Card preview — the actual composition, scaled to fit. */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-6">
        <div
          className={[
            "relative overflow-hidden rounded-sheet shadow-[0_24px_60px_-12px_oklch(0_0_0/0.6)]",
            format === "story"
              ? "h-full max-w-full aspect-[9/16]"
              : "w-full max-h-full aspect-square",
          ].join(" ")}
        >
          <GradientField state={state} />
          <div className="relative z-10 h-full flex flex-col items-center px-7 py-8 text-center">
            <div className="flex-1 flex flex-col items-center justify-center gap-7">
              <KokoroSilhouette
                size={format === "story" ? "lg" : "md"}
                state={state}
                motifs={motifs}
              />
              <p className="t-voice-l text-cosmic-50/98 text-balance max-w-[15rem]">
                {reflection}
              </p>
            </div>
            <span className="flex-none t-eyebrow text-cosmic-50/55 pt-4">
              Revealed by Auwa
            </span>
          </div>
        </div>
      </div>

      <div className="flex-none flex flex-col items-center gap-2 pt-5">
        <Button variant="primary" onClick={share}>
          Share
        </Button>
        <span className="t-meta text-cosmic-50/40">Saved to your archive</span>
      </div>
    </section>
  );
}
