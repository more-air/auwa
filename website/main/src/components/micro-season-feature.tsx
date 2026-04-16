import { getCurrentMicroSeason } from "@/lib/micro-seasons";
import { FadeIn } from "./fade-in";
import Link from "next/link";

/*
  Centred micro-season module with separator lines above and below.
  Kanji, translation, and link to the 72 Seasons article.
*/

export function MicroSeasonFeature() {
  const season = getCurrentMicroSeason();

  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/30">
              72 Seasons
            </span>

            <p className="mt-5 text-[clamp(3rem,8vw,6.5rem)] leading-[1] tracking-[0.06em] text-void" style={{ fontFamily: 'var(--font-jp-serif), serif' }}>
              {season.kanji}
            </p>

            <p className="mt-4 md:mt-6 font-display text-[20px] md:text-[24px] tracking-[0.01em] text-void">
              {season.translation}
            </p>

            <Link
              href="/journal/72-seasons"
              className="inline-block mt-8 font-sans text-[13px] tracking-[0.08em] uppercase text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/30 transition-all duration-300"
            >
              Read the essay
            </Link>
          </div>
        </FadeIn>
    </section>
  );
}
