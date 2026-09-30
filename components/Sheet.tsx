"use client";

import { AnimatePresence, motion } from "motion/react";
import type { PanInfo } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { useSprings } from "./motion/springs";
import { project } from "@/lib/projection";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Das ausloesende Element. Skill §7: Interaktionen an ihrer Quelle verankern. */
  triggerRef: RefObject<HTMLElement | null>;
  title: string;
  children: ReactNode;
};

/* useLayoutEffect warnt beim Server-Rendering. Das Sheet ist eine
   Client-Komponente, wird aber trotzdem vorgerendert. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}

export function Sheet({ open, onClose, triggerRef, title, children }: Props) {
  const springs = useSprings();
  const compact = useIsCompact();
  const panelRef = useRef<HTMLDivElement>(null);
  const releaseVelocity = useRef(0);
  const [origin, setOrigin] = useState("50% 50%");

  /**
   * Skill §7: "Anchor interactions to their source. A menu, popover
   * or sheet should originate from the element that triggered it —
   * set transform-origin to the trigger."
   *
   * Auf Compact ist das Sheet unten verankert und faehrt von unten
   * herein; dort ist der Ursprung die Unterkante, nicht der Trigger.
   */
  useIsoLayoutEffect(() => {
    if (!open || compact) return;
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const t = trigger.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const x = ((t.left + t.width / 2 - p.left) / p.width) * 100;
    const y = ((t.top + t.height / 2 - p.top) / p.height) * 100;
    setOrigin(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }, [open, compact, triggerRef]);

  /* Skill §16 Wayfinding: "How do I get out?" — ESC ist einer der drei Wege. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const active = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      active?.focus();
    };
  }, [open, onClose]);

  /**
   * Skill §6 Momentum-Projektion und Quick Reference:
   * "Decide reverse vs. commit — use velocity sign, not position —
   * at release." Erst das Vorzeichen, dann die Projektion.
   * Skill §5: die Release-Velocity wird an den Spring weitergereicht,
   * damit zwischen Ziehen und Animieren keine Naht entsteht.
   */
  const onDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      const v = info.velocity.y;
      const height = panelRef.current?.offsetHeight ?? 1;
      releaseVelocity.current = v;

      if (v > 400) return onClose();
      if (v < -400) return;

      const projected = info.offset.y + project(v);
      if (projected > height * 0.4) onClose();
    },
    [onClose]
  );

  const reduced = springs.reduced;

  /* Enter- und Exit-Weg sind identisch, nur in umgekehrter Richtung.
     Skill §7: "If something disappears one way, we expect it to
     emerge from where it came." */
  const panelVariants = compact
    ? {
        hidden: { y: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 },
        visible: { y: 0, opacity: 1, transition: springs.sheet },
        exit: (velocity: number) => ({
          y: reduced ? 0 : "100%",
          opacity: reduced ? 0 : 1,
          transition: reduced
            ? springs.sheet
            : { type: "spring" as const, bounce: 0.2, duration: 0.3, velocity },
        }),
      }
    : {
        hidden: { scale: reduced ? 1 : 0.92, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: springs.sheet },
        exit: { scale: reduced ? 1 : 0.92, opacity: 0, transition: springs.sheet },
      };

  return (
    <AnimatePresence custom={releaseVelocity.current}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          {/* Skill §12: "Dim to focus" — der modale Vorgang bekommt
              einen Scrim, der parallele Fluss waere ohne. */}
          <motion.div
            className="absolute inset-0 bg-[var(--scrim)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: springs.ui }}
            exit={{ opacity: 0, transition: springs.ui }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            custom={releaseVelocity.current}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: origin }}
            drag={compact && !reduced ? "y" : false}
            dragConstraints={{ top: 0 }}
            /* Skill §9: progressiver Widerstand nach oben statt hartem
               Stopp. 0.55 ist die Konstante aus der Rubberband-Formel. */
            dragElastic={{ top: 0.55, bottom: 0 }}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            className="relative w-full max-w-[36rem] max-h-[88vh] overflow-y-auto
                       rounded-t-[1.5rem] md:rounded-[1.5rem]
                       shadow-[var(--shadow-modal)] focus:outline-none"
          >
            {/* Materialisieren statt Einblenden.
                Skill §12: "animate blur radius and scale together on
                enter/exit, so the surface reads as a real material
                arriving rather than a plain opacity fade."
                Die Blur-Ebene liegt separat und blendet auf, waehrend
                das Panel skaliert — dadurch bleiben die animierten
                Eigenschaften auf transform und opacity beschraenkt. */}
            <motion.div
              className="glass-modal absolute inset-0 rounded-t-[1.5rem] md:rounded-[1.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: springs.sheet }}
              exit={{ opacity: 0, transition: springs.sheet }}
              aria-hidden
            />

            <div className="relative px-6 pt-8 pb-12 md:px-12 md:pt-12 md:pb-16">
              {compact && (
                <div
                  className="mx-auto mb-6 h-1 w-10 rounded-full bg-ink/20"
                  aria-hidden
                />
              )}

              <div className="mb-8 flex items-start justify-between gap-6">
                <h2 className="type-h3 on-glass">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Schließen"
                  className="relative -m-2.5 p-2.5 type-small text-ink-soft
                             hover:text-ink cursor-pointer"
                >
                  Schließen
                </button>
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
