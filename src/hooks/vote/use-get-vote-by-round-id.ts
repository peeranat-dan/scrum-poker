import { getParticipantVoteByRoundId } from "@/domain/vote/get-participant-vote-by-round-id";
import { useQuery } from "@tanstack/react-query";

// TODO: Define type
export function useGetVoteByRoundId({
  roundId,
  participantId,
}: {
  roundId: string;
  participantId: string;
}) {
  return useQuery({
    queryKey: ["vote", roundId, participantId],
    queryFn: () => getParticipantVoteByRoundId({ roundId, participantId }),
    enabled: !!roundId && !!participantId,
  });
}
