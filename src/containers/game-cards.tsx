import { ChevronDown, ChevronUp } from 'lucide-react';
import { startTransition, useCallback, useEffect, useOptimistic } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';

const CARD_SHOW_KEY = 'scrum-poker-cards-shown';

export default function GameCards() {
  const { cards, castVote, vote } = useGame();
  const { participant } = useParticipant();
  // NOTE: Lifts the card on click instead of after the vote is saved. Falls back to the
  // saved `vote` once the transition settles, so a failed vote reverts on its own.
  const [currentValue, setOptimisticValue] = useOptimistic(vote?.value);

  const handleSelectCard = (value: number) => {
    // NOTE: Each click shows right away; the vote mutation is scoped so writes run one at a time
    startTransition(async () => {
      setOptimisticValue(value);
      try {
        await castVote(value);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to cast vote');
      }
    });
  };

  const getInitialCardState = useCallback(() => {
    if (typeof window === 'undefined') return true; // SSR safety
    try {
      const saved = localStorage.getItem(CARD_SHOW_KEY);
      if (saved === null) return true;

      const parsed = JSON.parse(saved);
      return typeof parsed === 'boolean' ? parsed : true;
    } catch {
      return true;
    }
  }, []);

  const [isCardShown, { toggle: toggleShowCard }] = useDisclosure(getInitialCardState());

  useEffect(() => {
    localStorage.setItem(CARD_SHOW_KEY, JSON.stringify(isCardShown));
  }, [isCardShown]);

  // Don't show cards if user cannot vote (spectators)
  const userCanVote = participant?.role !== 'spectator' && participant?.status === 'active';

  if (!userCanVote) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">You are watching as a spectator</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center transition-[opacity,translate] duration-200 ease-out-strong starting:translate-y-6 starting:opacity-0 motion-reduce:starting:translate-y-0">
      <Button
        onClick={toggleShowCard}
        size="icon"
        variant="ghost"
        aria-label={isCardShown ? 'Hide cards' : 'Show cards'}
        className={cn(
          'transition-[translate,background-color] duration-200 ease-out-strong',
          !isCardShown && 'translate-y-31.25',
        )}
      >
        {isCardShown ? <ChevronDown /> : <ChevronUp />}
      </Button>
      <ul
        className={cn(
          'no-scrollbar mx-auto my-0 flex w-full list-none items-center gap-2 overflow-x-auto p-4 px-4 transition-[translate] duration-200 ease-out-strong lg:w-fit',
          !isCardShown && 'translate-y-full',
        )}
      >
        {cards.map((card) => (
          <li key={card.displayValue + card.value}>
            <button
              type="button"
              onClick={() => handleSelectCard(card.value)}
              aria-label={`Vote ${card.displayValue}`}
              aria-pressed={currentValue === card.value}
              className={cn(
                'flex aspect-2/3 w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-card text-center font-mono text-2xl font-semibold text-foreground shadow-md',
                'transition-[translate,scale,box-shadow] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:active:scale-100',
                card.color,
                card.textColor,
                currentValue === card.value
                  ? '-translate-y-3 shadow-xl ring-2 ring-foreground/70 ring-offset-2 ring-offset-background'
                  : 'hover:-translate-y-1',
              )}
            >
              {card.displayValue}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
