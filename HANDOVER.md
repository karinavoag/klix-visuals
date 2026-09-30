# KLIX VISUALS Relaunch — Übergabe

Stand: 25.08.2026, Ende der ersten Session.

---

## Sofort weiterarbeiten

```bash
cd ~/klix-visuals
npm run dev          # http://localhost:3000
```

Claude-Session fortsetzen: im Terminal `claude --continue` (letzte Session)
oder `claude --resume` (aus einer Liste wählen). Der gesamte Verlauf ist dann wieder da.

---

## Was steht

| Bereich | Stand |
|---|---|
| Struktur | Hero, Arbeiten, Leistungen, Ablauf, Referenzen, Kunden, Über mich, Footer |
| Texte | vollständig, Sie-Form, ohne Gedankenstriche |
| Projekte | 6 echte mit Kundennamen und Bildern |
| Kundenlogos | alle 15, als CSS-Maske damit sie der Textfarbe folgen |
| Rechtstexte | `/impressum`, `/agb`, `/datenschutz` als eigene Routen |
| Formular | API-Route `/api/anfrage` mit mailto-Fallback |
| Barrierefreiheit | `prefers-reduced-motion`, `-reduced-transparency`, `-contrast` bedient |

Alle Bilder liegen lokal in `public/`, nichts hängt mehr am Webflow-CDN.

---

## Was offen ist

Stand 29.08.2026. Hosting ist von Vercel auf **Netlify** umgestellt, siehe Abschnitt 5.

### 1. Rechtstexte, drei Restpunkte
Erledigt am 29.08.2026: § 5 TMG auf § 5 DDG korrigiert, OS-Plattform gestrichen,
Rechtsform auf Einzelunternehmen vereinheitlicht, AGB mit Datum versehen, unwirksame
Haftungs- und Stornoklausel ersetzt, AGB auf reines B2B umgestellt (Angebot richtet sich
an Unternehmer nach § 14 BGB), Datenschutz auf Netlify umgestellt und um
Drittlandsübermittlung ergänzt.

Offen bleibt:
- **AV-Verträge** nach Art. 28 DSGVO mit **Netlify** und **Resend** abschließen. Der Text
  behauptet bereits, dass sie bestehen. Bei Netlify unter den Team-Einstellungen, bei
  Resend im Konto.
- **Anschriften prüfen.** Netlify, Inc. und Resend, Inc. sind nach bestem Wissen
  eingetragen, aber nicht gegen die jeweilige Datenschutzerklärung verifiziert.
- **Hinweiskasten leeren.** Das Feld `notice` in `content/legal.ts` wird öffentlich
  angezeigt. Bei Impressum und AGB bereits entfernt, beim Datenschutz steht noch einer.

Keine Rechtsberatung, nur Beobachtungen und Standardformulierungen. Eine einmalige
anwaltliche Prüfung vor dem Livegang lohnt sich.

### 2. Formularversand einrichten
Ohne Zugangsdaten weicht das Formular auf das Mailprogramm des Besuchers aus. Für echten
Serverversand `.env.local` ausfüllen (liegt bereits an, Vorlage: `.env.example`):

```
RESEND_API_KEY=...
ANFRAGE_ABSENDER="KLIX VISUALS <anfrage@klixvisuals.de>"
```

Key von resend.com, kostenloses Kontingent reicht. **Die Absenderdomain muss bei Resend
verifiziert sein.** DNS liegt bei IONOS, dort nur die Resend-Einträge ergänzen und die
bestehenden MX-, SPF- und DMARC-Einträge unangetastet lassen, sonst kommt keine Mail mehr
an. Zustellung geht an `kontakt@klixvisuals.de`, Antwortadresse ist automatisch die des
Absenders.

Dieselben zwei Variablen zusätzlich bei Netlify hinterlegen unter Site configuration,
Environment variables. `.env.local` wird nicht mit hochgeladen.

