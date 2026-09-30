import type { MetadataRoute } from "next";

/**
 * Ohne robots.txt raten Suchmaschinen. Wichtiger als das Erlauben ist
 * hier der Verweis auf die Sitemap und das Aussperren der API-Route:
 * /api/anfrage ist ein Formularendpunkt und hat im Index nichts zu
 * suchen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://klixvisuals.de/sitemap.xml",
    host: "https://klixvisuals.de",
  };
}
