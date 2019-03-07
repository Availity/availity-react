import React, { useState, useContext } from 'react';
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
}) => {
  const [currentPage, setPage] = useState(1);
  const [pageData, setPageData] = useState({
    total: theItems != null && !isFunction(theItems) ? theItems.totalCount : 0,
    pages: [],
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

    // Get page numbers
    // eslint-disable-next-line prefer-spread
    const pages = Array.apply(
      null,
      new Array(Math.ceil((totalCount || items.length) / itemsPerPage))
    ).map((v, k) => k + 1);

    if (!isEqual(avLocalStorage.get('current-page'), currentPage)) {
      return;
    }

    setPageData({
      total: totalCount || items.length,
      pages,
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
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  items: [],
  watchList: [],
};

export default Pagination;
