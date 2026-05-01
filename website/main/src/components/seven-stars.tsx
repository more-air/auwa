"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "./fade-in";
import { StripReveal } from "./strip-reveal";
import { TextReveal } from "./text-reveal";
import { EASING, STAGGER } from "@/lib/motion";

/**
 * Seven Stars — the seven planets / kokoro Auwa is made of.
 *
 * Layout:
 * - Desktop (md+): horizontal row, full-width with fluid planet sizing.
 *   `clamp(92px, 12vw, 240px)` keeps the row spanning real width on big
 *   monitors without overflowing the page gutter on smaller laptops.
 *   Gap is tight (gap-2 → xl:gap-4) because the source PNGs already
 *   carry transparent canvas around each planet — the apparent breathing
 *   room comes from the artwork, not from CSS gap.
 * - Mobile (<md): vertical column. Each row is a 280px slot containing
 *   a 150px planet at column-left and the name to its right at a fixed
 *   offset, so all planets line up vertically and all names line up
 *   below them. Vertical pitch is tight (gap-2) because the source PNGs
 *   already carry transparent canvas around each planet.
 *
 * Interaction: tap (or click) a planet to reveal its kokoro form. Tapping
 * another switches the active planet; tapping the active one toggles back
 * to all-planets. Only one kokoro visible at a time. Symmetric 900ms
 * ease-in-out crossfade so reveal and revert read identically.
 *
 * Entrance: StripReveal slides each planet in from the right when the
 * row enters the viewport, matching the Journal strip / PillarParade
 * entrance pattern.
 */

const STARS = [
  { num: 1, name: "Wakon", slug: "wakon" },
  { num: 2, name: "Koto", slug: "koto" },
  { num: 3, name: "Mako", slug: "mako" },
  { num: 4, name: "Kamuwa", slug: "kamuwa" },
  { num: 5, name: "Kiala", slug: "kiala" },
  { num: 6, name: "Lioma", slug: "lioma" },
  { num: 7, name: "Toamu", slug: "toamu" },
] as const;

// Bouncy tap response — the kokoro pops in like a small spring.
//
// Opacity rides outExpo for ~280ms (fast fade so the previous kokoro
// gets out of the way before the new one lands). Transform rides a
// stronger back-out curve over 560ms with scale 0.7 → 1 — the kokoro
// arrives with a clear ~10% overshoot then settles into place,
// reading as a satisfying "pop". The reverse swap (active → inactive)
// fades the kokoro and snaps the planet back up; opacity dropping
// faster than scale recovers means the user sees a crisp swap.
const EASE_BACK_OUT = "cubic-bezier(0.34, 2, 0.64, 1)";
const TRANSITION = `opacity 280ms ${EASING.outExpo}, transform 560ms ${EASE_BACK_OUT}`;
const SCALE_REST = 0.7;

type Star = (typeof STARS)[number];

export function SevenStars() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleSelect = (i: number) =>
    setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-section">
      <div className="text-center max-w-[900px] mx-auto">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-balance text-washi max-w-[760px] mx-auto px-4 md:px-0">
          <TextReveal as="span" className="block" stagger={STAGGER.hero}>
            Seven stars gathered their light,
          </TextReveal>
          <TextReveal
            as="span"
            className="block"
            stagger={STAGGER.hero}
            delay={STAGGER.hero}
          >
            each revealing their Kokoro.
          </TextReveal>
        </h2>
        <FadeIn delay={400}>
          <p className="mt-10 font-sans text-[12px] tracking-[0.16em] uppercase text-washi/45">
            Tap to reveal
          </p>
        </FadeIn>
      </div>

      {/* Desktop horizontal row — full-width with fluid planet sizing */}
      <div className="hidden md:block mt-16 lg:mt-20 xl:mt-24">
        <PlanetRow activeIndex={activeIndex} onSelect={handleSelect} />
      </div>

      {/* Mobile vertical column */}
      <div className="md:hidden mt-12">
        <PlanetColumn activeIndex={activeIndex} onSelect={handleSelect} />
      </div>
    </section>
  );
}

function PlanetRow({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <StripReveal
      className="flex items-end justify-center gap-2 lg:gap-3 xl:gap-4"
      itemClassName="flex-shrink-0"
      stagger={STAGGER.strip}
      translateX={60}
    >
      {STARS.map((star, i) => (
        <PlanetButton
          key={star.slug}
          star={star}
          isActive={i === activeIndex}
          onClick={() => onSelect(i)}
          variant="stacked"
        />
      ))}
    </StripReveal>
  );
}

function PlanetColumn({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  // Each row is a fixed-width slot centred within the column. Inside
  // each slot the planet sits at column-left and the name sits at a
  // fixed offset, so all planets line up vertically and all names line
  // up vertically below them. Vertical gap is tight (gap-2) because the
  // 720×720 source PNGs already carry transparent canvas around each
  // planet — the apparent breathing room comes from the artwork.
  return (
    <StripReveal
      className="flex flex-col items-center gap-2"
      itemClassName="w-[280px] flex justify-start"
      stagger={STAGGER.strip}
      translateX={60}
    >
      {STARS.map((star, i) => (
        <PlanetButton
          key={star.slug}
          star={star}
          isActive={i === activeIndex}
          onClick={() => onSelect(i)}
          variant="inline"
        />
      ))}
    </StripReveal>
  );
}

function PlanetButton({
  star,
  isActive,
  onClick,
  variant,
}: {
  star: Star;
  isActive: boolean;
  onClick: () => void;
  // "stacked" — desktop: planet on top, name below.
  // "inline" — mobile: planet left, name right (vertical list row).
  variant: "stacked" | "inline";
}) {
  const isInline = variant === "inline";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${star.name} — reveal kokoro`}
      className={`group cursor-pointer ${
        isInline
          ? "flex flex-row items-center gap-6 py-1"
          : "flex flex-col items-center"
      }`}
    >
      <div
        className={`relative aspect-square flex-shrink-0 ${
          isInline ? "w-[150px]" : "w-[clamp(92px,12vw,240px)]"
        }`}
      >
        <Image
          src={`/book/planets/${star.num}-${star.slug}-planet.webp`}
          alt={`${star.name}, a planet`}
          fill
          sizes={isInline ? "150px" : "(min-width: 1280px) 240px, 13vw"}
          className="object-contain"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive ? `scale(${SCALE_REST})` : "scale(1)",
            transition: TRANSITION,
          }}
        />
        <Image
          src={`/book/planets/${star.num}-${star.slug}-kokoro.webp`}
          alt=""
          fill
          sizes={isInline ? "150px" : "(min-width: 1280px) 240px, 13vw"}
          className="object-contain"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale(1)" : `scale(${SCALE_REST})`,
            transition: TRANSITION,
          }}
        />
      </div>
      <p
        className={`font-display tracking-[0.01em] transition-colors duration-300 whitespace-nowrap ${
          isInline
            ? "text-[20px] leading-none"
            : "mt-4 lg:mt-6 text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-none"
        } ${
          isActive ? "text-washi" : "text-washi/70 group-hover:text-washi"
        }`}
      >
        {star.name}
      </p>
    </button>
  );
}
