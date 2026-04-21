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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
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
              // inline-block's subpixel position every frame. Fixes the
              // visible jerk Safari shows on lines that start mid-cascade
              // (second TextReveal with a non-zero delay).
              transform: isVisible
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 100%, 0)",
              transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms`,
              willChange: isVisible ? "auto" : "opacity, transform",
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
