import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTableContext } from './TableContext';

const TableCell = ({ stickyClass, cell, children, onCellClick, ...rest }) => {
  const { scrollable } = useTableContext();
  const { isFormattedColumn, disableClick } = cell.column;

  const cellProps = {
    className: classNames(cell.column.className, stickyClass || '', {
      'fixed-width-text': scrollable && !cell.column.className,
      'cursor-pointer': !!onCellClick,
      sticky: cell.column.sticky,
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
  stickyClass: PropTypes.string,
  cell: PropTypes.object,
  children: PropTypes.node,
  onCellClick: PropTypes.func,
};

export default TableCell;
