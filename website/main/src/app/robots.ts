import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand", "/book-signup", "/demo-about", "/instagram", "/app/preview", "/store-preview"],
    },
    sitemap: "https://auwa.life/sitemap.xml",
  };
}
