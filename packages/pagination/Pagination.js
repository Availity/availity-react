import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash.sortby';
import matchSorter from 'match-sorter';

export const PaginationContext = React.createContext();

/**
 * Easy sort method for sorting objects in an array
 * @param {array} items - The items to sort
 * @param {object} sort - Object { key: string, ascending: bool }
 */
const sortItems = (items, sort) => {
  if (!sort) {
    return items;
  }
  const { key, ascending = true } = sort;

  const sorted = sortBy(items, key);

  return ascending ? sorted.reverse() : sorted;
};

const Pagination = ({
  items,
  totalItems,
  itemsPerPage = 5,
  searchKeys,
  search,
  sort = null,
  children,
}) => {
  const [currentPage, setPage] = useState(1);

  // Get the keys to search on. First check if we got search keys in the props
  // else just use all the properties of the first item in the array
  const keys =
    searchKeys || (items && items.length > 0) ? Object.keys(items[0]) : [];

  // Get result of searched item
  const searched = search === '' ? items : matchSorter(items, search, { keys });

  // Sort the array if it needs to be sorted
  const sorted = sortBy === null ? searched : sortItems(searched, sort);

  // Get index of item at the start of the currentPage
  const lower = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

  // Get the index of the item at the cut-off of the itemPerPage Count
  const upper =
    sorted.length - currentPage * itemsPerPage > 0
      ? itemsPerPage * currentPage
      : sorted.length;

  // Slice that data
  const pageData = sorted.slice(lower - 1, upper);

  // Get page numbers
  const pages = Array.from(
    { length: Math.ceil((totalItems || sorted.length) / itemsPerPage) },
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
  items: PropTypes.arrayOf(PropTypes.any),
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  search: PropTypes.string,
  sort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    ascending: PropTypes.bool.isRequired,
  }),
  children: PropTypes.node,
};

export default Pagination;
