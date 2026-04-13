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
              A more aware life is possible.
            </h1>
          </FadeIn>
        </section>

        {/* Philosophy */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
          <FadeIn>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              Since ancient times, the Japanese have believed that a life force resides in all things. Not just people and animals, but rivers, mountains, a handmade bowl, a well-worn knife, the changing light of a season you almost didn't notice. It is there in everything, if you pay attention.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is influenced by this philosophy. In a culture of speed, distraction, and disposability, we build awareness: of how you feel, of the objects you live with, of the world you move through, and of your connection to the people and nature around you.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              The truest abundance is not material. It is a quality of attention. A willingness to be where you are, to notice what is in front of you, to let the ordinary reveal itself as anything but. You don't have to live in a mountain temple to practise this. The philosophy can travel with you, shaping what you choose, how you move through the world, and what you pass on.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA takes shape through illustrated stories, a journal, a daily awareness practice, and a store for lifetime objects made by craftsmen. Some are here now. Others are on their way.
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
            ].map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * 80}>
                <Link href={pillar.href} className="group block">
                  <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <h3 className="font-display text-[18px] md:text-[20px] tracking-[0.01em] text-white">
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
