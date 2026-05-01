"use client";

import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";
import { usePageReady } from "./page-transition";

/*
  Text reveal animation: words fade in and rise one by one.
  Use on hero headlines and key display text only — not every heading.
  To remove: replace <TextReveal> with a plain element.

  Duration and easing come from motion.ts (DURATION.enter / EASING.outExpo)
  so tweaks propagate globally. Per-word stagger stays local to this
  component — it lives in its own 70–90ms range and isn't shared with the
  STAGGER tokens (those cover cards and grids, a different visual context).
*/

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay before the first word starts (ms) */
  delay?: number;
  /** Stagger between words (ms). 80ms reads as considered — each word
      arrives just before the eye finishes reading the previous. */
  stagger?: number;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 80,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Wait for the page transition to fully complete before observing,
  // so reveals fire AFTER the swipe — not racing the panel exit.
  const ready = usePageReady();

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;

    // Above-the-fold short-circuit: if the element is already in
    // viewport on mount, fire immediately. Hero headlines that sit
    // on first paint shouldn't require a scroll to animate.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ready]);

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          // pb + -mb gives descenders (p, j, period) room inside the
          // overflow-hidden clip without pushing layout height downward.
          className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-top"
        >
          <span
            className="inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              // Hold `translate3d(0, 0, 0)` after the reveal completes.
              // Demoting to `none` on Safari causes a subpixel settle
              // visible mid-hover on neighbouring elements.
              transform: isVisible
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 100%, 0)",
              transition: `opacity ${DURATION.enter}ms ${EASING.outExpo} ${delay + i * stagger}ms, transform ${DURATION.enter}ms ${EASING.outExpo} ${delay + i * stagger}ms`,
              // No will-change: toggling it to "auto" when isVisible
              // flipped caused Safari to demote the layer mid-transition
              // and stutter a scroll frame. Letting Safari auto-promote
              // during the active transition is smoother.
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
