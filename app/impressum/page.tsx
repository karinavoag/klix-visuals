import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { impressum } from "@/content/legal";

/* Titel ohne Suffix: layout.tsx haengt "| KLIX VISUALS" ueber das
   title.template selbst an. Rechtstexte gehoeren in den Index, sollen
   aber nicht mit der Startseite um Suchbegriffe konkurrieren, deshalb
   eine sachliche Beschreibung und eine eigene Canonical-URL. */
export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG für KLIX VISUALS, Karina Voag, Oberschleißheim.",
  alternates: { canonical: "/impressum" },
  openGraph: { title: "Impressum | KLIX VISUALS", description: "Anbieterkennzeichnung nach § 5 DDG für KLIX VISUALS, Karina Voag, Oberschleißheim." },
};

export default function Page() {
  return <LegalPage doc={impressum} />;
}
