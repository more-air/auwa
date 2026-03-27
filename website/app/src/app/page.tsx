import { Orb } from "@/components/orb";
import { SignupForm } from "@/components/signup-form";
import { FadeIn } from "@/components/fade-in";
import { Strapline } from "@/components/strapline";
import { Header } from "@/components/header";
import { MusicToggle } from "@/components/music-toggle";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative flex min-h-[100dvh] flex-col items-center justify-center px-8 md:px-6 pt-16 pb-16">
        {/* Background gradient */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.15 0.030 250) 0%, var(--color-void) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14">
          {/* Strapline */}
          <FadeIn delay={0.2}>
            <Strapline />
          </FadeIn>

          {/* Orb */}
          <FadeIn delay={0.6} duration={1.2}>
            <Orb />
          </FadeIn>

          {/* Signup */}
          <FadeIn delay={1.2}>
            <SignupForm />
          </FadeIn>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-6 flex items-center justify-between px-8 md:px-10">
          <FadeIn delay={1.8}>
            <p className="font-sans text-xs text-cosmic-600 tracking-wide">
              &copy; AUWA 2026
            </p>
          </FadeIn>
          <FadeIn delay={2}>
            <MusicToggle />
          </FadeIn>
        </footer>
      </main>
    </>
  );
}
