import { leaveSession } from "@/data/participant/leave-session";
import { useAuth } from "@/providers/auth";
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
