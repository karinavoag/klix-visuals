import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datenschutz } from "@/content/legal";

/* Titel ohne Suffix: layout.tsx haengt "| KLIX VISUALS" ueber das
   title.template selbst an. Rechtstexte gehoeren in den Index, sollen
   aber nicht mit der Startseite um Suchbegriffe konkurrieren, deshalb
   eine sachliche Beschreibung und eine eigene Canonical-URL. */
export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von KLIX VISUALS. Wie personenbezogene Daten verarbeitet werden, Hosting bei Netlify, keine Tracking-Tools.",
  alternates: { canonical: "/datenschutz" },
  openGraph: { title: "Datenschutz | KLIX VISUALS", description: "Datenschutzerklärung von KLIX VISUALS. Wie personenbezogene Daten verarbeitet werden, Hosting bei Netlify, keine Tracking-Tools." },
};

export default function Page() {
  return <LegalPage doc={datenschutz} />;
}
