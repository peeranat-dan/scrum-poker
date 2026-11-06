import { ExternalLinkIcon, TicketIcon } from 'lucide-react';

import { toIssueLabel } from '@/domain/round/issue';
import { cn } from '@/lib/cn';

interface RoundIssueProps {
  /** The issue id of the round, e.g. `PROJ-123` or a pasted link */
  issueId: string;
  /** Link to the issue in the tracker; renders plain text when `null` */
  href: string | null;
  className?: string;
}

/**
 * Displays the issue being estimated in the round. Becomes a link to the issue
 * tracker when `href` is provided. Fades in when the issue changes so a new
 * ticket doesn't swap in abruptly.
 */
export function RoundIssue({ issueId, href, className }: Readonly<RoundIssueProps>) {
  const label = toIssueLabel(issueId);
  const content = (
    <>
      <TicketIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="truncate">{label}</span>
      {href && <ExternalLinkIcon className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />}
    </>
  );
  const classes = cn(
    'flex min-w-0 items-center gap-2 font-mono text-sm font-semibold',
    'transition-[opacity,filter] duration-200 ease-out-strong starting:opacity-0 starting:blur-[2px]',
    className,
  );

  if (!href) {
    return (
      <span key={issueId} className={classes} title={issueId}>
        {content}
      </span>
    );
  }

  return (
    <a
      key={issueId}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={issueId}
      aria-label={`Open issue ${label} in a new tab`}
      className={cn(classes, 'underline-offset-4 hover:underline')}
    >
      {content}
    </a>
  );
}
