export interface SpacesProps {
    clientId: string;
    children?: React.ReactType;
    query?: string;
    variables?: Object;
    spaceIds: Array<string>;
    payerIds: Array<string>;
    spaces: Array<Object>;
}


export interface SpaceType {
    error?: string;
    space: object;
    isGhost: boolean;
    loading: boolean;
}

declare function useSpace(id?: string): SpaceType;

declare const Spaces: React.FunctionComponent<SpacesProps>;

export {
    useSpace
};

export default Spaces;
