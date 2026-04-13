import { exportSessionVotes } from '@/services/session/export-session-votes';
import { useMutation } from '@tanstack/react-query';

export function useExportSessionVotes() {
  return useMutation({
    mutationFn: exportSessionVotes,
  });
}
