import { AriesHookBase } from './aries';
import { AxiosRequestConfig } from 'axios';
import { QueryResult } from 'react-query';

interface OrganizationsBase {
  data: {
    organizations: [
      {
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
        types: [{ code: string; value: string }];

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
        regions: Array<{ code: string; value: string }>;
        npis: Array<{ number: string }>;
        taxIds: Array<{ number: string; type: string }>;

        phoneNumber: {
          areaCode: string;
          exchange: string;
          phoneNumber: string;
        };
        numberOfLicensedPhysicians: string;
        numberOfLicensedClinicians: string;
      }
    ];
  };
}

type Organizations = AriesHookBase & OrganizationsBase;

export declare function useOrganizations(): QueryResult<Organizations>;

export default useOrganizations;
