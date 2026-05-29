"use client";

/*
  Kokoro view (§5.9).

  Dedicated screen showing the user's current Kokoro at large scale.
  Tap each motif to see what it represents. Print order CTA is
  stubbed for v1 (real fulfilment via /api/print/order in production).

  Motif sources (per §7):
    1. Personalisation seeds — 5-7 picked at signup, permanent
    2. Emotional weather — monthly, based on Yamato state cluster
    3. Threshold markers — silent additions at meaningful counts
  v1 only surfaces source 1 (the personalisation picks). Sources 2-3
  layer on after enough revelations and are deferred to Stage 6+.
*/

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KokoroSilhouette } from "@/components/kokoro-silhouette";
import { PlaceholderAsset } from "@/components/placeholder-asset";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/button";
import { useAppStore } from "@/lib/app-store";
import { FIRST_GIFT_MOTIF, getMotif } from "@/lib/motifs";

export default function KokoroView() {
  const router = useRouter();
  const store = useAppStore();
  const [focused, setFocused] = useState<string | null>(null);

  const motifs = useMemo(() => {
    const ids = [...store.onboarding.motifs];
    if (store.onboarding.firstGiftMotif) {
      ids.push(store.onboarding.firstGiftMotif);
    }
    return ids
      .map((id) => getMotif(id))
      .filter((m): m is NonNullable<ReturnType<typeof getMotif>> => Boolean(m));
  }, [store.onboarding.motifs, store.onboarding.firstGiftMotif]);

  const focusedMotif = focused ? getMotif(focused) ?? null : null;

  return (
    <main id="main-content" className="min-h-svh bg-[var(--color-void)]">
      <PageHeader title="Kokoro" onBack={() => router.push("/")} />

      <div className="max-w-md mx-auto flex flex-col items-center gap-6 px-6 pt-4 pb-16">
        <KokoroSilhouette
          size="lg"
          motifs={motifs.map((m) => m.key)}
        />

        {focusedMotif ? (
          <div className="text-center max-w-xs">
            <p className="t-title text-cosmic-50/95">{focusedMotif.label}</p>
            <p className="t-voice text-cosmic-50/55 mt-1">
              {motifDescription(focusedMotif.key, store.onboarding.firstGiftMotif)}
            </p>
          </div>
        ) : (
          <p className="t-voice text-cosmic-50/45 text-center max-w-xs">
            The motifs your Kokoro carries. Tap one.
          </p>
        )}

        <div className="grid grid-cols-4 gap-2 w-full">
          {motifs.map((m) => {
            const isGift = m.key === FIRST_GIFT_MOTIF.key;
            const isFocused = focused === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setFocused((c) => (c === m.key ? null : m.key))}
                className={[
                  "aspect-square rounded-full border transition-colors duration-200",
                  isFocused
                    ? "border-cosmic-50/65 bg-cosmic-50/10"
                    : isGift
                      ? "border-cosmic-50/30 bg-cosmic-50/5 hover:border-cosmic-50/55"
                      : "border-cosmic-50/15 hover:border-cosmic-50/35",
                ].join(" ")}
              >
                <PlaceholderAsset
                  label={m.label}
                  tone={isGift ? "cosmic-800" : "void-ring"}
                  rounded
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-cosmic-50/10 w-full flex flex-col items-center text-center">
          <p className="t-body text-cosmic-50/55 max-w-xs mx-auto">
            At year-end, order a printed portrait of your Kokoro on
            hand-pressed Japanese paper. £30-40.
          </p>
          <Button
            variant="secondary"
            size="sm"
            disabled
            className="mt-4"
            title="Available in late 2026"
          >
            Order print · later this year
          </Button>
        </div>
      </div>
    </main>
  );
}

function motifDescription(key: string, firstGiftKey?: string): string {
  if (key === firstGiftKey) {
    return "A small something Auwa noticed in you. You did not pick it.";
  }
  return "From your personalisation.";
}
