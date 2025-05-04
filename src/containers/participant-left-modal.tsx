import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { useRejoinSession } from '@/hooks/participant/use-rejoin-session';
import { useParticipant } from '@/providers/participant';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';

export default function ParticipantLeftModal() {
  const { participant } = useParticipant();
  const rejoinSessionMutation = useRejoinSession();

  const shouldOpenModal = useMemo(() => {
    return participant?.status === 'left';
  }, [participant?.status]);

  const rejoinSession = async () => {
    if (participant) {
      await rejoinSessionMutation.mutateAsync(participant.id);
    }
  };

  return (
    <AlertDialog open={shouldOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You're already left the session</AlertDialogTitle>
          <AlertDialogDescription>But you can still get back to the game</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link to='/' className={buttonVariants({ variant: 'outline' })}>
            Back to Home
          </Link>
          <AlertDialogAction asChild>
            <Button onClick={rejoinSession} disabled={rejoinSessionMutation.isPending}>
              {rejoinSessionMutation.isPending ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              Rejoin
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
