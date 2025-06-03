import { getSession } from '@/data/session/get-session';
import { useQuery } from '@tanstack/react-query';

export function useGetSession(id: string) {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
  });
}
