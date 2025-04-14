import { getParticipantBySessionIdAndUserId } from "@/data/participant/get-participant-by-session-id-and-user-id";
import { useQuery } from "@tanstack/react-query";

export function useGetParticipant(sessionId: string, userId: string) {
  return useQuery({
    queryKey: ["participant", sessionId, userId],
    queryFn: () => getParticipantBySessionIdAndUserId(sessionId, userId),
    enabled: !!sessionId && !!userId,
  });
}
