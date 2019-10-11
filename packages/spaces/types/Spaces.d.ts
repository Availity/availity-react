export interface SpacesProps {
  clientId: string;
  query?: string;
  children?: React.ReactNode;
  variables?: Record<string, any>;
  spaceIds?: string[];
  payerIds?: string[];
  spaces?: string[];
}

export interface SpaceType {
  error?: string;
  space: object;
  isGhost: boolean;
  loading: boolean;
}

declare function useSpace(id?: string): SpaceType;

declare const Spaces: React.FunctionComponent<SpacesProps>;

export { useSpace };

export default Spaces;
