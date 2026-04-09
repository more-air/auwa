import { getCurrentMicroSeason } from "@/lib/micro-seasons";
import { FadeIn } from "./fade-in";
import Link from "next/link";

export function MicroSeason() {
  const season = getCurrentMicroSeason();

  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-36">
      <FadeIn>
        <div className="flex flex-col items-center text-center">
          {/* Kanji — large, serif-like, full presence */}
          <p className="text-[clamp(3rem,8vw,6.5rem)] leading-[1] tracking-[0.06em] text-void" style={{ fontFamily: 'var(--font-jp-serif), serif' }}>
            {season.kanji}
          </p>

          {/* English translation */}
          <p className="mt-4 md:mt-6 font-display text-[20px] md:text-[24px] tracking-[0.01em] text-void">
            {season.translation}
          </p>

          {/* Link to article */}
          <Link
            href="/journal/the-fifth-day"
            className="mt-4 font-sans text-[13px] tracking-[0.06em] uppercase text-void/35 hover:text-void/60 transition-colors duration-300"
          >
            Japan&apos;s 72 seasons &rarr;
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
