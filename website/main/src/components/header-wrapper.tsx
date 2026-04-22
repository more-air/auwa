"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

/**
 * Remounts the Header on every pathname change.
 *
 * Header state (hidden, atTop, lastScrollY) is scroll-derived and page-
 * specific. Keeping a persistent Header instance across navigations meant
 * the new page's first render inherited the previous page's state —
 * most visibly: if the user scrolled down on home (header hidden),
 * clicking a teaser link committed the new page with hidden=true first,
 * then flipped to hidden=false, firing the 500ms slide-down as the
 * teaser content had already rendered.
 *
 * Keying on pathname forces React to throw away the old Header instance
 * and mount a fresh one. New state starts at the defaults — hidden=false
 * — so the first paint is already correct and no transition animates.
 * Any previous hide/show state is lost, which is the intended behaviour
 * (each page manages its own header state from its scrollY=0 start).
 */
export function HeaderWrapper() {
  const pathname = usePathname();
  return <Header key={pathname} />;
}
