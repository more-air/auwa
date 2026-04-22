"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
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
 */
export function ImageFade({
  className = "",
  onLoad,
  ...imageProps
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...imageProps}
      className={className}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      style={{
        opacity: loaded ? 1 : 0,
        transition: `opacity ${DURATION.reveal}ms ${EASING.outExpo}`,
        ...imageProps.style,
      }}
    />
  );
}
