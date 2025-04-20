import { votingSystemEnum } from "@/shared/zod/enum";
import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  name: z.string(),
  votingSystem: votingSystemEnum,
  status: z.enum(["active", "finished"]),
  finishedAt: z.date().optional(),
  ownerId: z.string(),
});

export const CreateSesionSchema = z.object({
  name: z.string(),
  votingSystem: votingSystemEnum,
  ownerId: z.string(),
});

export const UpdateSessionSchema = SessionSchema.partial();

export const UpdateSessionInformationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  votingSystem: votingSystemEnum.optional(),
});
