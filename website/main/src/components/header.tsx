"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

interface HeaderProps {
  disableFlipbookStick?: boolean;
  transparent?: boolean;
}

export function Header({ disableFlipbookStick = false, transparent = false }: HeaderProps = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const atTopRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up.
  // Stay visible when a flipbook hero is active (data-flipbook-active on body).
  // Hysteresis on atTop: once we leave the top, require a larger rollback to
  // re-enter — prevents flip-flop near the threshold while Lenis is easing.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      const flipbookActive = !disableFlipbookStick && document.body.hasAttribute("data-flipbook-active");

      const nextAtTop = atTopRef.current ? y <= 40 : y <= 8;
      if (nextAtTop !== atTopRef.current) {
        atTopRef.current = nextAtTop;
        setAtTop(nextAtTop);
      }

      if (flipbookActive || y <= 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [disableFlipbookStick]);

  // Transparent styling applies only while at the top. Once the user has
  // scrolled, the header becomes solid white with dark text.
  const isTransparent = transparent && atTop;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[90] bg-surface transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Close button — mirrors header layout so the tap target is in the same place */}
      <div className="px-6 h-16 flex items-center justify-end">
        <button
          className="p-2 -mr-2 text-void cursor-pointer"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-[20px] h-[14px] relative">
            <span className="absolute left-0 top-[6.5px] w-full h-[1.5px] bg-current rotate-45" />
            <span className="absolute left-0 top-[6.5px] w-full h-[1.5px] bg-current -rotate-45" />
          </div>
        </button>
      </div>

      <div className="flex flex-col justify-center h-[calc(100%-4rem)] px-6">
        <nav>
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className={`block font-display text-[2.5rem] leading-[1.3] tracking-[0.01em] transition-colors duration-300 ${
                    pathname === item.href ? "text-void" : "text-void/50 hover:text-void"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`mt-16 flex gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: menuOpen ? `${100 + navItems.length * 60 + 60}ms` : "0ms" }}
        >
          <a
            href="https://instagram.com/auwa.life"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-void hover:text-void/60 transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://x.com/auwa_life"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-void hover:text-void/60 transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isTransparent ? "bg-transparent" : "bg-surface"
        } ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="block relative z-[60]">
              <img
                src="/auwa-logo.svg"
                alt="AUWA"
                className="h-[16px] md:h-[21px] w-auto transition-[filter] duration-300 ease-out"
                style={isTransparent ? { filter: "invert(1) brightness(2)" } : undefined}
              />
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                        isTransparent
                          ? "text-white"
                          : active
                            ? "text-void"
                            : "text-void hover:text-void/55"
                      }`}
                    >
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              className={`md:hidden p-2 -mr-2 relative z-[60] cursor-pointer transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-void"
              }`}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <div className="w-[20px] h-[14px] relative">
                <span className="absolute left-0 top-0 w-full h-[1.5px] bg-current" />
                <span className="absolute left-0 top-[6.5px] w-full h-[1.5px] bg-current" />
                <span className="absolute left-0 top-[13px] w-full h-[1.5px] bg-current" />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/*
        Mobile menu is portalled to document.body so the page-transition
        wrapper's transform doesn't clip it. Without this, `fixed inset-0`
        is relative to the transformed ancestor and the overlay ends up
        off-screen on small viewports.
      */}
      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
