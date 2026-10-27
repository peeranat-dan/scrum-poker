import { useQuery } from '@tanstack/react-query';

import { findParticipant } from '@/data/participant/find-participant';

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
