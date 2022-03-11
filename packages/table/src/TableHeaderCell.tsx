import React from 'react';
import classNames from 'classnames';
import { useTableContext } from './TableContext';
import { ExtendedTableHeader, IdType } from './types/ReactTable';
import { TableSort } from './types/TableSort';
import CustomizeColumnsPopover from './CustomizeColumnsPopover.';

type Props<T extends IdType> = {
  id?: string;
  column: ExtendedTableHeader<T>;
  onSort?: (sortBy: TableSort[]) => void;
  isLastColumn?: boolean;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({
  column,
  children,
  onSort,
  isLastColumn,
  ...rest
}: Props<T>): JSX.Element => {
  const { scrollable, sortable, instance, hasCustomizableColumns } = useTableContext();
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
        customizable: isLastColumn && hasCustomizableColumns,
      }),
      title: column.label || typeof column.Header === 'string' ? column.Header?.toString() : undefined,
    };
    return sortable ? { ...column.getSortByToggleProps(props) } : props;
  };

  return (
    <th {...column.getHeaderProps(getHeaderColumnProps(column))} {...getOnClick()} {...rest}>
      <>
        {children}
        {isLastColumn && hasCustomizableColumns && <CustomizeColumnsPopover />}
      </>
    </th>
  );
};

export default TableHeaderCell;
