import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand", "/book-signup", "/demo-about", "/demo-book", "/demo-book-2", "/demo-book-3", "/demo-home", "/demo-journal", "/home-1", "/instagram", "/instagram-plan"],
    },
    sitemap: "https://auwa.life/sitemap.xml",
  };
}
