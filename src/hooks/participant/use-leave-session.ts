import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/providers/auth';
import { leaveSession } from '@/services/participant/leave-session';

export function useLeaveSession() {
  const { user } = useAuth();

  if (!user) {
    throw new Error('Not logged in');
  }

  return useMutation({
    mutationFn: leaveSession,
  });
}
