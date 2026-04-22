import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

export const metadata = {
  title: "Lifetime objects | AUWA",
  description: "A curated home for Japanese craftsman objects. Made slowly, chosen for a lifetime, the antithesis of throwaway.",
  openGraph: {
    title: "Lifetime objects | AUWA",
    description: "A curated home for Japanese craftsman objects. Made slowly, chosen for a lifetime.",
    url: "https://auwa.life/store",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/store.jpg", width: 1200, height: 630, alt: "AUWA Store" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Lifetime objects | AUWA",
    description: "A curated home for Japanese craftsman objects.",
    images: ["/og/store.jpg"],
  },
};

export default function StorePage() {
  return (
    <>
      <main>
        {/* Matches the article-page hero pattern. See app/page.tsx for
            the reasoning (font-swap layout shift). */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-0">
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-void"
              stagger={90}
            >
              Lifetime objects.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/60 max-w-[440px]">
                A curated home for Japanese craftsman objects. Made slowly, chosen for a lifetime, the antithesis of throwaway. Add your email and we&rsquo;ll write when our store opens.
              </p>
            </FadeIn>
            <FadeIn delay={600}>
              <div className="mt-12 md:mt-16">
                <SignupForm source="store-waitlist" buttonText="Notify me" />
              </div>
            </FadeIn>
          </div>

          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden order-first md:order-last">
            <ImageFade
              src="/pillars/store.jpg"
              alt="Japanese ceramics and wooden bowl in afternoon light"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </main>
    </>
  );
}
