import { useQuery } from 'react-query';
import { avOrganizationsApi } from '@availity/api-axios';

const fetchOrganization = async (_, config) =>
  avOrganizationsApi.getOrganizations(config);
export default config => useQuery(['organizations', config], fetchOrganization);
