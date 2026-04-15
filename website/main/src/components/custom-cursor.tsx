"use client";

import { useEffect, useRef, useState } from "react";

/*
  Custom cursor: small dot that follows the mouse.
  Grows to a ring on hoverable elements (links, buttons).
  Shows "View" text on article cards (elements with data-cursor="view").
  Desktop only — hidden on touch devices.
  To remove: delete this component from layout.tsx.
*/

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select");
      const cursorAttr = el.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr) {
        setIsHovering(true);
        setCursorText(cursorAttr);
      } else if (interactive) {
        setIsHovering(true);
        setCursorText("");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth follow with lerp
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [isVisible]);

  // Hide native cursor site-wide on desktop
  useEffect(() => {
    if ("ontouchstart" in window) return;
    document.documentElement.style.cursor = "none";
    // Add cursor:none to all interactive elements too
    const style = document.createElement("style");
    style.textContent = "*, a, button, input, textarea, select { cursor: none !important; }";
    style.id = "custom-cursor-style";
    document.head.appendChild(style);
    return () => {
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {/* Outer ring (grows on hover) */}
      <div
        className="rounded-full border border-white flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          width: isHovering ? (cursorText ? 80 : 48) : 8,
          height: isHovering ? (cursorText ? 80 : 48) : 8,
          marginLeft: isHovering ? (cursorText ? -40 : -24) : -4,
          marginTop: isHovering ? (cursorText ? -40 : -24) : -4,
          backgroundColor: isHovering ? "transparent" : "white",
          borderWidth: isHovering ? 1 : 0,
        }}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="font-sans text-[11px] tracking-[0.06em] uppercase text-white transition-opacity duration-200"
            style={{ opacity: isHovering && cursorText ? 1 : 0 }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
