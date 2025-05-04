import { streamSession } from '@/data/session/stream-session';
import { type Session } from '@/domain/session/types';
import { useEffect, useState } from 'react';

export function useStreamSession(sessionId: string) {
  const [session, setSession] = useState<Session | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = streamSession(
      sessionId,
      (data) => {
        setSession(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [sessionId]);

  return { session, loading, error };
}
