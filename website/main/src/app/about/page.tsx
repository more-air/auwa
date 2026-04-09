import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";

export const metadata = {
  title: "About | AUWA",
  description: "The story of AUWA, the philosophy of Yaoyorozu no Kami, and the people behind it.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 pb-16 md:pb-24">
          <FadeIn>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void max-w-[700px]">
              A world where nothing is ordinary.
            </h1>
          </FadeIn>
        </section>

        {/* Philosophy */}
        <section className="mx-auto max-w-[680px] px-6 md:px-10 pb-16 md:pb-24">
          <FadeIn>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              AUWA is a Japanese lifestyle brand rooted in the philosophy of Yaoyorozu no Kami, the ancient Shinto understanding that all things possess kokoro. Heart, soul, spirit. Not just people and animals, but rivers, mountains, a handmade bowl, a well-worn knife, the changing light of a season you almost didn't notice.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              In a culture of speed, distraction, and disposability, AUWA builds awareness: of how you feel, of the objects you live with, of the world you move through, and of your connection to the people and nature around you.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-void/80">
              Where Western wellness centres on the self, AUWA draws from Japanese collectivist philosophy. Awareness isn't just inward. It extends to the craftsman who spent decades mastering a single knife, to the micro-season shifting outside your window, to the stranger whose day you can change by paying attention.
            </p>
          </FadeIn>
        </section>

        {/* Image break */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <FadeIn>
            <div className="aspect-[2.5/1] bg-surface-raised rounded-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
            </div>
          </FadeIn>
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
              AUWA (written あうわ in Japanese) means "the harmony between the unseen and the seen." The three characters span the Japanese syllabary: あ (a) represents the heavens, わ (wa) represents the earth, and う (u) is the connection between them. The brand makes the invisible visible: invisible emotions, invisible craftsmanship, invisible kokoro within all living things.
            </p>
          </FadeIn>
        </section>

        {/* Founders */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <FadeIn>
              <div className="aspect-[3/4] bg-surface-raised rounded-sm overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
              </div>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-void">
                Eko Maeda
              </h3>
              <p className="mt-1 font-sans text-[14px] tracking-[0.04em] text-void/45 uppercase">
                Creator · Eshi
              </p>
              <p className="mt-4 font-display text-[16px] md:text-[17px] leading-[1.65] text-void/70">
                Japanese illustrator and the creator of the AUWA universe. Ten years of quiet devotion to four illustrated stories about a luminous being who reveals the kokoro in all things. The heart, the hand, and the cultural anchor of everything AUWA is.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="aspect-[3/4] bg-surface-raised rounded-sm overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
              </div>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-void">
                Tom Vining
              </h3>
              <p className="mt-1 font-sans text-[14px] tracking-[0.04em] text-void/45 uppercase">
                Producer · Hanmoto
              </p>
              <p className="mt-4 font-display text-[16px] md:text-[17px] leading-[1.65] text-void/70">
                British designer and strategist. Twenty years building products for Nokia, Apple, and Sky. Now building the systems, the brand, and the business that brings AUWA's world to life. The producer to Eko's creator, following the traditional Japanese ukiyo-e partnership of artist and publisher.
              </p>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
