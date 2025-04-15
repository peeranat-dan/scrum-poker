import { cn } from "@/lib/utils";
import { useGame } from "@/providers/game";
import { type Card } from "@/types/card.types";
import { type RoundStatus } from "@/types/round.types";

function getVoteValue(
  cards: Card[],
  voteValue?: number,
  roundStatus?: RoundStatus
) {
  if (!roundStatus) {
    return "🤷🏻‍♂️";
  }

  if (roundStatus === "revealed") {
    return cards.find((card) => card.value === voteValue)?.displayValue ?? "❓";
  }

  return typeof voteValue !== "undefined" ? "👍🏼" : "🤔";
}

export default function GameParticipants() {
  const { participants, round, cards } = useGame();

  return (
    <ul className="mx-auto flex gap-2 w-full lg:w-fit my-0 p-4 overflow-x-auto overflow-y-hidden">
      {participants.map((participant) => (
        <li key={participant.id} className="flex flex-col items-center gap-2">
          <div className="text-center text-sm font-semibold truncate max-w-[96px]">
            {participant.displayName}
          </div>
          <div
            className={cn(
              "flex w-24 aspect-[2/3] shrink-0 items-center rounded-md justify-center border bg-card text-center text-2xl font-semibold font-mono text-foreground shadow-md",
              typeof participant.vote === "undefined" &&
                "bg-accent text-accent-foreground"
            )}
          >
            {getVoteValue(cards, participant.vote, round?.status)}
          </div>
        </li>
      ))}
    </ul>
  );
}
