/**
 * INHALTE
 *
 * Anrede: Sie. Person: ich. Durchgaengig.
 * Ton: ruhig, reduziert, keine Gedankenstriche, Fachbegriffe englisch.
 *
 * Drei Herkunftsarten:
 *   real        woertlich von klixvisuals.de, unveraendert
 *   ueberarbeit Grundaussage von klixvisuals.de, neu formuliert
 *   neu         neu geschrieben, Leistungsumfang von Karina zu bestaetigen
 *
 * PLATZHALTER bleibt ueberall dort, wo eine Tatsache fehlt:
 * Kundennamen, Kennzahlen, Case Studies, Kontaktdaten, Termine.
 * Es wurde kein Fakt erfunden.
 */

export const PLACEHOLDER = "PLATZHALTER" as const;

/**
 * Firmierung. NEU 22.09.2026.
 *
 * Steht hier an genau einer Stelle, damit Footer, Impressum, AGB und
 * Datenschutz nicht auseinanderlaufen. Genau das war vor dem Relaunch
 * das Problem: dieselbe Firma hiess in drei Texten "Geschaeftsfuehrerin",
 * "Inhaberin" und "e.K.".
 *
 * OHNE den Zusatz "i. G.", auf Karinas ausdrueckliche Entscheidung vom
 * 22.09.2026. Der Zusatz stand zuvor hier, weil die Eintragung ins
 * Handelsregister noch aussteht (eingereicht am 17.09.2026) und wer
 * vorher als GmbH firmiert, nach § 11 Abs. 2 GmbHG persoenlich haftet.
 * Stand 08.10.2026: Eintragung ist erfolgt, HRB 31688.
 * Der Punkt wurde zweimal angesprochen, Karina hat ihn abgewogen und
 * sich dagegen entschieden. Es ist ihre Entscheidung, nicht ein
 * Versehen, und soll beim naechsten Durchsehen nicht "korrigiert"
 * werden.
 *
 * Registergericht und HRB-Nummer stehen seit der Eintragung im Impressum
 * und in den AGB, siehe content/legal.ts.
 */
export const company = {
  /** Vollstaendige Firmierung fuer Footer und Rechtstexte. */
  legal: "KLIX VISUALS GmbH",
  /** Marke ohne Rechtsform, fuer Fliesstext und Ueberschriften. */
  short: "KLIX VISUALS",
};

export const nav = [
  { id: "arbeiten", label: "Arbeiten" },
  { id: "leistungen", label: "Leistungen" },
  { id: "betreuung", label: "Betreuung" },
  { id: "ablauf", label: "Ablauf" },
  { id: "ueber-mich", label: "Über mich" },
];

/**
 * neu.
 *
 * GEAENDERT 22.09.2026: Social Media steht jetzt in der Headline.
 * Es macht einen grossen Teil der Arbeit aus (Hilton, Kraemmel,
 * Movida), kam auf der Seite aber nirgends vor. Wer die alte Seite
 * las, konnte es nicht anfragen.
 *
 * Der zweite Weg fuehrt nicht mehr zu den Arbeiten, sondern zur
 * Betreuung. Die Arbeiten stehen direkt darunter und werden beim
 * Scrollen ohnehin erreicht; die Betreuung ist der Weg, der
 * planbaren Umsatz traegt und sonst uebersehen wird.
 */
export const hero = {
  eyebrow: "Branding, Packaging, Shopify & Print",
  headline: "Design, das nicht nur gut aussieht. Sondern funktioniert.",
  lead: "Für Unternehmen, die verkaufen wollen. Mit über 6 Jahren E-Commerce, Brand Building und Produktion.",
  primary: "Projekt besprechen",
  secondary: "Projekte ansehen",
  /* Das Hintergrundfoto der alten Startseite. Dort stand weisser
     Text ohne Abdunklung darauf, der Kontrast war deshalb von der
     Bildstelle abhaengig. Hier liegt ein Scrim mit 62 Prozent
     darueber: selbst an der hellsten Stelle des Fotos bleiben
     5.02:1 fuer weissen Text. Skill §12 "Dim to focus". */
  image: {
    src: "/brand/hero-stacked-boxes.webp",
    alt: "Gestapelte, individuell gestaltete Verpackungen aus einem Packaging-Projekt von KLIX VISUALS",
  },
};

