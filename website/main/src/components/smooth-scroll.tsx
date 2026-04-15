"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/*
  Lenis smooth scrolling wrapper.
  Wrap the app in this component to enable buttery smooth scroll with momentum.
  To disable on specific pages, add data-lenis-prevent to the element.
  To remove entirely, just remove this component from layout.tsx.
*/

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

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

  return <>{children}</>;
}
