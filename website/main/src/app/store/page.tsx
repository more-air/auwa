import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

export const metadata = {
  title: "AUWA Store | Japanese Craftsman Objects & Figure Editions",
  description: "Japanese craftsman objects, and our own signed figure editions. Made slowly, chosen for a lifetime. Sign up for the opening, and a chance to win our first edition.",
  openGraph: {
    title: "AUWA Store | Japanese Craftsman Objects & Figure Editions",
    description: "Japanese craftsman objects, and our own signed figure editions. Made slowly, chosen for a lifetime. Sign up for the opening, and a chance to win our first edition.",
    url: "https://auwa.life/store",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/store.jpg", width: 1200, height: 630, alt: "AUWA Store - Japanese craftsman objects and figure editions" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "AUWA Store | Japanese Craftsman Objects & Figure Editions",
    description: "Japanese craftsman objects, and our own signed figure editions.",
    images: ["/og/store.jpg"],
  },
};

export default function StorePage() {
  return (
    <>
      <main>
        <div>
          {/* Mobile: text on top half, image on bottom half, fits viewport
              with no scroll. Desktop (lg+): side-by-side grid. */}
          <div className="flex flex-col h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-2 lg:h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-section shrink-0">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-void"
                stagger={90}
              >
                Lifetime objects.
              </TextReveal>
              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/60 max-w-[440px]">
                  Japanese craftsman objects, and our own figure editions. Small, signed, hand-finished. Sign up for the opening, and a chance to win our first edition.
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="store-waitlist" buttonText="Notify me" />
                </div>
              </FadeIn>
            </div>

            <div className="relative overflow-hidden flex-1 min-h-0">
              <ImageFade
                src="/pillars/store.jpg"
                alt="Japanese ceramics and wooden bowl in afternoon light"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
