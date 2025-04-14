import { useGetParticipant } from "@/hooks/participant/use-get-participant";
import { useUpdateParticipantName } from "@/hooks/participant/use-update-participant-name";
import { type Participant } from "@/types/participant.types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { ParticipantContext } from "./participant-context";
import { type ParticipantProviderProps } from "./types";

export function ParticipantProvider({
  children,
  sessionId,
  uid,
}: Readonly<ParticipantProviderProps>) {
  const queryClient = useQueryClient();

  const [participant, setParticipant] = useState<Participant | null>(null);

  const { isLoading, error } = useGetParticipant(sessionId, uid, {
    onSuccess: (result) => {
      setParticipant(result);
    },
  });

  const updateParticipantNameMutation = useUpdateParticipantName();

  const updateParticipantName = useCallback(
    async (name: string) => {
      if (!participant) return;
      await updateParticipantNameMutation.mutateAsync(
        {
          participantId: participant.id,
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
