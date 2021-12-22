import React, { useEffect, useState } from 'react';
import { useRowSelect, useSortBy, useTable, Hooks, UseRowSelectInstanceProps, Column as RtColumn } from 'react-table';
import filter from 'lodash/filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { Cell, Column, CurrentTableState, IdType, TableInstance, TableOptions } from './types/ReactTable';
import { TableSortOption } from './types/TableSortOption';
import { TableContext } from './TableContext';

export type TableProviderProps<T extends IdType> = {
  additionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;

  children: React.ReactChild | React.ReactChild[];
  columns: Column<T>[];
  data: T[];
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  initialState?: Partial<CurrentTableState>;
} & TableOptions<T>;

const TableProvider = <T extends IdType>({
  additionalContent: AdditionalContent,
  additionalContentProps,

  columns,
  data,
  selectable,
  scrollable,
  sortable,
  children,
  ...rest
}: TableProviderProps<T>): JSX.Element => {
  let selectionColumn: Column<T>;
  const [isScrollable, setScrollable] = useState<boolean | undefined>(scrollable);

  const getSortableColumns = (): TableSortOption[] =>
    filter(columns, (column) => !column.disableSortBy && column.defaultCanSort).map((column) => {
      const col = column as Column<T>;
      return { value: col.accessor as string, label: col.Header as string };
    });

  const cols = columns as RtColumn<T>[];

  const tableInstance = useTable<T>(
    {
      ...rest,
      columns: cols,
      data,
    } as TableOptions<T>,
    useSortBy,
    useRowSelect,
    (hooks: Hooks<T>) => {
      selectionColumn = {
        id: 'selection',
        title: 'Select record(s)',
        className: 'fixed-width-selection',
        defaultCanSort: false,
        disableSortBy: true,
        disableClick: true,
        Header: ({ getToggleAllRowsSelectedProps }: UseRowSelectInstanceProps<T>) => (
          <div className="text-center">
            <IndeterminateCheckbox
              data-testid="table_header_select_all"
              aria-label="Select all records"
              {...getToggleAllRowsSelectedProps()}
            />
          </div>
        ),
        Cell: ({ row: { getToggleRowSelectedProps, index } }: Cell<T>) => (
          <div className="text-center">
            <IndeterminateCheckbox
              data-testid={`table_header_select_row_${index}`}
              aria-label="Select record"
              {...getToggleRowSelectedProps()}
            />
          </div>
        ),
      };

      hooks.visibleColumns.push((columns: Column<T>[]) => [selectionColumn, ...columns]);
    }
  ) as TableInstance<T>;

  const { toggleHideColumn } = tableInstance;

  useEffect(() => {
    toggleHideColumn('selection', !selectable);
  }, [selectable, toggleHideColumn]);

  return (
    <TableContext.Provider
      value={{
        AdditionalContent,
        additionalContentProps,
        selectable,
        scrollable: isScrollable as boolean | undefined,
        setScrollable,
        sortable,
        sortableColumns: getSortableColumns(),
        instance: tableInstance,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
