#!/usr/bin/env python3
"""
Bereitet Kundenlogos fuer die Logowand auf.

Warum es dieses Skript gibt
---------------------------
Die Logowand rendert jedes Logo nicht als Bild, sondern als CSS-Maske
(`logo-mask` in app/globals.css). Eine Maske benutzt ausschliesslich den
Alphakanal: wo die Datei deckend ist, wird die Textfarbe der Seite
gemalt, wo sie transparent ist, bleibt nichts. Genau dadurch erscheinen
alle Logos automatisch im selben gedeckten Navy wie die uebrigen.

Daraus folgt die eine Bedingung: **der Hintergrund muss transparent
sein.** Ein PNG mit weissem Hintergrund ist ueberall deckend und wuerde
als voller grauer Kasten erscheinen. Die ueblichen Logodateien von
Kunden kommen aber genau so, weiss hinterlegt.

Dieses Skript nimmt solche Dateien und macht Masken daraus:
Weiss wird transparent, der Rest bekommt Deckung nach Helligkeit,
Raender werden abgeschnitten.

Benutzung
---------
    python3 scripts/logo-maske.py

Legt alle Bilder aus `logos-eingang/` als Maske in `public/logos/` ab.
Der Dateiname wird dabei zu Kleinbuchstaben normalisiert. Beispiel:

    logos-eingang/Hilton Munich Airport.png
        -> public/logos/hilton-munich-airport.png

Einzelne Datei mit eigenem Zielnamen:

    python3 scripts/logo-maske.py logos-eingang/foo.png kraemmel
"""

import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image

WURZEL = Path(__file__).resolve().parent.parent
EINGANG = WURZEL / "logos-eingang"
ZIEL = WURZEL / "public" / "logos"

# Ab welcher Helligkeit ein Pixel als Hintergrund gilt. 244 laesst
# leichte Kompressionsartefakte und Antialiasing am Rand noch als
# Hintergrund durchgehen, ohne helle Logoflaechen zu fressen.
WEISS_SCHWELLE = 244


def kebab(name: str) -> str:
    """'Hilton Munich Airport' -> 'hilton-munich-airport'"""
    name = name.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
    name = name.replace("Ä", "ae").replace("Ö", "oe").replace("Ü", "ue")
    name = name.replace("ß", "ss")
    name = unicodedata.normalize("NFKD", name)
    name = "".join(c for c in name if not unicodedata.combining(c))
    name = re.sub(r"[^A-Za-z0-9]+", "-", name).strip("-").lower()
    return re.sub(r"-{2,}", "-", name)


def zu_maske(quelle: Path, ziel: Path) -> tuple[int, int]:
    bild = Image.open(quelle).convert("RGBA")
    breite, hoehe = bild.size
    pixel = bild.load()

    for y in range(hoehe):
        for x in range(breite):
            r, g, b, a = pixel[x, y]
            if a == 0:
                continue
            # Helligkeit nach Rec. 601. Je dunkler das Pixel, desto
            # deckender die Maske.
            hell = (r * 299 + g * 587 + b * 114) // 1000
            if hell >= WEISS_SCHWELLE:
                pixel[x, y] = (0, 0, 0, 0)
            else:
                deckung = int(round((WEISS_SCHWELLE - hell) / WEISS_SCHWELLE * 255))
                pixel[x, y] = (0, 0, 0, min(a, deckung))

    rand = bild.getbbox()
    if rand:
        bild = bild.crop(rand)

    ziel.parent.mkdir(parents=True, exist_ok=True)
    bild.save(ziel, "PNG", optimize=True)
    return bild.size


def main() -> int:
    if len(sys.argv) >= 2:
        quelle = Path(sys.argv[1])
        if not quelle.is_absolute():
            quelle = WURZEL / quelle
        stamm = sys.argv[2] if len(sys.argv) >= 3 else kebab(quelle.stem)
        aufgaben = [(quelle, stamm)]
    else:
        if not EINGANG.exists():
            print(f"Ordner fehlt: {EINGANG}")
            return 1
        aufgaben = [
            (p, kebab(p.stem))
            for p in sorted(EINGANG.iterdir())
            if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".tif", ".tiff"}
        ]

    if not aufgaben:
        print(f"Keine Bilder in {EINGANG} gefunden.")
        print("Legen Sie die Logodateien dort ab und starten Sie das Skript erneut.")
        return 1

    for quelle, stamm in aufgaben:
        ziel = ZIEL / f"{stamm}.png"
        groesse = zu_maske(quelle, ziel)
        print(f"{quelle.name}  ->  public/logos/{ziel.name}  ({groesse[0]}x{groesse[1]})")
        print(f'    Eintrag: {{ name: "...", logo: "/logos/{ziel.name}" }},')

    print()
    print("Danach in content/site.ts den passenden Eintrag in `clients` auf den")
    print("Pfad setzen, dann `npm run build`.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
