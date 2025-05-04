import { type z } from 'zod';
import {
  type CreateSessionSchema,
  type UpdateSessionInformationSchema,
  type UpdateSessionSchema,
} from './schemas';

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;

export type UpdateSessionInformationInput = z.infer<typeof UpdateSessionInformationSchema>;
