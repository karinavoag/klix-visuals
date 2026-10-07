import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://klixvisuals.de";

/**
 * SEO-Grundlage.
 *
 * `metadataBase` ist Voraussetzung dafuer, dass Next relative Pfade in
 * Open-Graph- und Canonical-Angaben zu absoluten URLs macht. Ohne den
 * Wert liefert Next relative og:image-Pfade aus, die kein sozialer
 * Dienst aufloesen kann.
 *
 * Die Beschreibung nennt bewusst Ort und Branchen, weil danach gesucht
 * wird ("grafikdesigner muenchen", "verpackungsdesign hotellerie"), und
 * bleibt unter 160 Zeichen, damit Google sie nicht abschneidet.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "KLIX VISUALS | Grafikdesign aus München",
    /* Unterseiten erben das Muster, siehe app/impressum/page.tsx usw. */
    template: "%s | KLIX VISUALS",
  },
  description:
    "Grafikdesign aus München: Branding, Verpackungsdesign und Print für Hotellerie, Immobilien und Handel. Direkt oder im White Label für Agenturen.",
  applicationName: "KLIX VISUALS",
  authors: [{ name: "Karina Voag", url: SITE }],
  creator: "Karina Voag",
  publisher: "KLIX VISUALS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE,
    siteName: "KLIX VISUALS",
    title: "KLIX VISUALS | Grafikdesign aus München",
    description:
      "Branding, Verpackungsdesign und Print für Hotellerie, Immobilien und Handel. Von der Strategie bis zu den finalen Druckdaten.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLIX VISUALS | Grafikdesign aus München",
    description:
      "Branding, Verpackungsdesign und Print für Hotellerie, Immobilien und Handel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Design",
  formatDetection: {
    /* Verhindert, dass iOS Zahlen im Text eigenmaechtig zu
       Telefonlinks umbaut und damit das Schriftbild zerschiesst. */
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Skill §16 Flexibility: Zoom wird nicht unterbunden. */
  maximumScale: 5,
  themeColor: "#faf8f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
