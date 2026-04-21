"use client";

import { useEffect, useRef, useState } from "react";

/*
  Text reveal animation: words fade in and rise one by one.
  Use on hero headlines and key display text only — not every heading.
  To remove: replace <TextReveal> with a plain element.
*/

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay before the first word starts (ms) */
  delay?: number;
  /** Stagger between words (ms) */
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

  useEffect(() => {
    // Fire ~120px before entry so Safari can set up the per-word
    // compositor layers before Lenis scroll reaches the element.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
              // translate3d forces a compositor layer so Safari animates the
              // word as a single GPU surface instead of re-rasterising the
              // inline-block's subpixel position every frame. The end-state
              // is `translate3d(0, 0, 0)` — NOT `none` — because demoting
              // the layer at transition end made each word snap to integer
              // pixels, producing the subtle "settle" Safari users saw.
              // Keeping the layer means the position at rest is mathematically
              // identical to `none` but stays GPU-composited.
              transform: isVisible
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 100%, 0)",
              transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms`,
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
