import { Toaster } from "@/components/ui/sonner";
import { GameProvider } from "@/providers/game";
import { type PropsWithChildren } from "react";
import { Outlet, useParams } from "react-router";

type GameLayoutProps = PropsWithChildren;

export default function GameLayout({ children }: Readonly<GameLayoutProps>) {
  const { sessionId } = useParams<{ sessionId: string }>();

  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  return (
    <GameProvider gameId={sessionId}>
      <div className="flex h-dvh w-screen flex-col">
        {/* <Header /> */}
        <div className="flex flex-1 overflow-hidden">
          {/* <Sidebar /> */}
          <main className="flex flex-1 overflow-y-auto">
            {children ?? <Outlet />}
          </main>
        </div>
        <Toaster />
      </div>
    </GameProvider>
  );
}
