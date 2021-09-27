import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from './TableContext';

const TableHeaderCell = ({ column, children, ...rest }) => {
  const { scrollable } = useTableContext();
  const getHeaderColumnProps = (column) => ({
    className: column.className || (scrollable ? 'fixed-width-text' : ''),
    title:
      column.label || typeof column.Header === 'string'
        ? column.Header.toString()
        : undefined,
  });

  return (
    <th
      {...column.getHeaderProps(
        column.getSortByToggleProps(getHeaderColumnProps(column))
      )}
      {...rest}
    >
      {children}
    </th>
  );
};

TableHeaderCell.propTypes = {
  id: PropTypes.string,
  column: PropTypes.object,
  children: PropTypes.node,
};

export default TableHeaderCell;
