import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";
import { ImageFade } from "@/components/image-fade";

// Kept as a fallback / archive of the original single-viewport book
// signup page. The production /book page is now the world page (the
// former /demo-world). This route is noindex and not linked from the
// nav — we're preserving it in case we want to bring this layout back.
export const metadata = {
  title: "Auwa Book Signup | Archived",
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return (
    <>
      <main>
        <div>
          {/* Mobile: text on top half, image on bottom half, fits viewport
              with no scroll. Desktop (lg+): side-by-side grid. */}
          <div className="flex flex-col h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-2 lg:h-[calc(100dvh-5rem)]">

            {/* Left: copy + email */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 space-section shrink-0">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi"
                stagger={90}
              >
                Open the eyes.
              </TextReveal>

              <FadeIn delay={400}>
                <p className="mt-8 md:mt-10 font-display text-[18px] md:text-[19px] leading-[1.65] text-sumi/60 max-w-[440px]">
                  Illustrated stories following Auwa the character as it shows the world what it&rsquo;s been too busy to notice. Add your email and we&rsquo;ll write when the first book arrives.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="book-waitlist" buttonText="Notify me" />
                </div>
              </FadeIn>
            </div>

            {/* Right: book cover */}
            <div className="relative overflow-hidden flex-1 min-h-0">
              <ImageFade
                src="/pillars/book.jpg"
                alt="Auwa: The Beginning — illustrated book on a wooden table"
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
