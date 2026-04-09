import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import Link from "next/link";

/* ─── Article data (will come from Sanity CMS) ─── */

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "image-pair"; images: [{ src: string; alt: string; caption?: string }, { src: string; alt: string; caption?: string }] }
  | { type: "pullquote"; text: string };

const articles: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    issue: string;
    author: string;
    photographer: string;
    publishedAt: string;
    heroImage: string | null;
    content: ContentBlock[];
  }
> = {
  "shigefusa-knife": {
    title: "Shigefusa",
    subtitle: "On waiting two years for a knife, and what arrived.",
    category: "Craft",
    issue: "Issue 01",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/shigefusa/shigefusa-hero.jpg",
    content: [
      {
        type: "text",
        text: "The knife arrived on a Tuesday in June, two years after we ordered it. No tracking number, no shipping notification. Just a card from the shop in Niigata saying it was ready, and then a box at the door wrapped in brown paper with that particular Japanese precision. Every fold exact, every edge aligned.",
      },
      {
        type: "text",
        text: "Inside, a kiri wood box. Paulownia, the same timber used to store kimonos and samurai swords, chosen because it breathes with the seasons. Expanding in humidity, contracting in dry air, protecting what's inside without suffocating it. On the lid, five characters brushed in sumi ink: 御和牛刀庖丁. Honourable wa-gyuto kitchen knife. The formality of it. As though the box itself understood what it was carrying.",
      },
      {
        type: "image",
        src: "/journal/shigefusa/shigefusa-box.jpg",
        alt: "Shigefusa kitaeji wa-gyuto in its kiri wood presentation box, viewed from above",
        caption: "Kiri wood box with hand-brushed calligraphy. The paulownia timber breathes with the seasons.",
      },
      {
        type: "text",
        text: "We lifted the lid and there it was. A Shigefusa kitaeji wa-gyuto, 210 millimetres of hand-forged Swedish carbon steel, resting on wooden supports. The blade coated in a thin film of tsubaki oil, camellia, applied by hand at the workshop to protect it during its journey. No plastic. No foam. Just wood cradling steel, and the faint scent of the oil.",
      },
      {
        type: "text",
        text: "You notice things when you've waited this long. The way the light catches the kitaeji pattern, layers of different steels forge-welded together, folded, hammered, and ground until they form a flowing, smoke-like grain across the surface. Every Shigefusa blade has a different pattern. Not by design, but by nature. The same way no two pieces of wood have the same grain. The steel remembers every strike of the hammer.",
      },
      {
        type: "text",
        text: "Shigefusa is the working name of a single bladesmith in Sanjo, Niigata prefecture, a region that has produced metalwork for over four hundred years. He doesn't have a website. He doesn't take custom orders. He makes what he makes (gyutos, nakiris, petty knives) in the quantities his hands and his days allow, and when they're finished, they go to a handful of shops in Japan. Waitlists run one to three years. There is no way to expedite.",
      },
      {
        type: "text",
        text: "In a world that has optimised almost everything else, this pace feels radical. Not as a statement. Shigefusa isn't making a point about slow living or mindful consumption. He's simply making knives the way he knows how to make them, at the speed the process requires. The radicalism is ours. We're the ones who've forgotten that some things take the time they take.",
      },
      {
        type: "pullquote",
        text: "The steel remembers every strike of the hammer.",
      },
      {
        type: "text",
        text: "On the face of the blade, two characters chiseled. Not laser-etched, not stamped, but cut into the steel by hand: 重房作. Made by Shigefusa. Centred, precise, permanent. A maker's mark that has appeared on blades from this workshop for generations.",
      },
      {
        type: "text",
        text: "Look closely at the spine and you can see where it's been shaped by hand. Not machine-ground to a uniform thickness, but worked with files and stones until the taper feels right under the fingers. The choil, where blade meets handle, is finished clean and smooth. The buffalo horn ferrule sits flush against the ho wood handle with no gap, no glue marks, no imperfection in the joint. These are small details. They are also the entire point.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/shigefusa/shigefusa-blade.jpg", alt: "Close-up of the Shigefusa blade showing kitaeji damascus pattern and hand-chiseled kanji", caption: "Kitaeji patterning: layers of forge-welded steel, each blade unique. The kanji reads 重房作, made by Shigefusa." },
          { src: "/journal/shigefusa/shigefusa-tip.jpg", alt: "Close-up of the Shigefusa blade tip showing flowing kitaeji steel pattern", caption: "The blade tip. The flowing pattern in the steel is a record of the forging. No two are alike." },
        ],
      },
      {
        type: "text",
        text: "The Japanese have a word for the spirit that lives in things: kokoro. In the Shinto understanding of yaoyorozu no kami, everything possesses it. Not just living beings but rivers, mountains, and objects made with enough care and accumulated skill. A mass-produced knife has no kokoro. It can't. It was made by a machine that doesn't know what a knife is for. But a blade that a single person spent days forging, shaping, polishing, and signing, that blade carries something of the person who made it into the life of the person who uses it.",
      },
      {
        type: "text",
        text: "We haven't used ours yet. It sits in its kiri box, coated in camellia oil, in a drawer in our kitchen. We will use it. It was made to be used, and keeping it behind glass would miss the point. But for now, we're still in the early stage of the relationship. Still noticing. Still holding it up to the window to watch the light move across those layered patterns in the steel.",
      },
      {
        type: "text",
        text: "Two years is a long time to wait for a knife. It's also, it turns out, exactly the right amount of time. Long enough to forget about it, then remember. Long enough to wonder if it will ever come, then stop wondering. Long enough that when the box finally arrives on a Tuesday in June, you open it slowly. You pay attention. You notice the oil, the wood, the weight, the grain in the steel, the chiseled name of the man who made it. You notice everything.",
      },
      {
        type: "text",
        text: "Which might be the most valuable thing a knife can teach you.",
      },
    ],
  },
};

