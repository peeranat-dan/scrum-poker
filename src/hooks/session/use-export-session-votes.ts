import downloadFile from '@chanom/utils/download-file';
import { useMutation } from '@tanstack/react-query';

import { exportSessionVotes } from '@/services/session/export-session-votes';

/**
 * Exports the session votes as xlsx and downloads the file once it is built.
 */
export function useExportSessionVotes() {
  return useMutation({
    mutationFn: exportSessionVotes,
    onSuccess: ({ blob, fileName }) => {
      downloadFile(blob, fileName);
    },
  });
}
