import { createRound } from "@/data/round/create-round";
import { useMutation } from "@tanstack/react-query";

export function useCreateRound(sessionId: string) {
  return useMutation({
    mutationFn: () => createRound(sessionId),
  });
}
