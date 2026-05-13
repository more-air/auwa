"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./fade-in";
import { CtaLink } from "./cta-link";
import { TextReveal } from "./text-reveal";

/*
  Reusable editorial split: text column on the left, square image on
  the right. Top of the text column anchors the eyebrow + headline +
  CTA; the bottom anchors a small body line — same vertical rhythm as
  premium editorial sites (see /share/_temp/example.png).

  Media accepts an image OR a video (set `image.video`). Aspect defaults
  to "aspect-square" but callers can pass any tailwind aspect class
  (e.g. "aspect-[9/16] md:aspect-[4/5]"). CTA is optional.

  Image is overlaid with the same warm soft-light wash used on the
  BookHeroCard, so the cool cosmic bokeh sits in the same tonal family
  as the rest of the page's photography.
*/

type Theme = "light" | "dark";

type EditorialFeatureProps = {
  eyebrow: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
  /** Optional content rendered beneath the heading in place of the CTA.
      For interactive elements like a signup form. Ignored when `cta` is
      also provided. */
  action?: React.ReactNode;
  image: {
    src: string;
    alt: string;
    href?: string;
    video?: { poster?: string; objectPosition?: string };
    /** Optional alternative source rendered below the `md` breakpoint.
        When provided, the desktop image is hidden on mobile and a second
        <Image> with `mobileSrc` shows in its place — used when the
        editorial scene needs a portrait crop on mobile and a landscape
        crop on desktop (Meet Auwa modules). */
    mobileSrc?: string;
  };
  theme?: Theme;
  /** Tailwind aspect class for the media container, default "aspect-square".
      Pass full class string(s) so Tailwind's JIT can pick them up,
      e.g. "aspect-[9/16] md:aspect-[4/5]". */
  aspectClassName?: string;
  /** Apply the warm soft-light wash over the media. Defaults to true.
      Set false for media that already sits in the page's tonal family
      (e.g. dark-theme footage with its own colour grade). */
  warmTint?: boolean;
  /** Tailwind max-width class shared by the heading and body so they
      stay visually aligned. Default "max-w-[420px]". */
  textMaxWidth?: string;
  /** Media opacity (0–1). Default 1. Drop slightly when the image needs
      to recede a touch into the page bg. */
  imageOpacity?: number;
  /** Tailwind max-width class applied to the media column on lg+. Lets
      a caller go more portrait on the aspect ratio without growing the
      module's overall height — narrower image, same height. The narrower
      column anchors to the outer page edge via `lg:ml-auto`. Pass the
      breakpoint prefix yourself, e.g. "lg:max-w-[460px]". */
  mediaMaxWidth?: string;
  /** On mobile, render the text column FIRST and the image SECOND
      (default: image first). Use when the text contains a CTA / signup
      form that would otherwise sit too close to a downstream signup
      (e.g. the footer "Quiet letters." form). The image then acts as a
      visual buffer between the two. Desktop layout (text-left / image-
      right) is unaffected. */
  mobileTextFirst?: boolean;
  /** Override for the heading text size. Defaults to the EditorialFeature
      hero scale clamp(2.25rem, 5vw, 3.75rem). Pass a smaller clamp for
      a quieter module (e.g. the Signup module on the book page sits
      better at the same scale as adjacent h2s). */
  headingSizeClassName?: string;
};

