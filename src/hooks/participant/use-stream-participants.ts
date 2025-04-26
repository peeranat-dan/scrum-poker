import { streamParticipants } from "@/domain/participant/stream-participants";
import { type Participant } from "@/domain/participant/types";

import { useEffect, useState } from "react";

export function useStreamParticipants(sessionId: string) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const unsubscribe = streamParticipants(sessionId, setParticipants);

    return () => {
      unsubscribe();
    };
  }, [sessionId]);

  return { participants };
}
