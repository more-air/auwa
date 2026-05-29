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
import { Sparkle, Moon, Sparkles, Droplet, House } from "lucide-react";
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

const ENTRIES: Entry[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    ariaLabel: "Home, today's Kokoro",
    icon: <House size={ICON_SIZE} strokeWidth={STROKE} />,
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
