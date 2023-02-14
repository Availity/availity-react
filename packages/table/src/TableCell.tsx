import React from 'react';
import classNames from 'classnames';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { Cell, IdType } from './types/ReactTable';

type Props<T extends IdType> = {
  /**  **/
  id?: string;
  /**  **/
  cell: Cell<T>;
  /**  **/
  scrollable?: boolean;
  
  isFixedWith?: boolean;
  /**  **/
  getCellProps: (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>;

  children: React.ReactNode;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
} & React.HTMLAttributes<HTMLElement>;

const TableCell = <T extends IdType>({
  cell,
  scrollable,
  children,
  onCellClick,
  getCellProps,
  ...rest
}: Props<T>): JSX.Element => {
  const { className, disableClick, stickyLeft, stickyRight, width, minWidth, maxWidth } = cell.column;

  const isFixedWidth = scrollable && !className;

  const cellProps = {
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

  const buildCellProps = () => {
    const props = cell.getCellProps();

    props.className = classNames(
      className || '',
      {
        'cursor-pointer': !!onCellClick,
        sticky: stickyRight || stickyLeft,
        'sticky-right': stickyRight,
        'sticky-left': stickyLeft,
      },
      props.className
    );
    return {
      ...props,
      ...cellProps,
      style: isFixedWidth
        ? {
            width,
            minWidth,
            maxWidth,
          }
        : undefined,
      ...rest,
    };
  };

  return <td {...cell.getCellProps(buildCellProps)}>{children}</td>;
};

export default TableCell;
