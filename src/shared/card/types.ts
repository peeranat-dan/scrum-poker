export interface Card {
  value: number;
  displayValue: string;
  shouldIncludeInAverage?: boolean;
  color: string;
  /** Explicit text color class to ensure contrast against the card background color */
  textColor?: string;
}
