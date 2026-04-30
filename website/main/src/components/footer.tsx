import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

const pillarLinks = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/auwalife",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  // X hidden for now — re-enable when the account has content.
  // Note the article-page Share on X button (journal/[slug]/page.tsx)
  // stays live; it composes a tweet from the reader's side so an empty
  // @auwalife profile isn't linked to.
];

/*
  Footer — Yoru surface, washi text. One footer, everywhere. The brand's
  named-dark pair (Yoru + Washi) is the universal dark-surface system on
  the website; pages opt INTO sharing this canvas just by being on the
  site, not via per-page colour overrides. To re-tone the footer (or any
  dark surface) at a brand level, change `--color-yoru` and/or
  `--color-washi` in globals.css and every dark surface follows.
*/
export function Footer() {
  return (
    <footer className="flex flex-col sticky bottom-0 z-0 bg-yoru border-t border-washi/10">
      {/* Main footer content — two columns */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-16">
          {/* Left — signup */}
          <div className="max-w-[440px]">
            <span className="block font-sans text-[12px] tracking-[0.18em] uppercase mb-5 text-washi/50">
              Newsletter
            </span>
            <h2 className="font-display text-[26px] md:text-[34px] leading-[1.2] tracking-[0.005em] text-washi">
              Quiet letters.{" "}
              <span className="text-washi/55">
                Seasonal essays,<br className="md:hidden" />
                {" "}craftsman stories, and early news<br className="md:hidden" />
                {" "}of everything we make.
              </span>
            </h2>
            <div className="mt-12">
              <SignupForm source="newsletter" buttonText="Subscribe" theme="dark" successMessage="Something quiet is on its way." />
            </div>
          </div>

          {/* Right — pillar links */}
          <nav className="flex flex-col gap-3 md:min-w-[105px]">
            {pillarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-display text-[20px] md:text-[22px] tracking-[0.02em] text-washi/50 hover:text-washi transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pb-10 md:pb-12 pt-12 md:pt-20 flex items-center justify-between">
        <p className="font-sans text-[14px] tracking-[0.02em] text-washi">
          &copy; AUWA {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-washi hover:text-washi/60 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
