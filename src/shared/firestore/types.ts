import { type Timestamp, type WhereFilterOp } from 'firebase/firestore';

type FilterCondition<Value> =
  | { op: 'in' | 'not-in'; value: Value[] }
  | { op: Exclude<WhereFilterOp, 'in' | 'not-in'>; value: Value }
  | Value;

type FirestoreFilter<T> = {
  [K in keyof T]?: FilterCondition<T[K]>;
};

export interface FirestoreSearchInput<T extends Record<string, unknown>> {
  filter: FirestoreFilter<T>;
  order?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  paging?: {
    limit: number;
  };
}

export type FirestoreDoc<T> = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
} & T;
