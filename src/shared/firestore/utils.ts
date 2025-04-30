import {
  limit,
  orderBy,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { type FirestoreSearchInput } from "./types";

/**
 * Build query constraints from a search input
 *
 * @param input The search input
 * @param input.filter The filter conditions
 * @param input.order The order conditions
 * @param input.paging The paging conditions
 *
 * @returns The query constraints
 */
export function buildQueryConstraints<T extends Record<string, unknown>>(
  input: FirestoreSearchInput<T>
): QueryConstraint[] {
  const { filter, order, paging } = input;

  const constraints: QueryConstraint[] = [];

  for (const [field, condition] of Object.entries(filter)) {
    if (condition !== undefined || condition !== null) {
      if (
        typeof condition === "object" &&
        condition &&
        "op" in condition &&
        "value" in condition
      ) {
        constraints.push(where(field as string, condition.op, condition.value));
      } else {
        constraints.push(where(field as string, "==", condition));
      }
    }
  }

  if (order) {
    constraints.push(orderBy(order.field as string, order.direction));
  }

  if (paging) {
    constraints.push(limit(paging.limit));
  }

  return constraints;
}
