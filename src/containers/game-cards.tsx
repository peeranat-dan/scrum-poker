import { cn } from "@/lib/utils";
import { useGame } from "@/providers/game";

export default function GameCards() {
  const { cards, castVote, vote } = useGame();

  return (
    <ul className="mx-auto flex gap-2 w-full lg:w-fit my-0 p-4 overflow-x-auto overflow-y-hidden no-scrollbar">
      {cards.map((card) => (
        <li
          key={card.displayValue + card.value}
          onClick={() => castVote(card.value)}
          className={cn(
            "flex w-20 aspect-[2/3] shrink-0 cursor-pointer items-center justify-center rounded-md border bg-card text-center text-2xl font-semibold font-mono text-foreground shadow-md transition-all hover:scale-105",
            card.color,
            vote?.value === card.value && "scale-110 hover:scale-110"
          )}
        >
          {card.displayValue}
        </li>
      ))}
    </ul>
  );
}
