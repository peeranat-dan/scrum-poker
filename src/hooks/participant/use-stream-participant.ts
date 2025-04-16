import { streamParticipant } from "@/data/participant/stream-participant";
import { type Participant } from "@/types/participant.types";
import { useEffect, useState } from "react";

export function useStreamParticipant(sessionId: string, uid: string) {
  const [participant, setParticipant] = useState<Participant | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !uid) {
      return;
    }

    setLoading(true);
    const unsubscribe = streamParticipant(sessionId, uid, (data) => {
      setParticipant(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [sessionId, uid]);

  return { participant, loading };
}
