import { z } from 'zod';

export const showSchema = z.object({
  id: z.string(),
  headliner: z.string(),
  night: z.iso.datetime(),
  venue: z.string(),
  seatsLeft: z.number().int().nonnegative(),
});

export const showListSchema = z.array(showSchema);

export type Show = z.infer<typeof showSchema>;
