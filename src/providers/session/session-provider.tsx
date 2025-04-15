import { SessionContext } from "./session-context";
import { type SessionProviderProps } from "./types";
import { useStreamSession } from "@/hooks/session/use-stream-session";

export function SessionProvider({
  sessionId,
  children,
}: Readonly<SessionProviderProps>) {
  const session = useStreamSession(sessionId);

  if (!session) return <div>Loading...</div>;

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
