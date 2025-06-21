import { streamParticipants } from '@/data/participant/stream-participants';
import { type Participant } from '@/domain/participant/types';

import { useEffect, useState, useRef } from 'react';
import { usePageVisibility } from '@/hooks/use-page-visibility';

export function useStreamParticipants(sessionId: string) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const isVisible = usePageVisibility();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const startListening = () => {
      unsubscribeRef.current = streamParticipants(sessionId, setParticipants);
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
  }, [sessionId, isVisible]);

  return { participants };
}
