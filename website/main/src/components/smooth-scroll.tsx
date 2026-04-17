"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/*
  Lenis smooth scrolling wrapper.
  Wrap the app in this component to enable buttery smooth scroll with momentum.
  To disable on specific pages, add data-lenis-prevent to the element.
  To remove entirely, just remove this component from layout.tsx.

  Resets scroll to top on route change — without this, Lenis keeps its
  previous scroll offset across navigations so new pages appear to load
  mid-way down.
*/

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return <>{children}</>;
}
