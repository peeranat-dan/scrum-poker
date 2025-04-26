import { type z } from "zod";
import {
  type CreateParticipantSchema,
  type ParticipantSchema,
  type UpdateParticipantNameSchema,
} from "./schemas";

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipantInput = z.infer<typeof CreateParticipantSchema>;

export type UpdateParticipantNameInput = z.infer<
  typeof UpdateParticipantNameSchema
>;
