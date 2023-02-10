import React from 'react';
import classNames from 'classnames';
import { ExtendedTableHeader, IdType } from './types/ReactTable';
import { TableSort } from './types/TableSort';

type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element **/
  id?: string;
  /**  **/
  column: ExtendedTableHeader<T>;
  /** This function will be called whenever the table has been sorted. **/
  onSort?: (sortBy: TableSort[]) => void;
  /** Children can be a react child. **/
  children: React.ReactNode | React.ReactNode[];

  /** This property is automatically set when it is wrapped in a
   * scrollable container. This will apply fixed column widths to force
   * it to scroll rather than minify the columns to fit in a set container. **/
  scrollable?: boolean;
  /** This determines whether the table is sortable or not. **/
  sortable?: boolean;
  /**  **/
  manualSortBy?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({
  column,
  children,
  onSort,

  scrollable,
  sortable,
  manualSortBy,

  ...rest
}: Props<T>): JSX.Element => {
  const sort = () => {
    column.toggleSortBy(!column.isSortedDesc, false);
    if (onSort) {
      onSort([{ id: column.id as string, desc: !column.isSortedDesc }]);
    }
  };

  const getOnClick = () => {
    if (sortable && manualSortBy && column.canSort && !column.disableSortBy) {
      return { onClick: () => sort() };
    }
    return null;
  };

  const getHeaderColumnProps = (column: ExtendedTableHeader<T>) => {
    const props = {
      className: classNames(column.className || '', {
        'fixed-width-text': scrollable && !column.className,
        sticky: column.stickyRight || column.stickyLeft,
        'sticky-right': column.stickyRight,
        'sticky-left': column.stickyLeft,
      }),
      title: column.label || typeof column.Header === 'string' ? column.Header?.toString() : undefined,
    };
    return sortable ? { ...column.getSortByToggleProps(props) } : props;
  };

  return (
    <th {...column.getHeaderProps(getHeaderColumnProps(column))} {...getOnClick()} {...rest}>
      <>{children}</>
    </th>
  );
};

export default TableHeaderCell;
