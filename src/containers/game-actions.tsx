import { Button } from "@/components/ui/button";
import { copyJoinLink } from "@/lib/utils";
import { useGame } from "@/providers/game";
import { useParticipant } from "@/providers/participant";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, startNewRound, participants } = useGame();

  const handleCopyJoinLink = () => {
    if (participant?.sessionId) {
      copyJoinLink(participant.sessionId);
    }
    toast.success("Join link copied to clipboard");
  };

  const participantsWithNoVotes = useMemo(
    () =>
      participants.filter(
        (participant) => typeof participant.vote === "undefined"
      ),
    [participants]
  );

  const shouldDisableRevealVoteButton = participantsWithNoVotes.length > 0;

  if (participant?.isOwner) {
    return (
      <div className="flex gap-2">
        {round?.status === "in-progress" ? (
          <TooltipProvider>
            <Tooltip open={shouldDisableRevealVoteButton}>
              <TooltipTrigger asChild>
                <Button
                  onClick={revealRound}
                  disabled={shouldDisableRevealVoteButton}
                >
                  Reveal Vote
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Person who hasn't vote</p>
                <ul className="m-0 px-4 py-1">
                  {participantsWithNoVotes.map((p) => (
                    <li key={p.id}>
                      <span>{p.displayName}</span>
                      <span> {p.id === participant.id ? "(You)" : ""}</span>
                    </li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button onClick={startNewRound}>Start New Round</Button>
        )}
        <Button onClick={handleCopyJoinLink} variant="ghost">
          Invite Players
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleCopyJoinLink}>Invite Players</Button>
      {/* TODO: Implement leave session */}
      <Button variant="ghost">Leave Session</Button>
    </div>
  );
}
