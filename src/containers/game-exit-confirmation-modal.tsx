import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParticipant } from "@/providers/participant";
import { useSession } from "@/providers/session";
import { useMemo } from "react";
import { useBeforeUnload, useBlocker } from "react-router";

export default function GameExitConfirmationModal() {
  const { status: sessionStatus } = useSession();
  const { participant } = useParticipant();

  const shouldOpenModal = useMemo(() => {
    return sessionStatus === "active" && participant?.status === "active";
  }, [participant?.status, sessionStatus]);

  // NOTE: Block for client side navigation
  const blocker = useBlocker(({ nextLocation, currentLocation }) => {
    if (
      nextLocation.pathname.includes("/settings") ||
      nextLocation.pathname === currentLocation.pathname
    ) {
      return false;
    }
    return shouldOpenModal;
  });

  // NOTE: Block for refreshing the page
  useBeforeUnload((event) => {
    if (!shouldOpenModal) {
      return;
    }
    event.preventDefault();
  });

  return (
    <Dialog open={blocker.state === "blocked"} onOpenChange={blocker.proceed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave the game already?</DialogTitle>
          <DialogDescription>
            Don't worry, you can always come back and join the game.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={blocker.reset}>Stay on the page</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
