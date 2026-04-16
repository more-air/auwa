import { SignupForm } from "@/components/signup-form";
import { FadeIn } from "@/components/fade-in";

/*
  Email capture module for homepage.
  Desktop: text + form left, image right.
  Mobile: stacked, image then form.
  Uses the shared SignupForm component.
*/

export function EmailCapture() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: side by side */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text + form */}
          <FadeIn>
            <div className="max-w-[440px] ml-auto mr-auto lg:ml-[10%] lg:mr-0">
              <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/30">
                Stay close
              </span>
              <div className="mt-3 w-8 h-[1px] bg-void/12" />
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-void">
                Awareness, delivered.
              </h2>
              <p className="mt-4 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/50 max-w-[380px]">
                Seasonal essays, craftsman stories, and quiet reflections on Japanese philosophy. No noise, no frequency.
              </p>
              <div className="mt-16 max-w-[340px]">
                <SignupForm
                  source="newsletter"
                  buttonText="Subscribe"
                  successMessage="Welcome. We'll be in touch."
                  theme="light"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right: image (same ratio as Meet AUWA video card) */}
          <FadeIn delay={150} variant="reveal">
            <div className="relative aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[380px] rounded-xl overflow-hidden bg-surface-raised ">
              <img
                src="/email/kumanokodo.jpg"
                alt="Kumano Kodo pilgrimage trail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden">
          <FadeIn variant="reveal">
            <div className="relative aspect-[9/16] max-w-[300px] mx-auto rounded-xl overflow-hidden bg-surface-raised ">
              <img
                src="/email/kumanokodo.jpg"
                alt="Kumano Kodo pilgrimage trail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 text-center">
              <h2 className="font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-void">
                Awareness, delivered.
              </h2>
              <p className="mt-3 font-display text-[18px] leading-[1.65] text-void/50 max-w-[320px] mx-auto">
                Seasonal essays, craftsman stories, and quiet reflections. No noise.
              </p>
              <div className="mt-10 max-w-[320px] mx-auto">
                <SignupForm
                  source="newsletter"
                  buttonText="Join"
                  successMessage="Welcome. We'll be in touch."
                  theme="light"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
