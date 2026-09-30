import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { agb } from "@/content/legal";

/* Titel ohne Suffix: layout.tsx haengt "| KLIX VISUALS" ueber das
   title.template selbst an. Rechtstexte gehoeren in den Index, sollen
   aber nicht mit der Startseite um Suchbegriffe konkurrieren, deshalb
   eine sachliche Beschreibung und eine eigene Canonical-URL. */
export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von KLIX VISUALS für Designleistungen gegenüber Unternehmen.",
  alternates: { canonical: "/agb" },
  openGraph: { title: "AGB | KLIX VISUALS", description: "Allgemeine Geschäftsbedingungen von KLIX VISUALS für Designleistungen gegenüber Unternehmen." },
};

export default function Page() {
  return <LegalPage doc={agb} />;
}
