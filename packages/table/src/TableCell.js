import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTableContext } from './TableContext';

const TableCell = ({ cell, children, onCellClick, ...rest }) => {
  const { scrollable } = useTableContext();
  const { isFormattedColumn, disableClick } = cell.column;

  const cellProps = {
    className: classNames(cell.column.className || '', {
      'fixed-width-text': scrollable && !cell.column.className,
      'cursor-pointer': !!onCellClick,
      sticky: cell.column.stickyRight || cell.column.stickyLeft,
      'sticky-right': cell.column.stickyRight,
      'sticky-left': cell.column.stickyLeft,
    }),
    title: cell.value && !isFormattedColumn ? cell.value.toString() : undefined,
    onClick: (e) => {
      if (!disableClick && onCellClick)
        onCellClick({
          ...e,
          data: cell.row.original,
          index: cell.row.index,
          instance: cell.row,
        });
    },
  };

  return (
    <td {...cell.getCellProps(cellProps)} {...rest}>
      {children}
    </td>
  );
};

TableCell.propTypes = {
  cell: PropTypes.object,
  children: PropTypes.node,
  onCellClick: PropTypes.func,
};

export default TableCell;
