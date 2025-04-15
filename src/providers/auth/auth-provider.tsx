import { type User } from "@/types/user.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { type AuthProviderProps } from "./types";
import { auth } from "@/data/auth";
import { useAnonymousLogin } from "@/hooks/auth/use-anonymous-login";
import { useSignOut } from "@/hooks/auth/use-sign-out";

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const anonymousLoginMutation = useAnonymousLogin();
  const signOutMutation = useSignOut();

  const signInAnonymously = useCallback(async () => {
    return await anonymousLoginMutation.mutateAsync();
  }, [anonymousLoginMutation]);

  const signOut = useCallback(async () => {
    return await signOutMutation.mutateAsync();
  }, [signOutMutation]);

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
      signOut,
    }),
    [user, isLoading, signInAnonymously, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
