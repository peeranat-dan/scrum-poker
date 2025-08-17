import { revealRoundWithStreaks, type RevealRoundWithStreaksParams } from '@/services/round/reveal-round-with-streaks';
import { useMutation } from '@tanstack/react-query';

export function useRevealRoundWithStreaks() {
  return useMutation({
    mutationFn: (params: RevealRoundWithStreaksParams) => revealRoundWithStreaks(params),
  });
}