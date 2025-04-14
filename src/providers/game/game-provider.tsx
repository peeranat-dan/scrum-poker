import { useMemo } from "react";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";
import { getCards } from "@/lib/card";
import { useAuth } from "../auth";
import { useGetParticipant } from "@/hooks/participant/use-get-participant";

export function GameProvider({
  gameId,
  children,
}: Readonly<GameProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(gameId);
  const { user } = useAuth();
  const { data: participantData, isLoading: isParticipantLoading } =
    useGetParticipant(gameId, user?.uid ?? "");

  const value = useMemo(
    () => ({
      session: data,
      loading: isLoading || isParticipantLoading,
      cards: data?.votingSystem ? getCards(data.votingSystem) : [],
      playerInfo: participantData,
    }),
    [data, isLoading, isParticipantLoading, participantData]
  );

  if (error) {
    // TODO: Handle error
    throw error;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
