import { type ZodSchema, ZodError } from 'zod';

export class ValidationError extends Error {
  issues: ZodError['issues'];

  public constructor(issues: ZodError['issues']) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.issues = issues;
  }
}

export function assertValid<T>(schema: ZodSchema<T>, input: unknown): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(error.issues);
    }
    throw error;
  }
}
