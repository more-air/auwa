/*
  StepProgress — progress indicator for multi-step flows (Welcome's
  question steps, Senshin's working steps, the daily flow).

  Modelled on Stoic: equal-width segments so the shape of the flow and
  how much remains is legible at a glance. Completed and current
  segments fill solid; upcoming ones sit as faint hairlines.

  Deliberately omitted from the atmospheric beats (the welcome line,
  the first-gift moment, the breath interlude, the closure) so those
  moments stay chrome-free.
*/

export type StepProgressProps = {
  total: number;
  /** Zero-based index of the current step. */
  current: number;
  className?: string;
};

export function StepProgress({ total, current, className = "" }: StepProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className={["flex items-center justify-center gap-1.5", className].join(" ")}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={[
            "h-[3px] w-6 rounded-pill transition-colors duration-[var(--duration-page)] ease-[var(--ease-out-expo)]",
            i <= current ? "bg-cosmic-50/85" : "bg-cosmic-50/15",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
