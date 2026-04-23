import type { Metadata, Viewport } from "next";
import { EB_Garamond, Instrument_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { EntranceLoader } from "@/components/entrance-loader";
import { CursorLabel } from "@/components/cursor-label";
import { FigureHook } from "@/components/figure-hook";
// SoundToggle is parked for launch — reads as distracting at arrival.
// Re-enable when we decide to bring ambient sound back; the component
// itself is feature-complete (lifts above the footer, pauses on tab
// hidden, iOS audio cleanup wired up).
// import { SoundToggle } from "@/components/sound-toggle";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Japanese fonts use display: "block" (not swap) so iOS doesn't flash
// the sans-serif Latin fallback before swapping to the serif mid-
// animation — especially visible on the entrance loader (あうわ) on
// first-time visits from Instagram's in-app WebView. The CSS variables
// in globals.css include OS-native Japanese serif/sans fallbacks so
// that if the block period ever runs long, the chars still render in
// a Japanese face rather than disappearing.
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "block",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "block",
});

export const metadata: Metadata = {
  title: "AUWA | Everything has Kokoro",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description:
    "Japanese philosophical awareness applied to modern life. A daily awareness practice, craftsman objects, illustrated stories, and an editorial journal. Rooted in the ancient belief that a life force resides in all things.",
  metadataBase: new URL("https://auwa.life"),
  alternates: {
    canonical: "https://auwa.life",
  },
  openGraph: {
    title: "AUWA | Everything has Kokoro",
    description:
      "Japanese philosophical awareness applied to modern life. A daily awareness practice, craftsman objects, illustrated stories, and an editorial journal.",
    url: "https://auwa.life",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AUWA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUWA | Everything has Kokoro",
    description: "Japanese philosophical awareness applied to modern life.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${instrumentSans.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AUWA",
              url: "https://auwa.life",
              logo: "https://auwa.life/auwa-logo.svg",
              description: "A Japanese lifestyle brand rooted in the philosophy that everything has Kokoro.",
              sameAs: [
                "https://instagram.com/auwa.life",
                "https://x.com/auwalife",
                "https://linkedin.com/company/auwa",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AUWA",
              url: "https://auwa.life",
            }),
          }}
        />
        <EntranceLoader />
        <CursorLabel />
        {/* <SoundToggle /> — parked for launch, see comment on import above */}
        {/*
          Header lives outside PageTransition. PageTransition's wrapper
          applies opacity/transform during leave/enter, which creates a
          stacking context that would trap the header's z-index and
          cause the logo + X to fade out with the page on link clicks.
          Rendering it here keeps it above the transition at all times.
        */}
        <Header />
        <PageTransition>
          {children}
        </PageTransition>
        <FigureHook />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('contextmenu',function(e){if(e.target.tagName==='IMG')e.preventDefault()})`,
          }}
        />
      </body>
    </html>
  );
}
