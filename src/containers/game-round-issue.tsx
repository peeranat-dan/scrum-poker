import { PencilIcon, PlusIcon } from 'lucide-react';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { toast } from 'sonner';

import { RoundIssue } from '@/components/round-issue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isSessionOwner } from '@/domain/participant/rules';
import { MAX_ISSUE_ID_LENGTH, toIssueUrl } from '@/domain/round/issue';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';

/**
 * Shows the issue being estimated in the active round. The session owner can add,
 * edit or clear it inline; everyone else sees it read-only.
 */
export default function GameRoundIssue() {
  const { round, updateIssueId } = useGame();
  const { issueTrackerUrl } = useSession();
  const { participant } = useParticipant();
  const [isEditing, setIsEditing] = useState(false);

  const issueId = round?.issueId ?? null;
  const canEdit = isSessionOwner(participant);

  const save = async (value: string) => {
    setIsEditing(false);

    if (value.trim() === (issueId ?? '')) return;

    try {
      await updateIssueId(value);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update issue ID');
    }
  };

  // NOTE: Enter and Escape both blur the input so saving only ever happens in `onBlur`
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.querySelector('input')?.blur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.currentTarget.value = issueId ?? '';
      event.currentTarget.blur();
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          name="issueId"
          aria-label="Issue ID"
          placeholder="PROJ-123 or paste a link"
          defaultValue={issueId ?? ''}
          maxLength={MAX_ISSUE_ID_LENGTH}
          autoComplete="off"
          // oxlint-disable-next-line jsx-a11y/no-autofocus -- the input replaces the button the user just clicked
          autoFocus
          onKeyDown={handleKeyDown}
          onBlur={(event) => void save(event.currentTarget.value)}
          className="h-10 font-mono"
        />
      </form>
    );
  }

  if (!issueId) {
    if (!canEdit) {
      return (
        <p className="flex h-10 items-center text-sm text-muted-foreground">No issue linked</p>
      );
    }

    return (
      <Button
        variant="outline"
        onClick={() => setIsEditing(true)}
        className="h-10 w-full justify-start border-dashed text-muted-foreground"
      >
        <PlusIcon />
        Add issue ID
      </Button>
    );
  }

  return (
    <div className="flex h-10 w-full items-center justify-between gap-2 rounded-md bg-accent px-3">
      <RoundIssue issueId={issueId} href={toIssueUrl(issueId, issueTrackerUrl)} />
      {canEdit && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Edit issue ID"
          onClick={() => setIsEditing(true)}
          className="size-7 shrink-0"
        >
          <PencilIcon className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
