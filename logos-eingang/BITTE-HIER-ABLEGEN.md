# Logos hier ablegen

Kundenlogos als Bilddatei hier hineinlegen, dann im Projektordner:

    python3 scripts/logo-maske.py

Das Skript macht daraus Masken für die Logowand: weißer Hintergrund wird
transparent, Ränder werden abgeschnitten, und die Seite färbt sie danach
automatisch im selben gedeckten Navy wie alle anderen Logos.

**Der Dateiname wird zum Pfad.** Für die beiden offenen Logos also bitte:

- `Hilton Munich Airport.png`  ->  `/logos/hilton-munich-airport.png`
- `Krämmel.png`                ->  `/logos/kraemmel.png`

Eine Datei mit weißem Hintergrund ist in Ordnung, genau dafür ist das
Skript da. Ein freigestelltes PNG oder SVG geht natürlich auch.
