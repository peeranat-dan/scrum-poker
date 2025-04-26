import { removeParticipant } from "@/domain/participant/remove-participant";
import { useMutation } from "@tanstack/react-query";

export function useRemoveParticipant() {
  return useMutation({
    mutationFn: removeParticipant,
  });
}
