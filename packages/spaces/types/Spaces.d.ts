export interface SpaceType {
  error?: string;
  space: object;
  loading: boolean;
}

export interface Feature {
  title?: string;
  subtitle?: string;
  message?: string;
  link?: Link;
  spaceID?: string;
}

export interface Link {
  text?: string;
  url?: string;
  target?: string;
}

export interface Rewrite {
  from?: string;
  to?: string;
}

export interface MetaPair {
  name: string;
  value: string;
}

export interface DisclaimerTextField {
  required?: boolean;
  label?: string;
  valueKey: string;
}

export interface Disclaimer {
  description?: string;
  organization?: boolean;
  provider?: boolean;
  providerType?: boolean;
  textField: DisclaimerTextField;
}

export interface Permission {
  id?: string;
  string?: string;
}

export interface Resource {
  id?: string;
  string?: string;
}

export interface Colors {
  billboardBackground?: string;
  primary?: string;
  secondary?: string;
  responsiveColor?: string;
}

export interface Parameters {
  factKey: string;
}

export interface UserLookup {
  fn?: string;
  attributeName?: string;
  parameters?: Parameters;
}

export interface Space {
  id: string;
  configurationId?: string;
  type?: string;
  activeDate?: string;
  isNew?: boolean;
  inactiveDate?: string;
  createDate?: string;
  updateDate?: string;
  tenant?: string;
  authorized?: boolean;
  parentIDs?: string[];
  childIDs?: string[];
  payerIDs?: string[];
  name: string;
  shortName?: string;
  description: string;
  permissions?: Permission[];
  resources?: Resource[];
  meta: object;
  metaPairs: MetaPair[];
  regions?: string[];
  keywords?: string[];
  mod: string[];
  link: Link;
  ssoId: string;
  parents?: Space[]
  children?: Space[]
  categories?: string[];
  categorized?: boolean;
  icons?: object;
  images?: object;
  query?: string;
  variables?: string;
  spUrl?: string;
  mapping?: object;
  disclaimer?: Disclaimer;
  colors?: Colors;
  termsOfUse?: Space;
  feature?: Feature;
  brandCode?: string;
  path?: string;
  request?: string;
  response?: string;
  rewrite?: Rewrite;
  transactionCode?: string;
  url?: string;
  relayState?: string;
  transUser?: string;
  createUser?: boolean;
  userLookup?: UserLookup;
  nonPayer?: boolean;
  allowedOrgs?: string[];
}

export interface SpacesContext {
  spaces?: Space[];
  loading: boolean;
  error?: string;
}

export interface SpacesProps {
  clientId: string;
  query?: string;
  children?:
    | React.ReactNode
    | ((spacesContext: SpacesContext) => React.ReactNode);
  variables?: Record<string, any>;
  spaceIds?: string[];
  payerIds?: string[];
  spaces?: string[];
}

declare function useSpaces(...ids: (string | undefined | null)[]): Space[];

declare function useSpacesContext(): SpacesContext;

declare const Spaces: React.FunctionComponent<SpacesProps>;

export { useSpaces, useSpacesContext };

export default Spaces;
