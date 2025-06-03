import { auth } from '@/data/auth';
import { useAnonymousLogin } from '@/hooks/auth/use-anonymous-login';
import { useSignInWithGoogle } from '@/hooks/auth/use-sign-in-with-google';
import { useSignOut } from '@/hooks/auth/use-sign-out';
import { type User } from '@/shared/firebase/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { type AuthProviderProps } from './types';

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const anonymousLoginMutation = useAnonymousLogin();
  const signOutMutation = useSignOut();
  const signInWithGoogleMutation = useSignInWithGoogle();

  const signInAnonymously = useCallback(async () => {
    return await anonymousLoginMutation.mutateAsync();
  }, [anonymousLoginMutation]);

  const signOut = useCallback(async () => {
    return await signOutMutation.mutateAsync();
  }, [signOutMutation]);

  const signInWithGoogle = useCallback(async () => {
    return await signInWithGoogleMutation.mutateAsync();
  }, [signInWithGoogleMutation]);

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
      signInWithGoogle,
    }),
    [user, isLoading, signInAnonymously, signOut, signInWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
