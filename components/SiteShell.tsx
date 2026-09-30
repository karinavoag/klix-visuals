"use client";

import { motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Sheet } from "./Sheet";
import { RequestForm } from "./RequestForm";
import { useSprings } from "./motion/springs";

type RequestApi = {
  /**
   * `subject` benennt das Anliegen. Ohne Angabe bleibt es bei
   * "Projekt anfragen", das ist der Weg aus Hero, Header und
   * Sticky-Balken. Der Betreuungsabschnitt uebergibt stattdessen
   * "Betreuung anfragen", damit Sheet-Titel, Betreffzeile und
   * Postfach dasselbe sagen wie der Button, der sie geoeffnet hat.
   */
  open: (trigger: HTMLElement | null, subject?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const RequestContext = createContext<RequestApi | null>(null);

export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest ausserhalb von SiteShell");
  return ctx;
}

const STANDARD_ANLIEGEN = "Projekt anfragen";

export function SiteShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState(STANDARD_ANLIEGEN);
  const triggerRef = useRef<HTMLElement | null>(null);
  const springs = useSprings();

  /* Der Ursprung der Bewegung ist immer der Button, der sie ausgeloest
     hat — Header-CTA, Hero-CTA oder Sticky-Balken. Skill §7. */
  const open = useCallback(
    (trigger: HTMLElement | null, anliegen: string = STANDARD_ANLIEGEN) => {
      triggerRef.current = trigger;
      setSubject(anliegen);
      setIsOpen(true);
    },
    []
  );

  /* Das Anliegen wird beim Schliessen bewusst NICHT zurueckgesetzt.
     Waehrend das Sheet hinausfaehrt, wuerde sonst der Titel mitten in
     der Bewegung umspringen. Der naechste open()-Aufruf setzt es
     ohnehin neu. */
  const close = useCallback(() => setIsOpen(false), []);

  const api = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <RequestContext.Provider value={api}>
      {/* Skill §12: "A modal task pairs the surface with a dimming
          scrim and pushes the background back/down." Der Scrim liegt
          im Sheet, das Zuruecksetzen der Ebene darunter hier. */}
      <motion.div
        animate={
          springs.reduced
            ? {}
            : { scale: isOpen ? 0.985 : 1, transformOrigin: "50% 0%" }
        }
        transition={springs.sheet}
      >
        {children}
      </motion.div>

      <Sheet open={isOpen} onClose={close} triggerRef={triggerRef} title={subject}>
        <RequestForm onDone={close} subject={subject} />
      </Sheet>
    </RequestContext.Provider>
  );
}
