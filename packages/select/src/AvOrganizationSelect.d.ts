import type { GroupBase } from 'react-select';

import type { ResourceSelectProps } from './ResourceSelect';

type PrebuiltResourceSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ResourceSelectProps<Option, IsMulti, Group>, 'resource'>;

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

declare const AvOrganizationSelect: <
  Option = Organization,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AvOrganizationSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export default AvOrganizationSelect;
