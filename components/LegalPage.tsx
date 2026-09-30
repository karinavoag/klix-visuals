import Link from "next/link";
import type { LegalDoc, LegalLine } from "@/content/legal";

/** "1. Geltungsbereich" gilt weiterhin automatisch als Ueberschrift. */
const NUMMERIERT = /^\d+\.\s/;

function istUeberschrift(zeile: LegalLine): zeile is string | { h: string } {
  if (Array.isArray(zeile)) return false;
  if (typeof zeile === "string") return NUMMERIERT.test(zeile);
  return true;
}

function ueberschriftText(zeile: string | { h: string }): string {
  return typeof zeile === "string" ? zeile : zeile.h;
}

type Abschnitt = { titel: string | null; inhalt: (string | string[])[] };

/**
 * Rechtstexte lesen sich lang. Deshalb schmale Spalte, ruhiger Rhythmus,
 * dieselbe Type-Skala wie der Rest der Seite.
 * Skill §15: Leading oeffnet sich zum Fliesstext hin.
 * Skill §16 Wayfinding: "How do I get out?" — der Rueckweg steht oben.
 *
 * GEAENDERT 22.09.2026. Vorher wurde jede Zeile einzeln als Absatz mit
 * demselben Abstand gesetzt. Zwischen zwei Zeilen der Anschrift stand
 * damit genauso viel Luft wie zwischen zwei Kapiteln, der Text hatte
 * ueberhaupt keine Gliederung.
 *
 * Jetzt werden die Zeilen zu Abschnitten gebuendelt: eine Ueberschrift
 * eroeffnet einen Abschnitt, alles bis zur naechsten Ueberschrift
 * gehoert dazu. Innerhalb eines Abschnitts stehen 16 px, zwischen
 * Abschnitten 48 px. Beide Werte stehen auf der Abstands-Skala.
 *
 * Ueberschriften sind bewusst NICHT groesser als der Fliesstext,
 * sondern nur fetter und in der vollen Textfarbe statt in der
 * gedaempften. Die Gliederung entsteht ueber Abstand und Gewicht,
 * nicht ueber Schriftgroesse. Skill §16 Simplicity: Hierarchie ueber
 * Reihenfolge, Abstand und Kontrast.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const abschnitte: Abschnitt[] = [];

  for (const zeile of doc.lines) {
    if (istUeberschrift(zeile)) {
      abschnitte.push({ titel: ueberschriftText(zeile), inhalt: [] });
    } else {
      if (abschnitte.length === 0) abschnitte.push({ titel: null, inhalt: [] });
      abschnitte[abschnitte.length - 1].inhalt.push(zeile);
    }
  }

  return (
    <main className="mx-auto max-w-[44rem] px-6 pb-32 pt-32">
      <Link href="/" className="type-small text-ink-soft hover:text-ink">
        Zurück zur Startseite
      </Link>

      <h1 className="type-h2 mt-8">{doc.title}</h1>

      {doc.notice && (
        <p
          data-placeholder
          className="mt-8 rounded-[0.75rem] border border-dashed border-ink/40
                     bg-ink/[0.03] p-4 type-small text-ink-soft"
        >
          Hinweis für Karina, nicht für Besucher: {doc.notice}
        </p>
      )}

      <div className="mt-12 flex flex-col gap-12">
        {abschnitte.map((abschnitt, i) => (
          <section key={i} className="flex flex-col gap-4">
            {abschnitt.titel && (
              <h2 className="type-body font-semibold text-ink">{abschnitt.titel}</h2>
            )}

            {abschnitt.inhalt.map((eintrag, j) =>
              Array.isArray(eintrag) ? (
                /* Zusammengehoerende Zeilen, etwa eine Anschrift. Ein
                   einziger Absatz mit Zeilenumbruechen, damit zwischen
                   den Zeilen nur die Zeilenhoehe steht und kein
                   Absatzabstand. */
                <p key={j} className="type-body text-ink-soft">
                  {eintrag.map((zeile, k) => (
                    <span key={k} className="block">
                      {zeile}
                    </span>
                  ))}
                </p>
              ) : (
                <p key={j} className="type-body text-ink-soft">
                  {eintrag}
                </p>
              )
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
