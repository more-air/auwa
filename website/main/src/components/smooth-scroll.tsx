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

    // lerp (continuous interpolation) instead of duration (per-event
    // animation). Safari handles lerp more smoothly on slow scroll —
    // duration-mode restarts the animation curve on every wheel tick,
    // which reads as micro-jitter. 0.1 is Lenis's own default and
    // matches the feel of sites like moreair.co that use native scroll.
    const lenis = new Lenis({
      lerp: 0.1,
      infinite: false,
    });

    lenisRef.current = lenis;
    // Expose for programmatic scrolls from other components (e.g. the
    // Explore button on the hero video).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
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
