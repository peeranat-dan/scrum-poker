import { signInWithGoogle } from '@/data/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
}
