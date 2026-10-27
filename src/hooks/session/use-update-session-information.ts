import { useMutation } from '@tanstack/react-query';

import { updateSessionInformation } from '@/services/session/update-session-information';

export function useUpdateSessionInformation() {
  return useMutation({
    mutationFn: updateSessionInformation,
  });
}
