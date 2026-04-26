import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { STAGGER } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About AUWA | A Japanese Lifestyle Brand",
  description: "Rieko Maeda and Tom Vining on founding AUWA, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
  openGraph: {
    title: "About AUWA | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding AUWA, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
    url: "https://auwa.life/about",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630, alt: "About AUWA - a Japanese lifestyle brand founded by Rieko Maeda and Tom Vining" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About AUWA | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding AUWA.",
    images: ["/og/about.jpg"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AUWA | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding AUWA, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
    url: "https://auwa.life/about",
    mainEntity: {
      "@type": "Organization",
      name: "AUWA",
      url: "https://auwa.life",
      logo: "https://auwa.life/auwa-logo.svg",
      description: "A Japanese lifestyle brand rooted in the philosophy that everything has Kokoro.",
      founder: [
        {
          "@type": "Person",
          name: "Rieko Maeda",
          jobTitle: "Creator",
          nationality: "Japanese",
          url: "https://auwa.life/about#rieko",
        },
        {
          "@type": "Person",
          name: "Tom Vining",
          jobTitle: "Producer",
          nationality: "British",
          url: "https://auwa.life/about#tom",
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>

        {/* Hero — explicit pt-12 md:pt-16 (hero exception, see website.md)
            provides breathing from the sticky header without the full
            symmetric section padding. space-flow handles the bottom. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 space-flow">
          <h1 className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-void max-w-[700px] pr-12 md:pr-0">
            <TextReveal as="span" className="block" stagger={90}>
              The architecture
            </TextReveal>
            <TextReveal as="span" className="block" stagger={90} delay={180}>
              of Kokoro
            </TextReveal>
          </h1>
        </section>

        {/* Philosophy */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 space-flow">
          <FadeIn>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              Since ancient times, the Japanese have believed a life force resides in all things. It lives not just in people, but in rivers, handmade bowls, and the shifting light of a season. We call this quality Kokoro (心): a holistic word uniting heart, mind, soul, and spirit. It is felt before it is understood.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is built on this philosophy. In a culture of speed and disposability, we cultivate awareness of how you feel, the things you live with, and your connection to the world. True abundance is not material. It is a quality of attention. You don't need a mountain temple to practice this. It is a way of moving through the world, shaping what you choose and what you pass on.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              We bring this to life through four things: a journal from Japan, a daily awareness practice, a curated store of craftsman objects, and illustrated stories.
            </p>
          </FadeIn>
        </section>

        {/* Four pillars */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-flow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              { label: "Book", href: "/book", image: "/pillars/book.jpg" },
              { label: "Journal", href: "/journal", image: "/journal/washi-paper/washi-paper-hero.jpg" },
              { label: "App", href: "/app", image: "/pillars/app.jpg" },
              { label: "Store", href: "/store", image: "/pillars/store.jpg" },
            ].map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * STAGGER.grid} translateY={32}>
                <Link href={pillar.href} className="group block" data-cursor={pillar.href === "/journal" ? "Read" : "Open"}>
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <h3 className="font-display text-[20px] md:text-[28px] tracking-[0.01em] text-white">
                        {pillar.label}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* The name */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-void mb-8">
              The name
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA (written あうわ in Japanese) is a word from an ancient Japanese writing system. あ (a) is the unseen, the source of all things. わ (wa) is the seen, the physical world we inhabit. う (u) is the act of bringing one into the other. The brand makes the invisible visible: the emotions you haven't named, the craft you haven't witnessed, the life force in things you pass every day without noticing. It also sounds like "our." Our life. Our world. Our awareness.             </p>
          </FadeIn>
        </section>

        {/* Founders */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-void mb-8">
              The creators
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is made by two people: a Japanese designer who created the world, and a British designer who brings it to life. Twenty years working together across design, technology, and travelling Japan. They have always wanted their work to be of use to other people. AUWA is their offering: illustration, photography, writing, product design, gathered in service of an idea they believe in.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div id="rieko" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <p className="font-sans text-[13px] tracking-[0.06em] text-void/45 uppercase mb-2">
                Co-founder
              </p>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-void mb-4">
                Rieko Maeda
              </h3>
              <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
                Japanese illustrator and designer, also known by her artist name Eko. Creator of the AUWA illustrated universe: years of quiet devotion to stories about a character who reveals the Kokoro in all things. She tells how it came to her in <Link href="/journal/the-beginning" className="underline underline-offset-4 decoration-void/30 hover:decoration-void/70 transition-colors duration-300">The Beginning</Link>. Raised in Japan, where Kokoro is lived rather than studied. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-void/30 hover:decoration-void/70 transition-colors duration-300">More Air</a>, and the Japanese voice behind AUWA&rsquo;s store, working with craftsmen across Japan.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div id="tom" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <p className="font-sans text-[13px] tracking-[0.06em] text-void/45 uppercase mb-2">
                Co-founder
              </p>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-void mb-4">
                Tom Vining
              </h3>
              <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
                British designer, strategist, and photographer. Twenty years building products in the design and tech industries. Fifteen years of photographing Japan; his images have appeared in Cond&eacute; Nast Traveler, Vogue, Time Out, and across this site. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-void/30 hover:decoration-void/70 transition-colors duration-300">More Air</a>, leading brand, strategy, and product. For AUWA, he produces the brand, the systems, and co-creates the products that bring Rieko&rsquo;s world to life.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Contact */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-void mb-8">
              Get in touch
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              For collaborations, press, craftsman partnerships, or just to say hello: <ObfuscatedEmail user="hello" domain="auwa.life" />.
            </p>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </>
  );
}
