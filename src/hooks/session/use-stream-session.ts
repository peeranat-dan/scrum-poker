import { streamSession } from "@/data/session/stream-session";
import { type Session } from "@/types/session.types";
import { useEffect, useState } from "react";

export function useStreamSession(sessionId: string) {
  const [session, setSession] = useState<Session | undefined>();

  useEffect(() => {
    const unsubscribe = streamSession(sessionId, setSession);
    return () => unsubscribe();
  }, [sessionId]);

  return session;
}
