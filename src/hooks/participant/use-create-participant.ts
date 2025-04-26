import { createParticipant } from "@/domain/participant/create-participant";
import { useMutation } from "@tanstack/react-query";

export function useCreateParticipant() {
  return useMutation({
    mutationFn: createParticipant,
  });
}
