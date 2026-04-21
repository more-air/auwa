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
    if (typeof window === "undefined") return;

    // Skip Lenis on touch devices — native mobile momentum scrolling is
    // already smooth, and Lenis adds perceptible stickiness on iOS/Android.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Skip Lenis on Safari — no matter how tuned, Lenis's rAF-driven
    // transform fights Safari's native scroll and reads as micro-jitter
    // during slow scroll and mid-transition reveals. Safari's native
    // scroll is already smooth (More Air feels buttery on Safari
    // precisely because it uses native scroll). Detect Safari by UA,
    // excluding Chrome/Chromium/Edge which also include "Safari" in
    // their UA string.
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
    if (isSafari) return;

    // Duration mode with ease-out-expo was the Chrome-smooth config we
    // shipped with. Switching to lerp was worse on Chrome; Safari is now
    // on native scroll so Lenis tuning only affects Chrome / Firefox.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
