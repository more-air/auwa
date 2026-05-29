"use client";

/*
  DailyLightCapture — capturing one small good moment (spec §5.14, §8).

  Reworked 29 May 2026: a first-time user lands here straight after the
  revelation, so the screen now explains itself — what the practice is
  (notice one good thing) and what happens (it becomes a firefly in the
  trove). The prompt question is the serif hero; the answer field is a
  clear, tappable, non-serif input (One Year reference) rather than an
  ambiguous serif line.

  Two layout modes:
    standalone (default) — fills the viewport; used as the daily-flow
      step after the revelation.
    embedded             — fills its flex parent; used inside the merged
      Light section under the Capture/Trove toggle.

  Skipping records nothing. Capturing creates a firefly via addFirefly.
  v1 photo attachment uses in-memory data URLs (Vercel Blob later).
*/

import { useMemo, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "./button";
import { addFirefly } from "@/lib/app-store";
import { pickDailyLightPrompt } from "@/lib/daily-light-prompts";

export type DailyLightCaptureProps = {
  onSkip: () => void;
  onCaptured: () => void;
  /** Fill the flex parent instead of the viewport (used in /light). */
  embedded?: boolean;
  promptId?: string;
};

export function DailyLightCapture({
  onSkip,
  onCaptured,
  embedded = false,
  promptId,
}: DailyLightCaptureProps) {
  const prompt = useMemo(() => pickDailyLightPrompt(), [promptId]);

  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [captured, setCaptured] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const overLimit = wordCount > 15;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      if (url.length > 600_000) {
        resizeDataUrl(url, 1080, 0.75).then(setPhoto);
      } else {
        setPhoto(url);
      }
    };
    reader.readAsDataURL(file);
  };

  const capture = () => {
    if (!answer.trim()) return;
    addFirefly({
      promptId: prompt.id,
      question: prompt.question,
      answer: answer.trim(),
      photoDataUrl: photo ?? undefined,
    });
    setCaptured(true);
    window.setTimeout(onCaptured, 1100);
  };

  const rootClass = [
    embedded ? "h-full" : "min-h-svh",
    "flex flex-col items-center px-6",
  ].join(" ");
  const rootStyle = embedded
    ? undefined
    : {
        paddingTop: "max(env(safe-area-inset-top), 32px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
      };

  if (captured) {
    return (
      <section className={[rootClass, "justify-center"].join(" ")} style={rootStyle}>
        <div className="flex flex-col items-center gap-4">
          <Firefly large />
          <p className="t-eyebrow text-cosmic-50/75">Caught</p>
        </div>
      </section>
    );
  }

  return (
    <section className={[rootClass, "justify-between"].join(" ")} style={rootStyle}>
      {/* Intro — explains the practice for a first-time user. */}
      <div className="flex flex-col items-center gap-4 pt-6 text-center max-w-xs">
        <Firefly />
        <p className="t-meta text-cosmic-50/55 leading-[1.5]">
          Catch one good moment from today. Auwa keeps it as a firefly in
          your trove.
        </p>
      </div>

      {/* The prompt is the serif hero; the answer is a clear sans field. */}
      <div className="w-full max-w-sm flex flex-col items-stretch gap-5">
        <p className="t-voice-l text-cosmic-50 text-center text-balance">
          {prompt.question}
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="rounded-card border border-cosmic-50/15 bg-cosmic-50/[0.03] focus-within:border-cosmic-50/40 transition-colors px-4 py-3 text-left"
        >
          <textarea
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value.slice(0, 200))}
            placeholder="Tap to write a few words…"
            rows={2}
            className="w-full bg-transparent t-body text-cosmic-50 placeholder:text-cosmic-50/35 focus:outline-none resize-none"
          />
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 t-meta text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
          >
            <ImagePlus size={16} strokeWidth={1.6} />
            {photo ? "Photo added" : "Add a photo"}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhoto}
              className="sr-only"
            />
          </button>
          {photo ? (
            <div className="relative w-10 h-10 rounded-card overflow-hidden border border-cosmic-50/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute inset-0 bg-[var(--color-void)]/60 opacity-0 hover:opacity-100 text-cosmic-50 text-[11px] flex items-center justify-center transition-opacity"
                aria-label="Remove photo"
              >
                Remove
              </button>
            </div>
          ) : (
            <span className="t-eyebrow text-cosmic-50/30">
              {overLimit ? "A little shorter" : "A few words"}
            </span>
          )}
        </div>
      </div>

      {/* Actions — Capture leads, Skip is quiet. */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3 pb-2">
        <Button variant="primary" fullWidth onClick={capture} disabled={!answer.trim()}>
          Catch this light
        </Button>
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip for now
        </Button>
      </div>
    </section>
  );
}

/* A single firefly glow — ties the capture to the trove. */
function Firefly({ large = false }: { large?: boolean }) {
  const s = large ? 18 : 12;
  return (
    <span
      aria-hidden="true"
      className="block rounded-full"
      style={{
        width: s,
        height: s,
        background:
          "radial-gradient(circle, oklch(0.92 0.16 95) 0%, oklch(0.7 0.12 95) 60%, transparent 100%)",
        boxShadow: "0 0 16px 2px oklch(0.85 0.15 95 / 0.5)",
        animation: "auwa-firefly-pulse 1800ms ease-in-out infinite",
      }}
    />
  );
}

async function resizeDataUrl(
  dataUrl: string,
  maxWidth: number,
  quality: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
