import { useGetParticipant } from "@/hooks/participant/use-get-participant";
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

  const { data, isLoading, error } = useGetParticipant(sessionId, uid, {});

  const updateParticipantNameMutation = useUpdateParticipantName();

  const updateParticipantName = useCallback(
    async (name: string) => {
      if (!data) return;
      await updateParticipantNameMutation.mutateAsync(
        {
          participantId: data.id,
          name,
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
    [data, queryClient, sessionId, uid, updateParticipantNameMutation]
  );

  const value = useMemo(
    () => ({
      participant: data,
      updateParticipantName: updateParticipantName,
    }),
    [data, updateParticipantName]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ParticipantContext.Provider value={value}>
      {children}
    </ParticipantContext.Provider>
  );
}
