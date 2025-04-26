import { castOrUpdateVote } from "@/domain/vote/cast-or-update-vote";
import { useMutation } from "@tanstack/react-query";

export function useCastOrUpdateVote() {
  return useMutation({
    mutationFn: castOrUpdateVote,
  });
}
