import { z } from "zod";

export const participantRoles = ["owner", "admin", "player"] as const;
export const participantStatuses = ["active", "left", "deleted"] as const;

export const ParticipantSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string(),
  joinedAt: z.date(),
  deletedAt: z.date().nullable(),
  leftAt: z.date().nullable(),
  role: z.enum(participantRoles),
  status: z.enum(participantStatuses),
});

export const CreateParticipantSchema = z.object({
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string().optional(),
  role: z.enum(participantRoles),
});
