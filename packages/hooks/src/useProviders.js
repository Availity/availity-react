import { useQuery } from 'react-query';
import { avProvidersApi } from '@availity/api-axios';

const fetchProviders = async (_, config) =>
  avProvidersApi.getProviders(config.customerId, config);
export default (config) => useQuery(['providers', config], fetchProviders);