/* ─── Fallback article for unknown slugs ─── */
const fallbackArticle = {
  title: "The knife maker of Seki",
  subtitle: "A lifetime spent perfecting a single blade.",
  category: "Craft",
  issue: "Issue 02",
  author: "Tom Vining",
  photographer: "Rieko Vining",
  publishedAt: "2026-04-09",
  heroImage: null,
  content: [
    { type: "text" as const, text: "Many of the world's great craftsmen have transformed making from an act of production to something that leans closer to the spiritual. In the workshops of Seki, a small city in Gifu prefecture long known as Japan's capital of bladesmithing, the air carries the scent of steel and charcoal." },
    { type: "text" as const, text: "The sound of hammers against anvils has echoed through these streets for seven hundred years." },
  ],
};

/* ─── Group content blocks into layout sections ─── */
type Section =
  | { kind: "text-only"; blocks: ContentBlock[] }
  | { kind: "image-beside"; image: { src: string; alt: string; caption?: string }; blocks: ContentBlock[] }
  | { kind: "image-pair"; images: [{ src: string; alt: string; caption?: string }, { src: string; alt: string; caption?: string }] };

function groupIntoSections(content: ContentBlock[]): Section[] {
  const sections: Section[] = [];
  let currentBlocks: ContentBlock[] = [];

  for (const block of content) {
    if (block.type === "image") {
      // Flush accumulated text
      if (currentBlocks.length > 0) {
        sections.push({ kind: "text-only", blocks: currentBlocks });
        currentBlocks = [];
      }
      // Image left, following text right
      sections.push({
        kind: "image-beside",
        image: { src: block.src, alt: block.alt, caption: block.caption },
        blocks: [],
      });
    } else if (block.type === "image-pair") {
      if (currentBlocks.length > 0) {
        sections.push({ kind: "text-only", blocks: currentBlocks });
        currentBlocks = [];
      }
      sections.push({ kind: "image-pair", images: block.images });
    } else {
      // Text or pullquote — add to current beside section or accumulate
      const lastSection = sections[sections.length - 1];
      if (lastSection && lastSection.kind === "image-beside") {
        lastSection.blocks.push(block);
      } else {
        currentBlocks.push(block);
      }
    }
  }

  if (currentBlocks.length > 0) {
    sections.push({ kind: "text-only", blocks: currentBlocks });
  }

  return sections;
}