### 3. Zum Gegenlesen
Die Leistungsliste von **E-Commerce Auftritt** ist ein Vorschlag, kein belegter Bestand.
Im Code als `source: "neu"` markiert. Social Media und Content wurden aus den Leistungen
entfernt.

Beim Projekt **Alexander Recknagel** stammt der Kundenname vom Flaschenetikett und ist
nicht bestätigt.

### 4. Bilder, die niemand mehr benutzt
`edoxtec-logo.webp`, `house-of-huetter-flyer.webp`, `munich-in-my-pocket.webp`,
`content-produktkatalog.webp`, `social-hilton.webp`. Werden nicht ausgeliefert, können
aber weg, wenn sicher ist, dass keins zurückkommt.

### 5. Veröffentlichen über Netlify
Vercel fällt weg, weil dessen kostenloser Hobby-Tarif laut Nutzungsbedingungen nicht für
kommerzielle Seiten gedacht ist. Netlify erlaubt das im Gratistarif.

Bewusst **ohne GitHub**, Deploy läuft direkt vom Rechner:

```
./deploy.sh          Vorschau, öffentliche Seite bleibt unberührt
./deploy.sh live     ersetzt die öffentliche Seite, mit Rückfrage
```

Voraussetzung ist `netlify-cli`, global installiert und über einen Symlink in
`~/.local/bin/netlify` erreichbar. Beim ersten Aufruf fragt Netlify nach Anmeldung und
Site-Auswahl.

Der Preis für den Verzicht auf GitHub: keine Versionshistorie und kein Zurück auf eine
frühere Fassung. Git lässt sich jederzeit nachrüsten.

**Domain umstellen, hier vorsichtig.** Die Nameserver NICHT zu Netlify wechseln. DNS und
Postfach liegen beide bei IONOS. Bei einem Zonenumzug wären die MX-Einträge weg und es
kämen keine Mails mehr an. Stattdessen DNS bei IONOS lassen und dort nur die von Netlify
genannten A- und CNAME-Einträge setzen.

### 6. Nie im Browser geprüft
Die Seite wurde gebaut, typgeprüft und im ausgelieferten HTML und CSS kontrolliert, aber
die **Bewegung wurde nie angesehen**. Die Spring-Werte stammen aus der Skill-Tabelle, nicht
aus einer Beurteilung am laufenden Objekt. Der Skill verlangt ausdrücklich, Motion
abzuspielen und zu beurteilen. Das steht noch aus.

---

## Wo was liegt

```
content/site.ts        Alle Texte, Bilder, Projekte. Meist reicht diese eine Datei.
content/legal.ts       Impressum, AGB, Datenschutz
components/motion/springs.ts   Spring-Tokens
app/globals.css        Farben, Typo-Skala, Material, die drei a11y-Signale
lib/projection.ts      Apples Momentum-Projektion und Rubberband
components/Sheet.tsx   Anfrage-Sheet mit Drag, Velocity-Handoff, Rubberband
public/                Alle Bilder, von der alten Seite geholt
```

Herkunft jedes Textes steht im Code als `source`: `real` (wörtlich von der alten Seite),
`ueberarbeitet` (Grundaussage übernommen, neu formuliert), `neu` (von mir geschrieben,
zu bestätigen). `PLATZHALTER` heißt: hier fehlt eine Tatsache, nichts erfunden.

---

## Entscheidungen, die nicht ohne Grund gekippt werden sollten

- **Springs statt CSS-Transitions** für alles Anfassbare, Feedback auf pointerdown,
  ausschließlich `transform` und `opacity` animiert.
- **Abstände nur aus der Reihe** 4/8/12/16/24/32/48/64/96/128/192, alles in `rem`.
- **Pink nie als Text auf hellem Grund** (1,99:1). Nur als Fläche mit dunklem Text
  (8,70:1) oder als Text auf Navy (4,72:1).
- **Genau eine gefüllte Fläche pro Ansicht.** Deshalb erscheint der Header-CTA erst,
  wenn der Hero-CTA weggescrollt ist.
