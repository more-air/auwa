"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/*
  Page transition — single upward swipe.

  PHASE 1 — LEAVE (1800ms):
    • Old content drifts UP by 20vh.
    • Sumi (ink) wash fades over the old content (opacity 0 → 0.8 over 1000ms).
    • A solid panel rises from translateY(100%) → 0 covering everything.
    Easing: cubic-bezier(0.87, 0, 0.13, 1) (expo.inOut).

  PHASE 2 — HOLD (100ms):
    Panel covers fully. Navigation fires. New page mounts behind panel.

  PHASE 3 — REVEAL:
    Panel snaps invisibly back below. `ready` flips true. Per-element
    FadeIn / TextReveal / ImageFade fire on a fully-revealed page,
    cascading top-to-bottom via Y-position-based delay so the user
    sees a clear "elements arrive in sequence" moment instead of
    everything popping at once.

  Header reads `panelTheme` and shows Washi during LEAVE + HOLD; flips
  back to the page-appropriate colour at REVEAL.

  prefers-reduced-motion: navigation is instant, no panel.
*/

const LEAVE_MS = 1800;
const HOLD_MS = 100;
// Brief blank moment AFTER the panel snaps off before the per-element
// reveals fire. Without this the snap and the fade-in start at the
// same instant, so the user reads the new page as "already loaded"
// rather than seeing it gracefully arrive. 300ms is enough to register
// "page revealed" as its own event before content begins to cascade in.
const REVEAL_DELAY_MS = 300;
const DRIFT_VH = 20;
const DARKEN_MS = 1000;
const DARKEN_OPACITY = 0.8;
const EASE = "cubic-bezier(0.87, 0, 0.13, 1)"; // expo.inOut

type Phase = "visible" | "leaving";
type PanelTheme = "light" | "dark";

function destinationTheme(href: string): PanelTheme {
  if (href === "/book" || href.startsWith("/book?") || href.startsWith("/book#"))
    return "dark";
  return "light";
}

const PageTransitionContext = createContext<{
  ready: boolean;
  panelTheme: PanelTheme | null;
}>({ ready: true, panelTheme: null });

/**
 * `ready` flips true after the panel snaps off — content reveals fire
 * on a fully-revealed page, cascading top-to-bottom.
 *
 * `panelTheme` is non-null while the transition layer is on screen
 * (LEAVE + HOLD). Header consumes this to show Washi text against the
 * dark wash regardless of destination.
 */
