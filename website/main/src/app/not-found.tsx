import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { CtaLink } from "@/components/cta-link";

export const metadata: Metadata = {
  title: "Lost the path | Auwa",
  description: "The page you were looking for isn't here. A moment of pause, then find your way back.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <main>
        <section className="min-h-[calc(100svh-5rem)] flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="w-full max-w-[640px] text-center">
            <FadeIn>
              <p className="font-sans text-[13px] tracking-[0.08em] uppercase text-sumi/45 mb-6">
                404
              </p>
            </FadeIn>

            <h1 className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi">
              <TextReveal as="span" className="block" stagger={90}>
                Nothing here,
              </TextReveal>
              <TextReveal as="span" className="block" stagger={90} delay={180}>
                only quiet.
              </TextReveal>
            </h1>

            <FadeIn delay={420}>
              <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.7] text-sumi/70 mx-auto max-w-[520px]">
                The page you were looking for isn&rsquo;t here. A small break in the path. In Japan, a shrine often sits at the end of a trail you almost didn&rsquo;t take. Consider this one of those moments.
              </p>
            </FadeIn>

            <FadeIn delay={560}>
              <div className="mt-12 flex justify-center">
                <CtaLink href="/" variant="primary">Back to home</CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
