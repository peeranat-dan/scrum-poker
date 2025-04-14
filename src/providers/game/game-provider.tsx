import { useStreamParticipants } from "@/hooks/participant/use-stream-participants";
import { useStreamActiveRound } from "@/hooks/round/use-stream-active-round";
import { useCastVote } from "@/hooks/vote/use-cast-vote";
import { useGetVoteByRoundId } from "@/hooks/vote/use-get-vote-by-round-id";
import { useStreamVotes } from "@/hooks/vote/use-stream-votes";
import { useUpdateVote } from "@/hooks/vote/use-update-vote";
import { getCards } from "@/lib/card";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useParticipant } from "../participant";
import { useSession } from "../session";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { mapParticipantsToVotes } from "./utils";
import { useRevealRound } from "@/hooks/round/use-reveal-round";

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { participant } = useParticipant();
  const revealRoundMutation = useRevealRound();

  const { round } = useStreamActiveRound(session.id);
  const { data: voteData, isLoading: isVoteLoading } = useGetVoteByRoundId(
    round?.id ?? "",
    participant?.id ?? ""
  );
  const { participants } = useStreamParticipants(session.id);
  const { votes } = useStreamVotes(round?.id ?? "");

  const castVoteMutation = useCastVote();
  const updateVoteMutation = useUpdateVote();

  const castVote = useCallback(
    (value: number) => {
      if (!voteData) {
        castVoteMutation.mutate(
          {
            participantId: participant?.id ?? "",
            roundId: round?.id ?? "",
            value,
          },
          {
            onSuccess: () => {
              queryClient.refetchQueries({
                queryKey: ["vote", round?.id, participant?.id],
              });
            },
          }
        );
      } else {
        updateVoteMutation.mutate(
          {
            voteId: voteData.id,
            value,
          },
          {
            onSuccess: () => {
              queryClient.refetchQueries({
                queryKey: ["vote", round?.id, participant?.id],
              });
            },
          }
        );
      }
    },
    [
      round?.id,
      castVoteMutation,
      participant?.id,
      queryClient,
      updateVoteMutation,
      voteData,
    ]
  );

  const revealRound = useCallback(async () => {
    if (round) {
      revealRoundMutation.mutateAsync(round.id);
    }
  }, [revealRoundMutation, round]);

  const value = useMemo(
    () => ({
      cards: getCards(session.votingSystem),
      participants: mapParticipantsToVotes(participants, votes) ?? [],
      round: round,
      vote: voteData,
      castVote: castVote,
      revealRound: revealRound,
    }),
    [
      session.votingSystem,
      participants,
      votes,
      round,
      voteData,
      castVote,
      revealRound,
    ]
  );

  if (isVoteLoading || !round || participants.length === 0) {
    return <div>Loading...</div>;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
