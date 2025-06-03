import { findParticipant } from '@/data/participant/find-participant';
import { useQuery } from '@tanstack/react-query';

interface UseGetParticipantBySessionIdAndUidParams {
  sessionId: string;
  uid: string;
}

export function useGetParticipantBySessionIdAndUid({
  sessionId,
  uid,
}: UseGetParticipantBySessionIdAndUidParams) {
  return useQuery({
    queryKey: ['participant', sessionId, uid],
    queryFn: () =>
      findParticipant({
        filter: {
          uid,
          sessionId,
        },
      }),
    enabled: !!sessionId && !!uid,
  });
}
