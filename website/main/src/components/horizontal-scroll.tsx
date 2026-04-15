"use client";

import { useEffect, useRef } from "react";

/*
  Horizontal scroll wrapper: converts mouse wheel (vertical) into horizontal scroll.
  Desktop only — touch devices use native horizontal swipe.
  Wraps the horizontal-scrolling article carousel on the homepage.
  To remove: unwrap and revert to a plain div.
*/

export function HorizontalScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Only apply on devices with a mouse (not touch)
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const onWheel = (e: WheelEvent) => {
      // Only hijack vertical scroll when the carousel has room to scroll
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;

      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // Already scrolling horizontally

      if (
        (e.deltaY > 0 && canScrollRight) ||
        (e.deltaY < 0 && canScrollLeft)
      ) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={scrollRef} className={className}>
      {children}
    </div>
  );
}
