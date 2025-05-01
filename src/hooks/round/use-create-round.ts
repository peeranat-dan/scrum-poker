import { createRound } from "@/services/round/create-round";
import { useMutation } from "@tanstack/react-query";

export function useCreateRound() {
  return useMutation({
    mutationFn: createRound,
  });
}
