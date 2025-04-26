import { useMutation } from "@tanstack/react-query";
import { createSession } from "@/domain/session/create-session";

export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
  });
}
