import { SiteShell } from "@/components/SiteShell";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StickyCta } from "@/components/StickyCta";
import { work, services, contact, care, about } from "@/content/site";
import { Care } from "@/components/Care";
import { SocialProof } from "@/components/SocialProof";
import { BusinessSection } from "@/components/BusinessSection";
import { WhiteLabel } from "@/components/WhiteLabel";
import { ClosingCTA } from "@/components/ClosingCTA";
import {
  Work,
  Services,
  Sectors,
  Process,
  Testimonials,
  Clients,
  About,
  Footer,
} from "@/components/Sections";

/**
 * Strukturierte Daten nach schema.org.
 *
 * Suchmaschinen lesen daraus, WAS hier angeboten wird, WO und von WEM.
 * Ohne diesen Block muessen sie es aus dem Fliesstext erraten. Der Typ
 * ProfessionalService ist richtig, weil es eine Dienstleistung mit
 * Standort ist, kein Ladengeschaeft und kein reines Online-Angebot.
 *
 * Es steht hier ausschliesslich, was auch sichtbar auf der Seite oder
 * im Impressum steht. Erfundene Bewertungen oder Preisspannen waeren
 * ein Verstoss gegen die Richtlinien fuer strukturierte Daten und
 * koennen zum Ausschluss aus den Rich Results fuehren.
 */
const strukturierteDaten = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://klixvisuals.de/#klixvisuals",
  name: "KLIX VISUALS",
  description:
    "Grafikdesign aus München: Branding, Verpackungsdesign und Print für Hotellerie, Immobilien und Handel.",
  url: "https://klixvisuals.de",
  email: contact.email,
  image: "https://klixvisuals.de/brand/hero-stacked-boxes.webp",
  logo: "https://klixvisuals.de/brand/logo.svg",
  inLanguage: "de-DE",
  priceRange: undefined,
  founder: {
    "@type": "Person",
    name: "Karina Voag",
    jobTitle: "Grafikdesignerin",
    /* Aus dem Inhalt abgeleitet statt fest verdrahtet. Beim Tausch des
       Portraits am 22.09.2026 zeigte dieses Feld sonst weiter auf die
       alte Datei, waehrend die Seite bereits die neue auslieferte. */
    image: `https://klixvisuals.de${about.portrait.src}`,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Keltenweg 3",
    postalCode: "85764",
    addressLocality: "Oberschleißheim",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsLanguage: ["de", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen",
    itemListElement: [
      ...services.map((leistung) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: leistung.title,
          description: leistung.body,
        },
      })),
      /* Die Betreuungspakete tragen einen Preis, der auch sichtbar
         auf der Seite steht. Nur deshalb darf er hier stehen.
         `price` ist netto, das sagt `priceSpecification` ausdruecklich,
         sonst laese eine Suchmaschine ihn als Endpreis. */
      ...care.packages.map((paket) => ({
        "@type": "Offer",
        name: `Betreuung ${paket.name}`,
        description: paket.forWhom,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: paket.price.replace(/[^0-9.]/g, "").replace(".", ""),
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
          unitText: "MON",
        },
      })),
    ],
  },
};

/* Die Projekte einzeln auszeichnen, damit sie als Werk der Designerin
   erkennbar sind und nicht als beliebige Bilder. */
const projekteDaten = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ausgewählte Projekte",
  itemListElement: work.map((projekt, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: `${projekt.discipline} für ${projekt.client}`,
      creator: { "@type": "Person", name: "Karina Voag" },
      ...(projekt.image
        ? { image: `https://klixvisuals.de${projekt.image.src}` }
        : {}),
    },
  })),
};

/**
 * Reihenfolge fuer Entscheider, die zuerst wissen wollen, ob die
 * Arbeit passt: Arbeiten steht vor Leistungen.
 * Skill §16 Simplicity: "Show the common path first."
 */
export default function Page() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projekteDaten) }}
      />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Work />
        <BusinessSection />
        <Services />
        <WhiteLabel />
        <Care />
        <Testimonials />
        <About />
        <ClosingCTA />
      </main>
      <Footer />
      <StickyCta />
    </SiteShell>
  );
}
