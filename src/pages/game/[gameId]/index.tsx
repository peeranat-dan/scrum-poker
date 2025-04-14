import GameCards from "@/containers/game-cards";
import GameParticipants from "@/containers/game-participants";
import UserProfileModal from "@/containers/user-profile-modal";

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh w-full relative px-4 lg:px-0">
      <div className="absolute flex justify-center py-4 overflow-x-scroll top-0 w-full px-4 lg:px-0">
        <GameParticipants />
      </div>
      <div className="absolute flex justify-center py-4 overflow-x-scroll bottom-0 w-full px-4 lg:px-0">
        <GameCards />
      </div>
      <UserProfileModal />
    </div>
  );
}
