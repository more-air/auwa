"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  translateY?: number;
  /** "fade" (default): opacity + translateY. "reveal": clip-mask reveal from bottom, ideal for images. */
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

  if (variant === "reveal") {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          clipPath: isVisible
            ? "inset(0 0 0% 0 round 12px)"
            : "inset(0 0 8% 0 round 12px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(1.03)",
          transition: `clip-path ${duration * 1.2}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration * 0.6}ms ease-out ${delay}ms, transform ${duration * 1.4}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(${translateY}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
