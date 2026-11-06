import type { RoundStatus } from '@/data/round/types';
import type { Card } from '@/shared/card/types';

import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';

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

/** Delay between each card flip on reveal; capped so large rooms still reveal quickly */
const FLIP_STAGGER_MS = 20;
const MAX_FLIP_STAGGER_MS = 100;

const cardFaceClassName =
  'absolute inset-0 flex items-center justify-center rounded-md border text-2xl shadow-md backface-hidden';

export default function GameParticipants() {
  const { participants, round, cards } = useGame();
  const { participant: currentParticipant } = useParticipant();

  const isRevealed = round?.status === 'revealed';

  return (
    <ul className="no-scrollbar mx-auto my-0 flex w-full gap-2 overflow-x-auto overflow-y-hidden p-4 lg:w-fit">
      {participants.map((participant, index) => {
        const { display, label, isEmoji } = getVoteDisplay(cards, participant.vote, round?.status);
        const hasVoted = participant.vote !== undefined;
        // NOTE: Stagger only the reveal; flipping back for a new round happens all at once
        const flipDelay = isRevealed ? Math.min(index * FLIP_STAGGER_MS, MAX_FLIP_STAGGER_MS) : 0;

        return (
          <li key={participant.id} className="flex flex-col items-center gap-2">
            <div className="max-w-[96px] truncate text-center text-sm font-semibold">
              {participant.displayName}
            </div>
            <div className="relative perspective-[800px]">
              {participant.id === currentParticipant?.id && (
                <div className="absolute top-0 right-0 z-10">
                  <EditUserProfileButton />
                </div>
              )}
              <span className="sr-only">{label}</span>
              <div
                aria-hidden="true"
                style={{ transitionDelay: `${flipDelay}ms` }}
                className={cn(
                  'relative aspect-[2/3] w-24 shrink-0 transform-3d',
                  'motion-safe:transition-transform motion-safe:ease-out-strong',
                  isRevealed ? 'duration-300 motion-safe:rotate-y-180' : 'duration-200',
                )}
              >
                {/* Front: thinking / voted */}
                <div
                  className={cn(
                    cardFaceClassName,
                    'transition-[background-color,opacity] duration-200',
                    hasVoted ? 'bg-primary/20' : 'bg-accent text-accent-foreground',
                    isRevealed && 'motion-reduce:opacity-0',
                  )}
                >
                  {!isRevealed && (
                    <span
                      key={display}
                      className="transition-[opacity,scale] duration-200 ease-out-strong starting:scale-75 starting:opacity-0"
                    >
                      {display}
                    </span>
                  )}
                </div>
                {/* Back: revealed vote */}
                <div
                  className={cn(
                    cardFaceClassName,
                    'bg-card text-center font-mono font-semibold text-foreground motion-safe:rotate-y-180',
                    'transition-opacity duration-200',
                    getCardColor(cards, participant.vote, round?.status),
                    isRevealed && cards.find((c) => c.value === participant.vote)?.textColor,
                    !hasVoted && 'bg-accent text-accent-foreground',
                    !isRevealed && 'motion-reduce:opacity-0',
                  )}
                >
                  {isRevealed && (isEmoji ? <span>{display}</span> : display)}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
