export interface PaginationProps {
    items: Array<Object> | Function;
    itemsPerPage?: number;
    children?: React.ReactType;
    onPageChange?: Function;
    watchList?: Array<Object>;
}

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;