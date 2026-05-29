import type { Metadata, Viewport } from "next";
import { EB_Garamond, Instrument_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

/*
  Root layout — auwa.app (Kokoro Mirror PWA).

  The entire app is the cosmic surface. Body is Void with cosmic-50
  at 70% as the base text colour; t-* typography utilities override
  with explicit opacity per role.

  Mobile-first. Safe-area-inset is applied at the body so every
  child surface inherits the iOS notch + home-indicator clearance.

  Not indexed during v1 friends-release (robots noindex, no
  sitemap). Manifest scoped to / so PWA install from any route
  lands the user in the daily flow.
*/

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  title: "Auwa",
  description:
    "A daily practice for awareness. Tap how you feel, and Auwa names what is there.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://auwa.app"),
  robots: { index: false, follow: false },
  openGraph: {
    title: "Auwa",
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

// Hex equivalent of --color-void (oklch(0.07 0.020 250)). Drives the
// iOS status-bar tint when the PWA launches standalone.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#06090f",
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
