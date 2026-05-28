"use client";

/*
  QuietEntries — the small one-word row beside the state arc on the
  arrival screen. Each entry opens a secondary surface; none of them
  are required, none of them are highlighted.

  Spec: §5.3 of context/pillar/app.md.

  Typographic rule: deliberately subordinated to the state arc.
  Smaller text, lower opacity, generous letter-spacing. The user who
  needs each one finds it; the user who does not never notices it.

  A small folded-paper mark sits beside these entries when an unread
  letter is waiting — the spec calls for it (§5.3, §5.12).
*/

import Link from "next/link";
import { pickCurrentLetter } from "@/lib/letters";
import { useAppStore } from "@/lib/app-store";

const ENTRIES: { key: string; label: string; href: string; "aria-label": string }[] = [
  { key: "light", label: "light", href: "/light", "aria-label": "Daily Light, capture a small noticing" },
  { key: "rest", label: "rest", href: "/rest", "aria-label": "Sanctuary, a place to rest" },
  { key: "trove", label: "trove", href: "/trove", "aria-label": "Firefly Trove, your captured noticings" },
  { key: "senshin", label: "senshin", href: "/senshin", "aria-label": "Senshin, wash a worry" },
];

export type QuietEntriesProps = {
  className?: string;
};

export function QuietEntries({ className = "" }: QuietEntriesProps) {
  const store = useAppStore();
  const letter = pickCurrentLetter();
  const letterUnread = letter ? !store.lettersSeen.includes(letter.id) : false;

  return (
    <div
      className={[
        "flex items-center justify-center gap-6 flex-wrap",
        className,
      ].join(" ")}
    >
      {ENTRIES.map((e) => (
        <Link
          key={e.key}
          href={e.href}
          aria-label={e["aria-label"]}
          className={[
            "font-sans text-[11px] tracking-[0.18em] uppercase",
            "text-cosmic-50/35 hover:text-cosmic-50/70",
            "transition-colors duration-300",
          ].join(" ")}
        >
          {e.label}
        </Link>
      ))}
      {letterUnread ? (
        <Link
          href="/letter"
          aria-label="A new letter from Auwa is waiting"
          className="flex items-center gap-1.5"
        >
          <FoldedPaperIcon />
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors">
            letter
          </span>
        </Link>
      ) : null}
    </div>
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
      strokeWidth="1"
      strokeLinejoin="round"
      className="text-cosmic-50/65"
      aria-hidden="true"
    >
      <path d="M1.5 1.5h5L8.5 3.5V10.5h-7V1.5z" />
      <path d="M6.5 1.5V3.5H8.5" />
    </svg>
  );
}
