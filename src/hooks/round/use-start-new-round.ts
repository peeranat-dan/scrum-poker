import { useMutation } from '@tanstack/react-query';

import { startNewRound } from '@/services/round/start-new-round';

export function useStartNewRound() {
  return useMutation({
    mutationFn: startNewRound,
  });
}
