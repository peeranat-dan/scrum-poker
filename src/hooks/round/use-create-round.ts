import { useMutation } from '@tanstack/react-query';

import { createRound } from '@/services/round/create-round';

export function useCreateRound() {
  return useMutation({
    mutationFn: createRound,
  });
}
