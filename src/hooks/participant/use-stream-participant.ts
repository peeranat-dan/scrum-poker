import { streamParticipant } from "@/data/participant/stream-participant";
import { type Participant } from "@/types/participant.types";
import { useEffect, useState } from "react";

export function useStreamParticipant(participantId: string) {
  const [participant, setParticipant] = useState<Participant | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!participantId) {
      return;
    }

    setLoading(true);
    const unsubscribe = streamParticipant(participantId, (data) => {
      setParticipant(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [participantId]);

  return { participant, loading };
}
