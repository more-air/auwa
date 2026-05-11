import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

// Footer pillar nav — Store joins the list now that it carries the signed
// Auwa figure editions (a real product hook, not just a teaser). /app
// remains a signup teaser only, surfaced through the home page modules
// rather than the footer. Order matches the main menu.
const pillarLinks = [
  { label: "Book", href: "/book" },
  { label: "Store", href: "/store" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

// Instagram is the only live social channel today. X is intentionally
// omitted (the article-page Share on X button remains live since it
// composes from the reader's side without linking to an empty profile).

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
            <span className="block font-sans text-[12px] tracking-[0.16em] uppercase mb-5 text-washi/55">
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

          {/* Right — pillar links. Right-aligned on desktop so the
              column sits flush with the Instagram link below it. */}
          <nav className="flex flex-col gap-3 md:items-end">
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
        <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-washi">
          &copy; Auwa {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/auwalife"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auwa on Instagram"
            // Same colour stream as the copyright; subtle opacity dip on
            // hover gives a tactile response without competing with the
            // text-roll motion used for content links elsewhere.
            className="inline-block text-washi hover:opacity-70 transition-opacity duration-300"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