/**
 * Ueberarbeitet fuer Kundenrelevanz.
 *
 * Leitfrage war nicht "wer bin ich", sondern "warum diese Person und
 * nicht die naechste". Persoenliche Motivation ist deshalb raus,
 * Branchennachweis, Zusammenarbeit und Lieferumfang sind rein.
 *
 * Alle genannten Kunden stammen aus `work` und `clients` weiter unten,
 * es ist kein Name erfunden. `responseTime` ist mit `contact` identisch
 * und muss mit dieser Stelle konsistent bleiben.
 *
 * ENTFERNT: "Nach der Ausbildung zur Kauffrau im E-Commerce habe ich
 * gemerkt, dass mein Interesse beim Design liegt." Zwei Gruende. Der
 * Satz stellt die Ausbildung als abgeschlossen dar, was zum aktuellen
 * Stand zu pruefen ist. Und er erzaehlt eine Umorientierung, die fuer
 * einen Auftraggeber keine Entscheidungshilfe ist.
 *
 * GEAENDERT 22.09.2026, von Karina angesagt: der Text fuehrt jetzt mit
 * "seit ueber sechs Jahren im E-Commerce, Brand Building und Design".
 * Damit faellt auch die alte Hilfskonstruktion weg, die den Stand der
 * Ausbildung offenlassen musste ("Kaufmaennisch komme ich aus dem
 * E-Commerce"). Die sechs Jahre sind Karinas eigene Angabe zu ihrem
 * Werdegang und umfassen die Zeit vor der Selbststaendigkeit; im Vault
 * ist nur der Beginn der Selbststaendigkeit im November 2021 belegt.
 *
 * ENTFERNT: "Mir ist wichtig, auf Augenhoehe zu arbeiten, flexibel zu
 * bleiben und Loesungen zu finden, die zum Kunden passen." Das
 * unterschreibt jeder Wettbewerber, es trennt also nicht.
 */
export const about = {
  name: "Karina Voag",
  /* GEAENDERT 22.09.2026: neues Portrait von Karina geliefert
     (karinavoag.png, 1254x1254). Das alte Bild von der Webflow-Seite
     liegt weiterhin unter /brand/karina-voag.webp, wird aber nicht
     mehr ausgeliefert.

     GEAENDERT am selben Tag auf Karinas Wunsch: weiter herausgezoomt
     und als Quadrat mit abgerundeten Ecken statt als Kreis. Damit
     entfaellt der vorherige Ausschnitt auf Kopf und Schultern, hier
     steht jetzt die volle Aufnahme. Die Quelle ist bereits
     quadratisch, es wird also nichts beschnitten.

     Der Eckenradius ist 1rem, derselbe wie bei Projektkacheln,
     Leistungsbildern und Betreuungskarten. Ein eigener Radius nur
     fuer dieses eine Bild waere ein Sonderfall ohne Grund. */
  portrait: {
    src: "/brand/karina-voag-portrait.webp",
    alt: "Karina Voag, Grafikdesignerin und Gründerin von KLIX VISUALS in München",
  },
  paragraphs: [
    "Design mit Business-Verständnis. Ich komme nicht nur aus dem Design, sondern aus dem operativen E-Commerce. Deshalb denke ich bei einer Verpackung an Produktion und Verkauf – und bei einem Shopify Store an Conversion statt nur Optik.",
    "Seit über sechs Jahren arbeite ich im E-Commerce, im Brand Building und im Design. Fünf Shopify-Stores betreue ich selbst. Von München aus baue ich Onlineshops und Websites und gestalte Marken, Verpackungen und Printprodukte.",
    "Der größte Teil meiner Designarbeit kommt aus Gastronomie und Hotellerie. Speisekarten für das Herzog Bar & Restaurant, Branding Guidelines für die Bambi Bar, Social Media für das Hilton Munich Airport. Dazu Verpackungen, Tech Packs und Kataloge für Handel und Import.",
    "Sie arbeiten dabei direkt mit mir. Es gibt keine Zwischenebene, keinen Wechsel der Ansprechperson und keine Weitergabe an wechselnde Freelancer. Auf Anfragen antworte ich in unter 24 Stunden.",
    "Ein Entwurf ist für mich erst fertig, wenn er produzierbar ist. Sie bekommen geprüfte Druckdaten, sauber sortierte Dateien und Vorlagen, mit denen Ihr Team selbst weiterarbeiten kann.",
    "Für Agenturen arbeite ich im White Label, unter Ihrem Namen und abgestimmt auf Ihre Vorlagen.",
  ],
  facts: [
    { label: "E-Commerce & Design", value: "über 6 Jahre operative Erfahrung" },
    { label: "Shopify Stores", value: "5 in eigener Betreuung" },
    { label: "Antwortzeit", value: "unter 24 Stunden" },
    { label: "Arbeitsweise", value: "Direkt, produktionsfertig, White Label" },
  ],
};