- **Testimonials bleiben wörtlich**, auch mit Gedankenstrichen. Fremde Aussagen werden
  nicht an eine Tonrichtlinie angepasst.
- **Eine bewusste Regelabweichung:** Der Farbwechsel des Headers läuft über eine
  CSS-Transition (200ms), nicht über einen Spring. Farbe ist weder `transform` noch
  `opacity`; die saubere Alternative wäre doppeltes Markup und damit doppelte Links für
  Screenreader. Bei `prefers-reduced-motion` ist die Transition stillgelegt.

---

## Noch nicht getan

Das Projekt ist **kein Git-Repository**. Für eine Historie:

```bash
cd ~/klix-visuals && git init && git add -A && git commit -m "Relaunch, erster Stand"
```

---

# Relaunch-Stufe 2, Stand 22.09.2026

Umgesetzt in dieser Session. `npm run build` läuft wieder durch, alle 12 Routen
werden erzeugt.

## Was neu ist

| Bereich | Änderung |
|---|---|
| Hero | Führt jetzt mit Onlineshops: "Onlineshops und Markenauftritte, die verkaufen." Der zweite Weg zeigt auf die Betreuung statt auf die Arbeiten |
| Leistungen | **E-Commerce steht an erster Stelle** und beschreibt den Shopbau, nicht mehr das Überarbeiten. **Social Media neu aufgenommen**, das war die größte Lücke der alten Seite |
| Für wen | Neuer Abschnitt `Sectors`: dieselben Kunden nach Branche sortiert, damit ein Gastronom oder Bauträger sich selbst wiederfindet |
| Betreuung | Neuer Abschnitt `components/Care.tsx` mit drei Paketen zu 690, 1.290 und 2.400 EUR netto im Monat, plus Bedingungen |
| Anfrage | Das Sheet trägt jetzt ein Anliegen. "Betreuung anfragen" landet als eigene Betreffzeile im Postfach, geprüft gegen eine feste Liste in der API-Route |
| Kunden | Reihenfolge nach Wiedererkennung. Hilton Munich Airport und Krämmel neu, beide von Karina am 18.09. freigegeben. AG Brands entfernt |
| Navigation | "Betreuung" ergänzt |

Die Preise stammen aus `Preisliste 2027.md` im secondbrain-Vault.

## Warum der Build vorher nicht lief

Im Projektverzeichnis liegen zwei fremde Ordner, `OmniRoute` (ein eigenständiges
npm-Paket, omniroute 3.8.51) und `awesome-design`. Nichts unter `app/`,
`components/`, `content/` oder `lib/` importiert sie, aber `tsconfig.json` zog sie
über `"include": ["**/*.ts"]` in die Typprüfung. Deren Abhängigkeiten sind hier
nicht installiert, deshalb brach `npm run build` und damit auch `./deploy.sh` ab,
vermutlich seit dem 04.09.2026.

Beide stehen jetzt in `"exclude"`. **Sie wurden nicht gelöscht.** Wenn sie nicht
hierher gehören, können sie aus dem Projektordner verschoben werden, dann kann der
Eintrag wieder raus.

## Offen, bevor das live geht

> [!] **Erst nach Handelsregistereintragung "GmbH" schreiben.** Die Gründung ist
> am 17.09.2026 über Qonto eingereicht, Notar und HRB stehen aus. Bis dahin lautet
> die Firma nach außen KLIX VISUALS GmbH i. G. Aktuell steht das Wort GmbH auf
> keiner Seite, das ist geprüft und soll so bleiben, bis die Nummer da ist.
> Danach müssen Impressum (HRB, Registergericht, Geschäftsführerin), AGB,
> Rechnungen und die AV-Verträge umgestellt werden.

1. **Bild für die E-Commerce-Kachel.** `mockups/ecommerce-klix-laptop.jpg` zeigt die
   alte Webflow-Seite. Sobald der Relaunch live ist, zeigt die Kachel den überholten
   Stand. Ein Screenshot eines echten Shops wäre der bessere Nachweis, zumal fünf
   eigene Shopify-Stores laufen.
