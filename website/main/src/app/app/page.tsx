import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";
import { SignupForm } from "@/components/signup-form";

export const metadata = {
  title: "Kokoro Mirror | AUWA",
  description: "A daily awareness practice. Reveal your kokoro.",
};

export default function AppPage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="flex flex-col h-[calc(100dvh-4rem)] md:grid md:grid-cols-2 md:h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-24 shrink-0">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                  Reveal your<br />kokoro.
                </h1>
              </FadeIn>
              <FadeIn delay={150}>
                <p className="mt-8 md:mt-10 font-display text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.5] text-void/60 max-w-[420px]">
                  A daily awareness practice rooted in Japanese philosophy. AUWA reflects your truth back in words you haven't found yet.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="mt-12 md:mt-16">
                  <SignupForm source="app-waitlist" />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200} className="relative overflow-hidden flex-1 min-h-0">
              <img
                src="/pillars/app.jpg"
                alt="AUWA Kokoro Mirror app on a phone"
                className="w-full h-full object-cover md:absolute md:inset-0"
              />
            </FadeIn>

          </div>
        </div>
      </main>
    </>
  );
}
