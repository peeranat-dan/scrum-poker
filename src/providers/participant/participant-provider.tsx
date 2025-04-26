import Loading from "@/components/loading";
import { useStreamParticipant } from "@/hooks/participant/use-stream-participant";
import { useUpdateParticipantName } from "@/hooks/participant/use-update-participant-name";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ParticipantContext } from "./participant-context";
import { type ParticipantProviderProps } from "./types";

export function ParticipantProvider({
  children,
  sessionId,
  uid,
}: Readonly<ParticipantProviderProps>) {
  const queryClient = useQueryClient();

  const { participant, loading: isLoading } = useStreamParticipant(
    sessionId,
    uid
  );

  const updateParticipantNameMutation = useUpdateParticipantName();

  const updateParticipantName = useCallback(
    async (name: string) => {
      if (!participant) return;
      await updateParticipantNameMutation.mutateAsync(
        {
          id: participant.id,
          displayName: name,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["participant", sessionId, uid],
            });
          },
        }
      );
    },
    [participant, queryClient, sessionId, uid, updateParticipantNameMutation]
  );

  const value = useMemo(
    () => ({
      participant: participant,
      updateParticipantName: updateParticipantName,
    }),
    [participant, updateParticipantName]
  );

  if (isLoading) {
    return <Loading fullscreen />;
  }

  return (
    <ParticipantContext.Provider value={value}>
      {children}
    </ParticipantContext.Provider>
  );
}
