import Link from "next/link";
import { CtaLink } from "./cta-link";

/*
  Meet AUWA moment.
  Portrait image in a rounded card with text alongside (desktop) or
  stacked (mobile). No dropshadow — the image sits flat on the page.
*/

const IMAGE_SRC = "/journal/auwa-book/auwa-book-cosmic.jpg";
const ARTICLE_HREF = "/journal/the-beginning";

export function VideoMoment() {
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: image card left, text right */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">
          <Link
            href={ARTICLE_HREF}
            className="block relative aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[380px] rounded-xl overflow-hidden"
          >
            <img
              src={IMAGE_SRC}
              alt="AUWA, a luminous being surrounded by light"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Link>

          <div className="flex flex-col justify-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <div className="mt-3 w-8 h-[1px] bg-void/12" />
            <Link href={ARTICLE_HREF} className="block group/heading">
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-void group-hover/heading:text-void/70 transition-colors duration-300">
                The soul in all things.
              </h2>
            </Link>
            <p className="mt-4 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/50 max-w-[380px]">
              A character from our illustrated stories who reveals what the world has been too busy to notice. AUWA appears in the stories and the app.
            </p>
            <CtaLink href={ARTICLE_HREF} className="self-start mt-8">
              The Story
            </CtaLink>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col items-center">
          <Link
            href={ARTICLE_HREF}
            className="block relative aspect-[9/16] w-full max-w-[300px] rounded-xl overflow-hidden"
          >
            <img
              src={IMAGE_SRC}
              alt="AUWA, a luminous being surrounded by light"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Link>

          <div className="mt-8 text-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <Link href={ARTICLE_HREF} className="block">
              <h2 className="mt-3 font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-void">
                The soul in all things.
              </h2>
            </Link>
            <CtaLink href={ARTICLE_HREF} className="mt-5">
              The Story
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
