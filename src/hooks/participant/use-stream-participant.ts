import { streamParticipant } from '@/data/participant/stream-participant';
import { type Participant } from '@/domain/participant/types';

import { useEffect, useState, useRef } from 'react';
import { usePageVisibility } from '@/hooks/use-page-visibility';

export function useStreamParticipant(sessionId: string, uid: string) {
  const [participant, setParticipant] = useState<Participant | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const isVisible = usePageVisibility();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sessionId || !uid) {
      setLoading(false);
      return;
    }

    const startListening = () => {
      setLoading(true);
      unsubscribeRef.current = streamParticipant(
        sessionId,
        uid,
        (data) => {
          setParticipant(data);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        },
      );
    };

    const stopListening = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    if (isVisible) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [sessionId, uid, isVisible]);

  return { participant, loading, error };
}
