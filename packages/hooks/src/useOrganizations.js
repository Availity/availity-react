import { useQuery } from 'react-query';
import { avOrganizationsApi } from '@availity/api-axios';

const fetchOrganization = async (_key, config) =>
  avOrganizationsApi.getOrganizations(config);

export default function useOrganization(config, options) {
  return useQuery(['organizations', config], fetchOrganization, options);
}
