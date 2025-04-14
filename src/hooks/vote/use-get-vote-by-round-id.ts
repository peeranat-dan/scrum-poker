import { getVoteByRoundId } from "@/data/vote/get-vote-by-round-id";
import { useQuery } from "@tanstack/react-query";

export function useGetVoteByRoundId(roundId: string, participantId: string) {
  return useQuery({
    queryKey: ["vote", roundId, participantId],
    queryFn: () => getVoteByRoundId(roundId, participantId),
    enabled: !!roundId && !!participantId,
  });
}
