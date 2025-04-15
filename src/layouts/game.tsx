import { Toaster } from "@/components/ui/sonner";
import GameHeader from "@/containers/game-header";
import { useAuth } from "@/providers/auth";
import { GameProvider } from "@/providers/game";
import { ParticipantProvider } from "@/providers/participant";
import { SessionProvider } from "@/providers/session";
import { type PropsWithChildren } from "react";
import { Outlet, useParams } from "react-router";

type GameLayoutProps = PropsWithChildren;

export default function GameLayout({ children }: Readonly<GameLayoutProps>) {
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuth();

  if (!gameId) {
    throw new Error("Game ID is required");
  }

  const sessionId = gameId;

  return (
    <SessionProvider sessionId={sessionId}>
      <ParticipantProvider sessionId={sessionId} uid={user?.uid ?? ""}>
        <GameProvider gameId={gameId}>
          <div className="flex h-dvh w-screen flex-col">
            <GameHeader />
            <div className="flex flex-1 overflow-hidden">
              {/* <Sidebar /> */}
              <main className="flex flex-1 overflow-y-auto">
                {children ?? <Outlet />}
              </main>
            </div>
            <Toaster />
          </div>
        </GameProvider>
      </ParticipantProvider>
    </SessionProvider>
  );
}
