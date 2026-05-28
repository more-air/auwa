/*
  PWA manifest for the Kokoro Mirror at auwa.app.

  When a user installs Auwa from this surface (Safari's Share → Add to
  Home Screen, or Chrome's Install app), the home-screen icon launches
  the daily flow directly. start_url is "/" and scope is "/" because
  every route on this domain is part of the Kokoro Mirror.

  Distinct from the editorial site's manifest at auwa.life/manifest.
  Installing from auwa.life and installing from auwa.app give the user
  two different home-screen icons, one for the editorial brand and one
  for the daily practice — by design.

  Icons reuse the favicon for now. Replace with a cosmic-tinted Kokoro
  Mirror icon before public launch.
*/

export function GET() {
  return Response.json({
    name: "Kokoro Mirror",
    short_name: "Auwa",
    description:
      "A daily practice for awareness. Tap how you feel, and Auwa names what is there.",
    start_url: "/",
    scope: "/",
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
