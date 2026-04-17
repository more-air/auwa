import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { SignupForm } from "@/components/signup-form";

export const metadata = {
  title: "Awareness, daily | AUWA",
  description: "A daily practice for awareness, guided by ancient Japanese philosophy. No advice, just attention.",
};

export default function AppPage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="flex flex-col h-[calc(100dvh-4rem)] md:grid md:grid-cols-2 md:h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-24 shrink-0">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void"
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
