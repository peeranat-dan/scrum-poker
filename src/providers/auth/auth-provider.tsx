import { type User } from "@/types/user.types";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { type AuthProviderProps } from "./types";
import { auth } from "@/data/auth";

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInAnonymously = async () => {
    // TODO: Implement sign in anonymously
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading: isLoading,
      signInAnonymously,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
