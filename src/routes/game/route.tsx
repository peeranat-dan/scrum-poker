import Loading from '@/components/loading';
import { Toaster } from '@/components/ui/sonner';
import GameHeader from '@/containers/game-header';
import ParticipantLeftModal from '@/containers/participant-left-modal';
import TerminatedGameModal from '@/containers/terminated-game-modal';
import { useGetParticipantBySessionIdAndUid } from '@/hooks/participant/use-get-participant-by-session-id-and-uid';
import { useGetSession } from '@/hooks/session/use-get-session';
import { useAuth } from '@/providers/auth';
import { GameProvider } from '@/providers/game';
import { ParticipantProvider } from '@/providers/participant';
import { SessionProvider } from '@/providers/session';
import { createFileRoute, Navigate, notFound, Outlet, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/game')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = useParams({ from: '/game/$gameId' });
  const { data: session, isLoading: isLoadingSession, error: errorSession } = useGetSession(gameId);

  const { user, loading: isLoadingAuth } = useAuth();

  const {
    data: participant,
    isLoading: isLoadingParticipant,
    error: errorParticipant,
  } = useGetParticipantBySessionIdAndUid({
    sessionId: gameId,
    uid: user?.uid ?? '',
  });

  if (!gameId) {
    throw new Error('Game ID is required');
  }

  const sessionId = gameId;

  if (isLoadingSession || isLoadingAuth || isLoadingParticipant) {
    return <Loading fullscreen />;
  } else if (!session || errorSession || errorParticipant) {
    throw notFound();
  } else if (!participant || !user) {
    return <Navigate to='/join/$gameId' params={{ gameId }} replace />;
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
