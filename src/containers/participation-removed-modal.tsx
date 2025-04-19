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
import { useAuth } from "@/providers/auth";
import { useParticipant } from "@/providers/participant";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { generatePath, useNavigate } from "react-router";

// TODO: rename this
export default function ParticipationRemovedModal() {
  const navigate = useNavigate();
  const { participant } = useParticipant();
  const queryClient = useQueryClient();
  const { signOut } = useAuth();

  const shouldOpenModal = useMemo(() => {
    return participant?.status === "deleted";
  }, [participant?.status]);

  const handleBackToHome = async () => {
    queryClient.resetQueries();
    await signOut();
    navigate("/");
  };

  const handleJoinAgain = async () => {
    queryClient.resetQueries();
    await signOut();
    navigate(
      generatePath("/join/:gameId", {
        gameId: participant?.sessionId ?? "",
      })
    );
  };

  return (
    <AlertDialog open={shouldOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You've been removed</AlertDialogTitle>
          <AlertDialogDescription>
            You've been removed from the game.
          </AlertDialogDescription>
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
