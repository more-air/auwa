import type { Metadata } from "next";
import { EB_Garamond, Instrument_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUWA | Japanese philosophical awareness applied to modern life",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description:
    "A Japanese lifestyle brand rooted in the philosophy that everything has kokoro. Journal, stories, craft, and a daily awareness practice.",
  metadataBase: new URL("https://auwa.life"),
  alternates: {
    canonical: "https://auwa.life",
  },
  openGraph: {
    title: "AUWA | Everything has kokoro",
    description:
      "Japanese philosophical awareness applied to modern life. Journal, stories, craft, and a daily awareness practice.",
    url: "https://auwa.life",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUWA",
    description: "Japanese philosophical awareness applied to modern life.",
  },
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
              description: "A Japanese lifestyle brand rooted in the philosophy that everything has kokoro.",
              sameAs: [
                "https://instagram.com/auwa.life",
                "https://x.com/auwa_life",
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
        {children}
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
