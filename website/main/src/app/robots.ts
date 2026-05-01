import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand", "/book-signup", "/demo-about", "/instagram", "/instagram-plan"],
    },
    sitemap: "https://auwa.life/sitemap.xml",
  };
}
