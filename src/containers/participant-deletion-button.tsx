import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRemoveParticipant } from '@/hooks/participant/use-remove-participant';
import { Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

interface ParticipantDeletionButtonProps {
  id: string;
  disabled?: boolean;
}

export default function ParticipantDeletionButton({
  id,
  disabled,
}: Readonly<ParticipantDeletionButtonProps>) {
  const removeParticipantMutation = useRemoveParticipant();

  const handleRemoveParticipant = useCallback(async () => {
    await removeParticipantMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success('Participant deleted');
      },
      onError: (error) => {
        toast.error(`Failed to delete participant: ${error.message}`);
      },
    });
  }, [removeParticipantMutation, id]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon' disabled={disabled}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove this user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this participant from the
            session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant='destructive' onClick={handleRemoveParticipant}>
              Remove
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
