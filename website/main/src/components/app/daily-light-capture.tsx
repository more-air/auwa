"use client";

/*
  DailyLightCapture — the optional second screen after the daily
  revelation (spec §5.14, §8). Above the fold: *Auwa noticed a small
  light today.* Below: a single rotating question, a short text
  answer (capped soft at ~15 words), optional photo attachment.

  Skipping records nothing. Capturing creates a firefly via
  addFirefly + the trove receives it.

  This component is also reused on the standalone /app/pwa/light
  surface (task 9) so the user can capture a moment without doing
  the daily revelation first.

  Photo attachment for v1: in-memory data URLs. Production stores
  in Vercel Blob and references by URL (§8.3).
*/

import { useMemo, useRef, useState } from "react";
import { Orb } from "./orb";
import { addFirefly } from "@/lib/app-store";
import { pickDailyLightPrompt } from "@/lib/daily-light-prompts";

export type DailyLightCaptureProps = {
  onSkip: () => void;
  onCaptured: () => void;
  /** Optional override for the prompt — defaults to today's pick. */
  promptId?: string;
};

export function DailyLightCapture({
  onSkip,
  onCaptured,
  promptId,
}: DailyLightCaptureProps) {
  const prompt = useMemo(() => {
    const today = pickDailyLightPrompt();
    if (promptId) {
      // not implemented yet — placeholder for future direct routing
    }
    return today;
  }, [promptId]);

  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [captured, setCaptured] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const overLimit = wordCount > 15;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Soft cap on data-URL length to avoid quota errors. ~400KB.
      const url = reader.result as string;
      if (url.length > 600_000) {
        // Resize via canvas to keep storage manageable.
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

  if (captured) {
    return (
      <section className="min-h-svh flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3">
          <Orb size="md" />
          <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-cosmic-50/75 mt-4">
            Captured
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-svh flex flex-col items-center justify-between px-6 pt-12 pb-10">
      <div className="flex flex-col items-center mt-4">
        <Orb size="sm" />
        <p className="font-display text-[18px] text-cosmic-50/85 text-center mt-4 max-w-xs leading-[1.5]">
          Auwa noticed a small light today.
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <p className="font-display text-[19px] text-cosmic-50 text-center leading-[1.4]">
          {prompt.question}
        </p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value.slice(0, 200))}
          placeholder="A few words"
          rows={2}
          autoFocus
          className={[
            "w-full bg-transparent border-b border-cosmic-50/25 py-2 px-1",
            "font-display text-[16px] text-cosmic-50 text-center",
            "placeholder:text-cosmic-50/30",
            "focus:outline-none focus:border-cosmic-50/55",
            "resize-none",
          ].join(" ")}
        />
        {overLimit ? (
          <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-cosmic-50/50 -mt-3">
            A little shorter is fine
          </span>
        ) : null}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={[
              "rounded-full w-12 h-12 flex items-center justify-center",
              "border border-cosmic-50/25 hover:border-cosmic-50/55",
              "transition-colors duration-300",
            ].join(" ")}
            aria-label="Attach a photo"
            title="Attach a photo"
          >
            <CameraIcon />
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
            <div className="relative w-12 h-12 rounded-md overflow-hidden border border-cosmic-50/25">
              <img src={photo} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-void)] border border-cosmic-50/40 text-cosmic-50 text-[10px] flex items-center justify-center"
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={onSkip}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/35 hover:text-cosmic-50/65 transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={capture}
          disabled={!answer.trim()}
          className={[
            "font-sans text-[12px] tracking-[0.16em] uppercase",
            "border rounded-sm px-6 py-3",
            "transition-colors duration-300",
            answer.trim()
              ? "text-cosmic-50/85 border-cosmic-50/30 hover:text-cosmic-50 hover:border-cosmic-50/60"
              : "text-cosmic-50/25 border-cosmic-50/10 cursor-not-allowed",
          ].join(" ")}
        >
          Capture
        </button>
      </div>
    </section>
  );
}

function CameraIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cosmic-50/75"
      aria-hidden="true"
    >
      <path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h2l1-1.5h5l1 1.5h2a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-8z" />
      <circle cx="10" cy="10.5" r="3" />
    </svg>
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
