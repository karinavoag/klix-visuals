import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datenschutz } from "@/content/legal";

/* Titel ohne Suffix: layout.tsx haengt "| KLIX VISUALS" ueber das
   title.template selbst an. Rechtstexte gehoeren in den Index, sollen
   aber nicht mit der Startseite um Suchbegriffe konkurrieren, deshalb
   eine sachliche Beschreibung und eine eigene Canonical-URL. */
export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Wie KLIX VISUALS personenbezogene Daten verarbeitet. Google Analytics mit Einwilligung, keine externen Schriftarten.",
  alternates: { canonical: "/datenschutz" },
  openGraph: { title: "Datenschutz | KLIX VISUALS", description: "Wie KLIX VISUALS personenbezogene Daten verarbeitet. Google Analytics mit Einwilligung, keine externen Schriftarten." },
};

export default function Page() {
  return <LegalPage doc={datenschutz} />;
}
