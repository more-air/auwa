import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export const metadata = {
  title: "Open the eyes | AUWA",
  description: "Illustrated stories following AUWA the character as it shows the world what it's been too busy to notice.",
  openGraph: {
    title: "Open the eyes | AUWA",
    description: "Illustrated stories following AUWA the character as it shows the world what it's been too busy to notice.",
    url: "https://auwa.life/book",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/book.jpg", width: 1200, height: 630, alt: "AUWA Book" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Open the eyes | AUWA",
    description: "Illustrated stories following AUWA the character.",
    images: ["/og/book.jpg"],
  },
};

export default function BookPage() {
  return (
    <>
      <main>
        <div>
          {/* Stacked mobile config extends through tablet; grid only
              splits in at lg. See store/page.tsx for the reasoning. */}
          <div className="flex flex-col h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-2 lg:h-[calc(100dvh-5rem)]">

            {/* Left: copy + email */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-24 shrink-0">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-void"
                stagger={90}
              >
                Open the eyes.
              </TextReveal>

              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/60 max-w-[440px]">
                  Illustrated stories following AUWA the character as it shows the world what it&rsquo;s been too busy to notice. Add your email and we&rsquo;ll write when the first book arrives.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="book-waitlist" buttonText="Notify me" />
                </div>
              </FadeIn>
            </div>

            {/* Right: book cover */}
            <FadeIn delay={200} className="relative overflow-hidden flex-1 min-h-0">
              <Image
                src="/pillars/book.jpg"
                alt="AUWA: The Beginning — illustrated book on a wooden table"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </FadeIn>

          </div>
        </div>
      </main>
    </>
  );
}
