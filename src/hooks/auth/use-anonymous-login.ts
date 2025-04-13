import { useMutation } from "@tanstack/react-query";
import { signInAnonymously } from "@/data/auth";

export function useAnonymousLogin() {
  return useMutation({
    mutationFn: signInAnonymously,
  });
}