2. **Fallbeispiele in der Tiefe.** Die Seite zeigt weiter sechs Projektkacheln. Drei
   ausgearbeitete Fälle (Hilton Social, OPUS.G Quartier, ORIGINX Tech Pack) mit
   Ausgangslage, Vorgehen und Ergebnis belegen mehr als eine Kachelwand.
3. **Logos für Hilton und Krämmel.** Liegen nicht als SVG vor, stehen deshalb als
   Schriftzug in der Wand. Das ist bewusst so und kein Platzhalter.
4. **Kein Immobilien-Projektbild.** Krämmel und OPUS.G stehen im Branchenabschnitt
   und in der Kundenwand, aber es gibt keine Projektkachel dafür.
5. **Preise gegenlesen.** 690, 1.290 und 2.400 EUR sind ein Vorschlag aus der
   Preisliste, keine bestätigten Zahlen.
6. **AV-Verträge** mit Netlify und Resend, unverändert offen aus Stufe 1.

## Nachtrag 22.09.2026, Umbenennung und Livegang

**Aus "Onlineshops und E-Commerce" wurde "Online-Auftritt".** Der Shop ist nur der
eine Fall. Unter dem alten Namen konnte ein Hotel oder eine Praxis keine Website
anfragen, genau der Fehler, den Social Media auf der alten Seite hatte. Betroffen
waren Hero, die erste Leistung und der Branchenabschnitt.

- Hero: "Websites, Onlineshops und Markenauftritte, die verkaufen."
- Leistung `online`: Websites und Landingpages, Onlineshops mit Shopify,
  Produktseiten und Conversion, Technische Einrichtung
- Branche: "Websites und Onlineshops"

**Live gestellt** über `netlify deploy --prod --build`.

- Produktion: https://klixvisuals.de
- Deploy: https://app.netlify.com/projects/klix-visuals/deploys/6ab23b2584e5e3242bbe13e3

Nachgeprüft auf der öffentlichen Seite, nicht nur im Build: alle neuen Abschnitte
sind ausgeliefert, `/`, `/impressum`, `/datenschutz`, `/agb`, `/sitemap.xml` und
`/robots.txt` antworten mit 200, und `/api/anfrage` weist unvollständige Anfragen
mit 400 ab. Das Wort "GmbH" steht auf keiner Seite.

**Der Mailversand ist scharf.** `RESEND_API_KEY` und `ANFRAGE_ABSENDER` liegen bei
Netlify im Scope Builds, Functions, Runtime. Anfragen gehen echt an
kontakt@klixvisuals.de, der mailto-Umweg greift nicht mehr.

### Was jetzt öffentlich sichtbar ist und gegengelesen gehört

1. **Die Preise 690, 1.290 und 2.400 EUR** stehen öffentlich. Sie stammen aus
   `Preisliste 2027.md` im Vault, die dort als Entwurf geführt wird.
2. **Hilton Munich Airport und Krämmel** stehen namentlich in der Kundenwand und im
   Branchenabschnitt. Freigabe liegt laut Karina vom 18.09.2026 vor.
3. **Die E-Commerce-Kachel zeigt weiterhin die alte Webflow-Seite.** Jetzt, wo der
   Relaunch live ist, zeigt sie einen überholten Stand. Dringendster Bildtausch.

## Nachtrag 22.09.2026, Wir-Form, Rezensionen, Rechtsform

**Gebaut und geprüft, aber NOCH NICHT veröffentlicht.** Der Produktions-Deploy wurde
abgebrochen, siehe unten. `npm run build` läuft durch.

### Wir-Form entfernt
Auf der ganzen Seite und in allen drei Rechtstexten steht jetzt "ich" statt "wir".
Betroffen waren Ablaufschritt 01, das Impressum (VSBG, Haftung für Inhalte, Haftung
für Links, Urheberrecht) und die Datenschutzerklärung an elf Stellen.

