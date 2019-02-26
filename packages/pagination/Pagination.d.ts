export interface PaginationProps {
    items: Array<Object> | Function;
    itemsPerPage?: number;
    children?: React.ReactType;
}

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;