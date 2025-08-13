import { OriginalEstimateDialog } from '@/components/original-estimate-dialog';
import { Button } from '@/components/ui/button';
import { useRevealRoundWithStreaks } from '@/hooks/round/use-reveal-round-with-streaks';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { copyJoinLink } from '@/shared/utils/copy-join-link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import SessionLeaveButton from './session-leave-button';

export default function GameActions() {
  const { participant } = useParticipant();
  const { round, revealRound, revoteRound, startNewRound, participants, cards } = useGame();
  const [isCooldown, setIsCooldown] = useState(false);
  const [isEstimateDialogOpen, setIsEstimateDialogOpen] = useState(false);
  
  const revealRoundWithStreaksMutation = useRevealRoundWithStreaks();

  const handleRevealRound = () => {
    setIsEstimateDialogOpen(true);
  };

  const handleRevealWithEstimate = async (originalEstimate: number) => {
    if (!round) return;
    
    try {
      await revealRoundWithStreaksMutation.mutateAsync({
        roundId: round.id,
        originalEstimate,
      });
      setIsCooldown(true);
      
      const timer = setTimeout(() => {
        setIsCooldown(false);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      toast.error('Failed to reveal round');
    }
  };

  const handleCopyJoinLink = () => {
    if (participant?.sessionId) {
      copyJoinLink(participant.sessionId);
    }
    toast.success('Join link copied to clipboard');
  };

  const participantsWithNoVotes = useMemo(
    () =>
      participants.filter(
        (participant) =>
          participant.role !== 'spectator' && typeof participant.vote === 'undefined',
      ),
    [participants],
  );

  const shouldDisableRevealVoteButton = participantsWithNoVotes.length > 0;

  // Spectators have limited actions
  if (participant?.role === 'spectator') {
    return (
      <>
        <Button onClick={handleCopyJoinLink}>Invite Players</Button>
        <SessionLeaveButton />
      </>
    );
  }

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
        <OriginalEstimateDialog
          isOpen={isEstimateDialogOpen}
          onClose={() => setIsEstimateDialogOpen(false)}
          onSubmit={handleRevealWithEstimate}
          cards={cards}
        />
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
