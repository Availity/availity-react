import React, { useState, useContext, useEffect, useRef } from 'react';
import isFunction from 'lodash/isFunction';
import { useDebounce } from 'react-use';

export type PaginationCtx<TItem extends Record<string, unknown>> = {
  total: number;
  pageCount: number;
  page: TItem[];
  allPages: TItem[];
  lower: number;
  upper: number;
  hasMore: boolean;
  setPage: (page: number) => void;
  currentPage: number;
  loading: boolean;
  error: Error | null;
  setError: (error: Error) => void;
  itemsPerPage: number;
  // ref: React.MutableRefObject<HTMLSpanElement | undefined>;
  ref: React.Ref<HTMLSpanElement>;
  setDoFocusRefOnPageChange: (doFocus: boolean) => void;
};

export const PaginationContext = React.createContext<PaginationCtx<Record<string, unknown>> | null>(null);

export const usePagination = <TItem extends Record<string, unknown>>(): PaginationCtx<TItem> => {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error('usePagination must be used inside the Pagination Provider');
  return ctx as PaginationCtx<TItem>;
};

// todos
// Add another `useEffect` for only updating the items without calling the function if the `itemsPerPage` prop changes

export type PaginationProps<TItem extends Record<string, unknown>> = {
  children?: React.ReactNode;
  debounceTimeout?: number;
  defaultPage?: number;
  items: TItem[] | ((page: number, itemsPerPage: number) => Promise<{ items: TItem[]; totalCount: number }>);
  itemsPerPage?: number;
  onError?: (error: Error) => void;
  onPageChange?: (page: number) => void;
  page?: number;
  resetParams?: unknown[];
  shouldReturnPrevious?: boolean;
  watchList?: unknown[];
};

type PaginationState<TItem> = {
  total: number;
  pageCount: number;
  page: TItem[];
  allPages: TItem[];
  lower: number;
  upper: number;
  hasMore: boolean;
};

// Define default values out here for referential stability
const defaultValues = {
  items: [],
  watchList: [],
  resetParams: [],
  itemsPerPage: 10,
  defaultPage: 1,
  debounceTimeout: 0,
  shouldReturnPrevious: false,
};

const Pagination = <TItem extends Record<string, unknown>>({
  items: theItems = defaultValues.items,
  page: propsCurrentPage,
  itemsPerPage = defaultValues.itemsPerPage,
  onPageChange,
  children,
  watchList = defaultValues.watchList,
  resetParams = defaultValues.resetParams,
  defaultPage = defaultValues.defaultPage,
  debounceTimeout = defaultValues.debounceTimeout,
  shouldReturnPrevious = defaultValues.shouldReturnPrevious,
  onError,
}: PaginationProps<TItem>): JSX.Element => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [stateCurrentPage, setPage] = useState(defaultPage);
  const [doFocusRefOnPageChange, setDoFocusRefOnPageChange] = useState(false);
  const [pageData, setPageData] = useState<PaginationState<TItem>>({
    total: theItems != null && !isFunction(theItems) ? theItems.length : 0,
    pageCount: 0,
    page: [],
    allPages: [],
    lower: 0,
    upper: 0,
    hasMore: false,
  });

  const currentPage = propsCurrentPage || stateCurrentPage;

  // create an abort controller for fetch to be able to cancel it

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const toggleLoading = (isLoading: boolean) => {
    setLoading((prev) => (isLoading !== undefined ? isLoading : !prev));
  };

  useEffect(() => {
    if (onError && error) onError(error);
  }, [error, onError]);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getPageData = async () => {
    try {
      toggleLoading(true);

      // If the items is a function then await the response in case of async actions
      const { items, totalCount } = isFunction(theItems)
        ? await theItems(currentPage, itemsPerPage)
        : { items: theItems, totalCount: theItems.length };

      // Get index of item at the start of the currentPage
      const lower = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

      // Get the index of the item at the cut-off of the itemPerPage Count
      const upper = items.length - currentPage * itemsPerPage > 0 ? itemsPerPage * currentPage : items.length;

      // Slice that data if it was NOT given from a function since we don't know if its returning all items or not for now.
      // todo - add prop if needed to handle this
      const page = isFunction(theItems) ? items : items.slice(lower - 1, upper);

      // eslint-disable-next-line unicorn/explicit-length-check
      const total = totalCount || items.length;
      const pageCount = Math.ceil(total / itemsPerPage);

      setPageData({
        total,
        pageCount,
        page,
        allPages: [...pageData.allPages, ...page],
        lower,
        upper,
        hasMore: currentPage < pageCount,
      });

      if (doFocusRefOnPageChange && ref.current && ref.current.nextSibling) {
        (ref.current.nextSibling as HTMLElement).focus();
        setDoFocusRefOnPageChange(false);
      }
    } catch (error_) {
      setError(error_ as Error);
    } finally {
      toggleLoading(false);
    }
  };

  useDebounce(
    () => {
      if (!shouldReturnPrevious) {
        getPageData();
      }
    },
    debounceTimeout,
    [currentPage, itemsPerPage, isFunction(theItems) ? null : theItems, shouldReturnPrevious, ...watchList]
  );

  const updatePage = (page: number) => {
    if (page !== currentPage) {
      toggleLoading(true);

      // If pagination is controlling the state then set the page
      if (!propsCurrentPage) {
        setPage(page);
      }

      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  // We don't want to reset the page on the first render
  const firstUpdate = useRef(true);
  useDebounce(
    () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        // Reset allPages
        setPageData({ ...pageData, allPages: [] });
        const current = currentPage;
        updatePage(1);
        // If the current page was already 1 and theItems is a function, re-fetch the page data
        if (current === 1 && isFunction(theItems)) {
          getPageData();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    debounceTimeout,
    [...resetParams]
  );

  return (
    <PaginationContext.Provider
      value={{
        ...pageData,
        setPage: updatePage,
        currentPage,
        loading,
        error,
        setError,
        itemsPerPage,
        ref,
        setDoFocusRefOnPageChange,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default Pagination;