export function EditorialFeature({
  eyebrow,
  heading,
  body,
  cta,
  action,
  image,
  theme = "light",
  aspectClassName = "aspect-square",
  warmTint = true,
  textMaxWidth = "max-w-[420px]",
  imageOpacity = 1,
  mediaMaxWidth,
  mobileTextFirst = false,
  headingSizeClassName = "text-[clamp(2.25rem,5vw,3.75rem)]",
}: EditorialFeatureProps) {
  // Body paragraph trigger: see comment beside titleGroupRef in JSX.
  const titleGroupRef = useRef<HTMLDivElement>(null);

  const text = theme === "dark" ? "text-washi" : "text-sumi";
  const muted = theme === "dark" ? "text-washi/55" : "text-sumi/45";
  const bodyClr = theme === "dark" ? "text-washi/70" : "text-sumi/65";

  const mediaStyle =
    imageOpacity !== 1 ? { opacity: imageOpacity } : undefined;
  const videoStyle = {
    objectPosition: image.video?.objectPosition,
    ...(imageOpacity !== 1 ? { opacity: imageOpacity } : {}),
  };

  const MediaEl = (
    <div
      // isolation:isolate gives Safari a proper stacking context so the
      // mix-blend-soft-light warm tint blends against the image. Without
      // it, the rounded-md + overflow-hidden parent isolates the blend
      // and Safari renders the wash as no-op.
      className={`relative ${aspectClassName} overflow-hidden rounded-md isolate`}
    >
      {image.video ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={videoStyle}
          poster={image.video.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={image.src} type="video/mp4" />
        </video>
      ) : image.mobileSrc ? (
        <>
          <Image
            src={image.mobileSrc}
            alt={image.alt}
            fill
            quality={95}
            sizes="100vw"
            className="object-cover md:hidden"
            style={mediaStyle}
          />
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={95}
            sizes="50vw"
            className="object-cover hidden md:block"
            style={mediaStyle}
          />
        </>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={95}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          style={mediaStyle}
        />
      )}
      {/* Warm soft-light wash — matches BookHeroCard so warm photography
          and cool cosmic bokeh sit in the same tonal family. Skipped
          when the media is already on-palette. */}
      {warmTint && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background: "linear-gradient(135deg, var(--color-washi) 0%, var(--color-kraft) 100%)",
          }}
        />
      )}
    </div>
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-10 md:gap-14 lg:gap-16">
        {/* Text column. Mobile: natural flow, image-first. Desktop:
            justify-between so the eyebrow/heading/CTA group anchors top
            and the body line anchors to the bottom of the media's
            height.
            On lg+, the body paragraph sits at the bottom of the media
            height (lg:justify-between) which on tall hero modules can
            be 400-500px below the title. Without a shared trigger, the
            body's FadeIn has its own IntersectionObserver entry — so
            the body reveals only after the user scrolls past the
            title, reading as a delay. titleGroupRef points the body's
            FadeIn at the title group above, syncing the cascade. */}
        <div className={`flex flex-col lg:justify-between ${mobileTextFirst ? "order-1" : "order-2 lg:order-1"} lg:pr-8`}>
          <div ref={titleGroupRef}>
            <FadeIn>
              <span
                className={`block font-sans text-[12px] tracking-[0.16em] uppercase ${muted}`}
              >
                {eyebrow}
              </span>
            </FadeIn>
            <div className={`mt-6 md:mt-8 ${textMaxWidth}`}>
              <TextReveal
                as="h2"
                stagger={90}
                delay={200}
                className={`font-display ${headingSizeClassName} leading-[1.05] tracking-[0.005em] text-balance ${text}`}
              >
                {heading}
              </TextReveal>
            </div>
            {cta && (
              <FadeIn delay={500}>
                <div className="mt-8 md:mt-10">
                  <CtaLink href={cta.href} variant="primary">
                    {cta.label}
                  </CtaLink>
                </div>
              </FadeIn>
            )}
            {!cta && action && (
              <FadeIn delay={500}>
                <div className={`mt-8 md:mt-10 ${textMaxWidth}`}>{action}</div>
              </FadeIn>
            )}
          </div>
          <FadeIn delay={600} triggerRef={titleGroupRef}>
            <p
              className={`mt-12 lg:mt-0 font-display text-[18px] md:text-[19px] leading-[1.55] ${textMaxWidth} ${bodyClr}`}
            >
              {body}
            </p>
          </FadeIn>
        </div>

        {/* Media column */}
        <FadeIn
          variant="reveal"
          revealDistance={40}
          className={`${mobileTextFirst ? "order-2" : "order-1 lg:order-2"} w-full ${
            mediaMaxWidth ? `${mediaMaxWidth} lg:ml-auto` : ""
          }`}
        >
          {image.href ? (
            <Link href={image.href} data-cursor="Open" className="block">
              {MediaEl}
            </Link>
          ) : (
            MediaEl
          )}
        </FadeIn>
      </div>
    </section>
  );
}
