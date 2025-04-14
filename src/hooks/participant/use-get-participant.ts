import { getParticipantBySessionIdAndUserId } from "@/data/participant/get-participant-by-session-id-and-user-id";
import { type Participant } from "@/types/participant.types";
import { type UseMutationOptions, useQuery } from "@tanstack/react-query";

export function useGetParticipant(
  sessionId: string,
  userId: string,
  options?: UseMutationOptions<Participant | null>
) {
  return useQuery({
    queryKey: ["participant", sessionId, userId],
    queryFn: () => getParticipantBySessionIdAndUserId(sessionId, userId),
    enabled: !!sessionId && !!userId,
    ...options,
  });
}
