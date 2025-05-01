import { createSession } from "@/services/session/create-session";
import { useMutation } from "@tanstack/react-query";

export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
  });
}
