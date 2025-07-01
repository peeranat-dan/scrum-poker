import { streamVotes } from '@/data/vote/stream-votes';
import { type Vote } from '@/domain/vote/types';
import { useEffect, useState, useRef } from 'react';
import { usePageVisibility } from '@/hooks/use-page-visibility';

export function useStreamVotes(roundId: string) {
  const [votes, setVotes] = useState<Vote[]>([]);
  const isVisible = usePageVisibility();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!roundId) return;

    const startListening = () => {
      unsubscribeRef.current = streamVotes(roundId, setVotes);
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
  }, [roundId, isVisible]);

  return { votes };
}
