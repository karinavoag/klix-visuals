"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pressable } from "./Pressable";
import { useRequest } from "./SiteShell";
import { useSprings } from "./motion/springs";
import { nav } from "@/content/site";

export function Header() {
  const { open, isOpen } = useRequest();
  const ctaRef = useRef<HTMLElement>(null);
  const springs = useSprings();
  const { scrollY } = useScroll();
  const [active, setActive] = useState<string>("");
  const [overHero, setOverHero] = useState(true);
  const [threshold, setThreshold] = useState(420);

  /**
   * Der Umschaltpunkt haengt an der echten Hoehe des Hero, nicht an
   * einer geratenen Zahl. Solange das Foto hinter der Leiste liegt,
   * ist sie transparent und hell. Danach wird sie zur Glasebene.
   */
  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("top");
      setThreshold(hero ? Math.max(hero.offsetHeight - 96, 120) : 420);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setOverHero(y < threshold));

  /**
   * Skill §12: "Scroll edge effects, not hard dividers ... only where
   * floating UI actually overlaps content." Ueber dem Hero traegt die
   * Leiste keinen eigenen Grund, dort gibt es also auch keine Kante.
   */
  const edgeOpacity = useTransform(scrollY, [0, 32], [0, 1]);

  /* Skill §16 Wayfinding: "Where am I?" */
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      data-over-hero={overHero ? "true" : "false"}
      className="fixed inset-x-0 top-0 z-40"
      /* Skill §12: kein Glas auf Glas. Solange das Sheet offen ist,
         tritt die Chrome-Ebene zurueck. */
      aria-hidden={isOpen}
      inert={isOpen ? true : undefined}
    >
      {/* Die Glasebene ist eine eigene Schicht, damit nur ihre Opacity
          animiert wird. Ueber dem Hero steht sie auf 0, die Leiste ist
          dann vollstaendig transparent. Skill §11. */}
      <motion.div
        className="glass-chrome absolute inset-0"
        initial={false}
        animate={{ opacity: overHero ? 0 : 1 }}
        transition={springs.ui}
        aria-hidden
      />

      <div
        className={
          "relative mx-auto flex h-16 max-w-[72rem] items-center justify-between gap-8 px-6 " +
          "header-tint " +
          (overHero ? "text-white" : "text-ink")
        }
      >
        <a href="#top" aria-label="KLIX VISUALS, zum Seitenanfang">
          {/* Maske statt <img>: das SVG traegt sein Navy fest im
              style-Block. Als Maske folgt es currentColor und wird
              ueber dem Hero hell, darunter dunkel. */}
          <span
            className="logo-mask block h-7 w-14"
            style={{ ["--logo-src" as string]: "url(/brand/logo.svg)" }}
            role="img"
            aria-label="KLIX VISUALS"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Abschnitte">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={
                "type-small on-glass " +
                (active === item.id
                  ? "opacity-100"
                  : overHero
                    ? "opacity-70 hover:opacity-100"
                    : "opacity-60 hover:opacity-100")
              }
            >
              {item.label}
              {/* Nur transform, ueber denselben Spring wie alles andere. */}
              <motion.span
                className="mt-1 block h-0.5 origin-left bg-accent"
                animate={{ scaleX: active === item.id ? 1 : 0 }}
                transition={springs.ui}
                aria-hidden
              />
            </a>
          ))}
        </nav>

        {/* Der gefuellte CTA erscheint erst, wenn der Hero-CTA weg ist.
            Zwei gefuellte Flaechen gleichzeitig wuerden die Hierarchie
            aufheben, die sie herstellen sollen. Skill §16 Simplicity. */}
        <AnimatePresence mode="wait">
          {!overHero && (
            <motion.div
              key="header-cta"
              initial={springs.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={springs.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              transition={springs.ui}
            >
              <Pressable
                ref={ctaRef}
                variant="primary"
                onClick={() => open(ctaRef.current)}
                ariaHasPopup
                ariaExpanded={isOpen}
              >
                Projekt anfragen
              </Pressable>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Weiche Scroll-Kante statt 1px-Linie, nur unter der Glasebene */}
      <motion.div
        style={{ opacity: edgeOpacity }}
        className={
          "pointer-events-none absolute inset-x-0 top-full h-8 " +
          "bg-gradient-to-b from-[var(--ground)] to-transparent " +
          (overHero ? "hidden" : "block")
        }
        aria-hidden
      />
    </header>
  );
}
