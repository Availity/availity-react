import { avStashApi } from '@availity/api-axios';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type StashData = Record<string, unknown>;

const fetchStash = async (sessionId: string) => {
  const response = await avStashApi.get(sessionId);
  return response?.data;
};

export default function useStash(
  sessionId: string,
  options?: Omit<UseQueryOptions<StashData, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<StashData, unknown> {
  return useQuery({
    queryKey: ['stash', sessionId],
    queryFn: () => fetchStash(sessionId),
    enabled: !!sessionId,
    ...options,
  });
}
