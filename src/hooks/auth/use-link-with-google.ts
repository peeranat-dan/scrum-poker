import { linkWithGoogle } from '@/data/auth';
import { useMutation } from '@tanstack/react-query';

export function useLinkWithGoogle() {
  return useMutation({
    mutationFn: linkWithGoogle,
  });
}
