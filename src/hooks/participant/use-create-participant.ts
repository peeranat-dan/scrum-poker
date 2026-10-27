import { useMutation } from '@tanstack/react-query';

import { createParticipant } from '@/services/participant/create-participant';

export function useCreateParticipant() {
  return useMutation({
    mutationFn: createParticipant,
  });
}
