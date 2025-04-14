import { useMemo } from "react";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";
import { getCards } from "@/lib/card";

export function GameProvider({
  gameId,
  children,
}: Readonly<GameProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(gameId);

  const value = useMemo(
    () => ({
      session: data,
      loading: isLoading,
      cards: data?.votingSystem ? getCards(data.votingSystem) : [],
    }),
    [data, isLoading]
  );

  if (error) {
    // TODO: Handle error
    throw error;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
