import { updateSessionInformation } from "@/domain/session/update-session-information";
import { useMutation } from "@tanstack/react-query";

export function useUpdateSessionInformation() {
  return useMutation({
    mutationFn: updateSessionInformation,
  });
}
