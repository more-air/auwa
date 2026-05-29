"use client";

/*
  QuietEntries — the four secondary destinations on Arrival, plus
  the letter-mark when a new letter is waiting.

  v2 refinement (May 2026): treat as a proper bottom-row navigation
  strip, not a wrapping pile of tiny links. Each entry sits in a
  fixed-width column, evenly distributed across the row. The letter
  mark slides in as a fifth entry when unread, otherwise hides.

  Typography: t-eyebrow (11px uppercase tracking), with active hover
  state pulling to 80% opacity. Tap target sits at 44px tall via
  py-3, so the row feels reachable on a phone without competing
  visually with the state arc above.
*/

import Link from "next/link";
import { pickCurrentLetter } from "@/lib/letters";
import { useAppStore } from "@/lib/app-store";

type Entry = {
  key: string;
  label: string;
  href: string;
  ariaLabel: string;
};

const ENTRIES: Entry[] = [
  { key: "light",   label: "Light",   href: "/light",   ariaLabel: "Daily Light, capture a small noticing" },
  { key: "rest",    label: "Rest",    href: "/rest",    ariaLabel: "Sanctuary, a place to rest" },
  { key: "trove",   label: "Trove",   href: "/trove",   ariaLabel: "Firefly Trove, your captured noticings" },
  { key: "senshin", label: "Senshin", href: "/senshin", ariaLabel: "Senshin, wash a worry" },
];

export type QuietEntriesProps = {
  className?: string;
};

export function QuietEntries({ className = "" }: QuietEntriesProps) {
  const store = useAppStore();
  const letter = pickCurrentLetter();
  const letterUnread = letter ? !store.lettersSeen.includes(letter.id) : false;

  return (
    <nav
      aria-label="Secondary surfaces"
      className={[
        "w-full max-w-md mx-auto flex items-center justify-between",
        className,
      ].join(" ")}
    >
      {ENTRIES.map((e) => (
        <Link
          key={e.key}
          href={e.href}
          aria-label={e.ariaLabel}
          className={[
            "flex-1 flex items-center justify-center py-3",
            "t-eyebrow text-cosmic-50/40 hover:text-cosmic-50/80 active:text-cosmic-50",
            "transition-colors duration-[var(--duration-hover)]",
          ].join(" ")}
        >
          {e.label}
        </Link>
      ))}
      {letterUnread ? (
        <Link
          href="/letter"
          aria-label="A new letter from Auwa is waiting"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 t-eyebrow text-cosmic-50/60 hover:text-cosmic-50 transition-colors"
        >
          <FoldedPaperIcon />
          <span>Letter</span>
        </Link>
      ) : null}
    </nav>
  );
}

function FoldedPaperIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 1.5h5L8.5 3.5V10.5h-7V1.5z" />
      <path d="M6.5 1.5V3.5H8.5" />
    </svg>
  );
}
