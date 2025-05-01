import { revealRound } from "@/services/round/reveal-round";
import { useMutation } from "@tanstack/react-query";

export function useRevealRound() {
  return useMutation({
    mutationFn: revealRound,
  });
}
