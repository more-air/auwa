import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { StoreCharacterCarousel } from "@/components/store-character-carousel";

// Metadata rewritten Aug 2026 alongside the on-page copy. The previous
// title and descriptions led on "Japanese craftsman objects", which is
// the curated-resale model the business no longer runs — the store sells
// what Auwa owns outright. Title stays under 60 chars and still carries
// "Japanese", per the site-wide title rules.
export const metadata = {
  title: "Auwa Store | Signed Japanese Figure Editions",
  description: "Limited Auwa figures from a Japanese character universe, signed and hand-finished, alongside exclusive Auwa products. Join the list for the opening.",
  openGraph: {
    title: "Auwa Store | Signed Japanese Figure Editions",
    description: "Limited Auwa figures from a Japanese character universe, signed and hand-finished, alongside exclusive Auwa products. Join the list for the opening.",
    url: "https://auwa.life/store",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/store.jpg", width: 1200, height: 630, alt: "Auwa Store - signed Japanese figure editions, hand-finished" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Auwa Store | Signed Japanese Figure Editions",
    description: "Limited Auwa figures, signed and hand-finished, alongside exclusive Auwa products.",
    images: ["/og/store.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Auwa Store",
  description: "Limited Auwa figures, signed and hand-finished, alongside exclusive Auwa products.",
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
          {/* Mobile + tablet portrait: text on top, image below, fits
              viewport with no scroll. lg+: side-by-side grid. */}
          <div className="flex flex-col h-[100svh] lg:grid lg:grid-cols-2">

            <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-teaser-hero shrink-0">
              <HeaderTone tone="sumi" />
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi"
                stagger={90}
              >
                Small editions.
              </TextReveal>
              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
                  Limited Auwa figures, signed and hand-finished, alongside exclusive Auwa products. Join our newsletter for updates, and a chance to win our first edition.
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="store" />
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
