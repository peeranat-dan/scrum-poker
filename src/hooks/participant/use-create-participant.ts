import { createParticipant } from "@/services/participant/create-participant";
import { useMutation } from "@tanstack/react-query";

export function useCreateParticipant() {
  return useMutation({
    mutationFn: createParticipant,
  });
}
