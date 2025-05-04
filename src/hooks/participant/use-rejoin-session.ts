import { rejoinSession } from '@/services/participant/rejoin-session';
import { useMutation } from '@tanstack/react-query';

export function useRejoinSession() {
  return useMutation({
    mutationFn: rejoinSession,
  });
}
