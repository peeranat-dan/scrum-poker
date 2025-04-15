import { useParticipant } from "@/providers/participant";
import { useSession } from "@/providers/session";
import UserAvatarMenu from "./user-avatar.menu";

export default function GameHeader() {
  const { id } = useSession();
  const { participant } = useParticipant();

  return (
    <header className="flex items-center justify-between p-4 h-[var(--header-height)]">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
        <h1 className="text-2xl font-mono">S-Poker</h1>
        <div className="bg-accent rounded-full px-4 py-2">
          <span className="text-sm font-mono">{id}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {participant ? <UserAvatarMenu /> : null}
        </div>
      </div>
    </header>
  );
}
