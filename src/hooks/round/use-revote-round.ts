import { revoteRound } from '@/services/round/revote-round';
import { useMutation } from '@tanstack/react-query';

export function useRevoteRound() {
  return useMutation({
    mutationFn: revoteRound,
  });
}
