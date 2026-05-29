/*
  StepProgress — minimal progress indicator for multi-step flows
  (Welcome's question steps, Senshin's working steps, the daily flow).

  A row of thin bars: the active step elongates to a short pill, past
  steps sit at mid opacity, upcoming steps at a faint hairline. No
  numbers, no percentage — quiet feedback that the flow has a shape
  and an end, without turning it into a task to complete.

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
            "h-1 rounded-full transition-all duration-[var(--duration-page)] ease-[var(--ease-out-expo)]",
            i === current
              ? "w-5 bg-cosmic-50/80"
              : i < current
                ? "w-1.5 bg-cosmic-50/40"
                : "w-1.5 bg-cosmic-50/15",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
