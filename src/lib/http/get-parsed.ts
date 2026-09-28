import type { z } from 'zod';

import { httpClient } from './http-client';

// GET a URL and validate the body against a zod schema before anyone uses it.
export async function getParsed<TSchema extends z.ZodType>(
  url: string,
  schema: TSchema,
  signal?: AbortSignal,
): Promise<z.output<TSchema>> {
  const response = await httpClient.get<unknown>(url, { signal });
  return schema.parse(response.data);
}
