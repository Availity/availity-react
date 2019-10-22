export interface SpacesContext {
  spaces?: object[];
  loading: boolean;
  error?: string;
}

export interface SpacesProps {
  clientId: string;
  query?: string;
  children?: React.ReactNode | ((spacesContext: SpacesContext) => React.ReactNode);
  variables?: Record<string, any>;
  spaceIds?: string[];
  payerIds?: string[];
  spaces?: string[];
}

export interface SpaceType {
  error?: string;
  space: object;
  loading: boolean;
}

export interface Feature {
  title?: string;
  subtitle?: string;
  message?: string;
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

export interface Space {
  id: string;
  name: string;
  description: string;
  type: string;
  activeDate?: string;
  inactiveDate?: string;
  createDate?: string;
  updateDate?: string;
  tenant?: string;
  partnerSpaceIDs?: string[];
  shortName?: string;
  parentIDs?: string[];
  childIDs?: string[];
  categories?: string[];
  categorized?: boolean;
  regions?: string[];
  permissions?: string[];
  resources?: string[];
  keywords?: string[];
  clearinghouseID?: string;
  colors?: object;
  feature?: Feature;
  icons?: object;
  images?: object;
  link?: Link;
  mapping?: object;
  metadata?: object;
  path?: string;
  request?: string;
  response?: string;
  rewrite?: Rewrite;
  template?: string;
  transactionCode?: string;
  payerIDs?: string[];
  url?: string;
  digestMethod?: string;
  relayState?: string;
  signatureMethod?: string;
  spPublicCertificate?: string;
  spUrl?: string;
  query?: string;
  variables?: string;
  metadataXml?: string;
  mod?: string[];
  isGhost?: boolean;
}

declare function useSpaces(...ids: string[]): Space[];

declare function useSpacesContext(): SpacesContext;

declare const Spaces: React.FunctionComponent<SpacesProps>;

export { useSpaces, useSpacesContext };

export default Spaces;
