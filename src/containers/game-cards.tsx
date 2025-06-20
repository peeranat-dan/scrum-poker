import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function GameCards() {
  const { cards, castVote, vote } = useGame();

  const [isCardShown, { toggle: toggleShowCard }] = useDisclosure(true);

  return (
    <div className={cn('flex w-full flex-col items-center justify-center')}>
      <Button
        onClick={toggleShowCard}
        size='icon'
        variant='ghost'
        className={cn('transition-all duration-200', !isCardShown && 'translate-y-[125px]')}
      >
        {isCardShown ? <ChevronDown /> : <ChevronUp />}
      </Button>
      <ul
        className={cn(
          'no-scrollbar mx-auto my-0 flex w-full list-none items-center gap-2 overflow-x-auto p-4 px-4 transition-all duration-200 lg:w-fit',
          !isCardShown && '-translate-y-[-100%]',
        )}
      >
        {cards.map((card) => (
          <li key={card.displayValue + card.value}>
            <button
              onClick={() => castVote(card.value)}
              className={cn(
                'bg-card text-foreground flex aspect-[2/3] w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border text-center font-mono text-2xl font-semibold shadow-md transition-all hover:scale-105',
                card.color,
                vote?.value === card.value && 'scale-110 hover:scale-110',
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
