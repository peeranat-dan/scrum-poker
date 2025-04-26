import { castVote } from "@/domain/vote/cast-vote";
import { useMutation } from "@tanstack/react-query";

export function useCastVote() {
  return useMutation({
    mutationFn: castVote,
  });
}
