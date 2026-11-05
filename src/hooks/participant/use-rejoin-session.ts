import { useMutation } from '@tanstack/react-query';

import { rejoinSession } from '@/services/participant/rejoin-session';

export function useRejoinSession() {
  return useMutation({
    mutationFn: rejoinSession,
  });
}
