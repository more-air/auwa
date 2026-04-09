import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { MicroSeason } from "@/components/micro-season";
import Link from "next/link";

/* ─── Placeholder data (will come from Sanity CMS) ─── */

const featuredArticle = {
  title: "Shigefusa",
  subtitle: "On waiting two years for a knife, and what arrived.",
  slug: "shigefusa-knife",
  category: "Craft",
  image: "/journal/shigefusa/shigefusa-blade.jpg",
};

const pillars = [
  { label: "Stories", description: "The illustrated universe", href: "/book", image: null as string | null },
  { label: "Craft", description: "Objects with kokoro", href: "/store", image: null as string | null },
  { label: "Practice", description: "A daily awareness ritual", href: "/app", image: null as string | null },
];

const latestArticles = [
  { title: "Seimei", excerpt: "The light returns. Japan's 72 micro-seasons and the art of noticing.", category: "Seasons", issue: "Issue 15", slug: "seimei" },
  { title: "Objects with kokoro", excerpt: "Why a hand-forged knife changes your relationship with daily life.", category: "Craft", issue: "Issue 14", slug: "objects-with-kokoro" },
  { title: "Awareness, not mindfulness", excerpt: "The difference between a Western concept and a Japanese worldview.", category: "Philosophy", issue: "Issue 13", slug: "awareness-not-mindfulness" },
  { title: "Temple mornings", excerpt: "On the ritual of arriving before dawn, and what the silence teaches.", category: "Travel", issue: "Issue 12", slug: "temple-mornings" },
  { title: "The fifth day", excerpt: "How Japan divides the year into moments most people never see.", category: "Seasons", issue: "Issue 11", slug: "the-fifth-day" },
];

const secondFeature = {
  title: "A world where nothing is ordinary.",
  slug: "everything-has-kokoro",
  image: null as string | null,
};

const twoUpArticles = [
  { title: "The onsen lesson", excerpt: "On shared space, vulnerability, and the awareness that comes from hot water and silence.", slug: "the-onsen-lesson", image: null as string | null },
  { title: "What wabi-sabi means", excerpt: "Reclaiming a philosophy from the interiors trend.", slug: "what-wabi-sabi-means", image: null as string | null },
];

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero headline ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-28 md:pt-36 pb-10 md:pb-16">
          <FadeIn>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void max-w-[680px]">
              Everything has<br />Kokoro.
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <Link
              href="/journal/everything-has-kokoro"
              className="inline-block mt-6 md:mt-8 font-sans text-[13px] tracking-[0.04em] text-void/45 hover:text-void/70 transition-colors duration-300"
            >
              Read the latest &rarr;
            </Link>
          </FadeIn>
        </section>

        {/* ── Featured article ── */}
        <section className="pb-16 md:pb-24">
          <FadeIn delay={100}>
            <Link href={`/journal/${featuredArticle.slug}`} className="group block">
              <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                {featuredArticle.image ? (
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 xl:px-28 xl:pb-14">
                  <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] text-white max-w-[600px]">
                    {featuredArticle.title}:<br />
                    {featuredArticle.subtitle}
                  </h2>
                </div>
              </div>
            </Link>
          </FadeIn>
        </section>

        {/* ── Three pillars ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * 80}>
                <Link href={pillar.href} className="group block">
                  <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                    {pillar.image ? (
                      <img
                        src={pillar.image}
                        alt={pillar.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                  </div>
                  <div className="mt-4 md:mt-5">
                    <h3 className="font-display text-[20px] md:text-[22px] tracking-[0.01em] text-void">
                      {pillar.label}
                    </h3>
                    <p className="mt-1 font-sans text-[13px] tracking-[0.02em] text-void/50 group-hover:text-void/70 transition-colors duration-300">
                      Explore
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Latest articles (horizontal scroll) ── */}
        <section className="py-12 md:py-20">
          <div className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide">
            {latestArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 60} className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]">
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="aspect-[4/5] bg-surface-raised overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-void/40">
                        {article.category}, {article.issue}
                      </span>
                    </div>
                    <h3 className="font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.01em] text-void">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-void/55 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Second feature image ── */}
        <section className="pb-12 md:pb-20">
          <FadeIn>
            <Link href={`/journal/${secondFeature.slug}`} className="group block">
              <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                {secondFeature.image ? (
                  <img
                    src={secondFeature.image}
                    alt={secondFeature.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 xl:px-28 xl:pb-14">
                  <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1] text-white max-w-[600px]">
                    {secondFeature.title}
                  </h2>
                </div>
              </div>
            </Link>
          </FadeIn>
        </section>

        {/* ── Micro-season ── */}
        <MicroSeason />

        {/* ── Two-up articles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {twoUpArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 100}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <h3 className="font-display text-[22px] md:text-[26px] leading-[1.2] text-white">
                        {article.title}
                      </h3>
                      <p className="mt-2 font-sans text-[13px] text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        See more
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
