import { Button } from '@/components/ui/button';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { copyJoinLink } from '@/shared/utils/copy-join-link';
import { useMemo } from 'react';
import { toast } from 'sonner';
import SessionLeaveButton from './session-leave-button';

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, revoteRound, startNewRound, participants } = useGame();

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
      <>
        {round?.status === 'in-progress' ? (
          <Button onClick={revealRound} disabled={shouldDisableRevealVoteButton} className='w-full'>
            Reveal Vote
          </Button>
        ) : (
          <>
            <Button onClick={startNewRound} className='flex-1'>
              Start New Round
            </Button>
            <Button onClick={revoteRound} variant='outline'>
              Revote
            </Button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Button onClick={handleCopyJoinLink}>Invite Players</Button>
      <SessionLeaveButton />
    </>
  );
}
