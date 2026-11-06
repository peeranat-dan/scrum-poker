import type { ReactNode } from 'react';

interface VoteProgressProps {
  /** Number of participants who have voted */
  voted: number;
  /** Number of participants who can vote */
  total: number;
  /** Rendered next to the count, e.g. a popover listing who hasn't voted */
  action?: ReactNode;
}

/**
 * Shows how many participants have voted in the round as a count and a progress bar.
 * The bar fills with a `scaleX` transform so it stays on the compositor.
 */
export function VoteProgress({ voted, total, action }: Readonly<VoteProgressProps>) {
  const ratio = total === 0 ? 0 : Math.min(voted / total, 1);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-6 items-center justify-between text-sm">
        <p>
          <span className="font-semibold tabular-nums">{voted}</span>
          <span className="text-muted-foreground"> of {total} voted</span>
        </p>
        {action}
      </div>
      <progress className="sr-only" aria-label="Votes cast" value={voted} max={total} />
      <div aria-hidden="true" className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full w-full origin-left bg-primary transition-transform duration-300 ease-out-strong"
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
    </div>
  );
}
