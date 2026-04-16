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
          <div className="flex flex-col h-[calc(100dvh-4rem)] md:grid md:grid-cols-2 md:h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-24 shrink-0">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                  Lifetime objects<br />with kokoro.
                </h1>
              </FadeIn>
              <FadeIn delay={150}>
                <p className="mt-8 md:mt-10 font-display text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.5] text-void/60 max-w-[420px]">
                  Knives, ceramics, tea caddies, washi. Curated Japanese craftsman products, each chosen because a master poured their soul into making it.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <p className="mt-6 font-sans text-[14px] text-void/40">Join the waitlist for early access.</p>
                <div className="mt-4">
                  <SignupForm source="store-waitlist" />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200} className="relative overflow-hidden flex-1 min-h-0">
              <img
                src="/pillars/store.jpg"
                alt="Japanese ceramics and wooden bowl in afternoon light"
                className="w-full h-full object-cover md:absolute md:inset-0"
              />
            </FadeIn>

          </div>
        </div>
      </main>
    </>
  );
}
