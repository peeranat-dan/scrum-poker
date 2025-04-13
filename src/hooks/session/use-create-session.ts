import { useMutation } from "@tanstack/react-query";
import { createSession } from "@/data/session/create-session";

export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
  });
}
