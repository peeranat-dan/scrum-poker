import Loading from '@/components/loading';
import { Card, CardContent } from '@/components/ui/card';
import SessionJoinContainer from '@/containers/session-join-container';
import { useGetParticipantBySessionIdAndUid } from '@/hooks/participant/use-get-participant-by-session-id-and-uid';
import { useGetSession } from '@/hooks/session/use-get-session';
import { useAuth } from '@/providers/auth';
import { createFileRoute, Navigate, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/join/$gameId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = useParams({ from: '/(app)/join/$gameId' });
  const { data: session, isLoading: isLoadingSession } = useGetSession(gameId);
  const { user } = useAuth();

  const { data: participant, isLoading: isLoadingParticipant } = useGetParticipantBySessionIdAndUid(
    {
      sessionId: gameId,
      uid: user?.uid ?? '',
    },
  );

  if (isLoadingSession || isLoadingParticipant) {
    return <Loading fullscreen />;
  }

  if (!session) {
    return <Navigate to='/new-game' replace />;
  }

  if (participant) {
    return <Navigate to={'/game/$gameId'} params={{ gameId }} replace />;
  }

  const { name } = session;

  return (
    <div className='bg-muted flex h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6 px-4 md:max-w-3xl md:px-0'>
        <Card className='overflow-hidden p-0'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <div className='flex flex-col gap-6 p-6 md:p-8'>
              <div className='space-y-2'>
                <p className='text-foreground/70 text-sm'>Joining</p>
                <h2>
                  <span className='border-accent line-clamp-1 rounded-sm border px-2 py-1 font-mono break-all'>
                    {name}
                  </span>
                </h2>
                <p className='text-muted-foreground'>
                  Introduce yourself to jump into this game session.
                </p>
              </div>
              <SessionJoinContainer sessionId={gameId} />
            </div>
            <div className='bg-muted relative hidden md:block'>
              <img
                src='/cat-poker.webp'
                alt='Cat playing poker'
                className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] dark:grayscale'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
