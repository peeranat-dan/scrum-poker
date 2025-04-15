import { Button } from "@/components/ui/button";
import { copyJoinLink } from "@/lib/utils";
import { useGame } from "@/providers/game";
import { useParticipant } from "@/providers/participant";
import { toast } from "sonner";

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, startNewRound } = useGame();

  const handleCopyJoinLink = () => {
    if (participant?.sessionId) {
      copyJoinLink(participant.sessionId);
    }
    toast.success("Join link copied to clipboard");
  };

  if (participant?.isOwner) {
    return (
      <div className="flex gap-2">
        {round?.status === "in-progress" ? (
          <Button onClick={revealRound}>Reveal Vote</Button>
        ) : (
          <Button onClick={startNewRound}>Start New Session</Button>
        )}
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
