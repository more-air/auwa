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
    // Skip Lenis on touch devices — native mobile momentum scrolling is
    // already smooth, and Lenis adds perceptible stickiness on iOS/Android.
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
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

    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    const hash = window.location.hash;
    if (hash) {
      // Wait for the new page to mount so the target id exists, then scroll to it.
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (!el) {
            scrollToTop();
            return;
          }
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, {
              immediate: true,
              force: true,
              offset: -96, // clear the sticky header (80px) plus a little breathing room
            });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo(0, Math.max(0, top));
          }
        });
      });
      return;
    }

    scrollToTop();
  }, [pathname]);

  return <>{children}</>;
}
