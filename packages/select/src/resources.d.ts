import type { GroupBase } from 'react-select';

import ResourceSelect from './ResourceSelect';
import type { ResourceSelectProps } from './ResourceSelect';
import AvOrganizationSelect from './AvOrganizationSelect';
import AvRegionSelect from './AvRegionSelect';

export { AvOrganizationSelect, AvRegionSelect };

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

type Address = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
};

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