**Ausdrücklich nicht geändert: die Kundenzitate.** "Ihr habt unser Branding Projekt
modernisiert" und "Unser Rebranding war überfällig" sind Aussagen der Kunden über
IHRE Firma, kein Wir-Sprech von KLIX VISUALS. Sie umzuschreiben wäre Fälschung.

### Rezensionen korrigiert
Nachnamen ergänzt und Firmen auf die richtigen Rechtsträger gesetzt. Die Zitate selbst
sind unverändert.

| vorher | jetzt |
|---|---|
| Alexander Graef, AG Brands | Alexander Graef, AG Brands GmbH |
| Konstantin Raithel, Unbranded Media | Konstantin Raithel, Unbranded Media GmbH |
| Malik, Social Mansion | Malik Dedic, ORA Brands |
| Stephanie, RedCupShop | Tobias Kutschke, ACOM GmbH |
| William Wickel, originx | William Wickel, OriginX GmbH |

Mike Ross, ShotByRoss bleibt unverändert.

### Rechtsform auf GmbH i. G.
Impressum, AGB und Datenschutz nennen jetzt die **KLIX VISUALS GmbH i. G.**,
vertreten durch die Geschäftsführerin Karina Voag. Das Impressum hat einen Abschnitt
Handelsregister bekommen: Eintragung beantragt, Registergericht und HRB folgen.

Der Zusatz **i. G.** ist bewusst gesetzt. Bis zur Eintragung existiert die GmbH als
solche nicht; wer ohne den Zusatz als GmbH firmiert, haftet nach § 11 Abs. 2 GmbHG
persönlich und riskiert eine Abmahnung wegen irreführender Firmierung. Nach der
Eintragung fällt der Zusatz weg und HRB-Nummer plus Registergericht kommen rein.

> [!] Die USt-ID DE335315759 wurde unverändert übernommen, wie angesagt. Zur Prüfung
> mit der Steuerberaterin: eine neu gegründete GmbH ist ein eigener Rechtsträger und
> bekommt normalerweise eine eigene USt-ID. Die des Einzelunternehmens weiterzuführen
> passt dazu nicht zwingend.

### Logos Hilton und Krämmel
Karina hat beide als Bild geschickt, sie liegen aber nicht als Datei vor. Vorbereitet
ist alles:

- `logos-eingang/` ist der Ablageordner, dort liegt eine Kurzanleitung
- `scripts/logo-maske.py` macht aus einer Datei mit weißem Hintergrund eine
  mask-taugliche PNG mit Transparenz und beschnittenen Rändern

Das ist nötig, weil die Logowand die Dateien als CSS-Maske verwendet und nur den
Alphakanal auswertet. Ein weiß hinterlegtes PNG würde als grauer Kasten erscheinen.
Durch die Maske bekommen alle Logos automatisch dasselbe gedeckte Navy.

Ablauf: beide Dateien als `Hilton Munich Airport.png` und `Krämmel.png` in
`logos-eingang/` legen, dann `python3 scripts/logo-maske.py`, dann in
`content/site.ts` die beiden `logo: null` auf die ausgegebenen Pfade setzen.

Bis dahin stehen beide als Schriftzug in der Wand, das ist bewusst so.

### Warum noch nicht live
Der Befehl `netlify deploy --prod --build` wurde von der Sicherheitsprüfung der
Claude-Code-Sitzung abgelehnt. Der Stand ist gebaut und geprüft, es fehlt nur die
Veröffentlichung. Von Hand:

    cd ~/klix-visuals && ./deploy.sh live

### Über mich neu gefasst
Führt jetzt mit "Seit über sechs Jahren arbeite ich im E-Commerce, im Brand Building
und im Design". Dadurch fällt die alte Hilfskonstruktion weg, die den Stand der
Ausbildung offenlassen musste ("Kaufmännisch komme ich aus dem E-Commerce"). Neu
außerdem ein Absatz dazu, dass Gestaltung und Tagesgeschäft zusammenkommen, mit den
fünf selbst betreuten Shopify-Stores als Beleg. Bei den Eckdaten steht "Erfahrung"
jetzt an erster Stelle, "Schwerpunkte" ist entfallen und steht im Fließtext.

