"use client";

/*
  QuietEntries — bottom-strip navigation on Arrival.

  Tab-bar pattern with icon + label per entry, evenly distributed
  across the strip. Five entries; Letter is conditional (only
  appears when a new letter is unread, so the strip reads 4-or-5
  items depending on state).

  Icons (Lucide React):
    Light    → Sparkle    (a small noticing)
    Rest     → Moon       (sanctuary, contemplation)
    Trove    → Sparkles   (a constellation of captured lights)
    Senshin  → Droplet    (water of the chōzubachi, washing the heart)
    Letter   → custom folded-paper SVG, refined

  Stroke weight is 1.5 across all icons for a quieter visual weight
  than Lucide's default 2px. Labels sit at t-eyebrow tracking.
*/

import Link from "next/link";
import { Sparkle, Moon, Sparkles, Droplet } from "lucide-react";
import type { ReactNode } from "react";
import { pickCurrentLetter } from "@/lib/letters";
import { useAppStore } from "@/lib/app-store";

type Entry = {
  key: string;
  label: string;
  href: string;
  ariaLabel: string;
  icon: ReactNode;
};

const ICON_SIZE = 20;
const STROKE = 1.4;

const ENTRIES: Entry[] = [
  {
    key: "light",
    label: "Light",
    href: "/light",
    ariaLabel: "Daily Light, capture a small noticing",
    icon: <Sparkle size={ICON_SIZE} strokeWidth={STROKE} />,
  },
  {
    key: "rest",
    label: "Rest",
    href: "/rest",
    ariaLabel: "Sanctuary, a place to rest",
    icon: <Moon size={ICON_SIZE} strokeWidth={STROKE} />,
  },
  {
    key: "trove",
    label: "Trove",
    href: "/trove",
    ariaLabel: "Firefly Trove, your captured noticings",
    icon: <Sparkles size={ICON_SIZE} strokeWidth={STROKE} />,
  },
  {
    key: "senshin",
    label: "Senshin",
    href: "/senshin",
    ariaLabel: "Senshin, wash a worry",
    icon: <Droplet size={ICON_SIZE} strokeWidth={STROKE} />,
  },
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
        "w-full max-w-md mx-auto flex items-stretch",
        className,
      ].join(" ")}
    >
      {ENTRIES.map((e) => (
        <EntryLink key={e.key} entry={e} />
      ))}
      {letterUnread ? (
        <EntryLink
          entry={{
            key: "letter",
            label: "Letter",
            href: "/letter",
            ariaLabel: "A new letter from Auwa is waiting",
            icon: <FoldedLetterIcon />,
          }}
          highlighted
        />
      ) : null}
    </nav>
  );
}

function EntryLink({
  entry,
  highlighted = false,
}: {
  entry: Entry;
  highlighted?: boolean;
}) {
  return (
    <Link
      href={entry.href}
      aria-label={entry.ariaLabel}
      className={[
        "flex-1 group flex flex-col items-center justify-center gap-1.5 py-3",
        "transition-colors duration-[var(--duration-hover)] ease-out",
        "active:scale-[0.96]",
        highlighted
          ? "text-cosmic-50/72 hover:text-cosmic-50"
          : "text-cosmic-50/44 hover:text-cosmic-50/85",
      ].join(" ")}
    >
      <span className="block">{entry.icon}</span>
      <span className="t-eyebrow">{entry.label}</span>
    </Link>
  );
}

function FoldedLetterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3.5 4h9L16.5 8V16.5h-13V4z" />
      <path d="M12.5 4V8H16.5" />
      <path d="M6 11h6" opacity="0.7" />
      <path d="M6 13.5h4" opacity="0.5" />
    </svg>
  );
}
