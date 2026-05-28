"use client";

/*
  App store — localStorage-backed persistence for v1 testing.

  Single API used by every surface in /app/pwa. Holds onboarding
  state, revelations, fireflies, Senshin entries, letters seen,
  and settings. SSR-safe: reads return defaults on the server; the
  React hook re-reads after mount and subscribes to changes via a
  CustomEvent so every consumer stays in sync.

  This is v1 scaffolding. Production replaces this with:
    - Vercel Postgres (per Section 6.2 of the spec) for tier-one data
    - End-to-end encryption (libsodium-wrappers, Argon2id key
      derivation) for Senshin per context/business/privacy.md §3
  The Senshin tier in this v1 store is plain localStorage purely to
  let friends-release testers walk the full flow. Document this
  loudly in the privacy footer once it ships to friends.
*/

import { useEffect, useState, useCallback } from "react";
import type { YamatoState } from "./yamato";
import type { ContextTag } from "@/components/app/context-grid";

const STORAGE_KEY = "auwa.app.v1";
const CHANGE_EVENT = "auwa.app.change";

/* ---------- shape ---------- */

export type WhatBrings =
  | "curiosity"
  | "restlessness"
  | "change"
  | "something-else";

export type WhenFits = "morning" | "evening";

export type Trait = "quiet" | "curious" | "steadfast" | "open";

export type Source =
  | "instagram"
  | "tiktok"
  | "friend"
  | "podcast"
  | "journal"
  | "app-store"
  | "somewhere-else";

export type Onboarding = {
  completed: boolean;
  completedAt?: string;
  whatBrings?: WhatBrings;
  motifs: string[];
  firstGiftMotif?: string;
  whenFits: WhenFits[];
  trait?: Trait;
  source?: Source;
};

export type Revelation = {
  id: string;
  createdAt: string;
  state: YamatoState;
  subExpressionKey?: string;
  subExpressionEnglish?: string;
  contextTag?: ContextTag;
  contextNote?: string;
  reflection: string;
};

export type Firefly = {
  id: string;
  createdAt: string;
  promptId: string;
  question: string;
  answer: string;
  /** Data-URL for v1 testing. Production stores in Vercel Blob and
   *  references by URL. */
  photoDataUrl?: string;
};

export type SenshinStatus = "unmarked" | "settled" | "on-my-mind";

export type SenshinEntry = {
  id: string;
  createdAt: string;
  categories: string[];
  state: YamatoState;
  subExpressionEnglish?: string;
  /** Optional: only set when the user takes the in-app two-column
   *  fallback. Paper users leave these undefined. v1 PLAIN — see
   *  the file-level note. */
  worryText?: string;
  realityText?: string;
  status: SenshinStatus;
};

export type AppStore = {
  onboarding: Onboarding;
  revelations: Revelation[];
  fireflies: Firefly[];
  senshin: SenshinEntry[];
  lettersSeen: string[];
  settings: {
    senshinReminder: boolean;
  };
};

const EMPTY_STORE: AppStore = {
  onboarding: {
    completed: false,
    motifs: [],
    whenFits: [],
  },
  revelations: [],
  fireflies: [],
  senshin: [],
  lettersSeen: [],
  settings: {
    senshinReminder: false,
  },
};

/* ---------- read / write ---------- */

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadStore(): AppStore {
  if (!isBrowser()) return EMPTY_STORE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed = JSON.parse(raw) as Partial<AppStore>;
    // Defensive merge so a v1 store missing newer keys still reads
    // cleanly — important during the build window when the shape
    // can change between deploys.
    return {
      ...EMPTY_STORE,
      ...parsed,
      onboarding: { ...EMPTY_STORE.onboarding, ...(parsed.onboarding ?? {}) },
      settings: { ...EMPTY_STORE.settings, ...(parsed.settings ?? {}) },
      revelations: parsed.revelations ?? [],
      fireflies: parsed.fireflies ?? [],
      senshin: parsed.senshin ?? [],
      lettersSeen: parsed.lettersSeen ?? [],
    };
  } catch {
    return EMPTY_STORE;
  }
}

function saveStore(store: AppStore): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    // Quota exceeded or storage disabled — silent on v1.
  }
}

/* ---------- mutators ---------- */

function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function updateOnboarding(patch: Partial<Onboarding>): void {
  const s = loadStore();
  s.onboarding = { ...s.onboarding, ...patch };
  saveStore(s);
}

