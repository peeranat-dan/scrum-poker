import { rejoinSession } from "@/data/participant/rejoin-session";
import { useMutation } from "@tanstack/react-query";

export function useRejoinSession() {
  return useMutation({
    mutationFn: rejoinSession,
  });
}
