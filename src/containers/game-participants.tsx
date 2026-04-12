import type { RoundStatus } from '@/data/round/types';
import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';
import type { Card } from '@/shared/card/types';
import { useParticipant } from '../providers/participant';
import EditUserProfileButton from './edit-user-profile-button';

function getVoteDisplay(
  cards: Card[],
  voteValue?: number,
  roundStatus?: RoundStatus,
): { display: string; label: string; isEmoji: boolean } {
  if (!roundStatus) {
    return { display: '🤷🏻‍♂️', label: 'No round started', isEmoji: true };
  }

  if (roundStatus === 'revealed') {
    const displayValue = cards.find((card) => card.value === voteValue)?.displayValue ?? '❓';
    const isEmoji = displayValue === '❓';
    return {
      display: displayValue,
      label: isEmoji ? 'No vote' : `Voted ${displayValue}`,
      isEmoji,
    };
  }

  if (voteValue !== undefined) {
    return { display: '👍🏼', label: 'Voted', isEmoji: true };
  }
  return { display: '🤔', label: 'Thinking', isEmoji: true };
}

function getCardColor(cards: Card[], voteValue?: number, roundStatus?: RoundStatus) {
  const defaultBg = 'bg-[var(--accent)]';
  if (!roundStatus) {
    return defaultBg;
  }
  if (roundStatus === 'revealed') {
    return cards.find((card) => card.value === voteValue)?.color ?? defaultBg;
  }

  return defaultBg;
}

export default function GameParticipants() {
  const { participants, round, cards } = useGame();
  const { participant: currentParticipant } = useParticipant();

  return (
    <ul className='no-scrollbar mx-auto my-0 flex w-full gap-2 overflow-x-auto overflow-y-hidden p-4 lg:w-fit'>
      {participants.map((participant) => (
        <li key={participant.id} className='flex flex-col items-center gap-2'>
          <div className='max-w-[96px] truncate text-center text-sm font-semibold'>
            {participant.displayName}
          </div>
          <div className='relative'>
            {participant.id === currentParticipant?.id && (
              <div className='absolute top-0 right-0 z-10'>
                <EditUserProfileButton />
              </div>
            )}
            <div
              className={cn(
                'bg-card text-foreground flex aspect-[2/3] w-24 shrink-0 items-center justify-center rounded-md border text-center font-mono text-2xl font-semibold shadow-md',
                'origin-[center_bottom] rotate-y-[360deg] transition-all',
                getCardColor(cards, participant.vote, round?.status),
                round?.status === 'revealed' &&
                  cards.find((c) => c.value === participant.vote)?.textColor,
                participant.vote === undefined && 'bg-accent text-accent-foreground',
                round?.status === 'revealed' && 'rotate-y-0',
                participant.role === 'spectator' && 'bg-muted text-muted-foreground',
              )}
            >
              {(() => {
                const { display, label, isEmoji } = getVoteDisplay(
                  cards,
                  participant.vote,
                  round?.status,
                );
                return isEmoji ? (
                  <>
                    <span aria-hidden='true'>{display}</span>
                    <span className='sr-only'>{label}</span>
                  </>
                ) : (
                  display
                );
              })()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
