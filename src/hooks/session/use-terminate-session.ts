import { useMutation } from '@tanstack/react-query';

import { terminateSession } from '@/services/session/terminate-session';

export function useTerminateSession() {
  return useMutation({
    mutationFn: terminateSession,
  });
}
