export interface SpacesProps {
    clientId: string;
    children?: React.ReactType;
    query?: string;
    variables?: Object
}

declare const Spaces: React.FunctionComponent<SpacesProps>;

export default Spaces;
