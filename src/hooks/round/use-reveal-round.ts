import { useMutation } from '@tanstack/react-query';

import { revealRound } from '@/services/round/reveal-round';

export function useRevealRound() {
  return useMutation({
    mutationFn: revealRound,
  });
}
