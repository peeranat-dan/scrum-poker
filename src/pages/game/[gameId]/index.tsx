import GameArea from "@/containers/game-area";
import GameController from "@/containers/game-controller";
import GameExitConfirmationModal from "@/containers/game-exit-confirmation-modal";
import GameParticipants from "@/containers/game-participants";
import UserProfileModal from "@/containers/user-profile-modal";
import { useParticipant } from "@/providers/participant";
import { generatePath, Navigate, useParams } from "react-router";

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { participant } = useParticipant();

  if (!participant) {
    return (
      <Navigate to={generatePath("/join/:gameId", { gameId: gameId ?? "" })} />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full relative px-4 lg:px-0">
      <div className="fixed lg:absolute flex justify-center items-center py-4 top-[var(--header-height)] lg:top-0 overflow-x-scroll no-scrollbar w-full">
        <GameParticipants />
      </div>
      <GameController />
      <div className="fixed lg:absolute flex justify-center items-center overflow-x-scroll no-scrollbar  bottom-0 w-full">
        <GameArea />
      </div>
      <UserProfileModal />
      <GameExitConfirmationModal />
    </div>
  );
}
