/**
 * RECHTSTEXTE
 *
 * Ueberarbeitet am 29.08.2026 fuer Hosting bei Netlify.
 *
 * KEINE RECHTSBERATUNG. Ich bin kein Anwalt. Was hier steht, sind
 * sorgfaeltig recherchierte Standardformulierungen und die Korrektur
 * von Punkten, die nachweislich veraltet oder in sich widersprüchlich
 * waren. Vor dem Livegang gehoert der Text einmal zu einer Anwaeltin
 * oder einem Anwalt fuer IT- und Wettbewerbsrecht.
 *
 * WAS GEAENDERT WURDE
 *   Impressum
 *     - "§ 5 TMG" -> "§ 5 DDG". Das TMG wurde im Mai 2024 abgeloest.
 *     - Absatz zur OS-Plattform der EU ersatzlos gestrichen. Die
 *       Plattform wurde im Juli 2025 eingestellt, die zugrunde
 *       liegende ODR-Verordnung aufgehoben. Ein Link auf ein totes
 *       Verfahren ist selbst ein Risiko.
 *     - "Geschaeftsfuehrerin" -> "Inhaberin". Siehe RECHTSFORM unten.
 *   AGB
 *     - Datum ergaenzt, damit spaeter belegbar ist, welche Fassung galt.
 *     - Haftungsklausel ersetzt. Die alte schloss Haftung pauschal aus,
 *       das ist nach § 309 BGB unwirksam und faellt im Streitfall
 *       komplett weg, wodurch unbegrenzt gehaftet wird.
 *     - Stornoklausel ersetzt. "Rueckerstattung grundsaetzlich
 *       ausgeschlossen" haelt gegenueber Verbrauchern nicht.
 *     - Widerrufsbelehrung fuer Verbraucher ergaenzt. Siehe B2B/B2C.
 *   Datenschutz
 *     - Hosting von Vercel auf Netlify umgestellt.
 *     - Abschnitt zur Drittlandsuebermittlung in die USA ergaenzt.
 *     - Speicherdauer der Logfiles ergaenzt.
 *     - Formulierung zu den AV-Vertraegen praezisiert.
 *   Alle drei
 *     - Durchgaengig "Sie" statt "du". Der Rest der Seite siezt.
 *
 * DREI PUNKTE, DIE NUR KARINA KLAEREN KANN
 *
 * 1. RECHTSFORM. In den alten Texten standen drei verschiedene:
 *    "Geschaeftsfuehrerin" (deutet auf GmbH), "Inhaberin"
 *    (Einzelunternehmen) und "e.K." (im Handelsregister eingetragener
 *    Kaufmann). Ich habe ueberall auf Einzelunternehmen vereinheitlicht,
 *    weil das fuer eine freiberufliche Designerin der Regelfall ist.
 *    Falls tatsaechlich ein Eintrag im Handelsregister besteht, muessen
 *    "e.K." wieder rein UND zusaetzlich Registergericht und
 *    Registernummer ins Impressum. Fehlt beides, ist das abmahnfaehig.
 *    Falls es eine GmbH ist, gilt dasselbe plus Stammkapitalangabe.
 *
 * 2. VERBRAUCHER ODER NUR UNTERNEHMEN. Die AGB enthalten jetzt eine
 *    Widerrufsbelehrung. Die ist Pflicht, sobald auch nur ein
 *    Verbraucher beauftragt, und ihr Fehlen ist einer der haeufigsten
 *    Abmahngruende ueberhaupt. Wenn Karina ausschliesslich mit
 *    Unternehmen arbeitet, kann Ziffer 9 entfallen, dann muss aber
 *    Ziffer 1 klarstellen, dass sich das Angebot ausschliesslich an
 *    Unternehmer im Sinne des § 14 BGB richtet.
 *
 * 3. AV-VERTRAEGE. Der Text sagt, dass mit Netlify und Resend
 *    Auftragsverarbeitungsvertraege nach Art. 28 DSGVO bestehen. Beide
 *    Anbieter stellen ein DPA bereit, es muss aber aktiv abgeschlossen
 *    werden. Solange das nicht passiert ist, ist die Aussage falsch.
 *
 * Die erste Zeile ist der Seitentitel. Zeilen der Form "1. Titel"
 * werden als Zwischenueberschrift gerendert, alles andere als Absatz.
 *
 * WICHTIG: Das Feld `notice` wird oeffentlich auf der Seite angezeigt,
 * erkennbar als gestrichelter Kasten. Vor dem Livegang leeren.
 */

