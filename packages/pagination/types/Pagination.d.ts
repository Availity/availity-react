export interface PaginationProps {
    items: Array<Object> | Function;
    itemsPerPage?: number;
    children?: React.ReactType;
    onPageChange?: Function;
    watchList?: Array<any>;
    defaultPage?: number;
}

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;