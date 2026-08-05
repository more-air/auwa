import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

// PARKED PAGE (Aug 2026). The Kokoro Mirror app was built, craft-passed
// and never released; the character, the stories and the figure come
// first. This page stays alive rather than 404ing, because the URL has
// been shared and because the work is real — it just isn't a product.
//
// Deliberately noindex: the page used to rank for "Japanese awareness
// practice" and carried SoftwareApplication structured data, both of
// which advertised something nobody can get. It's also out of
// sitemap.ts and nothing on the site links to it any more.
export const metadata = {
  title: "Auwa App | Set Aside",
  description: "The Auwa app was built as a daily awareness practice, then set aside before release. The character, the stories and the figure come first.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Auwa App | Set Aside",
    description: "Built as a daily awareness practice, then set aside before release.",
    url: "https://auwa.life/app",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/app.jpg", width: 1200, height: 630, alt: "The Auwa app, built and set aside" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Auwa App | Set Aside",
    description: "Built as a daily awareness practice, then set aside before release.",
    images: ["/og/app.jpg"],
  },
};

export default function AppPage() {
  return (
    <>
      <main>
        <div>
          {/* Mobile + tablet portrait: text on top, image below, fits
              viewport with no scroll. lg+: side-by-side grid, viewport-
              locked height. */}
          <div className="flex flex-col h-[100svh] lg:grid lg:grid-cols-2">

            <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-teaser-hero shrink-0">
              <HeaderTone tone="sumi" />
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi"
                stagger={90}
              >
                Set aside.
              </TextReveal>
              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
                  We built a daily practice for awareness, then chose not to release it. Auwa is a character first, and the stories and the figure come before anything else. The practice is finished and set aside, and it will keep.
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm
                    source="app"
                    successMessage="A note from us is on its way."
                  />
                </div>
              </FadeIn>
            </div>

            <div className="relative overflow-hidden flex-1 min-h-0">
              <HeaderTone tone="surface" />
              <ImageFade
                src="/pillars/app.jpg"
                alt="The Auwa Kokoro Mirror app, built and set aside"
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
    </>
  );
}
