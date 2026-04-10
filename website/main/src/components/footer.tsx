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
  {
    label: "X",
    href: "https://x.com/auwa_life",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/auwa",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer>
      {/* Stay close newsletter */}
      <div className="bg-void py-28 md:py-40">
        <div className="max-w-[480px] mx-auto text-center px-6">
          <h2 className="font-display text-[28px] md:text-[32px] tracking-[0.01em] text-white">
            Stay close.
          </h2>
          <div className="mt-10 max-w-[400px] mx-auto">
            <SignupForm source="newsletter" buttonText="Subscribe" theme="dark" successMessage="Something quiet is on its way." className="max-w-[400px]" />
          </div>
        </div>
      </div>

      {/* Pillar links */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
        <div className="flex justify-center">
          <p className="font-display text-[22px] md:text-[26px] tracking-[0.02em] text-void/80">
            {pillarLinks.map((link, i) => (
              <span key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-void transition-colors duration-300"
                >
                  {link.label}
                </Link>
                {i < pillarLinks.length - 1 && (
                  <span className="mx-3 md:mx-4 text-void/25">&middot;</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div>
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-8 pb-12 md:pb-14 flex items-center justify-between">
          <p className="font-sans text-[14px] tracking-[0.02em] text-void">
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
                className="text-void hover:text-void/60 transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
