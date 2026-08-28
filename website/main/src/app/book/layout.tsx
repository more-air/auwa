import type { Metadata, Viewport } from "next";
import { ORG_REF, RIEKO, SITE_URL } from "@/lib/schema";

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
        alt: "Auwa Book, an illustrated world by Eko Maeda",
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

/**
 * BookSeries rather than a single Book, because /book presents four
 * titles and the old markup described only the first one.
 *
 * `hasPart` carries the two finished books. The Humans and Planet Lioma
 * are shown on the page as in progress, and a Book node for a work that
 * doesn't exist yet is the kind of overstatement that gets a site's
 * structured data discounted. Add them when they're finished.
 *
 * No ISBN, no datePublished, no offers: nothing is published or for sale
 * yet. Those fields go in when the books do.
 */
const book = (name: string, description: string, cover: string) => ({
  "@type": "Book",
  name,
  description,
  author: { "@type": "Person", "@id": RIEKO["@id"], name: RIEKO.name },
  image: `${SITE_URL}${cover}`,
  inLanguage: "en",
  url: `${SITE_URL}/book`,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BookSeries",
  "@id": `${SITE_URL}/book#series`,
  name: "Auwa",
  description:
    "An illustrated series by Eko Maeda. Auwa, a small luminous being, arrives and reveals the Kokoro in everything it touches.",
  author: RIEKO,
  publisher: ORG_REF,
  url: `${SITE_URL}/book`,
  image: `${SITE_URL}/og/book.jpg`,
  inLanguage: "en",
  hasPart: [
    book("The Dawn", "A blue flower in a quiet forest.", "/book/covers/cover-1.jpg"),
    book("The Ocean", "Auwa descends below the surface.", "/book/covers/cover-2.jpg"),
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
