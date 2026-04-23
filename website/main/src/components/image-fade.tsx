"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASING } from "@/lib/motion";

/**
 * Image that fades in gracefully once it has finished loading.
 *
 * Use for hero images and other high-value photography where "suddenly
 * appears" would break the slow editorial feel. Driven by the image's
 * own `onLoad` — the transition only starts once pixels are painted, so
 * the fade is always visible (FadeIn's IntersectionObserver alternative
 * could fire before the image has loaded, producing a pop-in).
 *
 * Props mirror Next.js <Image>. Duration uses DURATION.reveal so the
 * timing matches other image reveals on the site.
 *
 * Cache guard: if the browser already has the image in its disk / memory
 * cache (common on revisits and for cards below the fold that preloaded),
 * the <img> arrives with `complete: true` before React attaches the
 * onLoad handler — so onLoad never fires and the image stays at opacity
 * 0. We check `complete` on mount and flip `loaded` directly in that
 * case.
 *
 * Hover preservation: the inline `transition` on this <img> fully
 * replaces the `a img { transition: transform ... }` rule in
 * globals.css, so we have to respell the hover transform + filter
 * transitions here — otherwise the hover zoom on journal cards and
 * continue-reading loses its 0.8s softness and snaps in abruptly.
 */
export function ImageFade({
  className = "",
  onLoad,
  ...imageProps
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <Image
      ref={imgRef}
      {...imageProps}
      className={className}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      style={{
        opacity: loaded ? 1 : 0,
        transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo}, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
        ...imageProps.style,
      }}
    />
  );
}
