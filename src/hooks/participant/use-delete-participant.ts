import { deleteParticipant } from "@/data/participant/delete-participant";
import { useMutation } from "@tanstack/react-query";

export function useDeleteParticipant() {
  return useMutation({
    mutationFn: deleteParticipant,
  });
}
