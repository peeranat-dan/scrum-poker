import { useMemo } from "react";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";
import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";

export function GameProvider({
  gameId,
  children,
}: Readonly<GameProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(gameId);

  const value = useMemo(
    () => ({
      session: data,
      loading: isLoading,
    }),
    [data, isLoading]
  );

  if (error) {
    throw error;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
