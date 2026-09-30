#!/usr/bin/env bash
# Veroeffentlicht die Seite bei Netlify, direkt von diesem Rechner.
# Kein GitHub noetig.
#
#   ./deploy.sh          Vorschau-Deploy, eigene Adresse zum Testen
#   ./deploy.sh live     ersetzt die oeffentliche Seite
#
# Beim allerersten Mal fragt Netlify nach Anmeldung und Site-Auswahl.

set -euo pipefail
cd "$(dirname "$0")"

if ! command -v netlify >/dev/null 2>&1; then
  echo "Netlify CLI fehlt. Einmalig installieren mit:" >&2
  echo "  npm install -g netlify-cli" >&2
  exit 1
fi

echo "Baue die Seite ..."
npm run build

if [ "${1:-}" = "live" ]; then
  echo
  echo "Achtung: Das ersetzt die oeffentliche Seite."
  read -r -p "Wirklich live stellen? [j/N] " antwort
  case "$antwort" in
    j|J|ja|Ja) ;;
    *) echo "Abgebrochen."; exit 0 ;;
  esac
  netlify deploy --prod
else
  echo
  echo "Vorschau-Deploy. Die oeffentliche Seite bleibt unveraendert."
  netlify deploy
fi
