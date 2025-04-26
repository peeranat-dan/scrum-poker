import { updateVoteValue } from "@/domain/vote/update-vote-value";
import { useMutation } from "@tanstack/react-query";

export function useUpdateVoteValue() {
  return useMutation({
    mutationFn: updateVoteValue,
  });
}
