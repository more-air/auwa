import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { ImageFade } from "@/components/image-fade";
import { TextReveal } from "@/components/text-reveal";
import { STAGGER } from "@/lib/motion";
import Link from "next/link";

export const metadata = {
  title: "AUWA Journal - Japanese Philosophy, Craft & Seasons",
  description: "Essays on Japanese philosophy, craft, seasonal living, and awareness. The AUWA journal, rooted in the belief that everything has Kokoro.",
  openGraph: {
    title: "AUWA Journal - Japanese Philosophy, Craft & Seasons",
    description: "Essays on Japanese philosophy, craft, seasonal living, and awareness. The AUWA journal, rooted in the belief that everything has Kokoro.",
    url: "https://auwa.life/journal",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/journal.jpg", width: 1200, height: 630, alt: "AUWA Journal - Japanese philosophy and craft" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "AUWA Journal - Japanese Philosophy, Craft & Seasons",
    description: "Essays on Japanese philosophy, craft, seasonal living, and awareness.",
    images: ["/og/journal.jpg"],
  },
};

const categories = ["All", "Seasons", "Craft", "Philosophy", "Travel"];

const articles: { title: string; excerpt: string; category: string; slug: string; image?: string }[] = [
  { title: "Yaoyorozu no Kami", excerpt: "Eight million gods live in the world around you.", category: "Philosophy", slug: "yaoyorozu-no-kami", image: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg" },
  { title: "Shigefusa", excerpt: "On waiting over a year for a knife, and what arrived.", category: "Craft", slug: "shigefusa-knife", image: "/journal/shigefusa-knife/shigefusa-knife-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "A village renews its bond with its guardian spirits.", category: "Seasons", slug: "nozawa-fire-festival", image: "/journal/nozawa-festival/nozawa-festival-hero.jpg" },
  { title: "Oroku-gushi", excerpt: "Made from wood that breaks axes. Named after a girl.", category: "Craft", slug: "oroku-gushi", image: "/journal/oroku-gushi/oroku-gushi-hero.jpg" },
  { title: "Koya-san", excerpt: "Prayers chanted on this mountain for 1,200 years.", category: "Travel", slug: "koya-san", image: "/journal/koya-san/koya-san-hero.jpg" },
  { title: "72 Seasons", excerpt: "Five-day seasons, each one worth noticing.", category: "Seasons", slug: "72-seasons", image: "/journal/72-seasons/72-seasons-hero.jpg" },
  { title: "The Onsen Lesson", excerpt: "What hot water and strangers teach about being alive.", category: "Philosophy", slug: "the-onsen-lesson", image: "/journal/onsen-lesson/onsen-lesson-hero.jpg" },
  { title: "Making Washi", excerpt: "Cold water, mulberry bark, a thousand-year gesture.", category: "Craft", slug: "making-washi", image: "/journal/washi-paper/washi-paper-hero.jpg" },
  { title: "Narai in Snow", excerpt: "Four hundred years of the same street, unchanged.", category: "Travel", slug: "narai-juku", image: "/journal/narai-juku/narai-juku-hero.jpg" },
  { title: "Yakushima", excerpt: "On the island where the trees outlived history.", category: "Travel", slug: "yakushima-island", image: "/journal/yakushima-island/yakushima-island-hero.jpg" },
  { title: "The Beginning", excerpt: "Light in a dark forest. A dream that wouldn't let go.", category: "Philosophy", slug: "the-beginning", image: "/journal/auwa-book/auwa-book-hero.jpg" },
];

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category
    ? categories.find((c) => c.toLowerCase() === category.toLowerCase()) || "All"
    : "All";

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AUWA Journal",
    description: "Essays on Japanese philosophy, craft, seasonal living, and awareness.",
    url: "https://auwa.life/journal",
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: "AUWA",
      url: "https://auwa.life",
      logo: "https://auwa.life/auwa-logo.svg",
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: `https://auwa.life/journal/${a.slug}`,
      ...(a.image && { image: `https://auwa.life${a.image}` }),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>

        {/* Title, filters, and article grid — one section, one rhythm */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <TextReveal
            as="h1"
            className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.05] tracking-[0.01em] text-void"
            stagger={90}
          >
            Journal
          </TextReveal>
          <FadeIn delay={100}>
            <div className="mt-8 flex flex-wrap gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={cat === "All" ? "/journal" : `/journal?category=${cat.toLowerCase()}`}
                  className={`font-sans text-[13px] tracking-[0.06em] uppercase transition-colors duration-300 ${
                    cat === activeCategory ? "text-void" : "text-void/40 hover:text-void"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </FadeIn>

          <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
            {filtered.map((article, i) => (
              <FadeIn
                key={article.slug}
                delay={Math.min(i * STAGGER.grid, 480)}
                translateY={32}
              >
                <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                  <div className="rounded-xl overflow-hidden relative aspect-[4/5]">
                    {article.image ? (
                      <ImageFade
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/50 to-surface-raised" />
                    )}
                  </div>
                  <div className="mt-3 md:mt-4 max-w-[90%]">
                    <span className="font-sans text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-void/40">
                      {article.category}
                    </span>
                    <h2 className="mt-1 md:mt-1.5 font-display text-[18px] md:text-[22px] leading-[1.2] tracking-[0.01em] text-void group-hover:text-void/70 transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="mt-1 md:mt-1.5 font-sans text-[13px] md:text-[14px] leading-[1.4] md:leading-[1.5] text-void/50 line-clamp-2">
                      {article.excerpt}
                    </p>
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