import { company } from "./site";

/**
 * Eine Zeile eines Rechtstexts. NEU 22.09.2026.
 *
 * Vorher war `lines` eine flache Liste von Strings, und jeder String
 * wurde zu einem eigenen Absatz mit vollem Abstand. Im Impressum stand
 * dadurch jede Zeile der Anschrift als eigener Absatz untereinander,
 * mit demselben Abstand wie zwischen zwei Kapiteln. Der Text hatte
 * damit ueberhaupt keine Gliederung, alles war gleich weit auseinander.
 *
 *   string    ein Absatz Fliesstext
 *   string[]  ein Block eng untereinander, etwa eine Anschrift
 *   { h }     eine Zwischenueberschrift
 *
 * Zeilen der Form "1. Titel" gelten weiterhin automatisch als
 * Ueberschrift, damit AGB und Datenschutz unveraendert bleiben.
 */
export type LegalLine = string | string[] | { h: string };

export type LegalDoc = {
  title: string;
  /** Wird ueber dem Text angezeigt, wenn gesetzt. Vor Livegang leeren. */
  notice?: string;
  lines: LegalLine[];
};

export const impressum: LegalDoc = {
  title: "Impressum",
  lines: [
    { h: "Angaben gemäß § 5 DDG" },
    /* Anschrift als Block: Firma, Strasse, Ort und Land gehoeren
       zusammen und stehen deshalb eng untereinander, nicht als vier
       Absaetze. */
    [company.legal, "Keltenweg 3", "85764 Oberschleißheim", "Deutschland"],
    /* Auf einer Zeile statt Ueberschrift plus Zeile. Es ist eine
       einzige Angabe, keine Kapitelueberschrift. */
    "Vertreten durch: Geschäftsführerin Karina Voag",

    { h: "Kontakt" },
    ["E-Mail: kontakt@klixvisuals.de"],

    { h: "Handelsregister" },
    "Amtsgericht München, HRB 316888",

    { h: "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz" },
    "Die Umsatzsteuer-Identifikationsnummer der Gesellschaft ist beantragt und wird an dieser Stelle ergänzt, sobald sie erteilt ist.",

    { h: "Hinweis gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz)" },
    "Ich bin zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.",

    { h: "Haftung für Inhalte" },
    "Als Diensteanbieterin bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",

    { h: "Haftung für Links" },
    "Mein Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.",

    { h: "Urheberrecht" },
    "Die auf diesen Seiten gezeigten Arbeiten, Texte und Gestaltungen unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedarf meiner schriftlichen Zustimmung. Abgebildete Marken und Logos sind Eigentum der jeweiligen Rechteinhaber und werden ausschließlich zur Referenzdarstellung verwendet.",
  ],
};

