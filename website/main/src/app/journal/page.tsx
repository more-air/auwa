import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import Link from "next/link";

export const metadata = {
  title: "Journal — AUWA",
  description: "Essays on Japanese philosophy, craft, seasonal living, and awareness.",
};

const categories = ["All", "Seasons", "Craft", "Philosophy", "Travel"];

const articles = [
  { title: "The knife maker of Seki", excerpt: "A lifetime spent perfecting a single blade.", category: "Craft", slug: "knife-maker-of-seki" },
  { title: "Seimei: the light returns", excerpt: "Japan's 72 micro-seasons and the art of noticing.", category: "Seasons", slug: "seimei" },
  { title: "Awareness, not mindfulness", excerpt: "The difference between a Western concept and a Japanese worldview.", category: "Philosophy", slug: "awareness-not-mindfulness" },
  { title: "Temple mornings", excerpt: "On the ritual of arriving before dawn, and what the silence teaches.", category: "Travel", slug: "temple-mornings" },
  { title: "Objects with kokoro", excerpt: "Why a hand-forged knife changes your relationship with daily life.", category: "Craft", slug: "objects-with-kokoro" },
  { title: "The onsen lesson", excerpt: "On shared space, vulnerability, and the awareness that comes from hot water and silence.", category: "Travel", slug: "the-onsen-lesson" },
  { title: "What wabi-sabi means", excerpt: "Reclaiming a philosophy from the interiors trend.", category: "Philosophy", slug: "what-wabi-sabi-means" },
  { title: "The fifth day", excerpt: "How Japan divides the year into moments most people never see.", category: "Seasons", slug: "the-fifth-day" },
  { title: "Everything has kokoro", excerpt: "An introduction to Yaoyorozu no Kami and why it matters.", category: "Philosophy", slug: "everything-has-kokoro" },
];

export default function JournalPage() {
  return (
    <>
      <Header />
      <main>

        {/* Title + filters */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-28 md:pt-36 pb-8 md:pb-12">
          <FadeIn>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[0.01em] text-void">
              Journal
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 flex flex-wrap gap-4 md:gap-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`font-sans text-[12px] tracking-[0.06em] uppercase transition-colors duration-300 ${
                    cat === "All" ? "text-void" : "text-void/40 hover:text-void"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Article grid */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, i) => (
              <FadeIn
                key={article.slug}
                delay={Math.min(i * 60, 360)}
              >
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="bg-surface-raised rounded-sm overflow-hidden relative aspect-[4/5]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/50 to-surface-raised" />
                  </div>
                  <div className="mt-4">
                    <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-void/40">
                      {article.category}
                    </span>
                    <h2 className="mt-1.5 font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[0.01em] text-void group-hover:text-void/70 transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-void/50 line-clamp-2">
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
