import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand", "/book/1", "/book/2", "/home-1", "/instagram", "/instagram-plan"],
    },
    sitemap: "https://auwa.life/sitemap.xml",
  };
}
