"use client";

/*
  Letter from Auwa (§2.3.1, §5.12).

  Once a week, on a quiet day, a short letter from Auwa appears on
  the arrival screen. Three or four sentences. Written by Tom and
  Claude in Rieko's voice direction, signed off by Rieko in batches.

  v1 ships a single launch letter from src/lib/letters.ts. The
  arrival surface will display a small folded-paper mark beside the
  state arc when an unread letter is waiting (deferred to v1 polish).
*/

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import { GradientField } from "@/components/gradient-field";
import {
  lastRevelation,
  markLetterSeen,
  useAppStore,
  useStoreReady,
} from "@/lib/app-store";
import { LETTERS, pickCurrentLetter } from "@/lib/letters";

export default function LetterPage() {
  const router = useRouter();
  const store = useAppStore();
  const ready = useStoreReady();
  const letter = pickCurrentLetter();
  const last = lastRevelation(store);

  // Mark as seen on mount so the arrival surface stops showing the
  // unread indicator.
  useEffect(() => {
    if (ready && letter) {
      markLetterSeen(letter.id);
    }
  }, [ready, letter]);

  if (!letter) {
    return (
      <main className="min-h-svh px-6 pt-16 pb-16">
        <p className="text-center font-display text-[16px] text-cosmic-50/55">
          No letter waiting. The next one will arrive on a quiet day.
        </p>
      </main>
    );
  }

  const archive = LETTERS.filter((l) => l.id !== letter.id);

  return (
    <main id="main-content" className="min-h-svh relative">
      {last ? (
        <GradientField state={last.state} intent="soft" />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-void)]" />
      )}

      <div className="relative z-10 min-h-svh px-6 pt-16 pb-16 flex flex-col">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors self-start"
        >
          ← Back
        </button>

        <article className="flex-1 max-w-md mx-auto flex flex-col items-center justify-center gap-8 text-center">
          <Orb size="md" />
          <div className="font-display text-[19px] text-cosmic-50/95 leading-[1.7]">
            {letter.body.map((line, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>
                {line}
              </p>
            ))}
          </div>
          <span className="font-display text-[16px] text-cosmic-50/55 italic">
            Auwa
          </span>
          <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/35">
            {new Date(letter.publishedAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </article>

        {archive.length > 0 ? (
          <div className="max-w-md mx-auto mt-12 w-full">
            <h2 className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/35 mb-3 text-center">
              Earlier letters
            </h2>
            <div className="flex flex-col gap-2">
              {archive.map((l) => (
                <Link
                  key={l.id}
                  href={`/letter`}
                  className="font-display text-[14px] text-cosmic-50/55 hover:text-cosmic-50/85 text-center"
                >
                  {new Date(l.publishedAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                  })}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
