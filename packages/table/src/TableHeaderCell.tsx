import React from 'react';
import classNames from 'classnames';
import { Column, ExtendedTableHeader, IdType, TableInstance } from './types/ReactTable';
import { TableSort } from './types/TableSort';
import CustomizeColumnsPopover from './CustomizeColumnsPopover';

type Props<T extends IdType> = {
  id?: string;
  column: ExtendedTableHeader<T>;
  onSort?: (sortBy: TableSort[]) => void;
  isLastColumn?: boolean;
  children: React.ReactNode | React.ReactNode[];

  instance: TableInstance<T>;
  scrollable?: boolean;
  sortable?: boolean;
  hasCustomizableColumns?: boolean;
  manualSortBy?: boolean;
  onColumnsCustomizing: (isCustomizing: boolean) => void;
  onColumnsCustomized?: (hiddenColumnIds: string[], visibleColumnIds: string[]) => void;
  minimumNumberOfColumns?: number;
  onReset?: () => void;
  defaultColumns?: Column<T>[];
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({
  column,
  children,
  onSort,
  isLastColumn,

  instance,
  scrollable,
  sortable,
  hasCustomizableColumns,
  manualSortBy,
  onColumnsCustomizing,
  onColumnsCustomized,
  minimumNumberOfColumns,
  defaultColumns,
  onReset,

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
        {isLastColumn && hasCustomizableColumns && (
          <CustomizeColumnsPopover
            instance={instance}
            onColumnsCustomizing={onColumnsCustomizing}
            onColumnsCustomized={onColumnsCustomized}
            defaultColumns={defaultColumns}
            minimumNumberOfColumns={minimumNumberOfColumns}
            onReset={onReset}
          />
        )}
      </>
    </th>
  );
};

export default TableHeaderCell;
