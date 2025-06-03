import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';
import { useBlocker } from '@tanstack/react-router';
import { useMemo } from 'react';

export default function GameExitConfirmationModal() {
  const { status: sessionStatus } = useSession();
  const { participant } = useParticipant();

  const shouldOpenModal = useMemo(() => {
    return sessionStatus === 'active' && participant?.status === 'active';
  }, [participant?.status, sessionStatus]);

  // NOTE: Block for client side navigation
  const blocker = useBlocker({
    shouldBlockFn: () => shouldOpenModal,
    withResolver: true,
  });

  // NOTE: Block for refreshing the page

  return (
    <Dialog open={blocker?.status === 'blocked'} onOpenChange={blocker.reset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave the game already?</DialogTitle>
          <DialogDescription>
            Don't worry, you can always come back and join the game.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={blocker.proceed} variant='outline'>
            Leave the game
          </Button>
          <Button onClick={blocker.reset}>Stay on the page</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
