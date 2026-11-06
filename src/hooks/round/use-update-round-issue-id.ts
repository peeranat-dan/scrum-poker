import { useMutation } from '@tanstack/react-query';

import { updateRoundIssueId } from '@/services/round/update-round-issue-id';

export function useUpdateRoundIssueId() {
  return useMutation({
    mutationFn: updateRoundIssueId,
  });
}
