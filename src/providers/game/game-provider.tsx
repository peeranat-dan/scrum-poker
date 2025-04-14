import { useGetParticipantsBySessionId } from "@/hooks/participant/use-get-participants-by-session-id";
import { getCards } from "@/lib/card";
import { useEffect, useMemo } from "react";
import { useSession } from "../session";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { useCreateRound } from "@/hooks/round/use-create-round";
import { useGetActiveRound } from "@/hooks/round/use-get-active-round";
import { useGetVoteByRoundId } from "@/hooks/vote/use-get-vote-by-round-id";
import { useParticipant } from "../participant";

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const session = useSession();
  const { participant } = useParticipant();
  const createRoundMutation = useCreateRound(session.id);
  const { data: activeRoundData, isLoading: isActiveRoundLoading } =
    useGetActiveRound(session.id);
  const { data: participantsData, isLoading: isParticipantsLoading } =
    useGetParticipantsBySessionId(session.id);
  const { data: voteData, isLoading: isVoteLoading } = useGetVoteByRoundId(
    activeRoundData?.id ?? "",
    participant?.id ?? ""
  );

  const value = useMemo(
    () => ({
      session,
      cards: getCards(session.votingSystem),
      participants: participantsData ?? [],
      round: activeRoundData,
      vote: voteData,
    }),
    [session, participantsData, activeRoundData, voteData]
  );

  useEffect(() => {
    if (participantsData && participantsData.length > 0 && !activeRoundData) {
      createRoundMutation.mutate();
    }
  }, []);

  if (isParticipantsLoading || isActiveRoundLoading || isVoteLoading) {
    return <div>Loading...</div>;
  }

  console.log({ activeRoundData, participantsData });

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
