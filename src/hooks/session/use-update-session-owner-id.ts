import { updateSessionOwnerId } from "@/data/session/update-session-owner-id";
import { useMutation } from "@tanstack/react-query";

export function useUpdateSessionOwnerId() {
  return useMutation({
    mutationFn: updateSessionOwnerId,
  });
}
