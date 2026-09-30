/**
 * Apples Momentum-Projektion aus dem Sample-Code zu
 * "Designing Fluid Interfaces" (WWDC 2018).
 *
 * Skill §6: "Don't snap to the nearest boundary from the release
 * point. Use velocity to project the resting position."
 *
 * Ausdruecklich NICHT die Lehrbuchformel v^2 / (2*decel) — der
 * Skill nennt die exponentielle Zerfallsform als die, die Apple
 * tatsaechlich ausliefert.
 */
export function project(
  initialVelocity: number,
  decelerationRate = 0.998
): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressiver Widerstand an einer Grenze statt hartem Stopp.
 * Skill §9: "A hard stop reads as frozen; continuous resistance
 * reads as responsive, but there's nothing more here."
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
): number {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}
