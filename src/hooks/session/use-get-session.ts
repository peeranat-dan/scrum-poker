import { useQuery } from '@tanstack/react-query';

import { getSession } from '@/data/session/get-session';

export function useGetSession(id: string) {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
  });
}
