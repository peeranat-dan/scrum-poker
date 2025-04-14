import { getParticipantsBySessionId } from "@/data/participant/get-participants-by-session-id";
import { useQuery } from "@tanstack/react-query";

export function useGetParticipantsBySessionId(sessionId: string) {
  return useQuery({
    queryKey: ["participants", sessionId],
    queryFn: () => getParticipantsBySessionId(sessionId),
    enabled: !!sessionId,
  });
}
