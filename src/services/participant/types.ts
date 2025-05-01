import { type z } from "zod";
import {
  type CreateParticipantSchema,
  type UpdateParticipantNameSchema,
} from "./schemas";

export type CreateParticipantInput = z.infer<typeof CreateParticipantSchema>;

export type UpdateParticipantNameInput = z.infer<
  typeof UpdateParticipantNameSchema
>;
