import { getCurrentMicroSeason } from "@/lib/micro-seasons";
import { FadeIn } from "./fade-in";
import { ScrollFadeText } from "./scroll-fade-text";
import { CtaLink } from "./cta-link";

/*
  Centred micro-season module with separator lines above and below.
  Kanji, translation, and link to the 72 Seasons article.
*/

export function MicroSeasonFeature() {
  const season = getCurrentMicroSeason();

  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-32 md:pt-64 pb-32 md:pb-48">
      <div className="flex flex-col items-center text-center">
        <FadeIn>
          <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/30">
            72 Seasons
          </span>
        </FadeIn>

        <ScrollFadeText
          as="p"
          className="font-jp-serif mt-5 text-[clamp(3rem,8vw,6.5rem)] leading-[1] tracking-[0.06em] text-void"
          finishAt={0.5}
        >
          {season.kanji}
        </ScrollFadeText>

        <ScrollFadeText
          as="p"
          className="mt-4 md:mt-6 font-display text-[20px] md:text-[24px] tracking-[0.01em] text-void"
          finishAt={0.45}
        >
          {season.translation}
        </ScrollFadeText>

        <FadeIn delay={200}>
          <div className="mt-8">
            <CtaLink href="/journal/72-seasons">Read essay</CtaLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
