import { useMutation } from '@tanstack/react-query';

import { revoteRound } from '@/services/round/revote-round';

export function useRevoteRound() {
  return useMutation({
    mutationFn: revoteRound,
  });
}
