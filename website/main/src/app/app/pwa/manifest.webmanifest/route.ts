/*
  Separate PWA manifest for the Kokoro Mirror app surface.

  When a user installs Auwa from /app/pwa (via Safari's Share → Add
  to Home Screen, or Chrome's Install app), the home-screen icon
  launches them directly into the daily flow rather than the
  editorial homepage. start_url is /app/pwa, scope is /app/pwa, the
  surface theme is cosmic (Void background).

  Distinct from the root manifest at /manifest.webmanifest, which
  serves the editorial site (auwa.life root, warm Surface).

  Icons are placeholder — replace with cosmic-tinted Kokoro Mirror
  icons before friends release. Until then, the favicon is reused
  so we don't ship a 404'd icon.
*/

export function GET() {
  return Response.json({
    name: "Kokoro Mirror",
    short_name: "Auwa",
    description:
      "A daily practice for awareness. Tap how you feel, and Auwa names what is there.",
    start_url: "/app/pwa",
    scope: "/app/pwa",
    display: "standalone",
    orientation: "portrait",
    background_color: "#070b14",
    theme_color: "#070b14",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  });
}
