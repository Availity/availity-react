export interface PaginationProps {
  items: object[] | Function;
  itemsPerPage?: number;
  children?: React.ReactNode;
  page?: number;
  onPageChange?: Function;
  watchList?: any[];
  resetParams?: any[];
  defaultPage?: number;
  debounceTimeout?: number;
  shouldReturnPrevious?: boolean;
  onError?: (error: Error) => void;
}

export interface PaginationContext<Item> {
  total: number;
  pageCount: number;
  page: Item[];
  allPages: Item[];
  lower: number;
  upper: number;
  hasMore: boolean;
  setPage: (page: number) => void;
  currentPage: number;
  loading: boolean;
  error: any;
  setError: (error: any) => void;
  itemsPerPage: number;
  ref: React.MutableRefObject<any>;
  setDoFocusRefOnPageChange: (doFocus: boolean) => void;
}

declare function usePagination<T>(): PaginationContext<T>;

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
export { usePagination };
