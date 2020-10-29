import { AxiosRequestConfig } from 'axios';
import { QueryConfig, QueryResult } from 'react-query';
import { AriesHookBase } from './aries';

interface ProvidersBase {
  data: {
    providers: [
      {
        id: string;
        lastName: string;
        firstName: string;
        middleName: string;
        uiDisplayName: string;
        atypical: boolean;
        npi: string;
        customerIds: [string];
        roles: [{ code: string; value: string }];

        primarySpecialty: {
          code: string;
          value: string;
        };
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
      }
    ];
  };
}

type Providers = AriesHookBase & ProvidersBase;

type AvConfig = { customerId: number } & AxiosRequestConfig;

declare function useProviders(
  config: AvConfig,
  options?: QueryConfig<Providers, unknown>
): QueryResult<Providers, unknown>;

export default useProviders;
