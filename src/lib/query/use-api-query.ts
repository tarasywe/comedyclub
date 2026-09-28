import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import type { z } from 'zod';

import { getParsed } from '@/lib/http/get-parsed';

type ApiQueryOptions<TSchema extends z.ZodType> = Omit<
  UseQueryOptions<z.output<TSchema>, Error, z.output<TSchema>, QueryKey>,
  'queryFn'
> & {
  url: string;
  schema: TSchema;
};

// Generic React Query read over HTTP: every response is zod-validated.
export function useApiQuery<TSchema extends z.ZodType>({
  url,
  schema,
  ...options
}: ApiQueryOptions<TSchema>) {
  return useQuery({
    ...options,
    queryFn: ({ signal }) => getParsed(url, schema, signal),
  });
}
