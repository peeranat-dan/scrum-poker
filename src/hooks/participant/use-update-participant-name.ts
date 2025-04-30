import { updateParticipantName } from "@/services/participant/update-participant-name";
import { useMutation } from "@tanstack/react-query";

export function useUpdateParticipantName() {
  return useMutation({
    mutationFn: updateParticipantName,
  });
}
