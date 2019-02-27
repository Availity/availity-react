import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import { useEffectAsync, useToggle } from '@availity/hooks';

export const PaginationContext = React.createContext();

export const usePagination = () => useContext(PaginationContext);

// todos
// Add another `useEffect` for only updating the items without calling the function if the `itemsPerPage` prop changes

/**
 * Pagination Provider that takes in an async function or items and provides a list of items
 * @param {Function|Object} items - The Items or function to use for pagination
 * @param {number} itemsPerPage - The items to show per page
 */
const Pagination = ({ items: theItems, itemsPerPage, children }) => {
  const [currentPage, setPage] = useState(1);
  const [pageData, setPageData] = useState({
    total: theItems != null ? theItems.totalCount : 0,
    pages: [],
    page: {},
    lower: 0,
    upper: 0,
  });

  const [loading, toggleLoading] = useToggle(true);

  useEffectAsync(async () => {
    if (!loading) {
      toggleLoading();
    }

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

    // Slice that data if it was given from a function since we don't know if its returning all or not
    // todo - add prop if needed to handle this
    const pageData = isFunction(theItems)
      ? items
      : items.slice(lower - 1, upper);

    // Get page numbers
    const pages = Array.from(
      { length: Math.ceil((totalCount || items.length) / itemsPerPage) },
      (v, k) => k + 1
    );

    setPageData({
      total: totalCount || items.length,
      pages,
      page: { number: currentPage, items: pageData },
      lower,
      upper,
    });

    toggleLoading();
  }, [currentPage, itemsPerPage, isFunction(theItems) ? null : theItems]);

  // boom roasted
  return (
    <PaginationContext.Provider
      value={{
        ...pageData,
        setPage,
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
  children: PropTypes.node,
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  items: [],
};

export default Pagination;
