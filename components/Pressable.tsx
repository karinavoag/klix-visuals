"use client";

import { motion } from "motion/react";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { useSprings } from "./motion/springs";

type Variant = "primary" | "onDark" | "secondary" | "quiet";

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean;
};

/**
 * Es gibt genau eine gefuellte Flaeche auf der Seite: `primary`.
 * Skill §16 Simplicity: "use hierarchy — order, spacing, contrast —
 * so the most important thing is the most obvious."
 */
const VARIANT: Record<Variant, string> = {
  primary:
    "bg-brand text-on-brand px-6 py-3.5 rounded-full type-small font-medium " +
    "shadow-[var(--shadow-chip)]",
  /* Dieselbe Aktion auf dem Hero-Foto, in der Markenfarbe Pink.
     Text darauf ist #16161a, das ergibt 8.70:1. Weisser Text waere
     auf Pink nur 2.07:1 und faellt deshalb aus.
     Gegen den abgedunkelten Fotogrund setzt sich die Flaeche mit
     4.4:1 ab, im dunkelsten Fall mit mehr.
     Nur hier. Der Header-CTA bleibt Navy. */
  onDark:
    "bg-accent text-on-accent px-6 py-3.5 rounded-full type-small font-medium " +
    "shadow-[var(--shadow-chip)]",
  secondary:
    "border border-line text-ink px-6 py-3.5 rounded-full type-small font-medium",
  quiet: "text-ink-soft hover:text-ink type-small",
  // "quietOnDark" wird ueber className gesetzt, siehe Hero.
};

export const Pressable = forwardRef<HTMLElement, Props>(function Pressable(
  {
    children,
    variant = "secondary",
    href,
    onClick,
    className = "",
    type = "button",
    ariaLabel,
    ariaExpanded,
    ariaHasPopup,
  },
  ref
) {
  const springs = useSprings();

  /**
   * Skill §1: "Respond on pointer-down, not on release."
   * Motions whileTap feuert auf pointerdown, nicht auf click, und
   * endet, sobald der Zeiger das Element verlaesst — das ist das
   * cancel-by-dragging-away aus Skill §10.
   *
   * Skill §14: bei reduzierter Bewegung faellt der transform-Anteil
   * weg, die Rueckmeldung bleibt als Opacity erhalten.
   */
  const whileTap = springs.reduced
    ? { opacity: 0.72 }
    : { scale: 0.97, opacity: 0.92 };

  const whileHover = springs.reduced ? undefined : { scale: 1.015 };

  const shared = {
    ref: ref as never,
    "data-pressable": true,
    className:
      "relative inline-flex items-center justify-center gap-2 " +
      "cursor-pointer select-none " +
      // Skill §10: ~10px Hysterese / Hit-Padding um das Ziel.
      "after:absolute after:-inset-2.5 after:content-['']" +
      ` ${VARIANT[variant]} ${className}`,
    whileTap,
    whileHover,
    // Nur transform und opacity. Skill §11.
    transition: springs.press,
    "aria-label": ariaLabel,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
});
