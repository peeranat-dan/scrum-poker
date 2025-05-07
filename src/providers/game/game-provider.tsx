import Loading from '@/components/loading';
import { useStreamParticipants } from '@/hooks/participant/use-stream-participants';
import { useRevealRound } from '@/hooks/round/use-reveal-round';
import { useStartNewRound } from '@/hooks/round/use-start-new-round';
import { useStreamActiveRound } from '@/hooks/round/use-stream-active-round';
import { useCastOrUpdateVote } from '@/hooks/vote/use-cast-or-update-vote';
import { useGetParticipantVoteByRoundId } from '@/hooks/vote/use-get-participant-vote-by-round-id';
import { useStreamVotes } from '@/hooks/vote/use-stream-votes';
import { getCards } from '@/shared/card/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useParticipant } from '../participant';
import { useSession } from '../session';
import { GameContext } from './game-context';
import { type GameProviderProps } from './types';
import { mapParticipantsToVotes } from './utils';

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { participant } = useParticipant();
  const revealRoundMutation = useRevealRound();

  const { round } = useStreamActiveRound(session.id);
  const { data: voteData, isLoading: isVoteLoading } = useGetParticipantVoteByRoundId({
    roundId: round?.id ?? '',
    participantId: participant?.id ?? '',
  });
  const { participants } = useStreamParticipants(session.id);
  const { votes } = useStreamVotes(round?.id ?? '');

  const castOrUpdateVoteMutation = useCastOrUpdateVote();
  const startNewRoundMutation = useStartNewRound();

  const castVote = useCallback(
    async (value: number) => {
      if (!participant || !round) return;
      await castOrUpdateVoteMutation.mutateAsync(
        {
          participantId: participant.id,
          roundId: round.id,
          value,
        },
        {
          onSuccess: () => {
            queryClient.refetchQueries({
              queryKey: ['vote', round?.id, participant?.id],
            });
          },
        },
      );
    },
    [participant, round, castOrUpdateVoteMutation, queryClient],
  );

  const revealRound = useCallback(async () => {
    if (round) {
      revealRoundMutation.mutateAsync(round.id);
    }
  }, [revealRoundMutation, round]);

  const startNewRound = useCallback(async () => {
    if (round) {
      startNewRoundMutation.mutateAsync(session.id);
    }
  }, [round, session.id, startNewRoundMutation]);

  const cards = useMemo(() => {
    return getCards(session.votingSystem);
  }, [session.votingSystem]);

  const value = useMemo(
    () => ({
      cards: cards,
      participants: mapParticipantsToVotes(participants, votes) ?? [],
      round: round,
      vote: voteData,
      castVote: castVote,
      revealRound: revealRound,
      startNewRound: startNewRound,
    }),
    [cards, participants, votes, round, voteData, castVote, revealRound, startNewRound],
  );

  if (isVoteLoading || !round || participants.length === 0) {
    return <Loading fullscreen />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
