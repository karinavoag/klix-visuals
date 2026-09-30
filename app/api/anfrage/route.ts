import { NextResponse } from "next/server";

/**
 * Zustellung der Projektanfragen an kontakt@klixvisuals.de.
 *
 * Versand ueber die REST-API von Resend, bewusst per fetch und ohne
 * zusaetzliches npm-Paket. Ohne RESEND_API_KEY antwortet die Route mit
 * 501 und einem Hinweis, worauf das Formular auf mailto ausweicht.
 * Es wird nie ein Erfolg vorgetaeuscht, der nicht stattgefunden hat.
 */

const EMPFAENGER = "kontakt@klixvisuals.de";

type Body = { name?: string; email?: string; message?: string; topic?: string };

/* Erlaubte Anliegen. Der Betreff geht ungeprueft in eine Mail, deshalb
   wird `topic` nicht uebernommen, sondern gegen diese Liste geprueft.
   Alles andere faellt auf den Standard zurueck. */
const ANLIEGEN = ["Projekt anfragen", "Betreuung anfragen"] as const;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const topic = ANLIEGEN.includes(body.topic as (typeof ANLIEGEN)[number])
    ? (body.topic as string)
    : "Projekt anfragen";

  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Bitte alle Felder ausfüllen." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const absender = process.env.ANFRAGE_ABSENDER;

  if (!key || !absender) {
    return NextResponse.json(
      {
        error: "Versand ist noch nicht eingerichtet.",
        fallback: "mailto",
      },
      { status: 501 }
    );
  }

  const antwort = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: absender,
      to: [EMPFAENGER],
      reply_to: email,
      subject: `${topic}: ${name}`,
      text: `Anliegen: ${topic}\nName: ${name}\nE-Mail: ${email}\n\n${message}`,
    }),
  });

  if (!antwort.ok) {
    const detail = await antwort.text();
    console.error("Resend-Fehler:", antwort.status, detail);
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
