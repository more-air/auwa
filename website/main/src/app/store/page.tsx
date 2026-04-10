import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";
import { SignupForm } from "@/components/signup-form";

export const metadata = {
  title: "Store | AUWA",
  description: "Curated Japanese craftsman products. Lifetime objects with kokoro.",
};

export default function StorePage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                  Lifetime objects<br />with kokoro.
                </h1>
              </FadeIn>
              <FadeIn delay={150}>
                <p className="mt-8 md:mt-10 font-display text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.5] text-void/60 max-w-[420px]">
                  Curated Japanese craftsman products. Knives, ceramics, textiles. Each one chosen because a master poured their spirit into making it.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="store-waitlist" />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200} className="relative overflow-hidden">
              <img
                src="/pillars/store.jpg"
                alt="Japanese ceramics and wooden bowl in afternoon light"
                className="w-full aspect-[4/5] object-cover md:aspect-auto md:absolute md:inset-0 md:h-full"
              />
            </FadeIn>

          </div>
        </div>
      </main>
    </>
  );
}
