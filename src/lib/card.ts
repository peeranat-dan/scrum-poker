import { type Card } from "@/types/card.types";

const FIBONACCI_CARDS: Card[] = [
  {
    displayValue: "0",
    value: 0,
  },
  {
    displayValue: "1",
    value: 1,
  },
  {
    displayValue: "2",
    value: 2,
  },
  {
    displayValue: "3",
    value: 3,
  },
  {
    displayValue: "5",
    value: 5,
  },
  {
    displayValue: "8",
    value: 8,
  },
  {
    displayValue: "13",
    value: 13,
  },
  {
    displayValue: "21",
    value: 21,
  },
  {
    displayValue: "34",
    value: 34,
  },
  {
    displayValue: "55",
    value: 55,
  },
  {
    displayValue: "89",
    value: 89,
  },
  {
    displayValue: "?",
    value: -1,
    shouldIncludeInAverage: false,
  },
  {
    displayValue: "🙅🏼",
    value: -2,
    shouldIncludeInAverage: false,
  },
];

const T_SHIRT_CARDS: Card[] = [
  {
    displayValue: "XS",
    value: 0,
  },
  {
    displayValue: "S",
    value: 1,
  },
  {
    displayValue: "M",
    value: 2,
  },
  {
    displayValue: "L",
    value: 3,
  },
  {
    displayValue: "XL",
    value: 4,
  },
  {
    displayValue: "XXL",
    value: 5,
  },
  {
    displayValue: "?",
    value: -1,
    shouldIncludeInAverage: false,
  },
  {
    displayValue: "🙅🏼",
    value: -2,
    shouldIncludeInAverage: false,
  },
];

export function getCards(votingSystem: "fibonacci" | "t-shirt") {
  if (votingSystem === "fibonacci") {
    return FIBONACCI_CARDS.map((card) => ({
      ...card,
      shouldIncludeInAverage:
        typeof card.shouldIncludeInAverage === "undefined"
          ? true
          : card.shouldIncludeInAverage,
    }));
  } else if (votingSystem === "t-shirt") {
    return T_SHIRT_CARDS.map((card) => ({
      ...card,
      shouldIncludeInAverage:
        typeof card.shouldIncludeInAverage === "undefined"
          ? true
          : card.shouldIncludeInAverage,
    }));
  }

  return [];
}
