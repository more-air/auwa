"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up
  // Stay visible when a flipbook hero is active (data-flipbook-active on body)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const flipbookActive = document.body.hasAttribute("data-flipbook-active");
      if (flipbookActive) {
        setHidden(false);
      } else if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-surface transition-transform duration-300 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="block relative z-[60]">
              <img
                src="/auwa-logo.svg"
                alt="AUWA"
                className="h-[16px] md:h-[21px] w-auto"
              />
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-sans text-[14px] tracking-[0.06em] transition-all duration-300 group ${
                      pathname === item.href
                        ? "text-void"
                        : "text-void/50 hover:text-void"
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-void transition-all duration-300 ease-out ${
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className="md:hidden p-2 -mr-2 relative z-[60] cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-[20px] h-[14px] relative">
                <span className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-[6.5px] rotate-45" : "top-0 rotate-0"}`} />
                <span className={`absolute left-0 top-[6.5px] w-full h-[1.5px] bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-[6.5px] -rotate-45" : "top-[13px] rotate-0"}`} />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-surface transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center h-full px-6">
          <nav>
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li
                  key={item.href}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    className={`block font-display text-[2.5rem] leading-[1.3] tracking-[0.01em] transition-colors duration-300 ${pathname === item.href ? "text-void" : "text-void/50 hover:text-void"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`mt-16 flex gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: menuOpen ? `${100 + navItems.length * 60 + 60}ms` : "0ms" }}
          >
            <a href="https://instagram.com/auwa.life" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-void hover:text-void/60 transition-colors duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://x.com/auwa_life" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-void hover:text-void/60 transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            {/* LinkedIn hidden for now — re-enable when active */}
          </div>
        </div>
      </div>
    </>
  );
}
