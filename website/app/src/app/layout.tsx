import type { Metadata, Viewport } from "next";
import { EB_Garamond, Instrument_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

/*
  Root layout for auwa.app (Kokoro Mirror PWA).

  The entire site is the cosmic surface — there's no editorial layout
  to suppress here. Background is Void at the body level, text is
  cosmic-50, and the five Yamato gradient families bloom on top
  during revelations.

  Manifest is at /manifest.webmanifest, scoped to /, so installing
  from any path lands the user in the daily flow on first launch.

  Not indexed while v1 testing is in progress (robots noindex,
  reinforced by sitemap absence).
*/

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
  display: "block",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "block",
});

export const metadata: Metadata = {
  title: "Kokoro Mirror | Auwa",
  description:
    "A daily practice for awareness. Tap how you feel, and Auwa names what is there.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://auwa.app"),
  robots: { index: false, follow: false },
  openGraph: {
    title: "Kokoro Mirror | Auwa",
    description: "A daily practice for awareness.",
    url: "https://auwa.app",
    siteName: "Auwa",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

// Hex equivalent of --color-void (oklch(0.08 0.025 250)). theme_color
// drives the iOS status-bar tint when the PWA is installed and
// launched standalone.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070b14",
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
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
