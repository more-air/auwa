"use client";

/*
  SegmentedControl — iOS-style segmented picker for period toggles
  (Trove Week/Month/Year/All) and view switches (Look Back Status/
  Category/Emotion).

  Visually: a single capsule track with a subtle pill that slides to
  the active option. Sliding the pill rather than just changing
  colours gives the user the kinetic "I tapped this" feedback that
  static toggles miss.

  Width is content-driven; pass equal-length labels for the cleanest
  look, or use a `fullWidth` track for an evenly-distributed control.
*/

import { useLayoutEffect, useRef, useState } from "react";

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = {
  value: T;
  options: SegmentedControlOption<T>[];
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
};

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  fullWidth = false,
  className = "",
}: SegmentedControlProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<T, HTMLButtonElement | null>>(new Map());
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const track = trackRef.current;
    const active = itemRefs.current.get(value);
    if (!track || !active) return;
    const trackRect = track.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setPillStyle({
      left: activeRect.left - trackRect.left,
      width: activeRect.width,
    });
  }, [value, options]);

  return (
    <div
      ref={trackRef}
      role="tablist"
      className={[
        "relative inline-flex items-center p-1 rounded-full",
        "bg-cosmic-50/6",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {/* Sliding pill */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full bg-cosmic-50/12 transition-[left,width] duration-300 ease-[var(--ease-out-expo)]"
        style={{ left: pillStyle.left, width: pillStyle.width }}
      />
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current.set(option.value, el);
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={[
              "relative z-10 t-meta px-4 h-9 rounded-full",
              "transition-colors duration-200",
              fullWidth ? "flex-1" : "",
              isActive
                ? "text-cosmic-50"
                : "text-cosmic-50/55 hover:text-cosmic-50/80",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
