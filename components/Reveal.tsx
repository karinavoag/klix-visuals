"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSprings } from "./motion/springs";

/**
 * Einblenden beim Scrollen.
 *
 * Skill §4: damping 1.0, kein Ueberschwingen — es ging keine Geste
 * voraus, die Schwung getragen haette.
 * Skill §14: bei reduzierter Bewegung bleibt nur die Opacity,
 * der Versatz faellt weg.
 * Skill §11: animiert werden ausschliesslich transform und opacity.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const springs = useSprings();

  return (
    <motion.div
      className={className}
      initial={springs.reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ ...springs.ui, delay }}
    >
      {children}
    </motion.div>
  );
}
