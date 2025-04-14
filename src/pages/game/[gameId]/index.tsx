import { Button } from "@/components/ui/button";
import GameCards from "@/containers/game-cards";
import UserProfileModal from "@/containers/user-profile-modal";
import { useGame } from "@/providers/game";
import { toast } from "sonner";

export default function GamePage() {
  const { cards, playerInfo } = useGame();
  console.log(cards, playerInfo);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh w-full relative px-4 lg:px-0">
      <Button onClick={() => toast("Hello World")}>Click me</Button>
      <div className="absolute flex justify-center py-4 overflow-x-scroll bottom-0 w-full px-4 lg:px-0">
        <GameCards />
      </div>
      <UserProfileModal />
    </div>
  );
}
