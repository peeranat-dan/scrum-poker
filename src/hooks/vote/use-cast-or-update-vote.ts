import { useMutation } from '@tanstack/react-query';

import { castOrUpdateVote } from '@/services/vote/cast-or-update-vote';

export function useCastOrUpdateVote() {
  return useMutation({
    mutationFn: castOrUpdateVote,
    // NOTE: Same scope runs mutations serially, so rapid card changes can't create duplicate votes
    scope: { id: 'cast-or-update-vote' },
  });
}
