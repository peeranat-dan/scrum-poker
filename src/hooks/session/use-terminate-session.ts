import { terminateSession } from "@/services/session/terminate-session";
import { useMutation } from "@tanstack/react-query";

export function useTerminateSession() {
  return useMutation({
    mutationFn: terminateSession,
  });
}
