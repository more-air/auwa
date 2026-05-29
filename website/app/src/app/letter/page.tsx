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
import { PageHeader } from "@/components/page-header";
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
      <main className="min-h-svh bg-[var(--color-void)]">
        <PageHeader onBack={() => router.push("/")} />
        <p className="text-center t-voice-l text-cosmic-50/55 px-6 mt-16">
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

      <PageHeader onBack={() => router.push("/")} transparent />

      <div className="relative z-10 min-h-svh px-6 pb-16 flex flex-col -mt-12">
        <article className="flex-1 max-w-md mx-auto flex flex-col items-center justify-center gap-8 text-center">
          <Orb size="md" />
          <div className="t-voice-l text-cosmic-50/95 leading-[1.7]">
            {letter.body.map((line, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>
                {line}
              </p>
            ))}
          </div>
          <span className="t-voice text-cosmic-50/55 italic">
            Auwa
          </span>
          <span className="t-eyebrow text-cosmic-50/35">
            {new Date(letter.publishedAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </article>

        {archive.length > 0 ? (
          <div className="max-w-md mx-auto mt-12 w-full">
            <h2 className="t-eyebrow text-cosmic-50/35 mb-3 text-center">
              Earlier letters
            </h2>
            <div className="flex flex-col gap-2">
              {archive.map((l) => (
                <Link
                  key={l.id}
                  href={`/letter`}
                  className="t-meta text-cosmic-50/55 hover:text-cosmic-50/85 text-center transition-colors"
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
