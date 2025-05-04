import { type RoundStatus } from '@/data/round/types';
import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';
import { type Card } from '@/shared/card/types';

function getVoteValue(cards: Card[], voteValue?: number, roundStatus?: RoundStatus) {
  if (!roundStatus) {
    return '🤷🏻‍♂️';
  }

  if (roundStatus === 'revealed') {
    return cards.find((card) => card.value === voteValue)?.displayValue ?? '❓';
  }

  return typeof voteValue !== 'undefined' ? '👍🏼' : '🤔';
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

  return (
    <ul className='no-scrollbar mx-auto my-0 flex w-full gap-2 overflow-x-auto overflow-y-hidden p-4 lg:w-fit'>
      {participants.map((participant) => (
        <li key={participant.id} className='flex flex-col items-center gap-2'>
          <div className='max-w-[96px] truncate text-center text-sm font-semibold'>
            {participant.displayName}
          </div>
          <div
            className={cn(
              'bg-card text-foreground flex aspect-[2/3] w-24 shrink-0 items-center justify-center rounded-md border text-center font-mono text-2xl font-semibold shadow-md',
              getCardColor(cards, participant.vote, round?.status),
              typeof participant.vote === 'undefined' && 'bg-accent text-accent-foreground',
            )}
          >
            {getVoteValue(cards, participant.vote, round?.status)}
          </div>
        </li>
      ))}
    </ul>
  );
}
