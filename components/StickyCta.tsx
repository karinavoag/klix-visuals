"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { Pressable } from "./Pressable";
import { useRequest } from "./SiteShell";
import { useSprings } from "./motion/springs";

/**
 * Der CTA bleibt auf Compact erreichbar, sobald der Hero heraus ist.
 * Skill §16 Wayfinding: "Where can I go?" darf nie unbeantwortet sein.
 *
 * Skill §12: kein Glas auf Glas — sobald das Sheet offen ist,
 * verschwindet dieser Balken. Das ist die einzige Stelle der Seite,
 * an der zwei durchscheinende Flaechen kollidieren koennten.
 */
export function StickyCta() {
  const { open, isOpen } = useRequest();
  const ctaRef = useRef<HTMLElement>(null);
  const springs = useSprings();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPast(y > 480));

  const visible = past && !isOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          /* Enter- und Exit-Weg sind identisch. Skill §7. */
          initial={springs.reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={springs.reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={springs.ui}
          className="glass-chrome fixed inset-x-0 bottom-0 z-30
                     px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:hidden"
        >
          <Pressable
            ref={ctaRef}
            variant="primary"
            onClick={() => open(ctaRef.current)}
            ariaHasPopup
            className="w-full"
          >
            Projekt anfragen
          </Pressable>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
