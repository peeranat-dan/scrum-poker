import { cn } from "@/lib/utils";
import { useGame } from "@/providers/game";
import { type RoundStatus } from "@/types/round.types";

function getVoteValue(voteValue?: number, roundStatus?: RoundStatus) {
  if (!roundStatus) {
    return "🤷🏻‍♂️";
  }

  if (roundStatus === "revealed") {
    return voteValue;
  }

  return voteValue ? "👍🏼" : "🤔";
}

export default function GameParticipants() {
  const { participants, round } = useGame();

  return (
    <div className="flex gap-4">
      {participants.map((participant) => (
        <div key={participant.id} className="flex flex-col items-center gap-2">
          <div className="text-center text-sm font-semibold">
            {participant.displayName}
          </div>
          <div
            className={cn(
              "flex w-24 aspect-[2/3] shrink-0 items-center rounded-md justify-center border border-accent bg-background text-center text-2xl font-semibold font-mono text-foreground shadow-md",
              !participant.vote && "bg-accent text-accent-foreground"
            )}
          >
            {getVoteValue(participant.vote, round?.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
