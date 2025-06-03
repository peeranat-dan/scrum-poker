import Loading from '@/components/loading';
import { Toaster } from '@/components/ui/sonner';
import GameHeader from '@/containers/game-header';
import ParticipantLeftModal from '@/containers/participant-left-modal';
import TerminatedGameModal from '@/containers/terminated-game-modal';
import { useGetSession } from '@/hooks/session/use-get-session';
import { useAuth } from '@/providers/auth';
import { GameProvider } from '@/providers/game';
import { ParticipantProvider } from '@/providers/participant';
import { SessionProvider } from '@/providers/session';
import { createFileRoute, notFound, Outlet, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/game')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = useParams({ from: '/game/$gameId' });
  const session = useGetSession(gameId);
  const { user, loading: isLoadingAuth } = useAuth();
  if (!gameId) {
    throw new Error('Game ID is required');
  }

  const sessionId = gameId;

  if (session.isLoading || isLoadingAuth) {
    return <Loading fullscreen />;
  }

  if (!session || session.error) {
    throw notFound();
  }

  if (!user) {
    throw notFound();
  }

  return (
    <SessionProvider sessionId={sessionId}>
      <ParticipantProvider sessionId={sessionId} uid={user.uid}>
        <GameProvider gameId={gameId}>
          <div className='flex h-dvh w-screen flex-col'>
            <GameHeader />
            <div className='flex flex-1 overflow-hidden'>
              <main className='flex flex-1 overflow-y-auto'>
                <Outlet />
              </main>
            </div>
            <Toaster />
          </div>
          <TerminatedGameModal />
          <ParticipantLeftModal />
          {/* <ParticipationRemovedModal /> */}
        </GameProvider>
      </ParticipantProvider>
    </SessionProvider>
  );
}
