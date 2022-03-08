import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { useDebounce } from 'react-use';

export const PaginationContext = React.createContext();

export const usePagination = () => useContext(PaginationContext);

// todos
// Add another `useEffect` for only updating the items without calling the function if the `itemsPerPage` prop changes

/**
 * Pagination Provider that takes in an async function or items and provides a list of items
 * @param {Function|Object} items - The Items or function to use for pagination
 * @param {number} itemsPerPage - The items to show per page
 */
const Pagination = ({
  items: theItems,
  page: propsCurrentPage,
  itemsPerPage,
  onPageChange,
  children,
  watchList,
  resetParams,
  defaultPage,
  debounceTimeout,
  shouldReturnPrevious,
  onError,
}) => {
  const ref = React.useRef();
  const [stateCurrentPage, setPage] = useState(defaultPage);
  const [doFocusRefOnPageChange, setDoFocusRefOnPageChange] = useState(false);
  const [pageData, setPageData] = useState({
    total: theItems != null && !isFunction(theItems) ? theItems.totalCount : 0,
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
  const [error, setError] = useState(null);
  const toggleLoading = (isLoading) => setLoading((l) => (isLoading !== undefined ? isLoading : !l));

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
        : { items: theItems };

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
        ref.current.nextSibling.focus();
        setDoFocusRefOnPageChange(false);
      }
    } catch (error_) {
      setError(error_);
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

  const updatePage = (page) => {
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

  // boom roasted
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

Pagination.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  children: PropTypes.node,
  watchList: PropTypes.array,
  resetParams: PropTypes.array,
  defaultPage: PropTypes.number,
  page: PropTypes.number,
  debounceTimeout: PropTypes.number,
  shouldReturnPrevious: PropTypes.bool,
  onError: PropTypes.func,
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  items: [],
  watchList: [],
  resetParams: [],
  defaultPage: 1,
  debounceTimeout: 0,
  shouldReturnPrevious: false,
};

export default Pagination;
