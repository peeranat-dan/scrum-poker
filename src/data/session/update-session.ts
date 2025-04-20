import { doc, updateDoc } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { UpdateSessionSchema } from "./schemas";
import { type UpdateSessionInput } from "./types";

export async function updateSession(input: UpdateSessionInput) {
  const { id, ...rest } = UpdateSessionSchema.parse(input);

  await updateDoc(doc(sessionsCollection, id), {
    ...rest,
  });
}
