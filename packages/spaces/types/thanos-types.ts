export type Configuration = {
  configurationId?: string | null;
  type?: ConfigurationTypeUnion | null;
  link?: Link | null;
  activeDate?: string | null;
  isNew?: boolean | null;
  inactiveDate?: string | null;
  createDate?: string | null;
  updateDate?: string | null;
  tenant?: Tenant | null;
  authorized?: boolean | null;
  parents?: (Configuration | null)[] | null;
  parentIDs?: string[] | null;
  payerIDs?: string[] | null;
  name: string;
  shortName?: string | null;
  description?: string | null;
  permissions?: (Permission | null)[] | null;
  resources?: (AuthorizationResource | null)[] | null;
  meta?: Meta | null;
  metadataPairs?: (MetadataPair | null)[] | null;
  regions?: (Region | null)[] | null;
  keywords?: string[] | null;
  mod?: (ModUnion | null)[] | null;
};

type ConfigurationTypeUnion =
  | 'ALERT'
  | 'APPLICATION'
  | 'CONTAINER'
  | 'FILE'
  | 'HELP'
  | 'IDP'
  | 'INTEGRATION'
  | 'LEARNING'
  | 'NAVIGATION'
  | 'NEWS'
  | 'OPENID'
  | 'PAYERSPACE'
  | 'PROMOTIONAL'
  | 'PROXY'
  | 'QUESTION'
  | 'RESOURCE'
  | 'SAML'
  | 'TENANT'
  | 'TEXT';

type Link = {
  __typename?: 'Link';
  target?: TargetEnum | null;
  text?: string | null;
  url?: string | null;
};

type TargetEnum = '_blank' | '_self';

type Meta = {
  ssoId?: string;
} & Record<string, unknown>;

type MetadataPair = {
  __typename?: 'Metadata';
  name: string;
  value: string;
};

type Permission = {
  __typename?: 'Permission';
  description?: string | null;
  id: string;
};

type AuthorizationResource = {
  __typename?: 'AuthorizationResource';
  description?: string | null;
  id: string;
};

type ModUnion = 'APPROVE' | 'EDIT' | 'VIEW';

type Region = {
  __typename?: 'Region';
  abbreviation: string;
  value: string;
};

type TenantMember = {
  __typename?: 'TenantMember';
  akaname?: string | null;
  email?: string | null;
  id?: string | null;
  name?: string | null;
};

type DatapowerUrl = {
  __typename?: 'DatapowerUrl';
  text?: string | null;
  url?: string | null;
};

type Tenant = {
  id: string;
  __typename?: 'Tenant';
  activeDate?: string | null;
  approvalsRequired?: number | null;
  approvers?: (TenantMember | null)[] | null;
  categories?: (string | null)[] | null;
  clearinghouseId?: string | null;
  datapowerUrls?: (DatapowerUrl | null)[] | null;
  editors?: (TenantMember | null)[] | null;
  inactiveDate?: string | null;
  keywords?: string[] | null;
  metadata?: (MetadataPair | null)[] | null;
  metadataPairs?: (MetadataPair | null)[] | null;
  name?: string | null;
  payerId?: string | null;
  reportCode?: string | null;
  shortName?: string | null;
  tenantId: string;
  updateDate?: string | null;
  viewers?: (TenantMember | null)[] | null;
};
