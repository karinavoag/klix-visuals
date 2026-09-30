"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Pressable } from "./Pressable";
import { useSprings } from "./motion/springs";
import { contact } from "@/content/site";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const LABEL: Record<Field, string> = {
  name: "Name",
  email: "E-Mail",
  message: "Worum geht es",
};

/**
 * Skill §16: "validate inline (not on submit)."
 * Geprueft wird ab dem Moment, in dem ein Feld einmal verlassen wurde,
 * danach bei jedem Tastendruck. Vorher nie.
 */
function validate(field: Field, value: string): string | null {
  const v = value.trim();
  if (field === "name") return v.length < 2 ? "Bitte geben Sie einen Namen an." : null;
  if (field === "email")
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? null
      : "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  return v.length < 10 ? "Bitte beschreiben Sie kurz, worum es geht." : null;
}

/**
 * `subject` ist das Anliegen, mit dem das Sheet geoeffnet wurde,
 * also "Projekt anfragen" oder "Betreuung anfragen". Es steht sichtbar
 * ueber den Feldern, geht als `topic` an die API und landet in der
 * Betreffzeile. So sagt das Postfach dasselbe wie der Button, den
 * jemand gedrueckt hat, und eine Betreuungsanfrage ist ohne Lesen
 * des Fliesstexts als solche erkennbar.
 */
export function RequestForm({
  onDone,
  subject = "Projekt anfragen",
}: {
  onDone: () => void;
  subject?: string;
}) {
  const springs = useSprings();
  const submitRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const errors = (Object.keys(values) as Field[]).reduce(
    (acc, f) => ({ ...acc, [f]: touched[f] ? validate(f, values[f]) : null }),
    {} as Record<Field, string | null>
  );
  const complete = (Object.keys(values) as Field[]).every(
    (f) => validate(f, values[f]) === null
  );

  /** Fallback ohne Zugangsdaten: das Mailprogramm uebernimmt. */
  function openMailto() {
    const betreff = encodeURIComponent(`${subject}: ${values.name}`);
    const text = encodeURIComponent(
      `Anliegen: ${subject}\nName: ${values.name}\nE-Mail: ${values.email}\n\n${values.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${betreff}&body=${text}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!complete || !contact.formEndpoint) return;

    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, topic: subject }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }
      /* 501 heisst: Versand noch nicht eingerichtet. Kein vorgetaeuschter
         Erfolg, stattdessen der ehrliche Umweg ueber das Mailprogramm. */
      const data = await res.json().catch(() => ({}));
      if (res.status === 501 && data.fallback === "mailto") {
        setStatus("mailto");
        openMailto();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={springs.reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.ui}
        className="flex flex-col gap-6"
        role="status"
      >
        <p className="type-body on-glass">
          Danke, Ihre Anfrage ist angekommen. Sie geht an {contact.email}.
        </p>
        <Pressable variant="primary" onClick={onDone}>
          Schließen
        </Pressable>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-6">
      {/* Zwei Angaben, die beim Anfragen wirklich anliegen. */}
      <dl className="-mt-2 flex flex-col gap-2 border-b border-line pb-6">
        <div className="flex flex-wrap gap-x-3">
          <dt className="type-small text-ink-soft">Anliegen</dt>
          <dd className="type-small on-glass">{subject}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="type-small text-ink-soft">Antwortzeit</dt>
          <dd className="type-small on-glass">{contact.responseTime}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="type-small text-ink-soft">Verfügbarkeit</dt>
          <dd className="type-small on-glass">{contact.availability}</dd>
        </div>
      </dl>

      {(Object.keys(LABEL) as Field[]).map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <label htmlFor={field} className="type-micro text-ink-soft">
            {LABEL[field]}
          </label>

          {field === "message" ? (
            <textarea
              id={field}
              rows={4}
              value={values[field]}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, [field]: true }))}
              className="w-full resize-y rounded-[0.75rem] border border-line
                         bg-surface px-4 py-3 type-body text-ink"
            />
          ) : (
            <input
              id={field}
              type={field === "email" ? "email" : "text"}
              value={values[field]}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, [field]: true }))}
              className="w-full rounded-[0.75rem] border border-line
                         bg-surface px-4 py-3 type-body text-ink"
            />
          )}

          <AnimatePresence>
            {errors[field] && (
              <motion.p
                id={`${field}-error`}
                role="alert"
                initial={springs.reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={springs.reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={springs.ui}
                className="type-small text-ink"
              >
                {errors[field]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="flex flex-col">
        <Pressable
          ref={submitRef}
          type="submit"
          variant="primary"
          className={complete && status !== "sending" ? "" : "opacity-50"}
        >
          {status === "sending" ? "Wird gesendet" : "Anfrage senden"}
        </Pressable>

        {/* Abstand 8 (2rem) statt der bisherigen 4 (1rem). Der Button
            traegt zusaetzlich 10px Hit-Padding nach aussen (Skill §10),
            die Hinweise darunter standen dadurch fast an der Trefferflaeche.
            Untereinander bleiben sie eng, sie gehoeren zusammen. */}
        <div className="mt-8 flex flex-col gap-3">
          {status === "mailto" && (
            <p role="status" className="type-small text-ink-soft">
              Der Serverversand ist noch nicht eingerichtet. Ihr Mailprogramm
              wurde mit der fertigen Nachricht geöffnet.
            </p>
          )}

          {status === "error" && (
            <p role="alert" className="type-small text-ink">
              Das hat nicht geklappt. Schreiben Sie gern direkt an{" "}
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
              .
            </p>
          )}

          <p className="type-small text-ink-soft">
            Antwort an{" "}
            <a href={`mailto:${contact.email}`} className="underline">
              {contact.email}
            </a>
          </p>

          <p className="type-small text-ink-soft">
            Mit dem Absenden stimmen Sie der{" "}
            <a href="/datenschutz" className="underline">
              Datenschutzerklärung
            </a>{" "}
            zu.
          </p>
        </div>
      </div>

    </form>
  );
}
