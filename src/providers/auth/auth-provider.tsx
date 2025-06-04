import { auth } from '@/data/auth';
import { useAnonymousLogin } from '@/hooks/auth/use-anonymous-login';
import { useLinkWithGoogle } from '@/hooks/auth/use-link-with-google';
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
  const linkWithGoogleMutation = useLinkWithGoogle();

  const signInAnonymously = useCallback(async () => {
    return await anonymousLoginMutation.mutateAsync();
  }, [anonymousLoginMutation]);

  const signOut = useCallback(async () => {
    return await signOutMutation.mutateAsync();
  }, [signOutMutation]);

  const signInWithGoogle = useCallback(async () => {
    return await signInWithGoogleMutation.mutateAsync();
  }, [signInWithGoogleMutation]);

  const linkWithGoogle = useCallback(async () => {
    return await linkWithGoogleMutation.mutateAsync();
  }, [linkWithGoogleMutation]);

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
      linkWithGoogle,
    }),
    [user, isLoading, signInAnonymously, signOut, signInWithGoogle, linkWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
