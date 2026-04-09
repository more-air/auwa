"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md">
      <div className="px-6 md:px-12 lg:px-20 xl:px-28">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="block">
            <img
              src="/auwa-logo.svg"
              alt="AUWA"
              className="h-[20px] md:h-[26px] w-auto"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-sans text-[13px] tracking-[0.06em] transition-opacity duration-300 ${
                    pathname === item.href
                      ? "text-void opacity-100"
                      : "text-void/70 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.2" />
              <line y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <line y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
