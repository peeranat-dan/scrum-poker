import { getSessionById } from "@/data/session/get-session-by-id";
import { useQuery } from "@tanstack/react-query";

export function useGetSessionById(id: string) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id),
    enabled: !!id,
  });
}
