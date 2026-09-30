import type { MetadataRoute } from "next";

const SITE = "https://klixvisuals.de";

/**
 * Vier Seiten, mehr hat das Projekt nicht. Die Startseite traegt alles
 * Inhaltliche und bekommt deshalb Prioritaet 1, die Rechtstexte stehen
 * bewusst niedrig: sie sollen auffindbar, aber nicht das Ergebnis fuer
 * "grafikdesign muenchen" sein.
 *
 * lastModified wird beim Build gesetzt. Das ist ehrlicher als ein fest
 * eingetragenes Datum, das nach der ersten Aenderung nicht mehr stimmt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const stand = new Date();
  return [
    { url: SITE, lastModified: stand, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/impressum`, lastModified: stand, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/datenschutz`, lastModified: stand, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/agb`, lastModified: stand, changeFrequency: "yearly", priority: 0.3 },
  ];
}
