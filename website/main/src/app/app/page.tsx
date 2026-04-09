import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";

export const metadata = {
  title: "Kokoro Mirror | AUWA",
  description: "A daily awareness practice. Reveal your kokoro.",
};

export default function AppPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100dvh-5rem)]">

            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                  Reveal your<br />kokoro.
                </h1>
              </FadeIn>
              <FadeIn delay={150}>
                <p className="mt-8 md:mt-10 font-display text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.5] text-void/60 max-w-[420px]">
                  A daily awareness practice rooted in Japanese philosophy. Share how you feel. AUWA reflects your emotional truth back to you in ways you haven't found words for yet.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <form className="mt-12 md:mt-16 max-w-[440px]">
                  <div className="flex items-center gap-4 border-b border-void/20 pb-3 focus-within:border-void/50 transition-colors duration-300">
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      className="flex-1 bg-transparent font-sans text-[14px] text-void placeholder:text-void/35 outline-none"
                    />
                    <button
                      type="submit"
                      className="font-sans text-[14px] font-medium tracking-[0.02em] text-void hover:text-void/70 transition-colors duration-300 whitespace-nowrap cursor-pointer"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>

            <div className="relative bg-void flex items-center justify-center p-12 md:p-16 lg:p-20">
              <FadeIn delay={200}>
                {/* Dark panel — the app lives in darkness */}
                <div
                  className="w-40 h-40 rounded-full animate-pulse"
                  style={{
                    background: "radial-gradient(circle, oklch(0.85 0.15 105 / 0.3), oklch(0.25 0.025 250 / 0.2), transparent)",
                  }}
                />
              </FadeIn>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
