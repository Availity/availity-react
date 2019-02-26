
type ResourceType = {
    postGet: Function;
    getResult: string | Function
};

export interface AvResourcePaginationProps {
    itemsPerPage?: number;
    parameters?: object;
    children?: React.ReactType;
    resource: ResourceType;
    getResult: string | Function;
}

declare const AvResourcePagination: React.FunctionComponent<AvResourcePaginationProps>;

export default AvResourcePagination;