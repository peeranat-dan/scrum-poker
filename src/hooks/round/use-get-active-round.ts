import { getActiveRound } from '@/services/round/get-active-round';
import { useQuery } from '@tanstack/react-query';

export function useGetActiveRound(sessionId: string) {
  return useQuery({
    queryKey: ['active-round', sessionId],
    queryFn: () => getActiveRound(sessionId),
  });
}
