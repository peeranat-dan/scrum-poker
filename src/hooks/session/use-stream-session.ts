import { streamSession } from '@/data/session/stream-session';
import { type Session } from '@/domain/session/types';
import { useEffect, useState, useRef } from 'react';
import { useConnectionState } from '@/hooks/use-connection-state';

export function useStreamSession(sessionId: string) {
  const [session, setSession] = useState<Session | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const { isConnected, isReconnecting } = useConnectionState();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const startListening = () => {
      if (isReconnecting) {
        // Add slight delay for reconnecting state to prevent race conditions
        setTimeout(() => {
          setLoading(true);
          unsubscribeRef.current = streamSession(
            sessionId,
            (data) => {
              setSession(data);
              setLoading(false);
              setError(undefined);
            },
            (error) => {
              setError(error);
              setLoading(false);
            },
          );
        }, 50);
      } else {
        setLoading(true);
        unsubscribeRef.current = streamSession(
          sessionId,
          (data) => {
            setSession(data);
            setLoading(false);
            setError(undefined);
          },
          (error) => {
            setError(error);
            setLoading(false);
          },
        );
      }
    };

    const stopListening = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    if (isConnected || isReconnecting) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [sessionId, isConnected, isReconnecting]);

  return { session, loading, error };
}
