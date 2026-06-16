import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import {
  avOrganizationsApi,
  Organization as ApiOrganization,
  OrganizationsResponse as ApiOrganizationsResponse,
} from '@availity/api-axios';

/** @deprecated Use `Organization` from `@availity/api-axios` instead */
export type Organization = ApiOrganization;

/** @deprecated Use `OrganizationsResponse` from `@availity/api-axios` instead */
export type OrganizationsResponse = ApiOrganizationsResponse;

const fetchOrganization = async (config: Record<string, unknown>) =>
  avOrganizationsApi.getOrganizations(config) as unknown as OrganizationsResponse;

export default function useOrganizations(
  config: Record<string, unknown>,
  options?: Omit<UseQueryOptions<OrganizationsResponse, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<OrganizationsResponse, unknown> {
  return useQuery({ queryKey: ['organizations', config], queryFn: () => fetchOrganization(config), ...options });
}
