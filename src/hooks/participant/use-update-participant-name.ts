import { updateParticipantName } from "@/data/participant/update-participant-name";
import { useMutation } from "@tanstack/react-query";

export function useUpdateParticipantName() {
  return useMutation({
    mutationFn: updateParticipantName,
  });
}
