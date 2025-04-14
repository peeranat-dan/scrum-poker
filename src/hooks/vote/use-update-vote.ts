import { updateVote } from "@/data/vote/update-vote";
import { useMutation } from "@tanstack/react-query";

export function useUpdateVote() {
  return useMutation({
    mutationFn: updateVote,
  });
}
