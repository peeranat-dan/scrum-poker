import { type z } from "zod";
import {
  type CreateSessionSchema,
  type SessionSchema,
  type UpdateSessionInformationSchema,
  type UpdateSessionSchema,
} from "./schemas";

export type Session = z.infer<typeof SessionSchema>;

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;

export type UpdateSessionInformationInput = z.infer<
  typeof UpdateSessionInformationSchema
>;
