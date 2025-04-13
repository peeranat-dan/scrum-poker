import { useMutation } from "@tanstack/react-query";
import { createParticipant } from "@/data/participant/create-participant";

export function useCreateParticipant() {
  return useMutation({
    mutationFn: createParticipant,
  });
}
