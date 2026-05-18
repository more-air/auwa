"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CursorTrail } from "./cursor-trail";

/*
  Full-width card showcasing the Auwa character.
  Mirrors the book page hero — same video, same warm-tint wash. Landscape
  on desktop, portrait on mobile via object-cover centre-crop (Runway only
  emitted a landscape master). Source plays at half speed via JS
  playbackRate so the loop reads as breathing rather than animating.

  On hover (desktop + pointer:fine), a CursorTrail emits soft warm-light
  particles at the cursor position — like the kokoro light shower being
  drawn out by the visitor's attention.
*/

export function BookHeroCard() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const set = () => { v.playbackRate = 0.5; };
    set();
    v.addEventListener("loadedmetadata", set);
    return () => v.removeEventListener("loadedmetadata", set);
  }, []);

  return (
    <Link
      href="/book"
      data-cursor="Open"
      // clip-path on the Link is enforced at the compositor level (not
      // just the paint level) so Safari respects it across all child
      // GPU-promoted layers — including <video> and <canvas>, which
      // otherwise render with square corners regardless of an
      // overflow-hidden parent. Tailwind's rounded-md is 6px.
      className="group block relative aspect-[4/5] md:aspect-[16/9]"
      style={{ clipPath: "inset(0 round 6px)" }}
    >
      <video
        ref={videoRef}
        // rounded-md as belt-and-braces alongside the parent clip-path —
        // Safari sometimes treats <video> as a separate compositor layer
        // that doesn't inherit the parent's clip.
        className="absolute inset-0 w-full h-full object-cover rounded-md"
        poster="/book/hero/auwa-hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/book/hero/auwa-hero-card.mp4" type="video/mp4" />
      </video>

      <CursorTrail />

      {/* Bottom-left text overlay. The site-wide text-card convention
          adds a from-sumi/40 bottom-darkening gradient for readability,
          but it's omitted here so the video reads as bright as the
          source. Text legibility relies on the character's bright halo
          sitting above the text and the white surface tone of the type
          itself; if it ever looks weak on a brighter bokeh frame, add a
          subtle text-shadow rather than reintroducing the gradient. */}
      <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-[90%]">
        <h3 className="font-display text-[32px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[0.005em] text-surface">
          Meet Auwa.
        </h3>
        <p className="mt-3 md:mt-4">
          <span className="relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-surface">
            <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
              Explore world &rarr;
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
            >
              Explore world &rarr;
            </span>
          </span>
        </p>
      </div>
    </Link>
  );
}
