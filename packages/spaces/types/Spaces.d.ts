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

declare function useSpaces(ids?: string[]): object[];

declare function useSpacesContext(): SpacesContext;

declare const Spaces: React.FunctionComponent<SpacesProps>;

export { useSpaces, useSpacesContext };

export default Spaces;
