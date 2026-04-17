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
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 800,
  translateY = 12,
  variant = "fade",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isReveal = variant === "reveal";
  const dur = isReveal ? 1200 : duration;
  // Reveal slides in from the right; fade rises up.
  const hiddenTransform = isReveal
    ? "translate3d(80px, 0, 0)"
    : `translate3d(0, ${translateY}px, 0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transition: `opacity ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
