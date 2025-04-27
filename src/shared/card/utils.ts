import { type VotingSystem } from "../zod/enum";
import { FIBONACCI_CARDS, T_SHIRT_CARDS } from "./constants";

export function getCards(votingSystem: VotingSystem) {
  const cards = votingSystem === "fibonacci" ? FIBONACCI_CARDS : T_SHIRT_CARDS;

  return cards.map((card) => ({
    ...card,
    shouldIncludeInAverage:
      typeof card.shouldIncludeInAverage === "undefined"
        ? true
        : card.shouldIncludeInAverage,
  }));
}
