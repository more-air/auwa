import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import Link from "next/link";

export const metadata = {
  title: "About | AUWA",
  description: "The story of AUWA and the ancient Japanese belief that a life force resides in all things.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 pb-16 md:pb-24">
          <FadeIn>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void max-w-[700px] pr-12 md:pr-0">
              The architecture of Kokoro
            </h1>
          </FadeIn>
        </section>

        {/* Philosophy */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
          <FadeIn>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              Since ancient times, the Japanese have believed a life force resides in all things. It lives not just in people, but in rivers, handmade bowls, and the shifting light of a season. They call this quality kokoro (心): a holistic word uniting heart, mind, soul, and spirit. It is felt before it is understood.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is built on this philosophy. In a culture of speed and disposability, we cultivate awareness of how you feel, the things you live with, and your connection to the world. True abundance is not material. It is a quality of attention. You don't need a mountain temple to practice this. It is a way of moving through the world, shaping what you choose and what you pass on.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              We bring this to life through illustrated stories, a daily awareness practice, and a curated store for lifetime objects. Some are here now. Others are on their way.
            </p>
          </FadeIn>
        </section>

        {/* Four pillars */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              { label: "Book", href: "/book", image: "/pillars/book.jpg" },
              { label: "Journal", href: "/journal", image: "/journal/washi/washi-hero.jpg" },
              { label: "App", href: "/app", image: "/pillars/app.jpg" },
              { label: "Store", href: "/store", image: "/pillars/store.jpg" },
            ].map((pillar) => (
              <Link key={pillar.label} href={pillar.href} className="group block">
                <div className="relative aspect-[4/5] bg-surface-raised rounded-xl overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 className="font-display text-[18px] md:text-[20px] tracking-[0.01em] text-white">
                      {pillar.label}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* The name */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
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
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-void mb-8">
              The creators
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is made by two people. A Japanese and a British designer who have spent twenty years working together across technology and design, and travelling Japan. After many years, AUWA is the thing they always wanted to create: illustration, photography, writing, product design, all in service of something they believe in.
            </p>
          </FadeIn>
        </section>

        {/* Contact */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
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
