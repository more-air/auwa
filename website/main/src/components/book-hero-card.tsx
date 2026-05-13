"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  Full-width card showcasing the Auwa character.
  Mirrors the book page hero's 3-layer composition: base + slow pattern
  fade-in + blinking eyes. Landscape on desktop, portrait on mobile.
  Text overlay bottom-left, matching the journal two-up card pattern.
*/

export function BookHeroCard() {
  const [patternIn, setPatternIn] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPatternIn(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let openTimeout = 0;
    const blink = () => {
      setEyesClosed(true);
      openTimeout = window.setTimeout(() => setEyesClosed(false), 220);
    };
    const first = window.setTimeout(blink, 4500);
    const interval = window.setInterval(blink, 7000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      clearTimeout(openTimeout);
    };
  }, []);

  // Re-specify the global `a img` hover transitions (transform + filter)
  // alongside opacity. Setting an inline `transition` would otherwise
  // wipe the global rule and the soft zoom-in/out would snap on hover.
  const HOVER_TRANSITIONS =
    "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const patternStyle = {
    opacity: patternIn ? 1 : 0,
    transition: `opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1), ${HOVER_TRANSITIONS}`,
  };
  const eyesStyle = {
    opacity: eyesClosed ? 1 : 0,
    transition: `${
      eyesClosed
        ? "opacity 120ms cubic-bezier(0.4, 0, 1, 1)"
        : "opacity 220ms cubic-bezier(0, 0, 0.2, 1)"
    }, ${HOVER_TRANSITIONS}`,
  };

  return (
    <Link
      href="/book"
      data-cursor="Open"
      // isolation:isolate gives Safari a proper stacking context so the
      // mix-blend-soft-light warm tint blends against the layered hero
      // images. Without it, Safari's compositor isolates the blend
      // (rounded-md + overflow-hidden + sibling Images with animated
      // opacity) and the wash renders as no-op.
      className="group block relative aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-md isolate"
    >
      {/* Mobile portrait stack */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/book/hero/portrait-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <Image
          src="/book/hero/portrait-2.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={patternStyle}
        />
        <Image
          src="/book/hero/portrait-3.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={eyesStyle}
        />
      </div>
      {/* Desktop landscape stack */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/book/hero/landscape-1.jpg"
          alt="Auwa, a luminous being arriving in the world"
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <Image
          src="/book/hero/landscape-2.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={patternStyle}
        />
        <Image
          src="/book/hero/landscape-3.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          loading="eager"
          className="object-cover"
          style={eyesStyle}
        />
      </div>

      {/* Warm tint — soft-light blend with the brand's washi/kraft pair
          pulls the cool cosmic bokeh toward the warm palette of the rest
          of the page (Japan photography, kraft tones). The character stays
          luminous because soft-light only affects midtones. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, var(--color-washi) 0%, var(--color-kraft) 100%)",
        }}
      />

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
