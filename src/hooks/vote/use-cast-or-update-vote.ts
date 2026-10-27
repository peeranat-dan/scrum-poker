import { useMutation } from '@tanstack/react-query';

import { castOrUpdateVote } from '@/services/vote/cast-or-update-vote';

export function useCastOrUpdateVote() {
  return useMutation({
    mutationFn: castOrUpdateVote,
  });
}
