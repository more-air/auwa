import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { StoreCharacterCarousel } from "@/components/store-character-carousel";

export const metadata = {
  title: "Auwa Store | Japanese Craftsman Objects & Figure Editions",
  description: "Japanese craftsman objects, and our own signed figure editions. Made slowly, chosen for a lifetime. Sign up for the opening, and a chance to win our first edition.",
  openGraph: {
    title: "Auwa Store | Japanese Craftsman Objects & Figure Editions",
    description: "Japanese craftsman objects, and our own signed figure editions. Made slowly, chosen for a lifetime. Sign up for the opening, and a chance to win our first edition.",
    url: "https://auwa.life/store",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/store.jpg", width: 1200, height: 630, alt: "Auwa Store - Japanese craftsman objects and figure editions" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Auwa Store | Japanese Craftsman Objects & Figure Editions",
    description: "Japanese craftsman objects, and our own signed figure editions.",
    images: ["/og/store.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Auwa Store",
  description: "Curated Japanese craftsman objects, and our own signed figure editions. Made slowly, chosen for a lifetime.",
  url: "https://auwa.life/store",
  publisher: { "@type": "Organization", name: "Auwa", url: "https://auwa.life" },
  image: "https://auwa.life/og/store.jpg",
};

export default function StorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <div>
          {/* Mobile: text on top half, image on bottom half, fits viewport
              with no scroll. Desktop (lg+): side-by-side grid. */}
          <div className="flex flex-col h-[100svh] lg:grid lg:grid-cols-2">

            <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 pt-32 md:pt-32 lg:pt-24 pb-16 md:pb-24 shrink-0">
              <HeaderTone tone="sumi" />
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi"
                stagger={90}
              >
                Lifetime objects.
              </TextReveal>
              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
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
              <HeaderTone tone="surface" />
              <StoreCharacterCarousel />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
