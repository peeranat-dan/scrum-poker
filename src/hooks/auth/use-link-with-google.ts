import { useMutation } from '@tanstack/react-query';

import { linkWithGoogle } from '@/data/auth';

export function useLinkWithGoogle() {
  return useMutation({
    mutationFn: linkWithGoogle,
  });
}
