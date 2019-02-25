import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';

export const PaginationContext = React.createContext();

export const usePagination = () => useContext(PaginationContext);

const Pagination = ({
  items: theItems,
  totalItems,
  itemsPerPage,
  children,
}) => {
  const [currentPage, setPage] = useState(1);

  // If the items is a function then await the resposne in case of async actions
  const items = isFunction(theItems) ? theItems(currentPage) : theItems;

  // Get index of item at the start of the currentPage
  const lower = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

  // Get the index of the item at the cut-off of the itemPerPage Count
  const upper =
    items.length - currentPage * itemsPerPage > 0
      ? itemsPerPage * currentPage
      : items.length;

  // Slice that data
  const pageData = items.slice(lower - 1, upper);

  // Get page numbers
  const pages = Array.from(
    { length: Math.ceil((totalItems || items.length) / itemsPerPage) },
    (v, k) => k + 1
  );

  // boom roasted
  return (
    <PaginationContext.Provider
      value={{
        total: totalItems || items.length,
        pages,
        page: {
          number: currentPage,
          items: pageData,
        },
        lower,
        upper,
        setPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

Pagination.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  children: PropTypes.node,
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  items: [],
};

export default Pagination;
