import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avProvidersApi, ProvidersResponse as ApiProvidersResponse } from '@availity/api-axios';

/** @deprecated Use `ProvidersResponse` from `@availity/api-axios` instead */
export type ProvidersResponse = ApiProvidersResponse;

export interface AvProvidersConfig {
  customerId: string;
  [key: string]: unknown;
}

const fetchProviders = async (config: AvProvidersConfig) =>
  avProvidersApi.getProviders(config.customerId, config) as unknown as ProvidersResponse;

export default function useProviders(
  config: AvProvidersConfig,
  options?: Omit<UseQueryOptions<ProvidersResponse, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<ProvidersResponse, unknown> {
  return useQuery({ queryKey: ['providers', config], queryFn: () => fetchProviders(config), ...options });
}
