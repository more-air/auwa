import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

const pillarLinks = [
  { label: "Journal", href: "/journal" },
  { label: "Book", href: "/book" },
  { label: "App", href: "/app" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/auwalife",
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
        <p className="font-sans text-[14px] tracking-[0.12em] uppercase text-washi">
          &copy; AUWA {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              // Match copyright styling — same size / colour / tracking
              // so the footer baseline reads as one row of metadata.
              // Hover: text-roll flip (same pattern as nav links and CTAs).
              className="group relative inline-block font-sans text-[14px] tracking-[0.12em] uppercase text-washi"
            >
              <span className="relative inline-block overflow-hidden pb-[0.12em]">
                <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[110%]">
                  {link.label.toUpperCase()}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-[110%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
                >
                  {link.label.toUpperCase()}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
