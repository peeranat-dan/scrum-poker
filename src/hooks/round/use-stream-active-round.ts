import { streamActiveRound } from '@/data/round/stream-active-round';
import { type Round } from '@/domain/round/types';
import { useEffect, useState, useRef } from 'react';
import { usePageVisibility } from '@/hooks/use-page-visibility';

export function useStreamActiveRound(sessionId: string) {
  const [activeRound, setActiveRound] = useState<Round | undefined>(undefined);
  const isVisible = usePageVisibility();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const startListening = () => {
      unsubscribeRef.current = streamActiveRound(sessionId, setActiveRound);
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

  return { round: activeRound };
}