/* ─── Shared text/pullquote rendering ─── */
function renderTextBlock(block: ContentBlock, i: number) {
  if (block.type === "text") {
    return (
      <FadeIn key={i} delay={Math.min(i * 30, 200)}>
        <p className="font-display text-[18px] md:text-[19px] leading-[1.85] tracking-[0.005em] text-void mb-8 md:mb-10">
          {block.text}
        </p>
      </FadeIn>
    );
  }
  if (block.type === "pullquote") {
    return (
      <FadeIn key={i} delay={Math.min(i * 30, 200)}>
        <blockquote className="my-12 md:my-16">
          <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.3] tracking-[0.005em] text-void">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      </FadeIn>
    );
  }
  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug] || fallbackArticle;
  const sections = groupIntoSections(article.content);

  return (
    <>
      <Header />
      <main>

        {/* ── Hero: split layout, viewport height ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">
          <div className="relative aspect-[4/5] md:aspect-auto bg-surface-raised overflow-hidden">
            {article.heroImage ? (
              <img
                src={article.heroImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
            )}
          </div>

          <div className="flex flex-col justify-end px-6 md:px-10 lg:px-14 py-10 md:pb-16 lg:pb-20">
            <FadeIn>
              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
                {article.title}
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-4 md:mt-6 font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.35] text-void/60">
                {article.subtitle}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* ── Meta row ── */}
        <FadeIn delay={200}>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8 border-b border-void/8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-void/40">
              <div className="flex flex-wrap items-center gap-6 md:gap-10">
                <Link href="/journal" className="font-sans text-[12px] tracking-[0.08em] uppercase hover:text-void transition-colors duration-300">
                  {article.category}
                </Link>
                <span className="font-sans text-[12px] tracking-[0.08em] uppercase">
                  {article.author === article.photographer
                    ? `Words & Photos: ${article.author}`
                    : `Words: ${article.author} · Photos: ${article.photographer}`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="hover:text-void transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}&description=${encodeURIComponent(article.title + ': ' + article.subtitle)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest" className="hover:text-void transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
                <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}&text=${encodeURIComponent(article.title + ': ' + article.subtitle)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="hover:text-void transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Article body — text always on right half ── */}
        <article className="py-16 md:py-24">
          {sections.map((section, si) => {

            {/* Text-only: right half */}
            if (section.kind === "text-only") {
              return (
                <div key={si} className="px-6 md:ml-[50%] md:px-10 lg:px-14 md:pr-12 lg:pr-20 xl:pr-28 max-w-full">
                  {section.blocks.map((block, bi) => renderTextBlock(block, si * 10 + bi))}
                </div>
              );
            }

            {/* Image pair: two side-by-side, full width, each with own caption */}
            if (section.kind === "image-pair") {
              return (
                <FadeIn key={si} delay={100}>
                  <div className="my-12 md:my-20 px-6 md:px-12 lg:px-20 xl:px-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {section.images.map((img, j) => (
                        <figure key={j}>
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                          {img.caption && (
                            <figcaption className="mt-4 font-sans text-[13px] leading-[1.6] text-void/50">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            }

            {/* Image beside: image left, text right */}
            if (section.kind === "image-beside") {
              return (
                <div key={si} className="md:grid md:grid-cols-2 my-10 md:my-16">
                  <div className="px-6 md:pl-12 lg:pl-20 xl:pl-28 md:pr-16 lg:pr-24 xl:pr-32 mb-8 md:mb-0">
                    <FadeIn delay={100}>
                      <figure>
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        {section.image.caption && (
                          <figcaption className="mt-4 font-sans text-[13px] leading-[1.6] text-void/50">
                            {section.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    </FadeIn>
                  </div>

                  <div className="px-6 md:px-10 lg:px-14 md:pr-12 lg:pr-20 xl:pr-28 md:pt-0">
                    {section.blocks.map((block, bi) => renderTextBlock(block, si * 10 + bi))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </article>

        {/* ── Divider ── */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="border-t border-void/8" />
        </div>

        {/* ── Related articles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <h2 className="font-display text-[28px] md:text-[32px] tracking-[0.01em] text-void mb-8 md:mb-12">
            Continue reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Objects with kokoro", category: "Craft", slug: "objects-with-kokoro" },
              { title: "Temple mornings", category: "Travel", slug: "temple-mornings" },
              { title: "Everything has kokoro", category: "Philosophy", slug: "everything-has-kokoro" },
            ].map((related) => (
              <Link
                key={related.title}
                href={`/journal/${related.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] bg-surface-raised rounded-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                </div>
                <div className="mt-4">
                  <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40">
                    {related.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-[18px] md:text-[20px] leading-[1.25] text-void group-hover:text-void/70 transition-colors duration-300">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="bg-void py-28 md:py-40">
          <div className="max-w-[480px] mx-auto text-center px-6">
            <h2 className="font-display text-[28px] md:text-[32px] tracking-[0.01em] text-white">
              Stay close.
            </h2>
            <form className="mt-10 max-w-[400px] mx-auto">
              <div className="flex items-center gap-4 border-b border-white/20 pb-3 focus-within:border-white/50 transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="flex-1 bg-transparent font-sans text-[14px] text-white placeholder:text-white/35 outline-none"
                />
                <button
                  type="submit"
                  className="font-sans text-[14px] font-medium tracking-[0.02em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
