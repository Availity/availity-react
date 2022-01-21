import { UseQueryOptions } from 'react-query';

export type Resource = {
  id: string;
};
export type Organization = {
  id: string;
  customerId: string;
  name: string;
  resources: Resource[];
};
export type Permission = {
  id: string;
  description: string;
  organizations: Organization[];
};

export type RequestedPermissions = (string | string[])[];
export type RequestedResources = (string | string[])[];

export type QueryOptions = Omit<
  UseQueryOptions<boolean, unknown, boolean, (string | boolean | RequestedResources | undefined)[]>,
  'queryKey' | 'queryFn'
>;
