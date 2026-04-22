"use client";

import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Override duration (ms). Defaults to DURATION.enter (fade) or DURATION.reveal (reveal). */
  duration?: number;
  translateY?: number;
  /**
   * "fade" (default): opacity + small translateY rise, for text.
   * "reveal": opacity + slide in from the right, for image cards.
   *   (Singer Reimagined-inspired entrance.)
   */
  variant?: "fade" | "reveal";
  /**
   * Horizontal distance (px) for the "reveal" slide. Default 80.
   * Used in horizontal scrollers (e.g. PillarParade) where peeking
   * cards sit close to the viewport edge — the full 80px translate
   * pushes later cards below the IntersectionObserver's 10% threshold
   * so they never trigger. A smaller distance (e.g. 40) keeps the
   * cue while staying within threshold.
   */
  revealDistance?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration,
  translateY = 12,
  variant = "fade",
  revealDistance = 80,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isReveal = variant === "reveal";

  useEffect(() => {
    // Fire the observer ~120px BEFORE the element crosses the viewport so
    // the transition can start painting and the compositor layer is ready
    // before the user reaches it. Starting at the exact viewport edge
    // dropped one frame on Safari.
    //
    // Reveal variant also widens the RIGHT margin 200% so off-viewport-right
    // cards in horizontal scrollers (Journal strip, two-up) still intersect
    // when the section enters vertically. Otherwise card 2+ stays at opacity
    // 0 on iPhone until the user swipes.
    const rootMargin = isReveal
      ? "0px 200% 120px 0px"
      : "0px 0px 120px 0px";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isReveal]);

  // Durations come from motion.ts — reveal uses DURATION.reveal (image
  // cards need a longer glide); everything else uses DURATION.enter.
  // Caller can still override with the `duration` prop when needed.
  const dur = duration ?? (isReveal ? DURATION.reveal : DURATION.enter);
  // Reveal slides in from the right; fade rises up.
  const hiddenTransform = isReveal
    ? `translate3d(${revealDistance}px, 0, 0)`
    : `translate3d(0, ${translateY}px, 0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        // End-state `translate3d(0, 0, 0)` instead of `none`. Holding the
        // GPU layer after the transition completes prevents Safari from
        // re-rasterising the element at subpixel precision when the
        // transform clears — the re-rasterise was showing up as a tiny
        // "nudge" after the element had visually settled. Safe now that
        // we've removed Lenis; on native scroll the browser handles many
        // persistent layers without compositor contention.
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transition: `opacity ${dur}ms ${EASING.outExpo} ${delay}ms, transform ${dur}ms ${EASING.outExpo} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
