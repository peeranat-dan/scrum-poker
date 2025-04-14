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

  return voteValue ? "👍🏼" : "🤔";
}

export default function GameParticipants() {
  const { participants, round, cards } = useGame();

  return (
    <div className="flex flex-wrap gap-4">
      {participants.map((participant) => (
        <div key={participant.id} className="flex flex-col items-center gap-2">
          <div className="text-center text-sm font-semibold truncate max-w-[96px]">
            {participant.displayName}
          </div>
          <div
            className={cn(
              "flex w-24 aspect-[2/3] shrink-0 items-center rounded-md justify-center border border-accent bg-background text-center text-2xl font-semibold font-mono text-foreground shadow-md transition-colors",
              !participant.vote && "bg-accent text-accent-foreground"
            )}
          >
            {getVoteValue(cards, participant.vote, round?.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
