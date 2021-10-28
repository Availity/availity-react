import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTableContext } from './TableContext';

const TableHeaderCell = ({ column, children, ...rest }) => {
  const { scrollable, sortable } = useTableContext();
  const getHeaderColumnProps = (column) => {
    const props = {
      className: classNames(column.className || '', {
        'fixed-width-text': scrollable && !column.className,
        sticky: column.stickyRight || column.stickyLeft,
        'sticky-right': column.stickyRight,
        'sticky-left': column.stickyLeft,
      }),
      title: column.label || typeof column.Header === 'string' ? column.Header.toString() : undefined,
    };
    return sortable ? column.getSortByToggleProps(props) : props;
  };

  return (
    <th {...column.getHeaderProps(getHeaderColumnProps(column))} {...rest}>
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
