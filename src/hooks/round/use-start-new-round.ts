import { startNewRound } from "@/services/round/start-new-round";
import { useMutation } from "@tanstack/react-query";

export function useStartNewRound() {
  return useMutation({
    mutationFn: startNewRound,
  });
}
