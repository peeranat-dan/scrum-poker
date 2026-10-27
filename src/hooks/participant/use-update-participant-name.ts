import { useMutation } from '@tanstack/react-query';

import { updateParticipantName } from '@/services/participant/update-participant-name';

export function useUpdateParticipantName() {
  return useMutation({
    mutationFn: updateParticipantName,
  });
}
