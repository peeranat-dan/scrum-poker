import { streamParticipant } from '@/data/participant/stream-participant';
import { type Participant } from '@/domain/participant/types';

import { useEffect, useState } from 'react';

export function useStreamParticipant(sessionId: string, uid: string) {
  const [participant, setParticipant] = useState<Participant | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    if (!sessionId || !uid) {
      setLoading(false);
      return;
    }
    const unsubscribe = streamParticipant(
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

    return () => {
      unsubscribe();
    };
  }, [sessionId, uid]);

  return { participant, loading, error };
}
