import { type Card } from './types';

/** Fixed dark text for all colored cards — card backgrounds are light pastels regardless of theme */
const CARD_TEXT = 'text-[oklch(0.18_0.0043_264.46)]';

export const FIBONACCI_CARDS: Card[] = [
  { displayValue: '0', value: 0, color: 'bg-[var(--color-card-0)]', textColor: CARD_TEXT },
  { displayValue: '1', value: 1, color: 'bg-[var(--color-card-1)]', textColor: CARD_TEXT },
  { displayValue: '2', value: 2, color: 'bg-[var(--color-card-2)]', textColor: CARD_TEXT },
  { displayValue: '3', value: 3, color: 'bg-[var(--color-card-3)]', textColor: CARD_TEXT },
  { displayValue: '5', value: 5, color: 'bg-[var(--color-card-5)]', textColor: CARD_TEXT },
  { displayValue: '8', value: 8, color: 'bg-[var(--color-card-8)]', textColor: CARD_TEXT },
  { displayValue: '13', value: 13, color: 'bg-[var(--color-card-13)]', textColor: CARD_TEXT },
  { displayValue: '21', value: 21, color: 'bg-[var(--color-card-21)]', textColor: CARD_TEXT },
  { displayValue: '34', value: 34, color: 'bg-[var(--color-card-34)]', textColor: CARD_TEXT },
  { displayValue: '55', value: 55, color: 'bg-[var(--color-card-55)]', textColor: CARD_TEXT },
  { displayValue: '89', value: 89, color: 'bg-[var(--color-card-89)]', textColor: CARD_TEXT },
  {
    displayValue: '?',
    value: -1,
    shouldIncludeInAverage: false,
    color: 'bg-[var(--color-card-no)]',
    textColor: CARD_TEXT,
  },
  {
    displayValue: '🙅🏼',
    value: -2,
    shouldIncludeInAverage: false,
    color: 'bg-[var(--color-card-no)]',
    textColor: CARD_TEXT,
  },
];

export const T_SHIRT_CARDS: Card[] = [
  {
    displayValue: 'XS',
    value: 0,
    color: 'bg-[var(--color-card-tshirt-xs)]',
    textColor: CARD_TEXT,
  },
  { displayValue: 'S', value: 1, color: 'bg-[var(--color-card-tshirt-s)]', textColor: CARD_TEXT },
  { displayValue: 'M', value: 2, color: 'bg-[var(--color-card-tshirt-m)]', textColor: CARD_TEXT },
  { displayValue: 'L', value: 3, color: 'bg-[var(--color-card-tshirt-l)]', textColor: CARD_TEXT },
  {
    displayValue: 'XL',
    value: 4,
    color: 'bg-[var(--color-card-tshirt-xl)]',
    textColor: CARD_TEXT,
  },
  {
    displayValue: 'XXL',
    value: 5,
    color: 'bg-[var(--color-card-tshirt-xxl)]',
    textColor: CARD_TEXT,
  },
  {
    displayValue: '?',
    value: -1,
    shouldIncludeInAverage: false,
    color: 'bg-[var(--color-card-tshirt-no)]',
    textColor: CARD_TEXT,
  },
  {
    displayValue: '🙅🏼',
    value: -2,
    shouldIncludeInAverage: false,
    color: 'bg-[var(--color-card-tshirt-no)]',
    textColor: CARD_TEXT,
  },
];
