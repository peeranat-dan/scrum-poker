import { useGame } from "@/providers/game";

export default function GameCards() {
  const { cards } = useGame();
  // TODO: Implement vote system

  return (
    <div className="flex gap-2">
      {cards.map((card) => (
        <div
          key={card.displayValue + card.value}
          className="flex w-20 aspect-[2/3] shrink-0 cursor-pointer items-center justify-center rounded-md border border-accent bg-background text-center text-2xl font-semibold font-mono text-foreground shadow-md transition-all hover:scale-105 hover:bg-accent/80"
        >
          {card.displayValue}
        </div>
      ))}
    </div>
  );
}
