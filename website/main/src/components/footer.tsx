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
    href: "https://instagram.com/auwa.life",
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
  // {
  //   label: "X",
  //   href: "https://x.com/auwalife",
  //   icon: (
  //     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   ),
  // },
  // LinkedIn hidden for now — re-enable when active
  // {
  //   label: "LinkedIn",
  //   href: "https://linkedin.com/company/auwa",
  //   icon: ( ... ),
  // },
];

export function Footer() {
  return (
    <footer className="bg-void flex flex-col sticky bottom-0 z-0">
      {/* Main footer content — two columns */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-16">
          {/* Left — signup */}
          <div className="max-w-[440px]">
            <span className="block font-sans text-[12px] tracking-[0.18em] uppercase mb-5 text-white/50">
              Newsletter
            </span>
            <h2 className="font-display text-[26px] md:text-[34px] leading-[1.2] tracking-[0.005em] text-white">
              Quiet letters.{" "}
              <span className="text-white/55">
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
                className="font-display text-[20px] md:text-[22px] tracking-[0.02em] text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pb-10 md:pb-12 pt-12 md:pt-20 flex items-center justify-between">
        <p className="font-sans text-[14px] tracking-[0.02em] text-white">
          &copy; AUWA {new Date().getFullYear()}
          <span aria-hidden="true" className="mx-3 text-white/35">&middot;</span>
          <a
            href="https://moreair.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/70 transition-colors duration-300"
          >
            MORE AIR
          </a>
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white hover:text-white/60 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
