import { useMutation } from '@tanstack/react-query';

import { signInWithGoogle } from '@/data/auth';

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
}
