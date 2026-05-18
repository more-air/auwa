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
      // isolation:isolate gives Safari a proper stacking context so the
      // mix-blend-soft-light warm tint blends against the video below.
      className="group block relative aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-md isolate"
    >
      <video
        ref={videoRef}
        // rounded-md on the video itself: Safari promotes <video> to a
        // separate compositor layer that doesn't always inherit the
        // parent's border-radius clip, particularly inside an
        // isolation:isolate stacking context on an anchor. Applying
        // the radius directly to the video layer is the reliable fix.
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

      {/* Warm tint — soft-light blend with the brand's washi/kraft pair
          pulls the cool cosmic bokeh toward the warm palette of the rest
          of the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, var(--color-washi) 0%, var(--color-kraft) 100%)",
        }}
      />

      {/* Cursor particle trail. Sits above the tint (so particles read as
          real emitted light, not muted by atmosphere) but below the bottom
          gradient + text overlay (so text stays clean). Defaults tuned for
          this card's busy cosmic bokeh field. */}
      <CursorTrail />

      {/* Bottom-left text overlay — same gradient + type pattern as the
          two-up onsen / nozawa cards on this page. */}
      <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 via-transparent to-transparent" />
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
