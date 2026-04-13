import { Button } from '@/components/ui/button';
import { useExportSessionVotes } from '@/hooks/session/use-export-session-votes';
import { useSession } from '@/providers/session';
import { Download } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

export default function SessionExportButton() {
  const { id } = useSession();
  const exportMutation = useExportSessionVotes();

  const handleExport = useCallback(() => {
    exportMutation.mutate(id, {
      onSuccess: () => toast.success('Votes exported successfully'),
      onError: (error) => toast.error(error.message),
    });
  }, [id, exportMutation]);

  return (
    <Button
      variant='outline'
      className='w-full md:w-fit'
      onClick={handleExport}
      disabled={exportMutation.isPending}
    >
      <Download />
      <span>{exportMutation.isPending ? 'Exporting...' : 'Download votes (.xlsx)'}</span>
    </Button>
  );
}
