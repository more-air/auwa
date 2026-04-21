"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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
  duration = 800,
  translateY = 12,
  variant = "fade",
  revealDistance = 80,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isReveal = variant === "reveal";

  useEffect(() => {
    // For reveal (horizontal slide), widen the right edge of the observer's
    // root so cards sitting off-viewport-right in a horizontal scroller
    // (e.g. the Journal strip, two-up article module) still intersect when
    // the section enters viewport. Without this, card 2+ stays at opacity
    // 0 until the user swipes — producing an apparently missing image on
    // iPhone. Page-flow layouts never place cards more than one viewport
    // to the right, so the wider margin has no effect there.
    const rootMargin = isReveal
      ? "0px 200% -40px 0px"
      : "0px 0px -40px 0px";
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

  const dur = isReveal ? 1200 : duration;
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
        // When visible, drop the transform entirely. A persistent
        // `translate3d(0, 0, 0)` leaves an always-on compositor layer,
        // which iOS Safari uses to clip the top border of a bordered
        // descendant (e.g. the primary CtaLink "THE STORY" button under
        // the intro). Using `none` at rest dissolves the layer after
        // the entrance animation finishes.
        transform: isVisible ? "none" : hiddenTransform,
        transition: `opacity ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
