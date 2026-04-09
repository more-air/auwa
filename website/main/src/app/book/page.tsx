import { Header } from "@/components/header";
import { FadeIn } from "@/components/fade-in";

export const metadata = {
  title: "Book — AUWA",
  description: "Four illustrated stories about a luminous being who reveals the kokoro hidden within all things.",
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-5rem)]">

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
                <form className="mt-12 md:mt-16 max-w-[440px]">
                  <div className="flex items-center gap-4 border-b border-void/20 pb-3 focus-within:border-void/50 transition-colors duration-300">
                    <input
                      type="email"
                      placeholder="Your email address"
                      required
                      className="flex-1 bg-transparent font-sans text-[14px] text-void placeholder:text-void/35 outline-none"
                    />
                    <button
                      type="submit"
                      className="font-sans text-[13px] tracking-[0.02em] text-void hover:text-void/70 transition-colors duration-300 whitespace-nowrap"
                    >
                      Join the waitlist
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>

            {/* Right: book cover */}
            <div className="relative bg-surface-raised flex items-center justify-center p-8 md:p-12 lg:p-20">
              <FadeIn delay={200}>
                <div className="relative w-full max-w-[420px] aspect-[3/4] bg-void rounded-sm shadow-2xl overflow-hidden flex items-center justify-center">
                  {/* Placeholder book cover — replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cosmic-800 to-void" />
                  <div className="relative text-center px-8">
                    <img
                      src="/auwa-logo.svg"
                      alt="AUWA"
                      className="h-[28px] md:h-[36px] w-auto mx-auto invert opacity-85"
                    />
                    <p className="mt-3 font-display text-[16px] italic text-cosmic-300">
                      The Beginning
                    </p>
                    <div className="mt-3 w-6 h-px bg-cosmic-500 mx-auto" />
                    <p className="mt-3 font-sans text-[11px] tracking-[0.08em] text-cosmic-400">
                      Eko Maeda
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
