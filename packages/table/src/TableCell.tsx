import React from 'react';
import classNames from 'classnames';
import { useTableContext } from './TableContext';
import { Cell, OnTableClickEvent } from '.';

type Props = {
  id?: string,
  cell: Cell,
  children: React.ReactNode,
  onCellClick?: (event: OnTableClickEvent<HTMLElement>) => void;
}

const TableCell = ({ cell, children, onCellClick, ...rest } : Props) : JSX.Element => {
  const { scrollable } = useTableContext();
  const { className, disableClick, stickyLeft, stickyRight } = cell.column;

  const isFixedWidth = scrollable && !className;

  const cellProps = {
    className: classNames(className || '', {
      'fixed-width-text': isFixedWidth,
      'cursor-pointer': !!onCellClick,
      sticky: stickyRight || stickyLeft,
      'sticky-right': stickyRight,
      'sticky-left': stickyLeft,
    }),
    title: cell.value && isFixedWidth ? cell.value.toString() : undefined,
    onClick: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {

      if (!disableClick && onCellClick)
        onCellClick({
          ...e,
          data: cell.row.original,
          index: cell.row.index,
          row: cell.row,
        } as OnTableClickEvent<HTMLTableCellElement>);
    },
  };

  return (
    <td {...cell.getCellProps(cellProps)} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
