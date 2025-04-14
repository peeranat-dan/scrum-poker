import { useGetSessionById } from "@/hooks/session/use-get-session-by-id";
import { type Session } from "@/types/session.types";
import { useMemo } from "react";
import { SessionContext } from "./session-context";
import { type SessionProviderProps } from "./types";

export function SessionProvider({
  sessionId,
  children,
}: Readonly<SessionProviderProps>) {
  const { data, isLoading, error } = useGetSessionById(sessionId);

  const value = useMemo(
    () => ({
      ...(data as Session),
    }),
    [data]
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
