import type { Metadata, Viewport } from "next";

// Production metadata for the Auwa book page.
// The page itself is a "use client" component (interactive Auwa
// character, Kokoro video, BookPreview carousel etc.), so metadata
// has to live on this server-side layout file.

// Per-route theme-color override. The book page sits on Yoru (dark)
// surface (set via DarkPageTheme + the html[data-page-theme="dark"]
// rule in globals.css). Without overriding here, Android Chrome paints
// its system browser-chrome regions (URL bar transition gaps, bottom
// gesture-bar overscroll fill) using the global Surface theme-color
// (#f8f7f4) — read as a "white peak" at the bottom of the dark page
// during scroll-driven URL-bar collapses.
export const viewport: Viewport = {
  themeColor: "#0f1623", // --color-yoru
};

export const metadata: Metadata = {
  title: "Auwa Book | An Illustrated World",
  description:
    "An illustrated world rooted in the Japanese philosophy of Kokoro. Auwa, a small luminous being, arrives to reveal what we are too busy to notice.",
  openGraph: {
    title: "Auwa Book | An Illustrated World",
    description:
      "An illustrated world rooted in the Japanese philosophy of Kokoro. Auwa, a small luminous being, arrives to reveal what we are too busy to notice.",
    url: "https://auwa.life/book",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og/book.jpg",
        width: 1200,
        height: 630,
        alt: "Auwa Book — an illustrated world by Eko Maeda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Auwa Book | An Illustrated World",
    description: "Auwa's illustrated world by Eko Maeda.",
    images: ["/og/book.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Auwa",
  description: "An illustrated world by Eko Maeda. Auwa, a small luminous being, arrives in a forest at twilight and shows the world what it has been too busy to notice.",
  author: { "@type": "Person", name: "Eko Maeda" },
  publisher: { "@type": "Organization", name: "Auwa", url: "https://auwa.life" },
  url: "https://auwa.life/book",
  image: "https://auwa.life/og/book.jpg",
  inLanguage: "en",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
