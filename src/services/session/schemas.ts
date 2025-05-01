import { SessionSchema } from "@/domain/session/schemas";
import { z } from "zod";

export const CreateSessionSchema = SessionSchema.pick({
  name: true,
  votingSystem: true,
  ownerId: true,
  status: true,
});

export const UpdateSessionSchema = SessionSchema.partial().extend({
  id: z.string(),
});

export const UpdateSessionInformationSchema = UpdateSessionSchema.pick({
  id: true,
  name: true,
  votingSystem: true,
});