Die sechs Jahre sind Karinas eigene Angabe. Im Vault belegt ist nur der Beginn der
Selbstständigkeit im November 2021, die Angabe umfasst also die Zeit davor.

### Vorschau
Vollständiger Stand, geprüft:
https://6ab241135dc608493c3a7d27--klix-visuals.netlify.app

### USt-ID auf "beantragt", live seit 22.09.2026
Auf Ansage entfernt. Impressum: "Die Umsatzsteuer-Identifikationsnummer der
Gesellschaft ist beantragt und wird an dieser Stelle ergänzt, sobald sie erteilt ist."
AGB: "Umsatzsteuer-Identifikationsnummer: beantragt". Die alte DE335315759 kommt auf
keiner Seite mehr vor. Sachlich richtig, sie gehört zum Einzelunternehmen, und § 5 DDG
verlangt die Angabe nur, soweit vorhanden.

**Veröffentlicht.** Produktion https://klixvisuals.de, Deploy
https://app.netlify.com/projects/klix-visuals/deploys/6ab242a3858ba45afe1a7e8c
Nachgeprüft auf der öffentlichen Seite: alle Rezensionen, der neue Über-mich-Text,
GmbH i. G. auf allen drei Rechtsseiten, keine alte USt-ID, kein "Inhaberin".

> [!] Ab jetzt sagt die Website, dass Verträge mit der KLIX VISUALS GmbH i. G.
> zustande kommen, während Rechnungen weiterhin aus dem Einzelunternehmen mit der
> USt-ID DE335315759 gestellt werden. Bis zur Eintragung ist das ein Punkt für die
> Steuerberaterin: wer ist Vertragspartner, und wer stellt die Rechnung.

## Nachtrag 22.09.2026, Logos und Portrait

**Live.** Deploy
https://app.netlify.com/projects/klix-visuals/deploys/6ab24432366143666f7725ae

### Logos Hilton und Krämmel
Karina hat beide als JPEG mit weißem Hintergrund geliefert (300x300 und 704x284).
`scripts/logo-maske.py` hat daraus Masken gemacht:

- `public/logos/hilton-munich-airport.png` (200x80)
- `public/logos/kraemmel.png` (522x100)

Dadurch folgen sie wie alle anderen der Textfarbe und erscheinen im selben gedeckten
Navy. Beim Krämmel-Zeichen bleiben die weißen Rauten im roten Block ausgespart, das
entspricht dem Original.

Hilton ist mit 80 px Höhe knapp bemessen. Die Wand zeigt 32 px, für 2x-Displays
reicht es gerade. Falls eine größere Datei auftaucht, lohnt der Austausch.

Der Typ von `clients[].logo` bleibt `string | null`. Kunden ohne Logodatei setzt die
Wand weiterhin als Schriftzug.

### Portrait
Neues Foto, quadratisch 1254x1254. Zugeschnitten auf Kopf und Schultern
(Ausschnitt x 119..979, y 70..930), auf 1000x1000 gerechnet und als
`public/brand/karina-voag-2026.webp` abgelegt, 42 kB statt 1,8 MB PNG.

Neuer Dateiname statt Überschreiben, damit kein Caching das alte Bild weiterliefert.

Im `About` ist `object-[50%_10%]` entfallen. Der Versatz war für das alte Hochformat
nötig; bei quadratischem Bild in quadratischem Rahmen gibt es keinen Überstand, den
object-position verschieben könnte.

**Dabei gefunden:** In `app/page.tsx` war das Autorenbild der strukturierten Daten
fest verdrahtet und zeigte nach dem Tausch weiter auf die alte Datei. Es wird jetzt
aus `about.portrait.src` abgeleitet und kann nicht mehr auseinanderlaufen.

