"use client";

import { Children, useEffect, useRef, useState } from "react";
import { DURATION, EASING, STAGGER } from "@/lib/motion";
import { usePageReady } from "./page-transition";

interface StripRevealProps {
  children: React.ReactNode;
  /** Class on the outer flex/scroller container. */
  className?: string;
  /** Class applied to each child's reveal wrapper (e.g. flex-shrink-0 + width). */
  itemClassName?: string;
  /** ms between each child's reveal. Defaults to STAGGER.strip (60ms). */
  stagger?: number;
  /** Horizontal translate distance (px) before reveal. Default 40. */
  translateX?: number;
}

/**
 * Module-level reveal for horizontal scrollers. One IntersectionObserver
 * fires when the container enters viewport, cascading all children in
 * together with a CSS transition-delay stagger.
 *
 * Use this instead of per-card FadeIn wrappers in horizontal scrollers.
 * The per-card approach fails on narrow viewports: rootMargin "200%"
 * only catches cards within 3× viewport width of the right edge, and
 * longer strips on mobile (e.g. 11 journal cards at 345px) have cards
 * sitting ~3000px off-right that never intersect.
 *
 * After first reveal the cards stay visible — swiping right shows
 * already-loaded cards, not more reveals.
 */
export function StripReveal({
  children,
  className = "",
  itemClassName = "",
  stagger = STAGGER.strip,
  translateX = 40,
}: StripRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const ready = usePageReady();

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    // Above-the-fold short-circuit: hero strips visible on mount fire
    // immediately so they don't require a scroll.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={itemClassName}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : `translate3d(${translateX}px, 0, 0)`,
            transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo} ${i * stagger}ms, transform ${DURATION.reveal}ms ${EASING.outExpo} ${i * stagger}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
