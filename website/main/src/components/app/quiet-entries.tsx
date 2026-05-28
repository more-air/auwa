"use client";

/*
  QuietEntries — the small one-word row beside the state arc on the
  arrival screen. Each entry opens a secondary surface; none of them
  are required, none of them are highlighted.

  Spec: §5.3 of context/pillar/app.md.

  Typographic rule: deliberately subordinated to the state arc.
  Smaller text, lower opacity, generous letter-spacing. The user who
  needs each one finds it; the user who does not never notices it.

  The router target stubs exist as TODOs — each becomes a real route
  when those surfaces are built.
*/

import Link from "next/link";

const ENTRIES: { key: string; label: string; href: string; "aria-label": string }[] = [
  { key: "light", label: "light", href: "/app/pwa", "aria-label": "Daily Light — capture a small noticing" },
  { key: "rest", label: "rest", href: "/app/pwa", "aria-label": "Sanctuary — a place to rest" },
  { key: "trove", label: "trove", href: "/app/pwa", "aria-label": "Firefly Trove — your captured noticings" },
  { key: "senshin", label: "senshin", href: "/app/pwa", "aria-label": "Senshin — wash a worry" },
];

export type QuietEntriesProps = {
  className?: string;
};

export function QuietEntries({ className = "" }: QuietEntriesProps) {
  return (
    <div
      className={[
        "flex items-center justify-center gap-6",
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
    </div>
  );
}