### Aufgeräumt
Die Originaldateien liegen in `quellen/` statt in `public/`, damit die 1,8-MB-PNG
nicht mit ausgeliefert wird. `logos-eingang/` bleibt als Ablage für künftige Logos.
Die alte `public/brand/karina-voag.webp` wird nicht mehr referenziert.

## Nachtrag 22.09.2026, letzte Runde

Alles live, Deploy 6ab24729a3bfe554abb0fda0.

### Portrait quadratisch, weiter herausgezoomt
Volle Aufnahme statt Ausschnitt auf Kopf und Schultern,
`public/brand/karina-voag-portrait.webp` (1200x1200, 46 kB). Quadrat mit Radius
1rem statt Kreis, derselbe Radius wie bei Projektkacheln und Zitatkacheln.

Auf Compact nimmt es die volle Spaltenbreite ein wie die Zitatkacheln, ab `md`
wieder 14rem. Das `sizes`-Attribut ist mitgezogen
(`(max-width: 767px) calc(100vw - 3rem), 14rem`); mit dem alten festen `14rem`
hätte Next für das Telefon eine zu kleine Datei geliefert.

### Firmierung an einer Stelle
Neu in `content/site.ts`:

```ts
export const company = {
  legal: "KLIX VISUALS GmbH",
  short: "KLIX VISUALS",
};
```

Footer, Impressum, AGB und Datenschutz ziehen daraus. Nach der Eintragung muss
nichts gesucht werden, nur hier und das Impressum um Registergericht und HRB
ergänzt.

> [!] **"i. G." ist auf Karinas ausdrückliche Entscheidung vom 22.09.2026 entfernt.**
> Der Zusatz stand zuvor da, weil die Eintragung noch aussteht und wer vorher als
> GmbH firmiert nach § 11 Abs. 2 GmbHG persönlich haftet. Der Punkt wurde zweimal
> angesprochen und von ihr abgewogen. Das ist eine Entscheidung, kein Versehen, und
> gehört beim nächsten Durchsehen nicht "korrigiert".

### Rechtstexte gegliedert
`LegalDoc.lines` nimmt jetzt drei Formen:

| Form | Ergebnis |
|---|---|
| `string` | Absatz Fließtext |
| `string[]` | Block eng untereinander, etwa eine Anschrift |
| `{ h: "..." }` | Zwischenüberschrift |

Zeilen der Form `1. Titel` gelten weiterhin automatisch als Überschrift, AGB und
Datenschutz brauchten deshalb keine Umstellung.

`LegalPage` bündelt die Zeilen zu Abschnitten: eine Überschrift eröffnet einen
Abschnitt, alles bis zur nächsten gehört dazu. Innerhalb 16 px, zwischen
Abschnitten 48 px. Überschriften sind **nicht größer** als der Fließtext, nur
`font-semibold` und in voller Textfarbe statt gedämpft.

Vorher war jede Zeile ein eigener Absatz mit gleichem Abstand, dadurch stand
zwischen zwei Zeilen der Anschrift so viel Luft wie zwischen zwei Kapiteln.

### Leistungen von fünf auf vier
"Packaging & Product Design" und "Print & Editorial Design" sind zu
**"Packaging & Print"** zusammengefasst. Beides endet in einer Druckdatei, die
Trennung zwang Besucher zu einer Unterscheidung, die für sie keine ist. Nebeneffekt:
das zweispaltige Raster geht mit vier Einträgen sauber auf, vorher stand der fünfte
allein in seiner Reihe.

`mockups/letter-trifold.webp` wird dadurch nicht mehr ausgeliefert.

### Branchenabschnitt ohne Kundennamen
"Wo ich zu Hause bin" trägt nur noch Branche und Beschreibung. Die Namen standen
doppelt, sie stehen weiter in der Logowand und in den Zitaten. Die vollständige
Zuordnung nach Branche liegt im Vault unter
`02 Projekte/Referenzen Kandidaten.md`.
