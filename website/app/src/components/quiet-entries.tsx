"use client";

/*
  QuietEntries — the persistent bottom tab bar.

  Five tabs: Home, Light, Rest, Trove, Senshin. Active tab is shown
  with full-opacity icon + label; inactive tabs sit at 44% opacity.
  Pattern matches Apple's iOS native tab bar + Finch's home/quests/
  shop/profile + Bloom's today/explore/stats/entries.

  Letter doesn't live in the tab bar anymore — it surfaces as a
  card on Home when there's an unread letter waiting.

  Tab bar is visible on:
    /              (Home)
    /light         (Daily Light standalone)
    /rest          (Sanctuary)
    /trove         (Firefly Trove)
    /senshin       (Senshin entry)

  All other surfaces (drill-downs, modals, the daily flow phases)
  render without the tab bar so the user's attention sits with the
  task.
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkle, Moon, Sparkles, Droplet } from "lucide-react";
import type { ReactNode } from "react";

type Entry = {
  key: string;
  label: string;
  href: string;
  ariaLabel: string;
  icon: ReactNode;
};

const ICON_SIZE = 22;
const STROKE = 1.5;

/* The Auwa silhouette as the Home glyph — a filled little character
   (rounded body, two arms, two legs with a central notch) so the
   Home tab carries the brand's face rather than a generic house.
   Sits at the same optical weight as the Lucide line icons beside
   it; colour follows currentColor for the active/inactive states. */
function AuwaGlyph({ size = ICON_SIZE }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3c-4 0-6.9 3-6.9 6.9v7.5c0 .85.99 1.27 1.57.66l1.93-2.05c.36-.38.97-.38 1.33 0l1.4 1.49c.36.38.97.38 1.33 0l1.4-1.49c.36-.38.97-.38 1.33 0l1.93 2.05c.58.61 1.57.19 1.57-.66V9.9C18.9 6 15.99 3 12 3Z" />
      <ellipse cx="9.7" cy="10.4" rx="1.05" ry="1.25" fill="var(--color-void)" />
      <ellipse cx="14.3" cy="10.4" rx="1.05" ry="1.25" fill="var(--color-void)" />
    </svg>
  );
}

const ENTRIES: Entry[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    ariaLabel: "Home, today's Kokoro",
    icon: <AuwaGlyph />,
  },
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
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary surfaces"
      className={[
        "w-full max-w-md mx-auto flex items-stretch",
        className,
      ].join(" ")}
    >
      {ENTRIES.map((e) => {
        const active = isActive(e.href, pathname);
        return (
          <Link
            key={e.key}
            href={e.href}
            aria-label={e.ariaLabel}
            aria-current={active ? "page" : undefined}
            className={[
              "flex-1 group flex flex-col items-center justify-center gap-1 py-3",
              "transition-colors duration-[var(--duration-hover)]",
              "active:scale-[0.96] transition-transform",
              active
                ? "text-cosmic-50"
                : "text-cosmic-50/44 hover:text-cosmic-50/82",
            ].join(" ")}
          >
            <span className="block">{e.icon}</span>
            <span className="t-eyebrow text-[10px]">{e.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
