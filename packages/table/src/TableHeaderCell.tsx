import React from 'react';
import classNames from 'classnames';
import { useTableContext } from './TableContext';
import { ExtendedTableHeader, IdType } from './types/ReactTable';
import { TableSort } from './types/TableSort';

type Props<T extends IdType> = {
  id?: string;
  column: ExtendedTableHeader<T>;
  onSort?: (sortBy: TableSort[]) => void;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({ column, children, onSort, ...rest }: Props<T>): JSX.Element => {
  const { scrollable, sortable, instance } = useTableContext();

  const { manualSortBy } = instance;

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
      {children}
    </th>
  );
};

export default TableHeaderCell;
