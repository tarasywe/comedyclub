import type { z } from 'zod';

import { storage } from './storage';

// Reads a JSON value and validates it; corrupt or outdated data falls back.
export function readJson<TSchema extends z.ZodType>(
  key: string,
  schema: TSchema,
  fallback: z.output<TSchema>,
): z.output<TSchema> {
  const raw = storage.getString(key);
  if (raw === undefined) return fallback;
  try {
    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result.data : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown) {
  storage.set(key, JSON.stringify(value));
}
