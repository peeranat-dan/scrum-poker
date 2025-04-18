import { type UpdateSessionOwnerIdInput } from "@/types/session.types";
import { updateSession } from "./update-session";

export async function updateSessionOwnerId(input: UpdateSessionOwnerIdInput) {
  const { id, ownerId } = input;

  await updateSession({
    id,
    ownerId,
  });
}
