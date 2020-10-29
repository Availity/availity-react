import { useQuery } from 'react-query';
import { avProvidersApi } from '@availity/api-axios';

const fetchProviders = async (_key, config) =>
  avProvidersApi.getProviders(config.customerId, config);

export default function useProviders(config, options) {
  return useQuery(['providers', config], fetchProviders, options);
}
