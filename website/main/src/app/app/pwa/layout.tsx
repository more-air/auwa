import type { Metadata, Viewport } from "next";
import { CosmicPageTheme } from "@/components/app/cosmic-page-theme";

/*
  Kokoro Mirror layout.

  Distinct surface from the editorial site:
  - Cosmic page theme (Void surface, cosmic-50 text) via CosmicPageTheme.
  - Separate PWA manifest so installing from this surface lands the user
    in the daily flow with its own home-screen icon and start_url.
  - Editorial chrome (Header, FigureHook, EntranceLoader) self-suppresses
    on /app/pwa/* — see each component for the check.
  - Not indexed while the v1 build is in progress; pulled when ready
    for friends release.
*/

export const metadata: Metadata = {
  title: "Kokoro Mirror | Auwa",
  description:
    "A daily practice for awareness. Tap how you feel, and Auwa names what is there.",
  manifest: "/app/pwa/manifest.webmanifest",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Kokoro Mirror | Auwa",
    description: "A daily practice for awareness.",
    url: "https://auwa.life/app/pwa",
    siteName: "Auwa",
    type: "website",
  },
};

// Hex equivalent of --color-void (oklch(0.08 0.025 250)). theme_color
// on the viewport drives the iOS status-bar tint when the PWA is
// installed and launched standalone.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070b14",
};

export default function AppPwaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CosmicPageTheme />
      {children}
    </>
  );
}
