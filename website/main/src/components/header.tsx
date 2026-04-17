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

export function Header() {
  const pathname = usePathname();
  // Homepage is the only page with a transparent header (it sits over the
  // full-bleed video hero). Every other page has a solid-white header.
  const transparent = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const atTopRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the menu when the route changes. PageTransition intercepts link
  // clicks and delays navigation by ~440ms; keeping the menu open through
  // that window lets it crossfade with the page transition instead of
  // flashing the old page in between.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up.
  //
  // atTop uses a wide range (up to 400px) with hysteresis so the transparent
  // homepage header can slide up WHILE still transparent — no flash of solid
  // white between the transparent state at the top and the hidden state past
  // the fold.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      const prevAtTop = atTopRef.current;
      const nextAtTop = prevAtTop ? y <= 400 : y <= 100;
      if (nextAtTop !== prevAtTop) {
        atTopRef.current = nextAtTop;
        setAtTop(nextAtTop);
      }

      if (y <= 10) {
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
  }, []);

  // Header bg + logo styling is driven purely by scroll position. The mobile
  // menu overlay (which is portalled to body) provides the white covering
  // when the menu is open — so the header itself can stay transparent and
  // we avoid any flash of solid-white bg before the overlay has faded in.
  const isTransparent = transparent && atTop;
  // The button (X) flips to dark as soon as the menu opens so it remains
  // readable against the incoming white overlay.
  const buttonIsLight = transparent && atTop && !menuOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[90] bg-surface md:hidden ${
        menuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity: menuOpen ? 1 : 0,
        transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Spacer mirrors the header row so the nav starts below the logo/button */}
      <div className="h-16" />

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
            href="https://x.com/auwalife"
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
        className={`sticky top-0 z-[100] will-change-transform ${
          isTransparent ? "bg-transparent" : "bg-surface"
        } ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          // Tailwind 4 uses the `translate` CSS property (not `transform`)
          // for translate-y utilities, so the transition must target that.
          transition: "translate 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease-out",
        }}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/*
              Logo fades out when the mobile menu opens so the open menu is
              clean (nav items + X, no logo). On desktop menuOpen stays false,
              so the logo is always visible.
            */}
            <Link
              href="/"
              className="block relative z-[60]"
              aria-hidden={menuOpen ? true : undefined}
              tabIndex={menuOpen ? -1 : undefined}
              style={{
                opacity: menuOpen ? 0 : 1,
                pointerEvents: menuOpen ? "none" : undefined,
                transition: "opacity 300ms ease-out",
              }}
            >
              <img
                src="/auwa-logo.svg"
                alt="AUWA"
                className="h-[20px] md:h-[22px] w-auto"
                style={{
                  filter: isTransparent ? "invert(1) brightness(2)" : undefined,
                  transition: "filter 300ms ease-out",
                }}
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

            {/*
              Single menu button that morphs between hamburger and X. Lines
              offset 1px from container edges so iOS doesn't render the top
              line thicker than the rest.
            */}
            <button
              className="md:hidden p-2 -mr-2 relative z-[60] cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                color: buttonIsLight ? "#ffffff" : "oklch(0.08 0.025 250)",
                transition: "color 300ms ease-out",
              }}
            >
              {/*
                Container h-[22px] with lines at y=2, 10, 18. Visible span
                from top of first line to bottom of third is ~18px, sized
                to feel like the AUWA logo (20px mobile) beside it. 6px
                gaps between lines, 2px breathing room top + bottom. All
                three spans carry identical transform + rendering hints
                so iOS anti-aliases them the same way and no line looks
                thicker.
              */}
              <div className="w-[28px] h-[22px] relative">
                <span
                  className="absolute left-0 w-full h-[2px] bg-current"
                  style={{
                    top: menuOpen ? "10px" : "2px",
                    transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                    willChange: "top, transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span
                  className="absolute left-0 top-[10px] w-full h-[2px] bg-current"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: "rotate(0deg)",
                    willChange: "opacity, transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "opacity 200ms ease-out",
                  }}
                />
                <span
                  className="absolute left-0 w-full h-[2px] bg-current"
                  style={{
                    top: menuOpen ? "10px" : "18px",
                    transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    willChange: "top, transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
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
