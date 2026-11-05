import { useQuery } from '@tanstack/react-query';

import { getParticipantVoteByRoundId } from '@/services/vote/get-participant-vote-by-round-id';

// TODO: Define type
export function useGetParticipantVoteByRoundId({
  roundId,
  participantId,
}: {
  roundId: string;
  participantId: string;
}) {
  return useQuery({
    queryKey: ['vote', roundId, participantId],
    queryFn: () => getParticipantVoteByRoundId({ roundId, participantId }),
    enabled: !!roundId && !!participantId,
  });
}
