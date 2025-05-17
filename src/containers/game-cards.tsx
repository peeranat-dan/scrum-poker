import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';

export default function GameCards() {
  const { cards, castVote, vote } = useGame();

  return (
    <ul className='no-scrollbar mx-auto my-0 flex w-full gap-2 overflow-x-auto overflow-y-hidden p-4 lg:w-fit'>
      {cards.map((card) => (
        <li
          key={card.displayValue + card.value}
          onClick={() => castVote(card.value)}
          className={cn(
            'bg-card text-foreground flex aspect-[2/3] w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border text-center font-mono text-2xl font-semibold shadow-md transition-all hover:scale-105',
            card.color,
            vote?.value === card.value && 'scale-110 hover:scale-110',
          )}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.code === 'Enter' || e.key === ' ' || e.code === 'Space') {
              castVote(card.value);
            }
          }}
        >
          {card.displayValue}
        </li>
      ))}
    </ul>
  );
}
