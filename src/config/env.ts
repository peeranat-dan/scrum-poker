import { createEnv } from '@chanom/env';

import { clientSchema } from './env-schema';

/**
 * Typed, validated client env. Throws an `EnvValidationError` listing every
 * missing or malformed variable when the app loads.
 */
export const env = createEnv({ client: clientSchema, runtimeEnv: import.meta.env });
