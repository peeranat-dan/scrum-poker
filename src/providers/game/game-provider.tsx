import { useStreamParticipants } from "@/hooks/participant/use-stream-participants";
import { useRevealRound } from "@/hooks/round/use-reveal-round";
import { useStartNewRound } from "@/hooks/round/use-start-new-round";
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
import Loading from "@/components/loading";

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
  const startNewRoundMutation = useStartNewRound();

  const castVote = useCallback(
    (value: number) => {
      if (round?.status !== "in-progress") {
        return;
      }
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
            id: voteData.id,
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
      round?.status,
      round?.id,
      voteData,
      castVoteMutation,
      participant?.id,
      queryClient,
      updateVoteMutation,
    ]
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
    [
      cards,
      participants,
      votes,
      round,
      voteData,
      castVote,
      revealRound,
      startNewRound,
    ]
  );

  if (isVoteLoading || !round || participants.length === 0) {
    return <Loading fullscreen />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
