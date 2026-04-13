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
              AUWA (written あうわ in Japanese) means "the harmony between the unseen and the seen." The three characters span the Japanese syllabary: あ (a) represents the heavens, わ (wa) represents the earth, and う (u) is the connection between them. The brand makes the invisible visible: invisible emotions, invisible craftsmanship, the invisible life force within all things. It also sounds like "our." Our life. Our world. Our awareness. That wasn't the origin, but we like where it lands.
            </p>
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
              AUWA is made by two people. The Creator (Eshi, 絵師): Japanese illustrator and the creator of the AUWA illustrated universe. Born and raised in Kansai, she grew up within the philosophy that AUWA now shares with the world. The Producer (Hanmoto, 版元): British designer and strategist. Twenty years building products for global tech and design. Published photographer whose Japan work has been used by Vogue, Condé Nast Traveler, and the World Economic Forum. Together, they follow the traditional Japanese ukiyo-e partnership of artist and publisher.
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
