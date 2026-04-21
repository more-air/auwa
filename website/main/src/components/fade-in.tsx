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
    // Fire the observer ~120px BEFORE the element crosses the viewport so
    // the transition can start painting and Safari can promote the
    // compositor layer BEFORE the user has scrolled to it. Triggering at
    // the exact moment of entry (the previous `-40px`) meant Safari had to
    // set up a new layer on the same frame as Lenis smooth-scroll was
    // advancing, which read as a one-frame stutter.
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
        // Keep the persistent GPU layer after the transition ends (mirrors
        // More Air's pattern: `transform: translateY(0) translateZ(0)` as
        // the end state). Reverting to `transform: none` at rest demotes
        // the compositor layer and Safari re-rasterises the element at
        // integer pixels, producing the subtle "settle" shift at the end
        // of every reveal. Keeping the layer means the final position is
        // mathematically identical to `none` but stays GPU-composited, so
        // nothing shifts when the transition completes.
        //
        // The trade-off is that iOS Safari can clip the top border of a
        // bordered descendant within this persistent layer (observed on
        // the "THE STORY" primary CtaLink). The fix lives on CtaLink
        // itself: it promotes its own layer with `translateZ(0)` so its
        // border renders independently of this wrapper's layer.
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transition: `opacity ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
