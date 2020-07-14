import { AriesHookBase } from './aries';
import { AxiosRequestConfig } from 'axios';
import { QueryResult } from 'react-query';

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

declare function useProviders(
  config: {
    customerId: number;
  } & AxiosRequestConfig
): QueryResult<Providers>;
export default useProviders;
