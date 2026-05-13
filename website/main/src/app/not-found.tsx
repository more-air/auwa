import type { Metadata } from "next";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { ImageFade } from "@/components/image-fade";
import { TextReveal } from "@/components/text-reveal";

export const metadata: Metadata = {
  title: "Lost the path | Auwa",
  description: "The page you were looking for isn't here. A moment of pause, then find your way back.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div>
        {/* Mobile + tablet portrait: text on top, image below, fits
            viewport with no scroll. lg+: side-by-side grid. Mirrors the
            teaser-page pattern so the 404 reads as part of the brand
            world, not a system page. */}
        <div className="flex flex-col h-[100svh] lg:grid lg:grid-cols-2">

          <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-teaser-hero shrink-0">
            <HeaderTone tone="sumi" />
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi"
              stagger={90}
            >
              Lost the path.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
                Nothing here, only quiet. The page you wanted has slipped from the path. In Japan, a shrine often waits at the end of a trail you almost missed.
              </p>
            </FadeIn>
            <FadeIn delay={600}>
              <div className="mt-12 md:mt-16">
                <CtaLink href="/" variant="primary">Return Home</CtaLink>
              </div>
            </FadeIn>
          </div>

          <div className="relative overflow-hidden flex-1 min-h-0">
            <HeaderTone tone="surface" />
            <ImageFade
              src="/journal/yakushima-island/yakushima-island-hero.jpg"
              alt="Yakushima, the Japanese island of thousand-year cedars."
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              topScrim
              fadeDuration={2000}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
