import { Navigate } from "react-router";
import { SessionContext } from "./session-context";
import { type SessionProviderProps } from "./types";
import { useStreamSession } from "@/hooks/session/use-stream-session";

export function SessionProvider({
  sessionId,
  children,
}: Readonly<SessionProviderProps>) {
  const { session, loading: isLoading } = useStreamSession(sessionId);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/not-found" />;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
