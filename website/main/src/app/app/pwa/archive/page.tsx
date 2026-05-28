"use client";

/*
  Archive (§5.8).

  Vertical stack of revelation cards. Each card: date, Yamato state
  kanji + English, opening line of reflection, small context label
  if tagged. Tap to expand for the full reflection text.

  After 10+ revelations, a quiet "Observations" section surfaces
  pattern correlations at the top. v1 stubs this — the real engine
  is GET /api/archive/observations (§6.3) and will land in Stage 6+.
*/

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAppStore,
  type Revelation,
} from "@/lib/app-store";
import { getYamatoState } from "@/lib/yamato";

export default function Archive() {
  const router = useRouter();
  const store = useAppStore();
  const revelations = store.revelations;

  const observation = useMemo(() => stubObservation(revelations), [revelations]);

  return (
    <main id="main-content" className="min-h-svh px-6 pt-16 pb-16 bg-[var(--color-void)]">
      <header className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => router.push("/app/pwa")}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
        >
          ← Back
        </button>
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45">
          Archive
        </span>
        <span className="w-12" />
      </header>

      <div className="max-w-md mx-auto">
        {revelations.length === 0 ? (
          <p className="font-display text-[16px] text-cosmic-50/55 text-center mt-16 leading-[1.55]">
            Nothing in the archive yet. Your first revelation will land here
            when it lands.
          </p>
        ) : (
          <>
            {observation ? (
              <div className="border border-cosmic-50/12 rounded-md px-4 py-4 mb-8">
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/45 block mb-2">
                  Observations
                </span>
                <p className="font-display text-[15px] text-cosmic-50/85 leading-[1.55]">
                  {observation}
                </p>
              </div>
            ) : null}
            <div className="flex flex-col gap-3">
              {revelations.map((r) => (
                <ArchiveCard key={r.id} revelation={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function ArchiveCard({ revelation }: { revelation: Revelation }) {
  const [expanded, setExpanded] = useState(false);
  const def = getYamatoState(revelation.state);
  const when = new Date(revelation.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
  const opening = revelation.reflection.split(".")[0] + ".";

  return (
    <button
      type="button"
      onClick={() => setExpanded((e) => !e)}
      className={[
        "w-full text-left border border-cosmic-50/12 rounded-md px-4 py-4",
        "transition-colors duration-200",
        "hover:border-cosmic-50/25",
        // Tint with the state's mid gradient stop at low alpha
        "relative overflow-hidden",
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, var(--gradient-${revelation.state}-deep) -40%, var(--color-void) 70%)`,
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span
              className="font-jp-serif text-[20px] text-cosmic-50/85"
              style={{ fontFamily: "var(--font-jp-serif)" }}
            >
              {def.kanji}
            </span>
            <span className="font-display text-[15px] text-cosmic-50">
              {def.english}
            </span>
            {revelation.subExpressionEnglish ? (
              <span className="font-display text-[13px] text-cosmic-50/55">
                · {revelation.subExpressionEnglish}
              </span>
            ) : null}
          </div>
          <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/45">
            {when}
          </span>
        </div>
        <p className="font-display text-[15px] text-cosmic-50/85 leading-[1.55]">
          {expanded ? revelation.reflection : opening}
        </p>
        {revelation.contextTag ? (
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-cosmic-50/35 block mt-2">
            {humanContext(revelation.contextTag, revelation.contextNote)}
          </span>
        ) : null}
      </div>
    </button>
  );
}

function humanContext(tag: string, note?: string): string {
  const cleaned = tag.replace(/-/g, " ");
  return note ? `${cleaned} · ${note}` : cleaned;
}

/** Stub pattern observation for testing. The real engine arrives in
 *  Stage 6+ and lives in /api/archive/observations. */
function stubObservation(revelations: Revelation[]): string | null {
  if (revelations.length < 10) return null;
  const recent = revelations.slice(0, 20);
  const counts = recent.reduce<Record<string, number>>((acc, r) => {
    acc[r.state] = (acc[r.state] ?? 0) + 1;
    return acc;
  }, {});
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!top) return null;
  const [state, count] = top;
  return `${getYamatoState(state as never).english} has visited ${count} of your last ${recent.length} revelations.`;
}
