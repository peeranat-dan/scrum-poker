import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";
import { SessionContext } from "./session-context";
import { type SessionProviderProps } from "./types";

export function SessionProvider({
  sessionId,
  children,
}: Readonly<SessionProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(sessionId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
  );
}
