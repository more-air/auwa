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

  KNOWN ISSUE: on Safari refresh there is a brief frame where the warm
  soft-light overlay can flash as a brown rectangle before the video
  paints. We tried several mitigations (conditional render, gating on
  requestVideoFrameCallback, bfcache handling, opacity transitions, a
  lighter gradient) and none reliably eliminated it — Safari's compositor
  paints the blend-mode layer before the video pixels are on screen. The
  warm vibe of the card is worth the trade-off; the flash is brief and
  rare (refresh only, not navigation), and the live-site behaviour matches
  what shipped first.
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
      //
      // isolation:isolate creates a stacking context so the mix-blend-
      // soft-light warm tint blends only against the video inside this
      // Link and nothing outside it.
      className="group block relative aspect-[4/5] md:aspect-[16/9] isolate"
      style={{ clipPath: "inset(0 round 6px)" }}
    >
      <video
        ref={videoRef}
        // will-change: transform forces the <video> onto a standard CSS
        // compositor layer (instead of Safari's specialised video-decoder
        // pipeline that CSS blend modes don't see), so the warm soft-light
        // overlay below applies consistently on every browser.
        //
        // rounded-md belt-and-braces alongside the parent clip-path.
        className="absolute inset-0 w-full h-full object-cover rounded-md"
        style={{ willChange: "transform" }}
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
          of the page. The bottom-darkening gradient (from-sumi/40) that
          usually pairs with text-over-image cards is omitted so the wash
          isn't compounded into reading darker than intended. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, var(--color-washi) 0%, var(--color-kraft) 100%)",
        }}
      />

      <CursorTrail />

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
