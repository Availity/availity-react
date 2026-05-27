import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type StashData = Record<string, unknown>;

declare function useStash(
  sessionId: string,
  options?: UseQueryOptions<StashData, unknown>
): UseQueryResult<StashData, unknown>;

export default useStash;
