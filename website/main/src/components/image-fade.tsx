"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";
import { usePageReady } from "./page-transition";

interface ImageFadeProps extends ImageProps {
  /**
   * Render a soft top scrim that fades in WITH the image — used on
   * hero photographs to keep the floating header (Surface-toned) legible
   * over a bright upper region (snow skies, white walls).
   */
  topScrim?: boolean;
  /**
   * Override the fade-in duration (ms). Defaults to DURATION.reveal
   * (1200ms) which is the right pace for editorial cards and journal
   * grid items. Hero images pass a longer value (2000ms) so the
   * arrival reads as gentle and considered, matching the home page
   * hero video's fade.
   */
  fadeDuration?: number;
}

/**
 * Image that fades in gracefully once it has finished loading.
 *
 * Use for hero images and other high-value photography where "suddenly
 * appears" would break the slow editorial feel. Driven by the image's
 * own `onLoad` — the transition only starts once pixels are painted.
 *
 * Cache guard: if the browser already has the image cached, `complete`
 * is true before React attaches `onLoad`, so we check on mount.
 *
 * Hover preservation: the inline `transition` on this <img> fully
 * replaces the `a img { transition: transform ... }` rule in globals.css
 * so we re-spell the hover transitions inline.
 *
 * `topScrim`: when true, an absolutely-positioned ~120px gradient sits
 * above the image (same wrapper) and shares the loaded gate.
 */
export function ImageFade({
  className = "",
  onLoad,
  topScrim = false,
  fadeDuration,
  ...imageProps
}: ImageFadeProps) {
  const dur = fadeDuration ?? DURATION.reveal;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = usePageReady();
  const visible = ready && loaded;

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const img = (
    <Image
      ref={imgRef}
      {...imageProps}
      className={className}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${dur}ms ${EASING.outExpo}, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
        ...imageProps.style,
      }}
    />
  );

  if (!topScrim) return img;

  return (
    <>
      {img}
      <div
        aria-hidden="true"
        // Taller + softer than before: 192/256px at 12% Yoru top with
        // an extended midpoint stop. Reads as atmospheric darkening
        // that's part of the image (the sort you'd see at the top of
        // a sky in any photograph) rather than a discrete UI scrim
        // sitting on top. Critical on bright skies (e.g. Narai-juku
        // snow) where any hard-edged overlay reads as a band.
        className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--color-yoru) 12%, transparent) 0%, color-mix(in oklch, var(--color-yoru) 6%, transparent) 50%, transparent 100%)",
          opacity: visible ? 1 : 0,
          transition: `opacity ${dur}ms ${EASING.outExpo}`,
        }}
      />
    </>
  );
}
