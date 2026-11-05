import { useQuery } from '@tanstack/react-query';

import { getActiveRound } from '@/services/round/get-active-round';

export function useGetActiveRound(sessionId: string) {
  return useQuery({
    queryKey: ['active-round', sessionId],
    queryFn: () => getActiveRound(sessionId),
  });
}
