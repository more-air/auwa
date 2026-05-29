"use client";

/*
  Senshin Look Back (§5.18, §9.5).

  Three views — by status, by category, by emotion (with the cross-
  reference between the two). All driven by data the user generated.
  No NLP, no theme detection, no inference. Auwa is the keeper of
  the record; the user is the auditor.

  The medicine is the count of "settled" versus "still on my mind"
  over time — durable evidence that catches the next spiral.
*/

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Chip } from "@/components/chip";
import { SegmentedControl } from "@/components/segmented-control";
import {
  senshinCountsByCategory,
  senshinCountsByEmotion,
  setSenshinStatus,
  useAppStore,
  type SenshinEntry,
  type SenshinStatus,
} from "@/lib/app-store";
import { getYamatoState, type YamatoState } from "@/lib/yamato";

type View = "status" | "category" | "emotion";

export default function SenshinLookBack() {
  const router = useRouter();
  const store = useAppStore();
  const [view, setView] = useState<View>("status");

  const entries = store.senshin;
  const byCategory = useMemo(() => senshinCountsByCategory(entries), [entries]);
  const byEmotion = useMemo(() => senshinCountsByEmotion(entries), [entries]);

  return (
    <main id="main-content" className="min-h-svh bg-[var(--color-void)]">
      <PageHeader title="Look Back" onBack={() => router.push("/")} />

      <div className="max-w-md mx-auto px-6 pt-4 pb-16">
        {entries.length === 0 ? (
          <p className="t-voice-l text-cosmic-50/55 text-center mt-12">
            Nothing to look back on yet. After your first wash, this page
            begins keeping a quiet record.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-center mb-8">
              <SegmentedControl<View>
                value={view}
                onChange={setView}
                options={[
                  { value: "status", label: "Status" },
                  { value: "category", label: "Category" },
                  { value: "emotion", label: "Emotion" },
                ]}
              />
            </div>

            {view === "status" && <ByStatus entries={entries} />}
            {view === "category" && <ByCategory counts={byCategory} />}
            {view === "emotion" && (
              <ByEmotion counts={byEmotion} entries={entries} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

function ByStatus({ entries }: { entries: SenshinEntry[] }) {
  const settled = entries.filter((e) => e.status === "settled").length;
  const onMind = entries.filter((e) => e.status === "on-my-mind").length;
  const unmarked = entries.filter((e) => e.status === "unmarked").length;

  return (
    <div>
      <p className="t-body text-cosmic-50/85 text-center mb-8">
        {entries.length} {entries.length === 1 ? "worry" : "worries"} washed.
        {" "}
        <span className="text-cosmic-50/55">
          {settled} settled · {onMind} still on your mind · {unmarked} unmarked
        </span>
      </p>
      <div className="flex flex-col gap-4">
        {entries.map((e) => (
          <StatusRow key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
}

function StatusRow({ entry }: { entry: SenshinEntry }) {
  const when = new Date(entry.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
  const setStatus = (status: SenshinStatus) =>
    setSenshinStatus(entry.id, status);
  return (
    <div className="border border-cosmic-50/12 rounded-[16px] p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="t-eyebrow text-cosmic-50/45">
          {when}
        </span>
        <span className="t-meta text-cosmic-50/55">
          {labelCategories(entry.categories)}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2 mt-1">
        <Chip
          size="sm"
          selected={entry.status === "settled"}
          onClick={() => setStatus("settled")}
        >
          Settled
        </Chip>
        <Chip
          size="sm"
          selected={entry.status === "on-my-mind"}
          onClick={() => setStatus("on-my-mind")}
        >
          Still on my mind
        </Chip>
      </div>
    </div>
  );
}

function ByCategory({ counts }: { counts: Record<string, number> }) {
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="flex flex-col gap-3">
      {rows.map(([key, count]) => (
        <div
          key={key}
          className="flex items-center justify-between border-b border-cosmic-50/10 pb-2"
        >
          <span className="t-body text-cosmic-50/90 capitalize">
            {key.startsWith("other:") ? key.slice(6) : key.replace(/-/g, " ")}
          </span>
          <span className="t-body text-cosmic-50/55 tabular-nums">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}

function ByEmotion({
  counts,
  entries,
}: {
  counts: Record<YamatoState, number>;
  entries: SenshinEntry[];
}) {
  // Cross-reference: for each category, which emotion is most common?
  const crossRef = useMemo(() => {
    const map = new Map<string, Record<YamatoState, number>>();
    for (const e of entries) {
      for (const c of e.categories) {
        if (c.startsWith("other:")) continue;
        const counts = map.get(c) ?? {
          hare: 0,
          takaburi: 0,
          aware: 0,
          yuragi: 0,
          nagomi: 0,
        };
        counts[e.state] += 1;
        map.set(c, counts);
      }
    }
    return Array.from(map.entries()).map(([cat, byState]) => {
      const top = (Object.entries(byState) as [YamatoState, number][])
        .filter(([, n]) => n > 0)
        .sort((a, b) => b[1] - a[1])[0];
      return {
        category: cat,
        topState: top?.[0] ?? null,
      };
    });
  }, [entries]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {(Object.keys(counts) as YamatoState[]).map((s) => {
          const def = getYamatoState(s);
          return (
            <div
              key={s}
              className="flex items-center justify-between border-b border-cosmic-50/10 pb-2"
            >
              <span className="t-body text-cosmic-50/90">
                {def.english}
              </span>
              <span className="t-body text-cosmic-50/55 tabular-nums">
                {counts[s]}
              </span>
            </div>
          );
        })}
      </div>
      {crossRef.length > 0 ? (
        <div>
          <h3 className="t-eyebrow text-cosmic-50/45 mb-2">
            Cross-reference
          </h3>
          <div className="flex flex-col gap-1.5">
            {crossRef.map(({ category, topState }) =>
              topState ? (
                <p
                  key={category}
                  className="t-meta text-cosmic-50/75 leading-[1.55]"
                >
                  <span className="capitalize">
                    {category.replace(/-/g, " ")}
                  </span>
                  -category worries have most often felt{" "}
                  <span className="text-cosmic-50">
                    {getYamatoState(topState).english}
                  </span>
                  .
                </p>
              ) : null
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function labelCategories(cats: string[]): string {
  const cleaned = cats.map((c) =>
    c.startsWith("other:")
      ? c.slice(6)
      : c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
  return cleaned.join(", ");
}
