import { type WhereFilterOp } from "firebase/firestore";

type FilterCondition<Value> = { op: WhereFilterOp; value: Value } | Value;

type FirestoreFilter<T> = {
  [K in keyof T]?: FilterCondition<T[K]>;
};

export interface FirestoreSearchInput<T extends Record<string, unknown>> {
  filter: FirestoreFilter<T>;
  order?: {
    field: keyof T;
    direction: "asc" | "desc";
  };
  paging?: {
    limit: number;
  };
}
