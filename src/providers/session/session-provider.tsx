import Loading from '@/components/loading';
import { useStreamSession } from '@/hooks/session/use-stream-session';
import { SessionContext } from './session-context';
import { type SessionProviderProps } from './types';

export function SessionProvider({ sessionId, children }: Readonly<SessionProviderProps>) {
  const { session, loading: isLoading } = useStreamSession(sessionId);

  if (isLoading) {
    return <Loading fullscreen />;
  }

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
