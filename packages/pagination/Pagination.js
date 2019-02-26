import React, { useState, useContext } from 'react';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import { useEffectAsync, useToggle } from '@availity/hooks';

export const PaginationContext = React.createContext();

export const usePagination = () => useContext(PaginationContext);

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
      act(() => toggleLoading());
    }

    // If the items is a function then await the resposne in case of async actions
    const { items, totalCount } = await (isFunction(theItems)
      ? theItems(currentPage, itemsPerPage)
      : theItems);

    // Get index of item at the start of the currentPage
    const lower = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

    // Get the index of the item at the cut-off of the itemPerPage Count
    const upper =
      items.length - currentPage * itemsPerPage > 0
        ? itemsPerPage * currentPage
        : items.length;

    // Slice that data
    const pageData = isFunction(theItems)
      ? items
      : items.slice(lower - 1, upper);

    // Get page numbers
    const pages = Array.from(
      { length: Math.ceil((totalCount || items.length) / itemsPerPage) },
      (v, k) => k + 1
    );

    act(() =>
      setPageData({
        total: totalCount || items.length,
        pages,
        page: { number: currentPage, items: pageData },
        lower,
        upper,
      })
    );

    act(() => toggleLoading());
  }, [currentPage, itemsPerPage]);

  // boom roasted
  return (
    <PaginationContext.Provider
      value={{
        ...pageData,
        setPage,
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
