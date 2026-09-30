"use client";

import { useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";

/**
 * Spring-Tokens.
 *
 * Motions bounce/duration-API bildet Apples Damping/Response ab.
 * Skill §4: "the bounce + duration spring API maps closely to
 * Apple's damping + response."
 *
 *   bounce 0    entspricht damping 1.0  (kritisch gedaempft)
 *   bounce 0.2  entspricht damping ~0.8 (leichtes Ueberschwingen)
 *
 * Ueberschwingen gibt es ausschliesslich dort, wo eine Geste
 * vorher Schwung getragen hat. Skill §4: "Overshoot on a menu
 * that just faded in feels wrong; overshoot on a card you flicked
 * feels right."
 */
export const SPRING = {
  /** Standard fuer alles ohne Geste. damping 1.0 / response 0.35 */
  ui: { type: "spring", bounce: 0, duration: 0.35 },

  /** Press-Feedback. damping 1.0 / response 0.12 */
  press: { type: "spring", bounce: 0, duration: 0.12 },

  /** Nach einem Release mit Schwung. damping 0.8 / response 0.35 */
  momentum: { type: "spring", bounce: 0.2, duration: 0.35 },

  /** Sheet und Drawer. Apples ausgelieferter Wert: 0.8 / 0.3 */
  sheet: { type: "spring", bounce: 0.2, duration: 0.3 },

  /** Reposition und Layout. Apples Wert: 1.0 / 0.4 */
  reposition: { type: "spring", bounce: 0, duration: 0.4 },
} as const satisfies Record<string, Transition>;

/**
 * Ersatz bei prefers-reduced-motion.
 * Skill §14: "replace slides/springs/parallax with short opacity
 * cross-fades. Drop elastic/overshoot. Keep opacity/color changes
 * that aid comprehension."
 */
export const CROSSFADE: Transition = { duration: 0.15, ease: "linear" };

/**
 * Liefert die Springs, die in diesem Moment gelten duerfen.
 * Bei reduzierter Bewegung faellt jeder Spring auf eine kurze
 * Ueberblendung zurueck, und die Aufrufer lassen zusaetzlich
 * ihre transform-Anteile weg (siehe `reduced`).
 */
export function useSprings() {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      reduced: true as const,
      ui: CROSSFADE,
      press: CROSSFADE,
      momentum: CROSSFADE,
      sheet: CROSSFADE,
      reposition: CROSSFADE,
    };
  }

  return { reduced: false as const, ...SPRING };
}
