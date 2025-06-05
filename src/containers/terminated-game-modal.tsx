import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useSession } from '@/providers/session';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

export default function TerminatedGameModal() {
  const navigate = useNavigate();
  const { status } = useSession();
  const queryClient = useQueryClient();

  const shouldOpenModal = useMemo(() => {
    return status === 'finished';
  }, [status]);

  const handleBackToHome = () => {
    queryClient.resetQueries();
    navigate({ to: '/' });
  };

  const handleCreateAnotherGame = () => {
    queryClient.resetQueries();
    navigate({ to: '/new-game' });
  };

  return (
    <AlertDialog open={shouldOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session has been terminated</AlertDialogTitle>
          <AlertDialogDescription>Playing again? Create another game.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant='outline' onClick={handleBackToHome}>
            Back to Home
          </Button>
          <Button onClick={handleCreateAnotherGame}>Create another game</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