export function usePageReady() {
  return useContext(PageTransitionContext).ready;
}
export function useTransitionPanelTheme() {
  return useContext(PageTransitionContext).panelTheme;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("visible");
  const [panelTheme, setPanelTheme] = useState<PanelTheme | null>(null);
  // ready is decoupled from phase so we can hold the blank moment
  // after the panel snaps off (REVEAL_DELAY_MS) before letting the
  // per-element reveals fire.
  const [revealReady, setRevealReady] = useState(true);
  const [driftPx, setDriftPx] = useState(0);
  const pendingHref = useRef<string | null>(null);
  const isInitialMount = useRef(true);
  const prefersReducedMotion = useRef(false);
  // True while a silent navigation (menu link) is in flight. The
  // pathname useEffect skips its automatic reveal-timing in that case
  // so the silent path can hold revealReady=false longer (until the
  // menu close completes).
  const silentNavigation = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const updateDrift = () =>
      setDriftPx((window.innerHeight * DRIFT_VH) / 100);
    updateDrift();
    window.addEventListener("resize", updateDrift);
    return () => window.removeEventListener("resize", updateDrift);
  }, []);

  // Pathname change → settle the panel, then (after a brief blank
  // moment) flip `revealReady` so per-element reveals fire. The gap
  // is what makes the content read as "arriving" rather than as
  // "already there".
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (prefersReducedMotion.current) {
      setPhase("visible");
      setPanelTheme(null);
      setRevealReady(true);
      return;
    }
    // For silent navigation (menu links), the click handler manages
    // revealReady itself — wait for the menu close to finish before
    // firing reveals. Don't override that here.
    if (silentNavigation.current) {
      return;
    }
    const tSnap = window.setTimeout(() => {
      setPhase("visible");
      setPanelTheme(null);
    }, 80);
    const tReveal = window.setTimeout(
      () => setRevealReady(true),
      80 + REVEAL_DELAY_MS
    );
    return () => {
      clearTimeout(tSnap);
      clearTimeout(tReveal);
    };
  }, [pathname]);

  // Leave: intercept internal link clicks, run the wipe, then push.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const skipTransition = anchor.hasAttribute("data-skip-transition");

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
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
      const dest = url.pathname + url.search + url.hash;
      pendingHref.current = dest;

      if (prefersReducedMotion.current) {
        router.push(dest);
        pendingHref.current = null;
        return;
      }

      if (skipTransition) {
        // Silent navigation — used by menu links so the page-transition
        // wipe doesn't run alongside the menu close and produce a
        // "double swipe". Two pieces matter:
        //
        //   1. Push the route IMMEDIATELY so the destination page
        //      mounts behind the menu panel. Without this, the menu
        //      starts ascending and the OLD page is still mounted
        //      below it — the user sees the previous page peek
        //      through the bottom of the closing menu.
        //
        //   2. Hold revealReady=false until the menu close finishes,
        //      so the destination page's per-element reveals stay
        //      hidden through the menu close and arrive cleanly
        //      AFTER the menu has fully ascended off the top.
        silentNavigation.current = true;
        setRevealReady(false);
        router.push(pendingHref.current ?? dest);
        pendingHref.current = null;
        // Menu close completes at ~850ms (150ms items fade + 150ms
        // panel delay + 700ms ascend). Fire reveals just after that
        // with a small breathing gap so the cascade reads as its own
        // beat.
        window.setTimeout(() => {
          setRevealReady(true);
          silentNavigation.current = false;
        }, 1000);
        return;
      }

      setPanelTheme(destinationTheme(url.pathname));
      setPhase("leaving");
      setRevealReady(false);

      // Push the route slightly before LEAVE+HOLD ends so the new page
      // has time to start mounting before settle.
      window.setTimeout(() => {
        if (pendingHref.current) {
          router.push(pendingHref.current);
          pendingHref.current = null;
        }
      }, LEAVE_MS + HOLD_MS - 60);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router]);

  // Wrapper transform — patterns.md rule: leave the wrapper UNTRANSFORMED
  // at rest. A permanent translate3d holds a stacking context across the
  // whole page tree and on Safari produces a subtle subpixel "sliding
  // down" of body content on load. Only apply the transform during the
  // leaving phase.
  const wrapperTransform =
    phase === "leaving" ? `translate3d(0, -${driftPx}px, 0)` : undefined;
  const wrapperTransition =
    phase === "leaving" ? `transform ${LEAVE_MS}ms ${EASE}` : undefined;

  // Darkening wash — fades over the old page during LEAVE, snaps to 0
  // when the panel snaps off (it was hidden behind the panel anyway).
  const darkenOpacity = phase === "leaving" ? DARKEN_OPACITY : 0;
  const darkenTransition =
    phase === "leaving" ? `opacity ${DARKEN_MS}ms ${EASE}` : "none";

  // Panel: rises 100% → 0% on leave, snaps back to 100% on settle
  // (no transition, behind the new page so the snap is invisible).
  const panelTransform =
    phase === "leaving" ? "translateY(0%)" : "translateY(100%)";
  const panelTransition =
    phase === "leaving" ? `transform ${LEAVE_MS}ms ${EASE}` : "none";
  // Wipe panel matches the DESTINATION page's bg so the moment the
  // panel snaps off, the user sees the same plane behind it (just
  // now rendering the new page's content). Light pages → Surface;
  // dark pages → Yoru (the same /book bg). The separate darkening
  // wash below uses Sumi (ink) for tonal contrast against the
  // panel — that's the layered "ink fades in, then page covers"
  // gesture, not one flat colour.
  const panelBg =
    panelTheme === "dark" ? "var(--color-yoru)" : "var(--color-surface)";

  // ready flips true REVEAL_DELAY_MS after the panel snaps — there's a
  // brief blank moment first so content arrival reads as its own event.
  const ready = phase === "visible" && revealReady;

  return (
    <PageTransitionContext.Provider value={{ ready, panelTheme }}>
      <div
        id="main-content"
        tabIndex={-1}
        className="relative outline-none"
        style={{
          transform: wrapperTransform,
          transition: wrapperTransition,
        }}
      >
        {children}
      </div>

      {/* Darkening wash — z-82, below the panel. Uses Sumi to match the
          dark-wipe panel above; Yoru would read as a different dark
          plane and break the "one continuous ink cover" gesture. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[82] pointer-events-none"
        style={{
          backgroundColor: "var(--color-sumi)",
          opacity: darkenOpacity,
          transition: darkenTransition,
        }}
      />

      {/* Panel — z-85. Header (z-100) stays above. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[85] pointer-events-none"
        style={{
          backgroundColor: panelBg,
          transform: panelTransform,
          transition: panelTransition,
          willChange:
            phase === "visible" ? undefined : "transform",
        }}
      />
    </PageTransitionContext.Provider>
  );
}
