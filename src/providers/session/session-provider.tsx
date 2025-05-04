import { Navigate } from 'react-router';
import { SessionContext } from './session-context';
import { type SessionProviderProps } from './types';
import { useStreamSession } from '@/hooks/session/use-stream-session';
import Loading from '@/components/loading';

export function SessionProvider({ sessionId, children }: Readonly<SessionProviderProps>) {
  const { session, loading: isLoading, error } = useStreamSession(sessionId);

  if (isLoading) {
    return <Loading fullscreen />;
  }

  if (error) {
    return <Navigate to='/not-found' replace />;
  }

  if (!session) {
    return <Navigate to='/not-found' replace />;
  }

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
