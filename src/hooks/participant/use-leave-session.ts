import { useAuth } from "@/providers/auth";
import { leaveSession } from "@/services/participant/leave-session";
import { useMutation } from "@tanstack/react-query";

export function useLeaveSession() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Not logged in");
  }

  return useMutation({
    mutationFn: leaveSession,
  });
}
