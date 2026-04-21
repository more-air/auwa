"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AuwaLogo } from "./auwa-logo";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

/*
  Header — wordmark left, hamburger right, same on every viewport.

  The inline desktop-nav that shipped originally is archived at
  `components/_archive/header-desktop-nav.tsx`. We kept the data
  (`navItems`) so restoring it is a copy-paste away.

  The menu overlay is full-screen, centred, with links sized by clamp
  so it reads cleanly from iPhone to 4K.
*/
export function Header() {
  const pathname = usePathname();
  // Homepage + the /home-1 flipbook archive both sit over the full-bleed
  // video hero, so they share the transparent header treatment. Every
  // other page has a solid-white header.
  const transparent = pathname === "/" || pathname === "/home-1";
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

  // Hide on scroll down, show on scroll up. atTop has hysteresis so the
  // transparent homepage header can slide up WHILE still transparent
  // (no flash of solid white between transparent and hidden).
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      const prevAtTop = atTopRef.current;
      const nextAtTop = prevAtTop ? y <= 400 : y <= 100;
      if (nextAtTop !== prevAtTop) {
        atTopRef.current = nextAtTop;
        setAtTop(nextAtTop);
      }

      const isScrollJump = Math.abs(delta) > 200;
      if (y <= 10) {
        setHidden(false);
      } else if (!isScrollJump && delta > 4) {
        setHidden(true);
      } else if (!isScrollJump && delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Header bg + logo styling driven purely by scroll position. The menu
  // overlay (portalled to body) provides the white covering when the
  // menu is open — the header itself stays transparent to avoid a flash
  // of solid-white background before the overlay has faded in.
  const isTransparent = transparent && atTop;
  const buttonIsLight = transparent && atTop && !menuOpen;

  // Scroll-lock while the menu is open.
  //
  // Earlier this used `body.style.overflow = "hidden"`, which on iOS
  // Safari triggered the URL bar to re-show — shifting the layout
  // viewport upward and causing the page title to "lift" by ~50px a
  // fraction of a second before the overlay faded in. The position-
  // fixed-with-negative-top technique locks scroll without touching
  // overflow, so iOS leaves the URL bar state alone.
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[90] bg-surface ${
        menuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity: menuOpen ? 1 : 0,
        transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Spacer matches the header row so the nav starts below the logo/button */}
      <div className="h-16 md:h-20" />

      <div className="flex flex-col justify-center h-[calc(100%-4rem)] md:h-[calc(100%-5rem)] px-6 md:px-12 lg:px-20 xl:px-28">
        <nav className="max-w-[900px] mx-auto w-full">
          <ul className="flex flex-col gap-1 md:gap-2">
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
                  className={`group relative inline-flex items-baseline gap-5 md:gap-8 font-display text-[clamp(2.5rem,9vw,6rem)] leading-[1.1] tracking-[0.005em] transition-colors duration-300 ${
                    pathname === item.href ? "text-void" : "text-void/40 hover:text-void"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-void/30 tabular-nums self-center"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-12 md:mt-16 flex gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: menuOpen ? `${100 + navItems.length * 60 + 60}ms` : "0ms" }}
          >
            <a
              href="https://instagram.com/auwa.life"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-void/70 hover:text-void transition-colors duration-300"
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
              className="text-void/70 hover:text-void transition-colors duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`top-0 inset-x-0 z-[100] will-change-transform ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          // position-fixed body-lock handles scroll when menu is open, so
          // sticky stays safe here. Still, switch to fixed while the menu
          // is open as a belt-and-braces guarantee that the X button
          // remains reachable on iOS regardless of the scroll-lock path.
          position: menuOpen ? "fixed" : "sticky",
          transition: "translate 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/*
          Background as a separate layer underneath the nav. Fading the
          opacity of a solid white layer (rather than transitioning the
          header's own background-color between bg-transparent and
          bg-surface) avoids the "white veil" frames that produce a
          subtle flicker when the homepage scrolls back to the top.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-surface pointer-events-none"
          style={{
            opacity: isTransparent ? 0 : 1,
            transition: "opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div className="relative px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/*
              Logo fades out when the menu opens so the open menu is
              clean (nav items + X, no logo).
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
              <span className="sr-only">AUWA</span>
              <AuwaLogo
                className="block h-[20px] md:h-[22px] w-auto"
                style={{
                  color: isTransparent
                    ? "#ffffff"
                    : "oklch(0.08 0.025 250)",
                  transition: "color 300ms ease-out",
                }}
              />
            </Link>

            {/*
              Hamburger-to-X menu button. Shown at every viewport — the
              inline desktop nav that used to sit here is archived at
              `_archive/header-desktop-nav.tsx`.
            */}
            <button
              className="p-2 -mr-2 relative z-[60] cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                color: buttonIsLight ? "#ffffff" : "oklch(0.08 0.025 250)",
                transition: "color 300ms ease-out",
              }}
            >
              {/*
                Container h-[22px] with lines at y=2, 10, 18. Visible
                span is ~18px, sized to feel like the AUWA logo (20px
                mobile / 22px desktop) beside it. All three spans carry
                identical transform + rendering hints so iOS anti-aliases
                them the same way.
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
        Menu is portalled to document.body so the page-transition wrapper's
        transform doesn't clip it. Without this, `fixed inset-0` is relative
        to the transformed ancestor and the overlay ends up off-screen.
      */}
      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  );
}
