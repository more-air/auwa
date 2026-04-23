"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";

/*
  Sticky bottom strip inviting visitors to the figure edition waitlist.
  Kinfolk-inspired: appears only once the visitor is engaged (past the
  hero), fades out as the footer comes into view so the strip hands
  off cleanly to the footer's "Quiet letters" newsletter block.

  Hidden on:
  - /store   — destination page; strip linking back to itself reads wrong
  - /app, /book — teaser pages already carrying their own signup as primary

  Detection mirrors the SoundToggle pattern: a zero-height sentinel is
  appended to <main>'s last child so the strip responds to main-content-
  end, not footer-position (which would always read as intersecting
  because the footer is sticky bottom-0 from page load).
*/

const HIDE_ON = ["/store", "/app", "/book"];
const SCROLL_IN_THRESHOLD = 600; // px — appears after the hero is past

export function FigureHook() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

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

    const onScroll = () => {
      setScrolledPast(window.scrollY > SCROLL_IN_THRESHOLD);
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
      className="fixed bottom-0 inset-x-0 z-[80] pointer-events-none"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
        transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo}, transform ${DURATION.reveal}ms ${EASING.outExpo}`,
      }}
    >
      <Link
        href="/store"
        className="group pointer-events-auto block bg-void"
      >
        <div className="flex items-center justify-between gap-6 px-6 md:px-12 lg:px-20 xl:px-28 h-12 md:h-14">
          <p className="font-display text-[14px] md:text-[16px] leading-none tracking-[0.005em] text-white">
            Signed editions. Your chance to win one.
          </p>
          <span className="font-sans text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-white whitespace-nowrap">
            Join
            <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
