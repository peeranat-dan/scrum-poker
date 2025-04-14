import { useStreamParticipants } from "@/hooks/participant/use-stream-participants";
import { useGetActiveRound } from "@/hooks/round/use-get-active-round";
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

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { participant } = useParticipant();

  const { data: activeRoundData, isLoading: isActiveRoundLoading } =
    useGetActiveRound(session.id);
  const { data: voteData, isLoading: isVoteLoading } = useGetVoteByRoundId(
    activeRoundData?.id ?? "",
    participant?.id ?? ""
  );
  const { participants } = useStreamParticipants(session.id);
  const { votes } = useStreamVotes(activeRoundData?.id ?? "");

  const castVoteMutation = useCastVote();
  const updateVoteMutation = useUpdateVote();

  const castVote = useCallback(
    (value: number) => {
      if (!voteData) {
        castVoteMutation.mutate(
          {
            participantId: participant?.id ?? "",
            roundId: activeRoundData?.id ?? "",
            value,
          },
          {
            onSuccess: () => {
              queryClient.refetchQueries({
                queryKey: ["vote", activeRoundData?.id, participant?.id],
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
                queryKey: ["vote", activeRoundData?.id, participant?.id],
              });
            },
          }
        );
      }
    },
    [
      activeRoundData?.id,
      castVoteMutation,
      participant?.id,
      queryClient,
      updateVoteMutation,
      voteData,
    ]
  );

  const value = useMemo(
    () => ({
      cards: getCards(session.votingSystem),
      participants: mapParticipantsToVotes(participants, votes) ?? [],
      round: activeRoundData,
      vote: voteData,
      castVote: castVote,
    }),
    [session, activeRoundData, voteData, castVote, participants, votes]
  );

  if (isActiveRoundLoading || isVoteLoading) {
    return <div>Loading...</div>;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
