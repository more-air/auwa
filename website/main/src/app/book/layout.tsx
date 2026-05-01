import type { Metadata } from "next";

// Production metadata for the Auwa book page.
// The page itself is a "use client" component (interactive Auwa
// character, Kokoro video, BookPreview carousel etc.), so metadata
// has to live on this server-side layout file.
export const metadata: Metadata = {
  title: "Auwa Book | An Illustrated World",
  description:
    "Auwa, a small luminous being who arrives in the first illustrated book by Eko Maeda. The world drawn here is the same one we live in, only seen with closer attention.",
  openGraph: {
    title: "Auwa Book | An Illustrated World",
    description:
      "Auwa, a small luminous being who arrives in the first illustrated book by Eko Maeda. The world drawn here is the same one we live in, only seen with closer attention.",
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
