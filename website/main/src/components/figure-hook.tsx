"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";

/*
  Sticky bottom strip inviting visitors to the figure edition waitlist.
  Kinfolk-inspired: appears only once the visitor is engaged (past the
  hero), fades out as the footer comes into view so the strip hands
  off cleanly to the footer's "Quiet letters" newsletter block.

  Hidden on:
  - /store   — destination page; strip linking back to itself reads wrong
  - /app, /book — teaser pages already carrying their own signup as primary
  - /instagram — internal grid preview

  Detection mirrors the SoundToggle pattern: a zero-height sentinel is
  appended to <main>'s last child so the strip responds to main-content-
  end, not footer-position (which would always read as intersecting
  because the footer is sticky bottom-0 from page load).
*/

const HIDE_ON = ["/store", "/app", "/book", "/book-signup", "/instagram"];
const SCROLL_IN_THRESHOLD = 600; // px — appears after the hero is past

export function FigureHook() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  // `snap` disables the opacity+transform transition for the FIRST
  // committed render after mount or after a route change — so the
  // strip starts at its hidden position with no animation. Without
  // this, navigating from a page where the strip was visible to a
  // fresh article causes the transition to interpolate from the
  // pre-nav transform (translate3d 0,0,0 — visible) to the new
  // (translate3d 0,100% — hidden) value, producing a brief 10px
  // dark lip sliding off-screen at the bottom on page load.
  //
  // The previous render-phase `setState` pattern doesn't work here:
  // React detects render-phase setState and re-runs the render with
  // the updated state, which means the *committed* render always
  // sees `pathJustChanged === false` — so the "none" transition
  // path never actually fired.
  const [snap, setSnap] = useState(true);
  const pathRef = useRef(pathname);

  // On path change: snap to hidden + reset state.
  useEffect(() => {
    if (pathRef.current !== pathname) {
      pathRef.current = pathname;
      setSnap(true);
      setScrolledPast(false);
      setNearFooter(false);
    }
  }, [pathname]);

  // Clear snap on the next animation frame after a render where it's
  // true. Two frames separates the "settle hidden" paint from the
  // "transition is live" paint, so subsequent state changes animate.
  useEffect(() => {
    if (!snap) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSnap(false));
    });
    return () => cancelAnimationFrame(id);
  }, [snap]);

  useEffect(() => {
    if (HIDE_ON.includes(pathname)) return;

    const main = document.querySelector("main");
    if (!main) return;

    // Sentinel at the end of main — fires when main's bottom edge is
    // within 240px of the viewport bottom, giving the strip time to
    // glide out before the footer actually reveals.
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "width:100%;height:0;pointer-events:none;";
    main.appendChild(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => {
        setNearFooter(
          entry.isIntersecting || entry.boundingClientRect.top < 0
        );
      },
      { rootMargin: "0px 0px 240px 0px", threshold: 0 }
    );
    io.observe(sentinel);

    // Ref-gate the setState so it only fires when `scrolledPast`
    // actually changes — prevents per-frame re-renders that iOS
    // Safari re-rasterises into visible flicker.
    const scrolledRef = { current: false };
    const onScroll = () => {
      const next = window.scrollY > SCROLL_IN_THRESHOLD;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolledPast(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      sentinel.remove();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (HIDE_ON.includes(pathname)) return null;

  const show = scrolledPast && !nearFooter;

  return (
    <div
      aria-hidden={!show}
      className="fixed bottom-0 inset-x-0 z-[70] pointer-events-none"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
        // Snap on first paint after mount / route change (see `snap`
        // above) so the strip never animates IN from a stale pre-
        // nav position when the new page mounts — which produced
        // the 10px dark lip flash at the bottom on article loads.
        transition: snap
          ? "none"
          : `opacity ${DURATION.reveal}ms ${EASING.outExpo}, transform ${DURATION.reveal}ms ${EASING.outExpo}`,
      }}
    >
      <Link
        href="/store"
        className="group pointer-events-auto block bg-yoru border-t border-washi/10"
      >
        <div className="flex items-center justify-between gap-6 px-6 md:px-12 lg:px-20 xl:px-28 h-14 md:h-16">
          <p className="font-sans text-[11px] md:text-[12px] leading-none tracking-[0.18em] md:tracking-[0.16em] uppercase whitespace-nowrap text-washi">
            Win first edition Auwa figure
          </p>
          <span className="font-sans text-[11px] md:text-[12px] tracking-[0.18em] md:tracking-[0.16em] uppercase whitespace-nowrap text-washi">
            Enter
            <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
