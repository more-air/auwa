import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

export const metadata = {
  title: "Auwa App | Japanese Awareness Practice",
  description: "A daily Japanese awareness practice, guided by ancient philosophy. No advice, just attention. Add your email and we'll write when the app arrives.",
  openGraph: {
    title: "Auwa App | Japanese Awareness Practice",
    description: "A daily Japanese awareness practice, guided by ancient philosophy. No advice, just attention.",
    url: "https://auwa.life/app",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/app.jpg", width: 1200, height: 630, alt: "Auwa App - Japanese awareness practice" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Auwa App | Japanese Awareness Practice",
    description: "A daily Japanese awareness practice, guided by ancient philosophy.",
    images: ["/og/app.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Auwa App",
  description: "A daily Japanese awareness practice, guided by ancient philosophy. No advice, just attention.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://auwa.life/app",
  publisher: { "@type": "Organization", name: "Auwa", url: "https://auwa.life" },
  image: "https://auwa.life/og/app.jpg",
};

export default function AppPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                Awareness, daily.
              </TextReveal>
              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
                  A daily practice for awareness, guided by ancient Japanese philosophy. No advice, just attention. Add your email and we&rsquo;ll write when the app arrives.
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="app-waitlist" buttonText="Notify me" />
                </div>
              </FadeIn>
            </div>

            <div className="relative overflow-hidden flex-1 min-h-0">
              <HeaderTone tone="surface" />
              <ImageFade
                src="/pillars/app.jpg"
                alt="Auwa Kokoro Mirror app on a phone"
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
