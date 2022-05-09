import type { GroupBase } from 'react-select';

import ResourceSelect from './types/ResourceSelect';
import type { ResourceSelectProps } from './types/ResourceSelect';

type PrebuiltResourceSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ResourceSelectProps<Option, IsMulti, Group>, 'resource'>;

type Code = {
  code: string;
  value: string;
};

export declare const AvCodeSelect: <
  Option = Code,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

type NavOption = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  type: string;
  activeDate: string;
  hasAccess?: boolean;
  children: NavOption[];
};

export declare const AvNavigationSelect: <
  Option = NavOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

type Address = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
};

type Organization = {
  id: string;
  customerId: string;
  name: string;
  dbaName: string;
  status: string;
  statusCode: string;
  types: { code: string; name: string }[];
  primaryConrollingAuthority: { lastName: string; firstName: string; primaryPhone: string; email: string };
  physicalAddress: Address;
  mailingAddress: Address;
  billingAddress: Address;
  regions: { code: string; value: string }[];
  npis: { number: string }[];
  taxIds: { number: string; type: string }[];
  payerAssignedProviderIds: Record<string, { number: string }[]>;
  phoneNumber: { areaCode: string; exchange: string; phoneNumber: string };
  faxNumber: { areaCode: string; exchange: string; phoneNumber: string };
  numberOfLicensedPhysicians: string;
  numberOfLicensedClinicians: string;
};

export type AvOrganizationSelectProps<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = PrebuiltResourceSelectProps<Option, IsMulti, Group> & {
  resourceIds?: string | string[] | string[][];
  permissionIds?: string | string[] | string[][];
};

export declare const AvOrganizationSelect: <
  Option = Organization,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AvOrganizationSelectProps<Option, IsMulti, Group>
) => JSX.Element;

type Payer = {
  id: string;
  payerId: string;
  payerName: string;
};

export declare const AvPayerSelect: <
  Option = Payer,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { customerId: string }
) => JSX.Element;

type Permission = {
  id: string;
  description: string;
  organizations: {
    id: string;
    customerId: string;
    name: string;
    resources: {
      id: string;
    }[];
  }[];
};

export declare const AvPermissionSelect: <
  Option = Permission,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

type Provider = {
  id: string;
  businessNAme: string;
  uiDisplayName: string;
  atypical: boolean;
  npi: string;
  customerIds: string[];
  roles: { code: string; value: string }[];
  primaryPhone: { internationalCellularCode: string; areaCode: string; phoneNumber: string };
  primaryFax: { internationalCellularCode: string; areaCode: string; phoneNumber: string };
  primaryAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    stateCode: string;
    zip: { code: string; addon: string };
  };
};

export declare const AvProviderSelect: <
  Option = Provider,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { customerId: string }
) => JSX.Element;

type Region = {
  id: string;
  value: string;
};

export declare const AvRegionSelect: <
  Option = Region,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { defaultToCurrentRegion?: boolean }
) => JSX.Element;

type User = {
  id: string;
  userId: string;
  akaname: string;
  lastName: string;
  firstName: string;
  email: string;
  userValidated: boolean;
  userHasSecurityException: boolean;
  userLatestVerifyStatusCode: string;
  currentRegion: string;
  createDate: string;
  lastUpdateDate: string;
};

export declare const AvUserSelect: <
  Option = User,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export default ResourceSelect;
