import { cn } from "@/lib/utils";
import { useGame } from "@/providers/game";

export default function GameParticipants() {
  const { participants } = useGame();

  return (
    <div className="flex gap-2">
      {participants.map((participant) => (
        <div key={participant.id} className="flex flex-col items-center gap-2">
          <div className="text-center text-sm font-semibold">
            {participant.displayName}
          </div>
          <div
            className={cn(
              "flex w-20 aspect-[2/3] shrink-0 items-center justify-center rounded-md border border-accent bg-background text-center text-2xl font-semibold font-mono text-foreground shadow-md"
              //   voteValue && "bg-primary text-primary-foreground hover:bg-primary/70"
            )}
          >
            {/* TODO: Handle vote value here {voteValue ?? "🤔"} */}
            😇
          </div>
        </div>
      ))}
    </div>
  );
}
