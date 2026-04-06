export interface Entry {
  id: string;
  label: string;
  weight: number;
}

export interface Group {
  id: string;
  name: string;
  entries: Entry[];
}

export type Mode =
  | "coin-flip"
  | "number-generator"
  | "order-shuffle"
  | "single-pick"
  | "dice-roller"
  | "pair-generator"
  | "team-generator"
  | "weighted-pick";
