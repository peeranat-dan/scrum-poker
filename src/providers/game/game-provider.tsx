import { useGetParticipantsBySessionId } from "@/hooks/participant/use-get-participants-by-session-id";
import { getCards } from "@/lib/card";
import { useMemo } from "react";
import { useSession } from "../session";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";

export function GameProvider({ children }: Readonly<GameProviderProps>) {
  const session = useSession();

  const { data: participantsData, isLoading: isParticipantsLoading } =
    useGetParticipantsBySessionId(session.id);

  const value = useMemo(
    () => ({
      session,
      cards: getCards(session.votingSystem),
      participants: participantsData ?? [],
    }),
    [session, participantsData]
  );

  if (isParticipantsLoading) {
    return <div>Loading...</div>;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
