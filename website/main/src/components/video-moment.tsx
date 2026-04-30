import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "./cta-link";
import { FadeIn } from "./fade-in";

/*
  Meet Auwa moment.
  Portrait image in a rounded card with text alongside (desktop) or
  stacked (mobile). No dropshadow — the image sits flat on the page.
*/

// Same portrait magical-Auwa illustration the /book hero uses, so the
// click-through to /book lands on a continuous visual.
const IMAGE_SRC = "/book/hero/portrait-2.jpg";
const ARTICLE_HREF = "/book";

export function VideoMoment() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: image card left, text right */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn variant="reveal">
            <Link
              href={ARTICLE_HREF}
              data-cursor="Read"
              className="block relative aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[380px] overflow-hidden rounded-md"
            >
              <Image
                src={IMAGE_SRC}
                alt="Auwa, a luminous being arriving in the world"
                fill
                sizes="380px"
                className="object-cover"
              />
            </Link>
          </FadeIn>

          <div className="flex flex-col justify-center">
            <FadeIn delay={200}>
              <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-sumi/45">
                Meet Auwa
              </span>
            </FadeIn>
            <FadeIn delay={320}>
              <Link href={ARTICLE_HREF} className="block group/heading">
                <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-sumi group-hover/heading:text-sumi/70 transition-colors duration-300">
                  Kokoro in all things.
                </h2>
              </Link>
            </FadeIn>
            <FadeIn delay={440}>
              <p className="mt-4 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/50 max-w-[380px]">
                Auwa, a character from our illustrated stories who reveals what the world has been too busy to notice. Auwa will also appear in our app.
              </p>
            </FadeIn>
            <FadeIn delay={560} className="self-start">
              <CtaLink href={ARTICLE_HREF} className="mt-8">
                Explore World
              </CtaLink>
            </FadeIn>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col items-center">
          <FadeIn variant="reveal" className="w-full flex justify-center">
            <Link
              href={ARTICLE_HREF}
              data-cursor="Read"
              className="block relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-md"
            >
              <Image
                src={IMAGE_SRC}
                alt="Auwa, a luminous being arriving in the world"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </Link>
          </FadeIn>

          <div className="mt-8 text-center flex flex-col items-center">
            <FadeIn delay={200}>
              <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-sumi/45">
                Meet Auwa
              </span>
            </FadeIn>
            <FadeIn delay={320}>
              <Link href={ARTICLE_HREF} className="block">
                <h2 className="mt-3 font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-sumi">
                  Kokoro in all things.
                </h2>
              </Link>
            </FadeIn>
            <FadeIn delay={440}>
              <CtaLink href={ARTICLE_HREF} className="mt-5">
                Explore World
              </CtaLink>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
