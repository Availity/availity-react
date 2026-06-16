import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avRegionsApi, Region } from '@availity/api-axios';

export interface CurrentRegion {
  code: string;
  value: string;
}

async function fetchRegion(): Promise<CurrentRegion> {
  const response = await avRegionsApi.getCurrentRegion();
  const data = response?.data as { regions?: Region[] };

  return {
    code: data?.regions?.[0]?.id || '',
    value: data?.regions?.[0]?.value || '',
  };
}

export default function useCurrentRegion(
  options?: Omit<UseQueryOptions<CurrentRegion, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<CurrentRegion, unknown> {
  return useQuery({ queryKey: ['region'], queryFn: fetchRegion, ...options });
}
