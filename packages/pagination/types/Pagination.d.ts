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
<<<<<<< HEAD
=======
  onError?: (error: Error) => void;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
=======
  error: any;
  setError: (error: any) => void;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  itemsPerPage: number;
  ref: React.MutableRefObject<any>;
  setDoFocusRefOnPageChange: (doFocus: boolean) => void;
}

declare function usePagination<T>(): PaginationContext<T>;

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
export { usePagination };
