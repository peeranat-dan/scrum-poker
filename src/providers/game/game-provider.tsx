import { useGetParticipant } from "@/hooks/participant/use-get-participant";
import { useUpdateParticipantName } from "@/hooks/participant/use-update-participant-name";
import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";
import { getCards } from "@/lib/card";
import { useCallback, useMemo } from "react";
import { useAuth } from "../auth";
import { GameContext } from "./game-context";
import { type GameProviderProps } from "./types";

export function GameProvider({
  gameId,
  children,
}: Readonly<GameProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(gameId);
  const { user } = useAuth();
  const { data: participantData, isLoading: isParticipantLoading } =
    useGetParticipant(gameId, user?.uid ?? "");

  const updateParticipantNameMutation = useUpdateParticipantName();

  const updateParticipantName = useCallback(
    async (name: string) => {
      if (!participantData) return;
      await updateParticipantNameMutation.mutateAsync({
        participantId: participantData.id,
        name,
      });
    },
    [participantData, updateParticipantNameMutation]
  );

  const value = useMemo(
    () => ({
      session: data,
      loading: isLoading || isParticipantLoading,
      cards: data?.votingSystem ? getCards(data.votingSystem) : [],
      playerInfo: participantData,
      updateParticipantName,
    }),
    [
      data,
      isLoading,
      isParticipantLoading,
      participantData,
      updateParticipantName,
    ]
  );

  if (error) {
    // TODO: Handle error
    throw error;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
