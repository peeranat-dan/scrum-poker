import { revealRoundWithStreaks } from '@/services/round/reveal-round-with-streaks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to reveal a round with original estimate and process win streaks
 */
export function useRevealRoundWithStreaks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roundId, originalEstimate }: { roundId: string; originalEstimate: number }) =>
      revealRoundWithStreaks(roundId, originalEstimate),
    onSuccess: () => {
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['round'] });
      queryClient.invalidateQueries({ queryKey: ['participant'] });
    },
  });
}