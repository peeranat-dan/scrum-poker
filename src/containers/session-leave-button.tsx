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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLeaveSession } from "@/hooks/participant/use-leave-session";
import { useParticipant } from "@/providers/participant";
import { useCallback } from "react";

export default function SessionLeaveButton() {
  const { participant } = useParticipant();
  const leaveSessionMutation = useLeaveSession();

  const leaveSession = useCallback(async () => {
    if (participant) {
      await leaveSessionMutation.mutateAsync(participant.id);
    }
  }, [participant, leaveSessionMutation]);

  if (!participant) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Leave Session</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to leave the session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove you from the session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={leaveSession}>
              Leave
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
