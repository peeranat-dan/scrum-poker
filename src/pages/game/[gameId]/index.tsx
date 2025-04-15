import GameArea from "@/containers/game-area";
import GameController from "@/containers/game-controller";
import GameParticipants from "@/containers/game-participants";
import UserProfileModal from "@/containers/user-profile-modal";

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full relative px-4 lg:px-0">
      <div className="absolute flex justify-center items-center py-4 overflow-x-scroll top-0 w-full">
        <GameParticipants />
      </div>
      <GameController />
      <div className="fixed lg:absolute flex justify-center items-center overflow-x-scroll bottom-0 w-full">
        <GameArea />
      </div>
      <UserProfileModal />
    </div>
  );
}
