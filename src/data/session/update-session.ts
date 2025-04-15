import { type UpdateSessionInput } from "@/types/session.types";
import { doc, updateDoc } from "firebase/firestore";
import { sessionsCollection } from "../firestore";

export async function updateSession(input: UpdateSessionInput) {
  const { id, ...rest } = input;

  await updateDoc(doc(sessionsCollection, id), {
    ...rest,
  });
}
