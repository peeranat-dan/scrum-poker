import { Button } from '@/components/ui/button';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { copyJoinLink } from '@/shared/utils/copy-join-link';
import { useMemo } from 'react';
import { toast } from 'sonner';
import SessionLeaveButton from './session-leave-button';

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, startNewRound, participants } = useGame();

  const handleCopyJoinLink = () => {
    if (participant?.sessionId) {
      copyJoinLink(participant.sessionId);
    }
    toast.success('Join link copied to clipboard');
  };

  const participantsWithNoVotes = useMemo(
    () => participants.filter((participant) => typeof participant.vote === 'undefined'),
    [participants],
  );

  const shouldDisableRevealVoteButton = participantsWithNoVotes.length > 0;

  if (participant?.role === 'owner') {
    return (
      <div className='flex items-center justify-center gap-2'>
        {round?.status === 'in-progress' ? (
          <Button onClick={revealRound} disabled={shouldDisableRevealVoteButton}>
            Reveal Vote
          </Button>
        ) : (
          <Button onClick={startNewRound}>Start New Round</Button>
        )}
        <Button onClick={handleCopyJoinLink} variant='ghost'>
          Invite Players
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button onClick={handleCopyJoinLink}>Invite Players</Button>
      <SessionLeaveButton />
    </div>
  );
}
