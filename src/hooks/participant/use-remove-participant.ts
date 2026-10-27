import { useMutation } from '@tanstack/react-query';

import { removeParticipant } from '@/services/participant/remove-participant';

export function useRemoveParticipant() {
  return useMutation({
    mutationFn: removeParticipant,
  });
}
