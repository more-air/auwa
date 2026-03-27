import type { Metadata } from "next";
import { Cormorant, Instrument_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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

export const metadata: Metadata = {
  title: "AUWA — A cosmic being who reveals your kokoro",
  description:
    "In the age of AGI, IQ is free. AUWA builds the EQ that makes you irreplaceable. A daily practice rooted in Japanese philosophy. Coming soon.",
  metadataBase: new URL("https://auwa.life"),
  openGraph: {
    title: "AUWA — A cosmic being who reveals your kokoro",
    description:
      "In the age of AGI, IQ is free. AUWA builds the EQ that makes you irreplaceable.",
    url: "https://auwa.life",
    siteName: "AUWA",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUWA",
    description:
      "A cosmic being who reveals your kokoro. Coming soon.",
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
      className={`${cormorant.variable} ${instrumentSans.variable} ${notoSansJP.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
