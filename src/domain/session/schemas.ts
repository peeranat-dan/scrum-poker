import { votingSystemEnum } from "@/shared/zod/enum";
import { DomainEntitySchema } from "@/shared/zod/schemas/domain";
import { z } from "zod";

const sessionStatusEnum = z.enum(["active", "finished"]);

const BaseSessionSchema = z.object({
  name: z.string(),
  votingSystem: votingSystemEnum,
  status: sessionStatusEnum,
  ownerId: z.string(),
});

export const SessionSchema = DomainEntitySchema.merge(BaseSessionSchema);

export const CreateSessionSchema = SessionSchema.pick({
  name: true,
  votingSystem: true,
  ownerId: true,
  status: true,
});

export const UpdateSessionSchema = BaseSessionSchema.partial().extend({
  id: z.string(),
});

export const UpdateSessionInformationSchema = UpdateSessionSchema.pick({
  id: true,
  name: true,
  votingSystem: true,
});