export function completeOnboarding(): void {
  const s = loadStore();
  s.onboarding.completed = true;
  s.onboarding.completedAt = new Date().toISOString();
  saveStore(s);
}

export function addRevelation(
  rev: Omit<Revelation, "id" | "createdAt">
): Revelation {
  const s = loadStore();
  const created: Revelation = {
    ...rev,
    id: makeId("rev"),
    createdAt: new Date().toISOString(),
  };
  s.revelations = [created, ...s.revelations];
  saveStore(s);
  return created;
}

export function addFirefly(
  fly: Omit<Firefly, "id" | "createdAt">
): Firefly {
  const s = loadStore();
  const created: Firefly = {
    ...fly,
    id: makeId("fly"),
    createdAt: new Date().toISOString(),
  };
  s.fireflies = [created, ...s.fireflies];
  saveStore(s);
  return created;
}

export function addSenshin(
  entry: Omit<SenshinEntry, "id" | "createdAt" | "status">
): SenshinEntry {
  const s = loadStore();
  const created: SenshinEntry = {
    ...entry,
    id: makeId("sen"),
    createdAt: new Date().toISOString(),
    status: "unmarked",
  };
  s.senshin = [created, ...s.senshin];
  saveStore(s);
  return created;
}

export function setSenshinStatus(id: string, status: SenshinStatus): void {
  const s = loadStore();
  s.senshin = s.senshin.map((e) => (e.id === id ? { ...e, status } : e));
  saveStore(s);
}

export function markLetterSeen(letterId: string): void {
  const s = loadStore();
  if (!s.lettersSeen.includes(letterId)) {
    s.lettersSeen = [...s.lettersSeen, letterId];
    saveStore(s);
  }
}

export function setSettings(patch: Partial<AppStore["settings"]>): void {
  const s = loadStore();
  s.settings = { ...s.settings, ...patch };
  saveStore(s);
}

export function resetStore(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function exportStore(): string {
  return JSON.stringify(loadStore(), null, 2);
}

/* ---------- React hook ---------- */

/**
 * Subscribe to the app store. Returns the current store and re-renders
 * any time a mutator fires. SSR-safe: returns EMPTY_STORE on the first
 * render, then hydrates after mount.
 */
export function useAppStore(): AppStore {
  const [store, setStore] = useState<AppStore>(EMPTY_STORE);

  useEffect(() => {
    setStore(loadStore());
    const onChange = () => setStore(loadStore());
    window.addEventListener(CHANGE_EVENT, onChange);
    // Cross-tab sync — another tab updates localStorage, this tab
    // re-reads. Useful when a user installs the PWA and runs it
    // alongside a Safari tab during testing.
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return store;
}

/** Returns true after the store has hydrated from localStorage. Use
 *  to gate "is this user actually new" checks so the very first
 *  render doesn't bounce a real user back into onboarding. */
export function useStoreReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

/* ---------- derived helpers ---------- */

/** Last revelation, or null. Used by arrival to show "Your last
 *  visit, you carried X." */
export function lastRevelation(store: AppStore): Revelation | null {
  return store.revelations[0] ?? null;
}

/** Filter fireflies to a period. */
export function fireflysIn(
  fireflies: Firefly[],
  period: "week" | "month" | "year" | "all"
): Firefly[] {
  if (period === "all") return fireflies;
  const now = Date.now();
  const cutoffs: Record<"week" | "month" | "year", number> = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };
  const cutoff = now - cutoffs[period];
  return fireflies.filter((f) => new Date(f.createdAt).getTime() >= cutoff);
}

/** Counts of Senshin entries by category — drives the Look Back
 *  "By category" view. */
export function senshinCountsByCategory(
  entries: SenshinEntry[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of entries) {
    for (const c of e.categories) {
      counts[c] = (counts[c] ?? 0) + 1;
    }
  }
  return counts;
}

/** Counts of Senshin entries by emotion (Yamato state) — drives the
 *  Look Back "By emotion" view. */
export function senshinCountsByEmotion(
  entries: SenshinEntry[]
): Record<YamatoState, number> {
  const counts: Record<YamatoState, number> = {
    hare: 0,
    takaburi: 0,
    aware: 0,
    yuragi: 0,
    nagomi: 0,
  };
  for (const e of entries) counts[e.state] += 1;
  return counts;
}
