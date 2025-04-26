import { rejoinSession } from "@/domain/participant/rejoin-session";
import { useMutation } from "@tanstack/react-query";

export function useRejoinSession() {
  return useMutation({
    mutationFn: rejoinSession,
  });
}
