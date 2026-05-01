"use client";

import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";
import { usePageReady } from "./page-transition";

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
  /**
   * If provided, the IntersectionObserver watches `triggerRef.current`
   * instead of the FadeIn's own wrapper. Use this to sync a body
   * paragraph's reveal with its title's entry into the viewport when
   * the body sits far below the title (e.g. EditorialFeature's
   * `lg:justify-between` layout puts the body at the bottom of the
   * media height — without a shared trigger, the body has its OWN
   * IntersectionObserver entry point and reveals only after the user
   * scrolls past the title, reading as a delay).
   */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration,
  translateY = 12,
  variant = "fade",
  revealDistance = 80,
  triggerRef,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Gate reveal setup on page-transition readiness. After a swipe
  // navigation, ready flips from false → true once the panel exits.
  // On first page load, ready is true from the first render, so this
  // is a no-op there.
  const ready = usePageReady();

  const isReveal = variant === "reveal";

  useEffect(() => {
    if (!ready) return;
    // Watch the trigger element if provided, otherwise our own wrapper.
    const el = triggerRef?.current ?? ref.current;
    if (!el) return;

    // Above-the-fold short-circuit: if the (trigger or own) element is
    // already in the viewport on mount, fire immediately. The per-
    // element `delay` prop on hero items provides cascade where it's
    // wanted (subtitle waits behind title, etc.) without the global
    // Y-based setTimeout chain that caused Safari scroll jitter.
    const rect = el.getBoundingClientRect();
    const inViewportOnMount =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewportOnMount) {
      setIsVisible(true);
      return;
    }

    // For scroll-triggered reveals: fire when the element is ~200px
    // INTO the viewport (negative bottom rootMargin). -200px puts the
    // element comfortably in the middle-lower third of the viewport
    // when the cascade begins, so the reveal plays out as the eye
    // moves into it (rather than animating at the bottom edge where
    // the user is most likely to miss it).
    //
    // Reveal variant widens the RIGHT margin 200% so off-viewport-right
    // cards in horizontal scrollers still intersect when the section
    // enters vertically.
    const rootMargin = isReveal
      ? "0px 200% -200px 0px"
      : "0px 0px -200px 0px";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReveal, ready, triggerRef]);

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
        // Hold `translate3d(0, 0, 0)` after the reveal completes (not
        // `none`). Safari demotes the compositor layer when transform
        // clears to none, which manifests as a subpixel "settle"
        // visible on hover/un-hover of nested images. Keeping the
        // layer is the trade-off documented in patterns.md.
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transition: `opacity ${dur}ms ${EASING.outExpo} ${delay}ms, transform ${dur}ms ${EASING.outExpo} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
