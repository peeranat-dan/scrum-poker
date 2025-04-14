import { streamVotes } from "@/data/vote/stream-votes";
import { type Vote } from "@/types/vote.types";
import { useEffect, useState } from "react";

export function useStreamVotes(roundId: string) {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    if (!roundId) {
      return;
    }

    const unsubscribe = streamVotes(roundId, setVotes);

    return () => {
      unsubscribe();
    };
  }, [roundId]);

  return { votes };
}
