import React from 'react';
import classNames from 'classnames';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { Cell, IdType } from './types/ReactTable';

type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element */
  id?: string;
  /** This is the react-table Cell that is being displayed. */
  cell: Cell<T>;
  /** Determines whether the table is contained in a set scrollable container. */
  scrollable?: boolean;
  /** This function provides any DOM properties that should be passed onto the `<td>` elements. Optionally pass in the Cell object in order to conditionally add DOM properties based on data of the cell. */
  getCellProps: (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>;
  /** Callback function that will be called when the cell is clicked if provided. */
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** When true, it will take the width as defined in the column configuration and apply it to the styles of each column. */
  useColumnWidths?: boolean;
  /** Children can be a react child. */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableCell = <T extends IdType>({
  cell,
  scrollable,
  children,
  useColumnWidths,
  onCellClick,
  getCellProps,
  ...rest
}: Props<T>): JSX.Element => {
  const { className, disableClick, stickyLeft, stickyRight, width, minWidth, maxWidth } = cell.column;

  const cellProps = {
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
    const props = { ...cell.getCellProps(), ...getCellProps(cell) };
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
      style: useColumnWidths
        ? {
            width,
            minWidth,
            maxWidth,
            ...props.style,
          }
        : props.style,
      ...rest,
    };
  };

  return <td {...cell.getCellProps(buildCellProps)}>{children}</td>;
};

export default TableCell;
