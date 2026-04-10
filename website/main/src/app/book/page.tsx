import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";
import { SignupForm } from "@/components/signup-form";

export const metadata = {
  title: "Book | AUWA",
  description: "Four illustrated stories about a luminous being who reveals the kokoro hidden within all things.",
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">

            {/* Left: copy + email */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                  The kokoro<br />in all things.
                </h1>
              </FadeIn>

              <FadeIn delay={150}>
                <p className="mt-8 md:mt-10 font-display text-[clamp(1.25rem,2.5vw,1.65rem)] leading-[1.35] text-void/70 max-w-[420px]">
                  Be the first to enter the<br />world of AUWA.
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="book-waitlist" />
                </div>
              </FadeIn>
            </div>

            {/* Right: book cover */}
            <FadeIn delay={200} className="relative overflow-hidden">
              <img
                src="/pillars/book.jpg"
                alt="AUWA: The Beginning — illustrated book on a wooden table"
                className="w-full aspect-[4/5] object-cover md:aspect-auto md:absolute md:inset-0 md:h-full"
              />
            </FadeIn>

          </div>
        </div>
      </main>
    </>
  );
}
