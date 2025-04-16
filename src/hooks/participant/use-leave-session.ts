import { leaveSession } from "@/data/participant/leave-session";
import { useMutation } from "@tanstack/react-query";

export function useLeaveSession() {
  return useMutation({
    mutationFn: leaveSession,
  });
}
