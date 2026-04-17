"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/*
  Kinfolk-inspired page transition.

  On internal link click: the current page slides gently downward and fades
  behind a white overlay (the "leave" phase). Once the overlay is solid we
  trigger the actual navigation. On the new page, the overlay fades back out
  and the incoming content fades in (the "enter" phase).

  Implemented with pure CSS transitions driven by React state — no GSAP or
  framer-motion. Timings are picked to feel close to Kinfolk: 500ms leave,
  500ms enter, ease-out-expo.

  To disable, replace this component with `{children}` in layout.tsx.
*/

const LEAVE_MS = 500;
const ENTER_MS = 500;

type Phase = "entering" | "visible" | "leaving";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const prevPathname = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("entering");
  const pendingHref = useRef<string | null>(null);

  // Enter: fade the overlay out, slide content up from translateY(24px) → 0
  useEffect(() => {
    setPhase("entering");
    const t1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
    return () => cancelAnimationFrame(t1);
  }, [pathname]);

  // Leave: intercept internal link clicks, animate out, then router.push
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.hasAttribute("data-skip-transition")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      pendingHref.current = url.pathname + url.search + url.hash;
      setPhase("leaving");

      window.setTimeout(() => {
        if (pendingHref.current) {
          router.push(pendingHref.current);
          pendingHref.current = null;
        }
      }, LEAVE_MS - 60); // start route change just before the overlay settles
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router]);

  // When pathname changes mark the previous as complete (enter effect takes over)
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
  }, [pathname]);

  // At rest (visible) we drop the transform so the wrapper doesn't create a
  // stacking context. Otherwise the portalled mobile-menu overlay (z-[90])
  // at body level ends up above the header (z-[100] but trapped inside the
  // transformed wrapper's context), which hides the X button during menu open.
  const contentStyle =
    phase === "visible"
      ? { opacity: 1 }
      : phase === "entering"
        ? { opacity: 0, transform: "translate3d(0, 18px, 0)" }
        : /* leaving */ { opacity: 0, transform: "translate3d(0, 24px, 0)" };

  return (
    <>
      <div
        className="relative"
        style={{
          ...contentStyle,
          transition:
            phase === "leaving"
              ? `opacity ${LEAVE_MS}ms cubic-bezier(0.6, 0.192, 0.098, 1.03), transform ${LEAVE_MS + 200}ms cubic-bezier(0.6, 0.192, 0.098, 1.03)`
              : `opacity ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {children}
      </div>

      {/*
        White overlay. Fades in during leave, fades out during enter.
        Fixed + pointer-events-none so it never blocks input in the visible
        phase. z-index above content but below header/menu-overlay if needed.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[80] pointer-events-none"
        style={{
          backgroundColor: "var(--color-surface)",
          opacity: phase === "leaving" ? 1 : 0,
          transition:
            phase === "leaving"
              ? `opacity ${LEAVE_MS}ms cubic-bezier(0.6, 0.192, 0.098, 1.03)`
              : `opacity ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />
    </>
  );
}
