import { Button } from '@/components/ui/button';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { copyJoinLink } from '@/shared/utils/copy-join-link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import SessionLeaveButton from './session-leave-button';

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, revoteRound, startNewRound, participants } = useGame();
  const [isCooldown, setIsCooldown] = useState(false);

  const handleRevealRound = () => {
    revealRound();
    setIsCooldown(true);

    const timer = setTimeout(() => {
      setIsCooldown(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

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
          <Button
            onClick={handleRevealRound}
            disabled={shouldDisableRevealVoteButton}
            className='w-full'
          >
            Reveal Vote
          </Button>
        ) : (
          <>
            <Button onClick={startNewRound} disabled={isCooldown} className='flex-1'>
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
