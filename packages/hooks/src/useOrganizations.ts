import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avOrganizationsApi } from '@availity/api-axios';
import { AriesHookBase } from './types';

export interface Organization {
  links: {
    permissions: { href: string };
    patients: { href: string };
    self: { href: string };
    admin: { href: string };
    businessArrangements: { href: string };
    users: { href: string };
  };
  id: string;
  customerId: string;
  name: string;
  status: string;
  statusCode: string;
  types: { code: string; value: string }[];
  primaryControllingAuthority: {
    lastName: string;
    firstName: string;
    primaryPhone: string;
    email: string;
  };
  physicalAddress: {
    line1: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
  };
  mailingAddress: {
    line1: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
  };
  regions: { code: string; value: string }[];
  npis: { number: string }[];
  taxIds: { number: string; type: string }[];
  phoneNumber: {
    areaCode: string;
    exchange: string;
    phoneNumber: string;
  };
  numberOfLicensedPhysicians: string;
  numberOfLicensedClinicians: string;
}

export interface OrganizationsResponse extends AriesHookBase {
  data: AriesHookBase['data'] & {
    organizations: Organization[];
  };
}

const fetchOrganization = async (config: Record<string, unknown>) =>
  avOrganizationsApi.getOrganizations(config) as unknown as OrganizationsResponse;

export default function useOrganizations(
  config: Record<string, unknown>,
  options?: Omit<UseQueryOptions<OrganizationsResponse, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<OrganizationsResponse, unknown> {
  return useQuery({ queryKey: ['organizations', config], queryFn: () => fetchOrganization(config), ...options });
}
