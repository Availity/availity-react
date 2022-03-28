import React from 'react';
import classNames from 'classnames';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { Cell, IdType } from './types/ReactTable';

type Props<T extends IdType> = {
  id?: string;
  cell: Cell<T>;
  scrollable?: boolean;
  children: React.ReactNode;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
} & React.HTMLAttributes<HTMLElement>;

const TableCell = <T extends IdType>({ cell, scrollable, children, onCellClick, ...rest }: Props<T>): JSX.Element => {
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
        } as OnTableClickEvent<HTMLTableCellElement, T>);
    },
  };

  return (
    <td {...cell.getCellProps(cellProps)} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
