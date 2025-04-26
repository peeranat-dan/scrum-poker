import { streamActiveRound } from "@/domain/round/stream-active-round";
import { type Round } from "@/domain/round/types";
import { useEffect, useState } from "react";

export function useStreamActiveRound(sessionId: string) {
  const [activeRound, setActiveRound] = useState<Round | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = streamActiveRound(sessionId, setActiveRound);
    return () => unsubscribe();
  }, [sessionId]);

  return { round: activeRound };
}
