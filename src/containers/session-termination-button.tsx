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
import { useTerminateSession } from "@/hooks/session/use-terminate-session";
import { useSession } from "@/providers/session";
import { Bomb } from "lucide-react";
import { useCallback } from "react";

export default function SessionTerminationButton() {
  const { id } = useSession();

  const terminateSessionMutation = useTerminateSession();

  const handleTerminateSession = useCallback(() => {
    terminateSessionMutation.mutateAsync(id);
  }, [id, terminateSessionMutation]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full md:w-fit">
          <Bomb />
          <span>Terminate session</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently terminate your
            session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleTerminateSession}>
              Terminate session
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
