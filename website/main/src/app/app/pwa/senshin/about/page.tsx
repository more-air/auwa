"use client";

/*
  About Senshin (§5.16).

  Cultural anchor (chōzubachi, Senshin as Japanese practice, not
  clinical intervention). Three to five "further reading" links to
  publicly available research the user may find interesting. Framed
  throughout as related public research, never as "Auwa is doing
  this". The credentialing is the research, not us.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Orb } from "@/components/app/orb";

const READING = [
  {
    title: "Cognitive distancing, an APA primer",
    href: "https://www.apa.org/topics/stress/uncertainty",
  },
  {
    title: "Pennebaker on expressive writing",
    href: "https://liberalarts.utexas.edu/psychology/faculty/pennebak",
  },
  {
    title: "Mueller and Oppenheimer (2014) on handwriting versus typing",
    href: "https://journals.sagepub.com/doi/10.1177/0956797614524581",
  },
  {
    title: "Lieberman et al. on affect labelling",
    href: "https://www.scn.ucla.edu/pdf/AL(2007).pdf",
  },
];

export default function AboutSenshin() {
  const router = useRouter();
  return (
    <main id="main-content" className="min-h-svh px-6 pt-16 pb-16">
      <button
        type="button"
        onClick={() => router.back()}
        className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
      >
        ← Back
      </button>

      <article className="max-w-md mx-auto mt-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Orb size="sm" />
          <h1
            className="font-jp-serif text-[28px] text-cosmic-50 mt-2"
            style={{ fontFamily: "var(--font-jp-serif)" }}
          >
            洗心
          </h1>
          <span className="font-display text-[15px] text-cosmic-50/65 italic">
            Senshin, washing the heart
          </span>
        </div>

        <div className="font-display text-[16px] text-cosmic-50/85 leading-[1.65]">
          <p>
            At a Shinto shrine, before you enter, you stop at the chōzubachi
            and pour water over your hands. The gesture is older than any
            of us. It is not about getting clean; it is about marking a
            threshold, leaving what you carried at the gate.
          </p>
          <p className="mt-4">
            Senshin is the same gesture, at a different scale, applied to
            what the heart carries. A small ritual you can do when a worry
            will not let go. It is not therapy and not a treatment. It is
            a few minutes in which you put a name on a thing, write through
            it on paper, and put it down for now.
          </p>
          <p className="mt-4">
            Below are some pieces of public research you may find
            interesting. They are not what Auwa is doing; they are what
            other people have noticed about practices like this one.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/45 mb-3">
            Further reading
          </h2>
          <ul className="flex flex-col gap-3">
            {READING.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-display text-[15px] text-cosmic-50/85 hover:text-cosmic-50 underline underline-offset-4 decoration-cosmic-50/25 hover:decoration-cosmic-50/55 transition-colors"
                >
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-cosmic-50/10 flex flex-col gap-3">
          <Link
            href="/app/pwa/senshin/help"
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
          >
            Crisis support →
          </Link>
          <Link
            href="/app/pwa/senshin/look-back"
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
          >
            Look Back →
          </Link>
        </div>
      </article>
    </main>
  );
}
