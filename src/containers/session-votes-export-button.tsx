import { Download } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useExportSessionVotes } from '@/hooks/session/use-export-session-votes';
import { useSession } from '@/providers/session';

/**
 * Downloads the votes of every revealed round as an xlsx file. The parent is responsible
 * for only rendering it for the session owner.
 */
export default function SessionVotesExportButton() {
  const { id } = useSession();

  const exportSessionVotesMutation = useExportSessionVotes();

  const handleExport = useCallback(() => {
    exportSessionVotesMutation.mutate(id, {
      onError: (error) => {
        toast.error(error.message);
        // oxlint-disable-next-line no-console
        console.error(error);
      },
    });
  }, [id, exportSessionVotesMutation]);

  return (
    <Button
      variant="outline"
      className="w-full md:w-fit"
      onClick={handleExport}
      disabled={exportSessionVotesMutation.isPending}
    >
      <Download />
      <span>Download votes (.xlsx)</span>
    </Button>
  );
}
