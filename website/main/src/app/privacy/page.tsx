import { Footer } from "@/components/footer";
import { HeaderTone } from "@/components/header-tone";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export const metadata = {
  title: "Privacy | Auwa",
  description:
    "How Auwa collects, uses and protects your personal information when you join our waitlist or newsletter.",
  openGraph: {
    title: "Privacy | Auwa",
    description:
      "How Auwa collects, uses and protects your personal information.",
    url: "https://auwa.life/privacy",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Standard pre-launch privacy policy. Reflects what Auwa actually does
// today: collects an email (and optionally a first name) for a waitlist /
// newsletter, via the website form or via Meta (Instagram/Facebook) lead
// forms; sends email through Resend; hosts on Vercel with cookieless
// analytics. No products are sold yet, so no payment data is handled.
// Controller is More Air Limited (the active trading company that operates
// Auwa under licence and actually handles the data); Auwa Limited is dormant
// and holds IP only.

// Body + heading type match the About page for a consistent editorial feel.
const bodyClass =
  "font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80";
const headingClass =
  "font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-sumi mb-4";

export default function PrivacyPage() {
  return (
    <>
      <main>
        <HeaderTone tone="sumi" />

        {/* ── Hero ── */}
        <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 space-page-hero space-flow">
          <h1 className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi">
            <TextReveal as="span" className="block" stagger={90}>
              Privacy.
            </TextReveal>
          </h1>
        </section>

        {/* ── Body ── */}
        <section className="mx-auto max-w-[760px] px-6 md:px-10 space-flow pb-24 md:pb-32">
          <FadeIn className="space-y-12 md:space-y-14">
            {/* Intro / lead — moved here from the hero so it sits in the
                centred column, matching the About page's philosophy lead. */}
            <p className={bodyClass}>
              This policy explains what personal information Auwa collects, why
              we collect it, and the choices you have. We keep it short and
              plain, because that is how we would want it explained to us.
            </p>

            <div>
              <h2 className={headingClass}>Who we are</h2>
              <p className={bodyClass}>
                Auwa is a brand operated by More Air Limited (company no.
                07051794). When we say &ldquo;we&rdquo;, &ldquo;us&rdquo; or
                &ldquo;Auwa&rdquo; in this policy, we mean More Air Limited, the
                company responsible for your personal information. If you have
                any questions, you can reach us at{" "}
                <ObfuscatedEmail user="hello" domain="auwa.life" />.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>What we collect</h2>
              <p className={bodyClass}>
                Auwa is still being built, and we are not selling anything yet.
                Today we collect only what you choose to give us when you join
                one of our lists:
              </p>
              <ul className={`${bodyClass} mt-4 list-disc space-y-2 pl-5`}>
                <li>
                  Your email address, and your first name if you provide it,
                  when you sign up through our website or through a sign-up form
                  on Instagram or Facebook.
                </li>
                <li>
                  Which list you joined (for example our store waitlist, app
                  waitlist or newsletter), so we send you relevant updates.
                </li>
                <li>
                  Basic, anonymous usage statistics about how our website is
                  visited. This is measured without cookies and does not
                  identify you personally.
                </li>
              </ul>
              <p className={`${bodyClass} mt-4`}>
                We do not collect payment details, and we do not ask for any
                sensitive information.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>How we use your information</h2>
              <p className={bodyClass}>
                We use your email address to send you the updates you signed up
                for: news about our launch, our newsletter, the opening of the
                store, and, where relevant, to administer prize draws such as
                our first-edition figure giveaway. We do not use your
                information to make automated decisions about you, and we do not
                sell it to anyone.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Our legal basis</h2>
              <p className={bodyClass}>
                Where the law requires a legal basis, we rely on your consent,
                which you give by choosing to join one of our lists. You can
                withdraw that consent at any time, and doing so is as simple as
                unsubscribing.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Who we share it with</h2>
              <p className={bodyClass}>
                We share your information only with the trusted services that
                help us run Auwa, and only so they can perform that role:
              </p>
              <ul className={`${bodyClass} mt-4 list-disc space-y-2 pl-5`}>
                <li>
                  <span className="text-sumi">Resend</span>, which stores our
                  mailing list and delivers our emails.
                </li>
                <li>
                  <span className="text-sumi">Vercel</span>, which hosts our
                  website and provides the cookieless usage statistics above.
                </li>
                <li>
                  <span className="text-sumi">Meta</span> (Instagram and
                  Facebook), if you sign up through one of our forms on their
                  platforms. Their own privacy terms also apply to that
                  sign-up.
                </li>
              </ul>
              <p className={`${bodyClass} mt-4`}>
                We may also disclose information if we are required to by law.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Where your information is held</h2>
              <p className={bodyClass}>
                Some of the services above are based outside the UK, including
                in the United States. Where your information is transferred
                internationally, we rely on those providers&rsquo; safeguards,
                such as standard contractual clauses, to keep it protected to
                the standard required under UK and EU law.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>How long we keep it</h2>
              <p className={bodyClass}>
                We keep your information for as long as you stay on our list. If
                you unsubscribe, or ask us to delete your details, we remove
                them from our active mailing list promptly.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Your rights</h2>
              <p className={bodyClass}>
                Under UK and EU data protection law you have the right to access
                the information we hold about you, to have it corrected or
                deleted, to object to or restrict how we use it, and to withdraw
                your consent. Every email we send includes an unsubscribe link,
                and you can exercise any of these rights at any time by emailing{" "}
                <ObfuscatedEmail user="hello" domain="auwa.life" />. If you are
                unhappy with how we have handled your information, you also have
                the right to complain to the UK&rsquo;s Information
                Commissioner&rsquo;s Office at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sumi underline decoration-sumi/30 underline-offset-4 transition-colors hover:decoration-sumi"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Cookies</h2>
              <p className={bodyClass}>
                Our website does not use advertising or tracking cookies. The
                usage statistics we collect are measured without cookies and
                cannot be used to identify you.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Children</h2>
              <p className={bodyClass}>
                Auwa is not directed at children, and we do not knowingly
                collect information from anyone under the age of 16.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Changes to this policy</h2>
              <p className={bodyClass}>
                As Auwa grows and we add things like the app and the store, we
                will update this policy to match, and the current version will
                always be the one you see here.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Contact</h2>
              <p className={bodyClass}>
                For anything to do with your privacy or the information we hold,
                write to us at <ObfuscatedEmail user="hello" domain="auwa.life" />
                . We read every message.
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
