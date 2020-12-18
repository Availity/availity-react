import { useQuery } from 'react-query';
import { avOrganizationsApi } from '@availity/api-axios';

const fetchOrganization = async (config) =>
  avOrganizationsApi.getOrganizations(config);

export default function useOrganization(config, options) {
  return useQuery(
    ['organizations', config],
    () => fetchOrganization(config),
    options
  );
}
