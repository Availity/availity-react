import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avProvidersApi } from '@availity/api-axios';
import { AriesHookBase } from './types';

export interface ProvidersResponse extends AriesHookBase {
  data: AriesHookBase['data'] & {
    providers: {
      id: string;
      lastName: string;
      firstName: string;
      middleName: string;
      uiDisplayName: string;
      atypical: boolean;
      npi: string;
      customerIds: string[];
      roles: { code: string; value: string }[];
      primarySpecialty: { code: string; value: string };
      primaryFax: {
        internationalCellularCode: string;
        areaCode: string;
        phoneNumber: string;
      };
      primaryAddress: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        stateCode: string;
        zip: { code: string; addon: string };
      };
    }[];
  };
}

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
