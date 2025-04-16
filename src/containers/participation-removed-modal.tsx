import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useParticipant } from "@/providers/participant";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { generatePath, useNavigate } from "react-router";

// TODO: rename this
export default function ParticipationRemovedModal() {
  const navigate = useNavigate();
  const { participant } = useParticipant();
  const queryClient = useQueryClient();

  const shouldOpenModal = useMemo(() => {
    return !!participant?.deletedAt || !!participant?.leftAt;
  }, [participant?.deletedAt, participant?.leftAt]);

  const handleBackToHome = () => {
    queryClient.resetQueries();
    navigate("/");
  };

  const handleJoinAgain = () => {
    queryClient.resetQueries();
    navigate(
      generatePath("/join/:gameId", {
        gameId: participant?.sessionId ?? "",
      })
    );
  };

  const alertTitle = useMemo(() => {
    if (participant?.deletedAt) {
      return "You've been removed";
    }
    if (participant?.leftAt) {
      return "You've left";
    }
    return "";
  }, [participant?.deletedAt, participant?.leftAt]);

  const alertDescription = useMemo(() => {
    if (participant?.deletedAt) {
      return "You've been removed from the game.";
    }
    if (participant?.leftAt) {
      return "You've left the game.";
    }
    return "";
  }, [participant?.deletedAt, participant?.leftAt]);

  return (
    <AlertDialog open={shouldOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleBackToHome} variant="outline">
            Back to Home
          </Button>
          <AlertDialogAction onClick={handleJoinAgain}>
            Join again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
