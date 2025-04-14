import { cn } from "@/lib/utils";
import { useGame } from "@/providers/game";

export default function GameCards() {
  const { cards, castVote, vote } = useGame();

  return (
    <div className="flex gap-2">
      {cards.map((card) => (
        <button
          key={card.displayValue + card.value}
          onClick={() => castVote(card.value)}
          className={cn(
            "flex w-20 aspect-[2/3] shrink-0 cursor-pointer items-center justify-center rounded-md border border-accent bg-background text-center text-2xl font-semibold font-mono text-foreground shadow-md transition-all hover:scale-105 hover:bg-accent/80",
            vote?.value === card.value &&
              "bg-primary text-primary-foreground hover:bg-primary/70"
          )}
        >
          {card.displayValue}
        </button>
      ))}
    </div>
  );
}