export const agb: LegalDoc = {
  title: "AGB",
  lines: [
    { h: "Allgemeine Geschäftsbedingungen (AGB)" },
    [
      company.legal,
      "Geschäftsführerin: Karina Voag",
      "Keltenweg 3, 85764 Oberschleißheim",
      "Umsatzsteuer-Identifikationsnummer: beantragt",
      "Stand: September 2026",
    ],
    "1. Geltungsbereich",
    `Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Leistungen der ${company.legal}, vertreten durch die Geschäftsführerin Karina Voag (nachfolgend Auftragnehmerin), mit ihren Auftraggebern. Entgegenstehende oder abweichende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, die Auftragnehmerin stimmt ihrer Geltung ausdrücklich in Textform zu.`,
    "Das Angebot der Auftragnehmerin richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, an juristische Personen des öffentlichen Rechts und an öffentlich-rechtliche Sondervermögen. Verträge mit Verbrauchern im Sinne des § 13 BGB werden nicht geschlossen.",
    "Maßgeblich ist die zum Zeitpunkt des Vertragsschlusses gültige Fassung dieser AGB.",
    "2. Leistungen",
    "Die Auftragnehmerin erbringt individuelle Designleistungen, insbesondere in den Bereichen Branding, Logo Design, Verpackungsdesign, Printgestaltung und Gestaltung von Online-Auftritten. Die Leistungen erfolgen projektbezogen auf Grundlage eines individuellen Angebots.",
    "Der genaue Leistungsumfang ergibt sich aus dem Angebot. Gestalterische Entwürfe sind Ausdruck künstlerischer Tätigkeit. Ein Anspruch auf eine bestimmte Gestaltung besteht nicht, soweit im Angebot nichts anderes vereinbart ist.",
    "3. Vertragsschluss",
    "Angebote der Auftragnehmerin sind freibleibend. Ein Vertrag kommt zustande, wenn der Auftraggeber ein Angebot in Textform annimmt, beispielsweise per E-Mail, oder die Auftragnehmerin einen Auftrag in Textform bestätigt.",
    "4. Preise und Zahlungsbedingungen",
    "Es gelten die im Angebot genannten Preise. Sofern nicht anders vereinbart, erfolgt die Abrechnung nach Abnahme der Leistung.",
    "Rechnungen sind ohne Abzug innerhalb von 7 Tagen ab Rechnungsdatum per Banküberweisung zahlbar. Bei Projekten mit einem Auftragswert über 1.000 Euro kann die Auftragnehmerin eine Anzahlung von bis zu 50 Prozent verlangen.",
    "Bis zur vollständigen Bezahlung verbleiben sämtliche Nutzungsrechte an den erstellten Entwürfen und Dateien bei der Auftragnehmerin.",
    "5. Mitwirkung des Auftraggebers",
    "Der Auftraggeber stellt alle für die Durchführung erforderlichen Informationen, Texte, Bilder und Materialien rechtzeitig und in geeigneter Form bereit.",
    "Der Auftraggeber sichert zu, dass er an den von ihm bereitgestellten Materialien über die erforderlichen Rechte verfügt. Er stellt die Auftragnehmerin von Ansprüchen Dritter frei, die aus einer Verletzung dieser Zusicherung entstehen.",
    "Verzögert sich das Projekt, weil erforderliche Zuarbeiten oder Freigaben ausbleiben, verschieben sich vereinbarte Termine entsprechend.",
    "6. Korrekturen und Abnahme",
    "Anzahl und Umfang der Korrekturschleifen ergeben sich aus dem Angebot. Darüber hinausgehende Änderungswünsche werden gesondert vereinbart und nach Aufwand berechnet.",
    "Der Auftraggeber prüft die vorgelegten Entwürfe und erklärt die Abnahme in Textform. Erfolgt innerhalb von 14 Tagen nach Vorlage keine Rückmeldung und keine Mängelrüge, gilt die Leistung als abgenommen.",
    "7. Nutzungsrechte",
    "Mit vollständiger Bezahlung der vereinbarten Vergütung überträgt die Auftragnehmerin dem Auftraggeber die räumlich und zeitlich unbeschränkten, kommerziellen Nutzungsrechte an den finalen Arbeitsergebnissen für den vertraglich vereinbarten Zweck.",
    "Nicht übertragen werden Rechte an Entwürfen, die nicht zur Ausführung gelangt sind, sowie an Arbeitsdateien, Vorlagen und verwendeten Werkzeugen, soweit nichts anderes vereinbart ist.",
    "Eine Bearbeitung oder Weiterentwicklung der Arbeitsergebnisse durch Dritte bedarf der Zustimmung der Auftragnehmerin in Textform, soweit dadurch das Urheberpersönlichkeitsrecht berührt wird.",
    "Verwendet die Auftragnehmerin Schriften, Bilder oder andere Werke Dritter, gelten für diese die Lizenzbedingungen des jeweiligen Rechteinhabers. Die Auftragnehmerin weist auf erforderliche Lizenzen im Angebot hin.",
    "8. Referenznennung",
    "Die Auftragnehmerin ist berechtigt, die für den Auftraggeber erstellten Arbeiten unter Nennung des Auftraggebers zu Referenzzwecken zu veröffentlichen, insbesondere auf der eigenen Website und in sozialen Netzwerken. Der Auftraggeber kann dem jederzeit in Textform widersprechen.",
    "9. Kündigung und Stornierung",
    "Das Recht beider Parteien zur Kündigung aus wichtigem Grund bleibt unberührt.",
    "Kündigt der Auftraggeber den Vertrag nach Beginn der Arbeiten, hat die Auftragnehmerin Anspruch auf die Vergütung der bis dahin erbrachten Leistungen. Weitergehende gesetzliche Ansprüche, insbesondere aus § 648 BGB, bleiben unberührt.",
    "10. Gewährleistung",
    "Weist die Leistung einen Mangel auf, hat der Auftraggeber zunächst Anspruch auf Nacherfüllung. Schlägt die Nacherfüllung zweimal fehl, stehen ihm die gesetzlichen Rechte zu.",
    "Für die Richtigkeit von Inhalten, Texten und Angaben, die der Auftraggeber bereitgestellt oder freigegeben hat, übernimmt die Auftragnehmerin keine Gewähr. Der Auftraggeber prüft insbesondere Druckdaten vor Erteilung der Druckfreigabe auf inhaltliche Richtigkeit.",
    "11. Haftung",
    "Die Auftragnehmerin haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.",
    "Bei einfacher Fahrlässigkeit haftet die Auftragnehmerin nur bei der Verletzung einer wesentlichen Vertragspflicht, also einer Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt.",
    "Die Haftung nach dem Produkthaftungsgesetz sowie bei Übernahme einer Garantie bleibt unberührt.",
    "12. Datenschutz",
    "Die Verarbeitung personenbezogener Daten richtet sich nach der Datenschutzerklärung, abrufbar unter klixvisuals.de/datenschutz.",
    "13. Schlussbestimmungen",
    "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
    "Ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist München, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.",
    "Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  ],
};

export const datenschutz: LegalDoc = {
  title: "Datenschutz",
  /* OFFEN, war bis 29.08.2026 ein oeffentlicher Hinweiskasten:
     ERLEDIGT am 30.08.2026:
     - Anschrift Netlify gegen deren Privacy Statement und Terms of Use
       geprueft, von "512 2nd Street, Suite 200, CA 94107" auf
       "101 2nd Street, CA 94105" korrigiert.
     - Rechtstraeger von Resend korrigiert: Plus Five Five, Inc.,
       nicht "Resend, Inc.". Anschrift stimmte.
     - AV-Vertraege bestehen bei beiden ueber die Nutzungsbedingungen,
       eine gesonderte Unterschrift ist nicht vorgesehen. Kopien liegen
       unter ~/Documents/KLIX VISUALS/AV-Vertraege. */
  lines: [
    "Stand: August 2026",
    "1. Allgemeine Hinweise",
    "Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf meiner Website klixvisuals.de. Ich nehme den Schutz Ihrer Daten ernst und behandle Ihre personenbezogenen Informationen vertraulich und entsprechend der gesetzlichen Vorschriften.",
    "2. Verantwortliche Stelle",
    [
      company.legal,
      "Geschäftsführerin: Karina Voag",
      "Keltenweg 3",
      "85764 Oberschleißheim",
      "Deutschland",
      "E-Mail: kontakt@klixvisuals.de",
    ],
    "Eine Datenschutzbeauftragte oder ein Datenschutzbeauftragter ist nach Art. 37 DSGVO nicht zu benennen.",
    "3. Hosting über Netlify",
    "Meine Website wird bei der Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA gehostet. Beim Aufruf der Website werden technisch notwendige Zugriffsdaten verarbeitet, damit die Seite ausgeliefert werden kann.",
    "Netlify betreibt ein weltweites Auslieferungsnetz. Die Auslieferung kann daher über Standorte außerhalb der Europäischen Union erfolgen, insbesondere in den Vereinigten Staaten. Grundlage der Verarbeitung ist mein berechtigtes Interesse am sicheren und leistungsfähigen Betrieb der Website gemäß Art. 6 Abs. 1 lit. f DSGVO.",
    "Mit Netlify besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Weitere Informationen finden Sie unter https://www.netlify.com/privacy/",
    "4. Zugriffsdaten (Server-Logfiles)",
    "Beim Besuch meiner Website erhebt mein Hosting-Anbieter automatisch Informationen, die Ihr Browser übermittelt. Dazu gehören:",
    "IP-Adresse",
    "Datum und Uhrzeit der Anfrage",
    "Browsertyp und Browserversion",
    "Betriebssystem",
    "Referrer-URL",
    "Diese Daten dienen ausschließlich der technischen Auslieferung, der Überwachung und der Sicherheit der Website. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Die Logfiles werden nach spätestens 30 Tagen gelöscht.",
    "5. Kontaktformular und E-Mail-Versand",
    "Wenn Sie mir über das Kontaktformular eine Anfrage senden, werden Ihre Angaben aus dem Formular (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen.",
    "Für die Zustellung dieser Anfragen an mein Postfach setze ich den Versanddienstleister Resend, betrieben von der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA ein. Dabei werden die von Ihnen eingegebenen Daten an Resend übermittelt und dort zum Zweck des Versands verarbeitet. Mit Plus Five Five, Inc. besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Weitere Informationen finden Sie unter https://resend.com/legal/privacy-policy",
    "Diese Daten gebe ich darüber hinaus nicht ohne Ihre Einwilligung weiter. Ich speichere sie so lange, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, und lösche sie danach, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
    "6. Übermittlung in Drittländer",
    "Sowohl Netlify als auch Resend haben ihren Sitz in den Vereinigten Staaten. Eine Verarbeitung Ihrer Daten außerhalb der Europäischen Union ist daher nicht ausgeschlossen.",
    "Die Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln der Europäischen Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO, soweit sich der jeweilige Anbieter nicht nach dem EU-U.S. Data Privacy Framework gemäß Art. 45 DSGVO zertifiziert hat.",
    "Ich weise darauf hin, dass in den Vereinigten Staaten kein Schutzniveau besteht, das dem der Europäischen Union in jeder Hinsicht entspricht, und dass insbesondere ein Zugriff durch dortige Behörden nicht vollständig ausgeschlossen werden kann.",
    "7. Google Analytics",
    "Diese Website nutzt Google Analytics von Google LLC zur Analyse Ihrer Nutzung. Google Analytics setzt Cookies, um anonyme Daten über Ihr Besuchsverhalten zu sammeln.",
    "Die Datenverarbeitung erfolgt nur mit Ihrer vorherigen Einwilligung durch das Consent-Banner. Sie können diese Einwilligung jederzeit durch das Cookie-Banner unten auf der Seite widerrufen.",
    "Google übermittelt die Daten an Server in den Vereinigten Staaten und speichert diese über einen Zeitraum von bis zu 38 Monaten. Die Daten werden in anonymisierter Form verarbeitet.",
    "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).",
    "8. Cookies",
    "Google Analytics nutzt Cookies der Kategorien: _ga (Persistenz-Cookie zur Nutzer-Erkennung), _gid (Session-Cookie), _gat (Drosselungs-Cookie). Diese werden mit Ihrer Zustimmung gesetzt.",
    "Weitere Cookies werden von dieser Website nicht gesetzt.",
    "9. Schriftarten",
    "Diese Website verwendet ausschließlich die auf Ihrem Gerät bereits vorhandenen Systemschriften. Es werden keine externen Schriftarten nachgeladen, insbesondere keine Google Fonts. Eine Übertragung Ihrer IP-Adresse an einen Schriftanbieter findet nicht statt.",
    "10. Rechte der betroffenen Personen",
    "Sie haben jederzeit das Recht auf:",
    "Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)",
    "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
    "Löschung Ihrer Daten (Art. 17 DSGVO)",
    "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    "Datenübertragbarkeit (Art. 20 DSGVO)",
    "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    "Soweit die Verarbeitung auf einer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.",
    "Beschwerden können Sie bei der zuständigen Aufsichtsbehörde einreichen:",
    "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
    "Promenade 18, 91522 Ansbach",
    "https://www.lda.bayern.de",
    "11. Datensicherheit",
    "Ich setze technische und organisatorische Maßnahmen ein, um Ihre Daten vor unbefugtem Zugriff zu schützen. Die Website wird ausschließlich verschlüsselt über HTTPS ausgeliefert. Eine vollständige Sicherheit bei der Datenübertragung im Internet kann dennoch nicht garantiert werden.",
    "12. Änderungen",
    "Ich behalte mir vor, diese Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung finden Sie jederzeit auf dieser Website.",
  ],
};
