import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import isEqual from 'lodash.isequal';
import { useEffectAsync, useToggle } from '@availity/hooks';
import AvLocalStorage from '@availity/localstorage-core';

const avLocalStorage = new AvLocalStorage();

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
  itemsPerPage,
  onPageChange,
  children,
  watchList,
  resetParams,
  defaultPage,
}) => {
  const [currentPage, setPage] = useState(defaultPage);
  const [pageData, setPageData] = useState({
    total: theItems != null && !isFunction(theItems) ? theItems.totalCount : 0,
    pageCount: 0,
    page: [],
    lower: 0,
    upper: 0,
  });

  // create an abort controller for fetch to be able to cancel it

  const [loading, toggleLoading] = useToggle(true);

  useEffectAsync(async () => {
    avLocalStorage.set('current-page', currentPage);

    // If the items is a function then await the resposne in case of async actions
    const { items, totalCount } = isFunction(theItems)
      ? await theItems(currentPage, itemsPerPage)
      : { items: theItems };

    // Get index of item at the start of the currentPage
    const lower = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

    // Get the index of the item at the cut-off of the itemPerPage Count
    const upper =
      items.length - currentPage * itemsPerPage > 0
        ? itemsPerPage * currentPage
        : items.length;

    // Slice that data if it was NOT given from a function since we don't know if its returning all items or not for now.
    // todo - add prop if needed to handle this
    const page = isFunction(theItems) ? items : items.slice(lower - 1, upper);

    const pageCount = Math.ceil((totalCount || items.length) / itemsPerPage);

    if (!isEqual(avLocalStorage.get('current-page'), currentPage)) {
      return;
    }

    setPageData({
      total: totalCount || items.length,
      pageCount,
      page,
      lower,
      upper,
    });

    toggleLoading(false);
  }, [
    currentPage,
    itemsPerPage,
    isFunction(theItems) ? null : theItems,
    ...watchList,
  ]);

  const updatePage = page => {
    if (page !== currentPage) {
      toggleLoading(true);
      setPage(page);

      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  // We don't want to reset the page on the first render
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      updatePage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resetParams]);

  // boom roasted
  return (
    <PaginationContext.Provider
      value={{
        ...pageData,
        setPage: updatePage,
        currentPage,
        loading,
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
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  items: [],
  watchList: [],
  resetParams: [],
  defaultPage: 1,
};

export default Pagination;
