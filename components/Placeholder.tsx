import type { ReactNode } from "react";

/**
 * Sichtbare Markierung fuer fehlenden Inhalt.
 * Skill §16 Responsibility: nichts vortaeuschen, was nicht da ist.
 * Blindtext oder erfundene Kundennamen waeren genau das.
 */
export function Placeholder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      data-placeholder
      className={
        "inline-block rounded-sm border border-dashed border-ink/40 " +
        "bg-ink/[0.03] px-2 py-0.5 text-ink-soft " +
        className
      }
    >
      {children}
    </span>
  );
}

/** Flaechiger Platzhalter, z.B. fuer ein fehlendes Projektbild. */
export function PlaceholderFrame({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      data-placeholder
      className={
        "flex items-center justify-center rounded-[1rem] border border-dashed " +
        "border-ink/30 bg-ink/[0.03] p-6 text-center type-small text-ink-soft " +
        className
      }
    >
      {label}
    </div>
  );
}
