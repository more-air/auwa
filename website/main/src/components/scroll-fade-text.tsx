"use client";

import { useEffect, useRef, useState, createElement } from "react";

/*
  Scroll-driven letter-by-letter fade.
  As the text enters and moves through the viewport, each character animates
  from faded (~12% opacity) to full. Inspired by the "what we offer" block
  on quinngtl.com.

  Words are kept together for line-breaking. Each character within a word
  animates independently, driven by scroll progress.
*/

interface ScrollFadeTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** Opacity of characters not yet revealed (0-1) */
  from?: number;
  /** Proportion of viewport (from top) where reveal is fully complete. 0.4 = 40% down screen. */
  finishAt?: number;
  /** Proportion of viewport where reveal begins. 0.9 = when top of element passes 90% down screen. */
  startAt?: number;
  /**
   * Optional CSS selector for an alternate progress anchor. Useful when the
   * text lives in a sticky element (e.g. the footer) whose own rect doesn't
   * move with scroll. Tracks the anchor's bottom instead of the element's top,
   * so startAt/finishAt are proportions of viewport height for anchor.bottom.
   */
  anchorSelector?: string;
}

export function ScrollFadeText({
  children,
  as = "p",
  className = "",
  from = 0.2,
  finishAt = 0.45,
  startAt = 0.92,
  anchorSelector,
}: ScrollFadeTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  // Split into words, each word into characters. Preserve spaces between words.
  const words = children.split(" ");
  let charIndex = 0;
  const wordSpans = words.map((word, wIdx) => {
    const chars = Array.from(word);
    const spans = chars.map((ch) => {
      const idx = charIndex++;
      return (
        <span
          key={idx}
          ref={(el) => {
            charRefs.current[idx] = el;
          }}
          className="inline-block transition-opacity duration-300 ease-out"
          style={{ opacity: mounted ? from : from }}
        >
          {ch}
        </span>
      );
    });
    return (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {spans}
        {wIdx < words.length - 1 ? "\u00A0" : ""}
      </span>
    );
  });

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    const totalChars = charRefs.current.length;

    let raf: number;
    const update = () => {
      raf = requestAnimationFrame(() => {
        const anchor = anchorSelector
          ? (document.querySelector(anchorSelector) as HTMLElement | null)
          : container;
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        const vh = window.innerHeight;
        // For self-anchor use rect.top (element rising through viewport).
        // For a custom anchor (typically `main` above a sticky footer) use
        // rect.bottom — that value goes from ~vh → 0 as the anchor scrolls
        // up and out, which matches the intuition of startAt/finishAt.
        const ratio = anchorSelector ? rect.bottom / vh : rect.top / vh;
        const progress = Math.max(
          0,
          Math.min(1, (startAt - ratio) / (startAt - finishAt))
        );

        const revealed = progress * totalChars;
        for (let i = 0; i < totalChars; i++) {
          const el = charRefs.current[i];
          if (!el) continue;
          // Soft ramp: each char takes ~2 "steps" to reach full opacity
          const charProgress = Math.max(0, Math.min(1, revealed - i));
          const opacity = from + (1 - from) * charProgress;
          el.style.opacity = String(opacity);
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [from, startAt, finishAt, children, anchorSelector]);

  return createElement(
    as,
    {
      ref: containerRef as React.RefObject<never>,
      className,
    },
    wordSpans
  );
}
