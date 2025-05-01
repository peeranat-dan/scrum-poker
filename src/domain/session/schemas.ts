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
