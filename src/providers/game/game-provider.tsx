import Loading from '@/components/loading';
import { filterVotingParticipants } from '@/domain/participant/rules';
import { useStreamParticipants } from '@/hooks/participant/use-stream-participants';
import { useRevealRound } from '@/hooks/round/use-reveal-round';
import { useRevoteRound } from '@/hooks/round/use-revote-round';
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
  const revoteRoundMutation = useRevoteRound();

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

  const revoteRound = useCallback(async () => {
    if (round) {
      revoteRoundMutation.mutateAsync(round.id);
    }
  }, [revoteRoundMutation, round]);

  const startNewRound = useCallback(async () => {
    if (round) {
      startNewRoundMutation.mutateAsync(session.id);
    }
  }, [round, session.id, startNewRoundMutation]);

  const cards = useMemo(() => {
    return getCards(session.votingSystem);
  }, [session.votingSystem]);

  const votingParticipants = useMemo(() => {
    return filterVotingParticipants(participants);
  }, [participants]);

  const value = useMemo(
    () => ({
      cards: cards,
      participants: mapParticipantsToVotes(votingParticipants, votes) ?? [],
      round: round,
      vote: voteData,
      castVote: castVote,
      revealRound: revealRound,
      startNewRound: startNewRound,
      revoteRound: revoteRound,
    }),
    [
      cards,
      votingParticipants,
      votes,
      round,
      voteData,
      castVote,
      revealRound,
      startNewRound,
      revoteRound,
    ],
  );

  if (isVoteLoading || !round || votingParticipants.length === 0) {
    return <Loading fullscreen />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