export const services = [
  {
    id: "brands-ecommerce",
    title: "Brands & E-Commerce",
    source: "neu" as const,
    body: "Branding, Packaging und Shopify – das komplette Spektrum für Marken und Online-Unternehmen, die nicht nur gut aussehen, sondern verkaufen wollen.",
    image: { src: "/mockups/ecommerce-klix-laptop.jpg", alt: "Branding und E-Commerce Design Projekte von KLIX VISUALS" },
    items: [
      "Branding & Logo Design",
      "Verpackungsdesign",
      "Shopify & E-Commerce Setup",
      "Produktseiten & Conversion",
      "Brand Guidelines",
      "Digital Assets",
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality & Real Estate",
    source: "neu" as const,
    body: "Branding, Print, Social Media und Kampagnen für Hotels, Restaurants und Immobilienprojekte. Kontinuierliche visuelle Kommunikation über alle Touchpoints.",
    image: { src: "/mockups/social-hilton.webp", alt: "Hospitality Design für Hotels und Restaurants" },
    items: [
      "Branding & Corporate Identity",
      "Speisekarten & Printmaterialien",
      "Social Media Design",
      "Kampagnen & Editorial",
      "Marketingmaterialien",
      "Laufende Designunterstützung",
    ],
  },
  {
    id: "agencies",
    title: "Agenturen / White Label",
    source: "neu" as const,
    body: "Designunterstützung für Marketing- und Kreatimagenturen. Zuverlässige, flexible und vollständig im Hintergrund – unter eurem Namen.",
    image: { src: "/mockups/stationery-box.webp", alt: "White Label Design Services für Agenturen" },
    items: [
      "White-Label Design",
      "Production Design",
      "Laufende Designkapazität",
      "Digital & Print Assets",
      "Schnelle Abstimmungen",
      "Langfristige Partnerschaften",
    ],
  },
];

/** ueberarbeitet. Grundaussage und Reihenfolge wie auf klixvisuals.de. */
export const process = [
  {
    step: "01",
    title: "Verstehen",
    body: "Zuerst wird zugehört. Ich sehe mir Marke, Produkt und Zielgruppe gemeinsam mit Ihnen an. Daraus entsteht die Grundlage für ein Design, das nicht nur gut aussieht, sondern trägt.",
  },
  {
    step: "02",
    title: "Konzipieren",
    body: "Ich entwickle erste visuelle Richtungen, Farbwelten und Ansätze. Immer mit Fokus auf Klarheit, Wiedererkennung und Funktion. Jedes Konzept ist auf Ihre Marke zugeschnitten.",
  },
  {
    step: "03",
    title: "Gestalten",
    body: "Jetzt wird es konkret. Logo, Verpackung, Print oder Gesamtauftritt entstehen bis zur Reinzeichnung, konsistent über alle Formate.",
  },
  {
    step: "04",
    title: "Finalisieren",
    body: "Nach dem Feintuning erhalten Sie alle finalen Daten und Vorlagen, sauber sortiert und ready for use. Für Druck, Produktion und digitalen Rollout.",
  },
];

/**
 * Arbeiten.
 * Sechs echte Projekte von klixvisuals.de/projekte, ausgewaehlt nach
 * der Zielgruppe: Hotellerie, Immobilien, Import und Handel.
 * Kundennamen und Leistungen stammen aus den alt-Attributen der
 * alten Seite, nichts davon ist erfunden.
 *
 * Jahreszahlen liegen nicht vor und werden deshalb nicht angezeigt.
 * Immobilien ist in dieser Auswahl nicht vertreten, weil es im
 * Portfolio keine Immobilienarbeit gibt.
 */
export const work = [
  {
    id: "hilton",
    client: "Hilton Munich Airport",
    discipline: "Social Media & Brand Communication",
    description: "Visuelle Kommunikation und Social-Media-Design für verschiedene Gastronomiekonzepte des Hilton Munich Airport.",
    services: ["Social Media Design", "Campaign Assets", "Digital Design", "laufende Adaptionen"],
    image: { src: "/projekte/hilton-social-media.webp", alt: "Social-Media-Posts für das Hilton Munich Airport auf einem Smartphone" },
  },
  {
    id: "bambi",
    client: "Bambi Bar",
    discipline: "Full Branding",
    description: "Vollständige Markenidentität – von Logo bis zum kompletten Designsystem für die neue Bar in München.",
    services: ["Logo Design", "Brand Guidelines", "Visuelle Identität", "Farbsystem & Typografie"],
    image: { src: "/projekte/bambi-branding.webp", alt: "Branding Guidelines der Bambi Bar mit Logo, Farben und Schriften" },
  },
  {
    id: "schirmbar",
    client: "Schirmbar",
    discipline: "Logo Design & Stempelkarte",
    description: "Logo-Entwicklung und Design einer Treuekarte für eine Münchner Bar.",
    services: ["Logo Design", "Stempelkarte", "Markensignatur"],
    image: {
      src: "/projekte/schirmbar-logo-stempelkarte.jpg",
      alt: "Logo und Treuekarte mit zehn Stempelfeldern für die Schirmbar",
    },
  },
  {
    id: "herzog",
    client: "Herzog Bar & Restaurant",
    discipline: "Print Design",
    description: "Designkonzept und Umsetzung für hochwertige Speisekarten, die zum kulinarischen Angebot passen.",
    services: ["Speisekarten-Design", "Print-Gestaltung", "Produktionsreife Daten"],
    image: { src: "/projekte/herzog-speisekarte.webp", alt: "Aufgeschlagene Speisekarte für das Herzog Bar und Restaurant in München" },
  },
  {
    id: "charlotte-kleeberger",
    client: "Dr. Charlotte Kleeberger",
    discipline: "Corporate Identity",
    description: "Geschlossene visuelle Identität mit Visitenkarten, Briefpapier und weiteren Stationery-Elementen.",
    services: ["Logo Design", "Corporate Design", "Stationery", "Brand System"],
    image: {
      src: "/projekte/charlotte-kleeberger-ci.webp",
      alt: "Visitenkarten aus der Corporate Identity für Dr. Charlotte Kleeberger",
    },
  },
  {
    id: "wein-produktdesign",
    client: "Alexander Recknagel",
    discipline: "Packaging & Product Design",
    description: "Produktionsfertige Etiketten für Weinflaschen – Design mit Blick auf Regaloptik und E-Commerce.",
    services: ["Verpackungsdesign", "Etikettengestaltung", "Druckdatenvorbereitung"],
    image: {
      src: "/projekte/wein-produktdesign.jpg",
      alt: "Zwei Riesling-Flaschen mit den Etiketten Kieselfink und Steinling, Weinflaschen-Produktdesign",
    },
  },
];

/**
 * Referenzen. Woertliche Zitate realer Personen.
 * BEWUSST NICHT UEBERARBEITET, auch die Gedankenstriche nicht.
 * Fremde Aussagen an eine Tonrichtlinie anzupassen waere Faelschung.
 * Die Umstellung auf "ich" gilt deshalb ausdruecklich NICHT hier:
 * "Ihr habt unser Branding modernisiert" ist die Aussage des Kunden
 * ueber SEINE Firma, kein Wir-Sprech von KLIX VISUALS.
 *
 * GEAENDERT 22.09.2026, von Karina durchgegeben: Nachnamen ergaenzt
 * und Firmen auf die richtigen Rechtstraeger korrigiert. Die Zitate
 * selbst sind unveraendert.
 */
export const testimonials = [
  {
    quote:
      "Ich wusste ungefähr, was ich will – Karina hat es auf den Punkt gebracht. Das Logo passt einfach perfekt zu mir und meinem Business. Der Prozess war unkompliziert und schnell!",
    name: "Alexander Graef",
    company: "AG Brands GmbH",
  },
  {
    quote:
      "Vom ersten Gespräch bis zum fertigen Design hat alles gepasst. Ihr habt unser Branding Projekt modernisiert, ohne dass es seine Persönlichkeit verliert.",
    name: "Konstantin Raithel",
    company: "Unbranded Media GmbH",
  },
  {
    quote:
      "Unser Rebranding war überfällig. Jetzt wirkt endlich alles stimmig – Farben, Schrift & Look. Danke nochmal!",
    name: "Malik Dedic",
    company: "ORA Brands",
  },
  {
    quote:
      "Karina hat nicht nur ein gutes Gespür für Design, sondern auch für Menschen. Ich hab mich total abgeholt gefühlt und bin sehr zufrieden",
    name: "Mike Ross",
    company: "ShotByRoss",
  },
  {
    quote:
      "Unsere neue Verpackungen sind ein echter Hingucker. Karina hat super Ideen eingebracht und alles sauber umgesetzt.",
    name: "Tobias Kutschke",
    company: "ACOM GmbH",
  },
  {
    quote:
      "Die neuen Karten und Flyer sehen richtig gut aus. Klar, minimalistisch, aber trotzdem besonders. Ich bekomme viel positives Feedback – danke dafür!",
    name: "William Wickel",
    company: "OriginX GmbH",
  },
];

/**
 * Kunden.
 *
 * GEAENDERT 22.09.2026.
 *
 * Reihenfolge nach Wiedererkennung, nicht alphabetisch. Wer die Wand
 * ueberfliegt, sieht zuerst die Namen, die die Frage "kann die das
 * auch fuer mich" beantworten.
 *
 * ENTFERNT: AG Brands. Die GmbH existiert nicht mehr, das Geschaeft
 * laeuft heute ueber die ACOM GmbH. Ein Logo einer aufgeloesten
 * Gesellschaft ist kein Nachweis, sondern ein Fehler. Das Zitat von
 * Alexander Graef bleibt unter `testimonials` stehen, es ist eine
 * woertliche Aussage einer realen Person zu einer realen Arbeit.
 *
 * NEU: Hilton Munich Airport und Kraemmel. Beide laufen ueber
 * ShotByRoss, die Namensnennung hat Karina am 18.09.2026 ausdruecklich
 * freigegeben.
 *
 * Beide kamen am 22.09.2026 als JPEG mit weissem Hintergrund. Weil die
 * Wand mit CSS-Masken arbeitet und nur den Alphakanal auswertet, waeren
 * sie so als graue Kaesten erschienen. `scripts/logo-maske.py` hat das
 * Weiss transparent gemacht und die Raender beschnitten; dadurch folgen
 * sie jetzt wie alle anderen der Textfarbe.
 *
 * Der Typ bleibt `string | null`: fuer kuenftige Kunden ohne Logodatei
 * setzt die Wand weiterhin den Namen als Schriftzug, statt eine Luecke
 * zu lassen oder ein fremdes Logo nachzubauen.
 */
export const clients: { name: string; logo: string | null }[] = [
  { name: "Hilton Munich Airport", logo: "/logos/hilton-munich-airport.png" },
  { name: "Krämmel", logo: "/logos/kraemmel.png" },
  { name: "originx", logo: "/logos/originx.svg" },
  { name: "Herzog Bar", logo: "/logos/herzog-bar.svg" },
  { name: "Sola Rooftop Bar", logo: "/logos/sola-rooftop-bar.svg" },
  { name: "Bambi", logo: "/logos/bambi.svg" },
  { name: "House of Hütter", logo: "/logos/house-of-huetter.svg" },
  { name: "Der Helmerhof", logo: "/logos/helmerhof.svg" },
  { name: "Dr. Charlotte Kleeberger", logo: "/logos/charlotte-kleeberger.svg" },
  { name: "Social Mansion", logo: "/logos/social-mansion.svg" },
  { name: "Unbranded Media", logo: "/logos/unbranded-media.svg" },
  { name: "RedCupShop", logo: "/logos/redcupshop.svg" },
  { name: "Abovo", logo: "/logos/abovo.svg" },
  { name: "Aguas Azules", logo: "/logos/aguas-azules.svg" },
  { name: "Red Flag", logo: "/logos/red-flag.svg" },
  { name: "chique", logo: "/logos/chique.svg" },
];

/**
 * Fuer wen. NEU 22.09.2026.
 *
 * Die Logowand beantwortet "mit wem hat sie gearbeitet". Sie
 * beantwortet nicht "bin ich hier richtig". Dieser Abschnitt sortiert
 * dieselben Kunden nach Branche, damit ein Gastronom, ein Bautraeger
 * und ein Importeur sich in zwei Sekunden selbst wiederfinden.
 *
 * GEAENDERT 22.09.2026 auf Karinas Ansage: die Kundennamen je Branche
 * sind hier entfallen, der Abschnitt traegt nur noch Branche und
 * Beschreibung. Die Namen stehen weiterhin in der Logowand unter
 * `clients` und in den Zitaten unter `testimonials`, sie waren hier
 * also doppelt. Die vollstaendige Zuordnung nach Branche liegt im
 * Vault unter "02 Projekte/Referenzen Kandidaten.md".
 */
export const sectors = [
  {
    id: "online",
    title: "Websites und Onlineshops",
    body: "Von der Website, die Anfragen bringt, bis zum Shop, der bestellt wird. Aufbau, Gestaltung und die Betreuung danach.",
  },
  {
    id: "gastro",
    title: "Hotellerie und Gastronomie",
    body: "Karten, die zur Küche passen, Aufsteller, Social Media und ein Auftritt, der über mehrere Standorte hinweg zusammenhält.",
  },
  {
    id: "immobilien",
    title: "Immobilien und Bau",
    body: "Ein Quartier braucht einen eigenen Auftritt, vom Bauschild bis zum Exposé, und über die gesamte Bauzeit jemanden, der ihn pflegt.",
  },
  {
    id: "handel",
    title: "Import und Handel",
    body: "Produktspezifikationen, die der Hersteller ohne Rückfrage versteht, und Verpackungen, die sich am Regal und im Onlineshop behaupten.",
  },
  {
    id: "agenturen",
    title: "Agenturen im White Label",
    body: "Ich arbeite unter Ihrem Namen, auf Ihren Vorlagen und mit Ihren Terminen. Sie bleiben die Ansprechperson für Ihren Kunden.",
  },
];

/**
 * Betreuung. NEU 22.09.2026.
 *
 * Der eigentliche Grund fuer den Relaunch. Die alte Seite verkauft
 * ausschliesslich Einzelprojekte. Der Umsatz, der planbar ist, kommt
 * aber aus monatlichen Pauschalen, und die kamen auf der Seite
 * nirgends vor.
 *
 * Die Betraege stammen aus der Preisliste 2027 im Vault. Sie sind
 * netto und werden auch so ausgezeichnet: die AGB richten sich seit
 * dem 29.08.2026 ausdruecklich an Unternehmer nach § 14 BGB, damit
 * ist die Nettoangabe hier konsistent mit dem Vertragswerk.
 *
 * Bewusst steht in keinem Paket das Wort "Stunden". Verkauft wird
 * Verfuegbarkeit und Ergebnis. Sobald ein Stundenkontingent
 * danebensteht, rechnet der Kunde auf den Stundensatz zurueck und
 * verhandelt genau dort.
 */
export const care = {
  eyebrow: "Regelmäßig Design benötigt?",
  title: "Feste Designkapazität statt Projekt für Projekt",
  lead: "Für Unternehmen und Agenturen, die kontinuierlich Design benötigen, biete ich feste monatliche Designkapazitäten an. Betreuung ab 690 € / Monat",
  cta: "Betreuung ansehen",
  packages: [
    {
      id: "basis",
      name: "Basis",
      price: "690 EUR",
      unit: "netto im Monat",
      forWhom: "Für einen Standort oder eine Praxis.",
      items: [
        "Laufende Anpassungen und Druckdaten",
        "Antwort in unter 24 Stunden",
        "Ihre Vorlagen bleiben bei mir gepflegt",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "1.290 EUR",
      unit: "netto im Monat",
      forWhom: "Für Betreiber mit mehreren Standorten.",
      items: [
        "Alles aus Basis",
        "Ein größeres Stück pro Quartal, etwa eine Karte oder eine Kampagne",
        "Saisonale Aktualisierungen eingeplant",
      ],
    },
    {
      id: "voll",
      name: "Voll",
      price: "2.400 EUR",
      unit: "netto im Monat",
      forWhom: "Für Bauträger, Hotels und Agenturen.",
      items: [
        "Alles aus Standard",
        "Feste Arbeitstage pro Woche",
        "Social Media inklusive",
      ],
    },
  ],
  terms: [
    "Laufzeit 12 Monate, Kündigung 3 Monate zum Laufzeitende.",
    "Nicht abgerufener Umfang verfällt am Monatsende.",
    "Größere Projekte außerhalb des Pakets bekommen 10 Prozent.",
    "Alle Beträge netto, zuzüglich Umsatzsteuer.",
  ],
};

export const businessSection = {
  headline: "Design mit Business-Verständnis.",
  text: "Ich komme nicht nur aus dem Design, sondern aus dem operativen E-Commerce. Deshalb denke ich bei einer Verpackung an Produktion und Verkauf – und bei einem Shopify Store an Nutzerführung und Conversion statt nur an Optik.",
  points: [
    "6+ Jahre E-Commerce-Erfahrung",
    "Shopify-Erfahrung aus dem operativen Tagesgeschäft",
    "Design von der Idee bis zur Produktion",
    "Direkte Zusammenarbeit ohne Agentur-Umwege",
  ],
};

export const whiteLabel = {
  headline: "Dein Designteam im Hintergrund.",
  text: "White-Label Design Support für Agenturen, die zusätzliche kreative Kapazitäten brauchen – zuverlässig, flexibel und vollständig im Hintergrund.",
  points: [
    "direkte Kommunikation",
    "schnelle Abstimmungen",
    "bestehende Workflows können übernommen werden",
    "White Label",
    "langfristige Zusammenarbeit möglich",
  ],
  cta: "White-Label Zusammenarbeit anfragen",
};

export const closingSection = {
  headline: "Lass uns etwas entwickeln, das nicht nur gut aussieht.",
  subheadline: "Erzähl mir kurz von deinem Projekt und ich melde mich persönlich bei dir.",
  cta: "Projekt besprechen",
};

export const contact = {
  /** Real, steht so auch im Impressum. */
  email: "kontakt@klixvisuals.de",
  /** Ziel des Formulars. Die Route stellt zu contact.email zu. */
  formEndpoint: "/api/anfrage" as string | null,
  /* Beide Angaben stehen im Anfrage-Sheet ueber den Feldern.
     Skill §16: Feedback gibt es in vier Arten, eine davon ist Status.
     Wer gerade eine Anfrage tippt, will wissen, wann er hoert und
     wann etwas starten kann. Die Antwort gehoert an diese Stelle,
     nicht in eine Fussnote. */
  responseTime: "Antwort in unter 24 Stunden",
  availability: "Startdatum richtet sich nach dem Projektumfang",
};
