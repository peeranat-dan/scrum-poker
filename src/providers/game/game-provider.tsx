import { useGetParticipantsBySessionId } from "@/hooks/participant/use-get-participants-by-session-id";
import { getCards } from "@/lib/card";
import { useCallback, useMemo } from "react";
import { useSession } from "../session";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { useGetActiveRound } from "@/hooks/round/use-get-active-round";
import { useGetVoteByRoundId } from "@/hooks/vote/use-get-vote-by-round-id";
import { useParticipant } from "../participant";
import { useCastVote } from "@/hooks/vote/use-cast-vote";
import { useUpdateVote } from "@/hooks/vote/use-update-vote";
import { useQueryClient } from "@tanstack/react-query";

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { participant } = useParticipant();

  const { data: activeRoundData, isLoading: isActiveRoundLoading } =
    useGetActiveRound(session.id);
  const { data: participantsData, isLoading: isParticipantsLoading } =
    useGetParticipantsBySessionId(session.id);
  const { data: voteData, isLoading: isVoteLoading } = useGetVoteByRoundId(
    activeRoundData?.id ?? "",
    participant?.id ?? ""
  );

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
      session,
      cards: getCards(session.votingSystem),
      participants: participantsData ?? [],
      round: activeRoundData,
      vote: voteData,
      castVote: castVote,
    }),
    [session, participantsData, activeRoundData, voteData, castVote]
  );

  if (isParticipantsLoading || isActiveRoundLoading || isVoteLoading) {
    return <div>Loading...</div>;
  }

  console.log({ activeRoundData, participantsData });

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
