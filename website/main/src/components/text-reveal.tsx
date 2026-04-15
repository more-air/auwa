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
          className="inline-block overflow-hidden"
        >
          <span
            className="inline-block transition-all ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transitionDuration: "600ms",
              transitionDelay: `${delay + i * stagger}ms`,
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
