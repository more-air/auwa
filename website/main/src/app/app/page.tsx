import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

export const metadata = {
  title: "Awareness, daily | AUWA",
  description: "A daily practice for awareness, guided by ancient Japanese philosophy. No advice, just attention.",
  openGraph: {
    title: "Awareness, daily | AUWA",
    description: "A daily practice for awareness, guided by ancient Japanese philosophy.",
    url: "https://auwa.life/app",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/app.jpg", width: 1200, height: 630, alt: "AUWA App" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Awareness, daily | AUWA",
    description: "A daily practice for awareness, guided by ancient Japanese philosophy.",
    images: ["/og/app.jpg"],
  },
};

export default function AppPage() {
  return (
    <>
      <main>
        {/* Matches the article-page hero pattern: on mobile, image has an
            explicit aspect ratio and text flows naturally below. On md+,
            the grid takes over with viewport-locked height. Dropping the
            mobile flex-1 image sizing removed the font-swap layout shift
            where text height changed as custom fonts loaded and the
            flex-1 image above/below resized in response. */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-0">
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-void"
              stagger={90}
            >
              Awareness, daily.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/60 max-w-[440px]">
                A daily practice for awareness, guided by ancient Japanese philosophy. No advice, just attention. Add your email and we&rsquo;ll write when the app arrives.
              </p>
            </FadeIn>
            <FadeIn delay={600}>
              <div className="mt-12 md:mt-16">
                <SignupForm source="app-waitlist" buttonText="Notify me" />
              </div>
            </FadeIn>
          </div>

          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden order-first md:order-last">
            <ImageFade
              src="/pillars/app.jpg"
              alt="AUWA Kokoro Mirror app on a phone"
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
