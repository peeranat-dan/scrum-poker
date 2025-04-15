import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/data/auth";

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}
