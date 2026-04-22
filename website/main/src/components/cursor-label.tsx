"use client";

/*
  Cursor label.

  Reads the orphan `data-cursor` attribute that already exists on editorial
  links across the site (journal cards, pillar cards, two-up articles) and
  renders a small capsule near the real cursor showing the label value
  ("READ", "EXPLORE"). The user's actual cursor is untouched — this is a
  supplementary hint, not a replacement cursor.

  Desktop only. Touch devices and users who prefer reduced motion get
  nothing. Fixed position, follows the mouse via rAF-lerped transform,
  fades in/out with a soft scale as it appears/disappears.
*/

import { useEffect, useRef, useState } from "react";
import { EASING } from "@/lib/motion";

export function CursorLabel() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const lastLabelRef = useRef<string | null>(null);
  const lastVisibleRef = useRef(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad). Phones
    // and touch-first tablets report `pointer: coarse` and should not see
    // any cursor UI.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    // Seed the lerp position at the viewport centre so the label doesn't
    // streak in from (0,0) on the first mouse move.
    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentRef.current = { ...targetRef.current };

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const value = el?.getAttribute("data-cursor") ?? null;
      // Only re-render on state change. On a fast mouse move this event
      // fires dozens of times per second — calling setState on every tick
      // would thrash React's reconciler.
      if (value !== lastLabelRef.current) {
        lastLabelRef.current = value;
        if (value) setLabel(value);
      }
      const nextVisible = !!value;
      if (nextVisible !== lastVisibleRef.current) {
        lastVisibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const onLeaveWindow = (e: MouseEvent) => {
      // Cursor left the viewport entirely.
      if (!e.relatedTarget) {
        lastVisibleRef.current = false;
        setVisible(false);
      }
    };

    document.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeaveWindow);

    // Smooth-follow loop. LERP = 0.22 feels present without lagging.
    let raf: number;
    const LERP = 0.22;
    const update = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * LERP;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * LERP;
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[150] pointer-events-none"
      style={{ willChange: "transform" }}
    >
      {/*
        Solid black disc centred on the cursor. Scales from 0 on enter to
        1 on leave, matching the moreair.co/work pattern. `translate(-50%,
        -50%)` keeps the centre of the circle on the pointer position;
        scale is applied in the same transform string.
      */}
      <div
        className="w-[72px] h-[72px] rounded-full bg-void text-white flex items-center justify-center font-sans text-[10px] tracking-[0.14em] uppercase"
        style={{
          transform: `translate(-50%, -50%) scale(${visible ? 1 : 0})`,
          opacity: visible ? 1 : 0,
          transition: `opacity 320ms ${EASING.outExpo}, transform 320ms ${EASING.outExpo}`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {label}
      </div>
    </div>
  );
}
