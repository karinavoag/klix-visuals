"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contact } from "@/content/site";

type Field = "name" | "company" | "email" | "service" | "budget" | "message";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const LABEL: Record<Field, string> = {
  name: "Name",
  company: "Unternehmen",
  email: "E-Mail",
  service: "Wobei kann ich helfen?",
  budget: "Budgetrahmen",
  message: "Projektbeschreibung",
};

const SERVICES = [
  "Branding",
  "Packaging",
  "Website / Shopify",
  "Print",
  "laufende Designbetreuung",
  "White Label",
  "Sonstiges",
];

const BUDGETS = [
  "unter 1.000 €",
  "1.000–2.500 €",
  "2.500–5.000 €",
  "5.000–10.000 €",
  "10.000 €+",
];

function validate(field: Field, value: string): string | null {
  const v = value.trim();
  if (field === "name") return v.length < 2 ? "Bitte geben Sie einen Namen an." : null;
  if (field === "company") return v.length < 2 ? "Bitte geben Sie den Unternehmensnamen an." : null;
  if (field === "email")
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? null
      : "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (field === "service") return v.length === 0 ? "Bitte wählen Sie eine Leistung." : null;
  if (field === "budget") return v.length === 0 ? "Bitte wählen Sie einen Budgetrahmen." : null;
  if (field === "message") return v.length < 10 ? "Bitte beschreiben Sie kurz Ihr Projekt." : null;
  return null;
}

export function RequestForm({
  onDone,
  subject = "Projekt anfragen",
}: {
  onDone: () => void;
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    company: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    company: false,
    email: false,
    service: false,
    budget: false,
    message: false,
  });

  const errors = (Object.keys(values) as Field[]).reduce(
    (acc, f) => ({ ...acc, [f]: touched[f] ? validate(f, values[f]) : null }),
    {} as Record<Field, string | null>
  );
  const complete = (Object.keys(values) as Field[]).every(
    (f) => validate(f, values[f]) === null
  );

  function openMailto() {
    const betreff = encodeURIComponent(`${subject}: ${values.name}`);
    const text = encodeURIComponent(
      `Anliegen: ${subject}\nName: ${values.name}\nUnternehmen: ${values.company}\nE-Mail: ${values.email}\nLeistung: ${values.service}\nBudget: ${values.budget}\n\n${values.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${betreff}&body=${text}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(contact.formEndpoint || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          email: values.email,
          service: values.service,
          budget: values.budget,
          message: values.message,
          topic: subject,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        onDone();
      } else {
        setStatus("mailto");
        openMailto();
      }
    } catch {
      setStatus("mailto");
      openMailto();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder={LABEL.name}
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          onBlur={() => setTouched({ ...touched, name: true })}
          className="border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <input
          type="text"
          placeholder={LABEL.company}
          value={values.company}
          onChange={(e) => setValues({ ...values, company: e.target.value })}
          onBlur={() => setTouched({ ...touched, company: true })}
          className="border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <input
        type="email"
        placeholder={LABEL.email}
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        onBlur={() => setTouched({ ...touched, email: true })}
        className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={values.service}
          onChange={(e) => setValues({ ...values, service: e.target.value })}
          onBlur={() => setTouched({ ...touched, service: true })}
          className="border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white"
        >
          <option value="">Wobei kann ich helfen?</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={values.budget}
          onChange={(e) => setValues({ ...values, budget: e.target.value })}
          onBlur={() => setTouched({ ...touched, budget: true })}
          className="border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white"
        >
          <option value="">Budgetrahmen</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder={LABEL.message}
        value={values.message}
        onChange={(e) => setValues({ ...values, message: e.target.value })}
        onBlur={() => setTouched({ ...touched, message: true })}
        rows={5}
        className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
      />

      <button
        type="submit"
        disabled={!complete || status !== "idle"}
        className="w-full bg-brand text-white font-semibold py-4 rounded-sm hover:bg-brand-dark active:bg-brand-darker transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Wird gesendet…" : "Projekt anfragen"}
      </button>

      <AnimatePresence mode="wait">
        {errors.name && touched.name && (
          <motion.p key="error-name" className="text-red-600 text-sm">
            {errors.name}
          </motion.p>
        )}
        {errors.company && touched.company && (
          <motion.p key="error-company" className="text-red-600 text-sm">
            {errors.company}
          </motion.p>
        )}
        {errors.email && touched.email && (
          <motion.p key="error-email" className="text-red-600 text-sm">
            {errors.email}
          </motion.p>
        )}
        {errors.service && touched.service && (
          <motion.p key="error-service" className="text-red-600 text-sm">
            {errors.service}
          </motion.p>
        )}
        {errors.budget && touched.budget && (
          <motion.p key="error-budget" className="text-red-600 text-sm">
            {errors.budget}
          </motion.p>
        )}
        {errors.message && touched.message && (
          <motion.p key="error-message" className="text-red-600 text-sm">
            {errors.message}
          </motion.p>
        )}
        {status === "sent" && (
          <motion.p
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-600 font-semibold text-sm"
          >
            Danke! Ich melde mich bald bei dir.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
