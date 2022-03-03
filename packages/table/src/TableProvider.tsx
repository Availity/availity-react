import React, {  useEffect, useState } from 'react';
import {
  useRowSelect,
  useSortBy,
  useTable,
  Hooks,
  UseRowSelectInstanceProps,
  Column as RtColumn,
  useColumnOrder,
} from 'react-table';
import filter from 'lodash/filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { Cell, Column, IdType, TableInstance, TableOptions } from './types/ReactTable';
import { TableSortOption } from './types/TableSortOption';
import { TableContext } from './TableContext';

export type TableProviderProps<T extends IdType> = {
  additionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  columns: Column<T>[];
  onReset?: () => void;
  data: T[];
  hasCustomizableColumns: boolean;
  onColumnsCustomized?: (hiddenColumnIds: string[], visibleColumnIds: []) => void;
  children: React.ReactChild | React.ReactChild[];
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  minimumNumberOfColumns?: number;
  defaultColumns: Column<T>[]
} & TableOptions<T>;

const TableProvider = <T extends IdType>({
  additionalContent: AdditionalContent,
  additionalContentProps,
  hasCustomizableColumns = false,
  columns,
  data,
  selectable,
  scrollable,
  sortable,
  onReset,
  minimumNumberOfColumns = 3,
  defaultColumns,
  children,
  ...rest
}: TableProviderProps<T>): JSX.Element => {
  let selectionColumn: Column<T>;
  const [isScrollable, setScrollable] = useState(scrollable);
  const [isCustomizingColumns, setIsCustomizingColumns] = useState(false);

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
    useColumnOrder,
    (hooks: Hooks<T>) => {
      selectionColumn = {
        id: 'selection',
        title: 'Select record(s)',
        className: 'fixed-width-selection',
        defaultCanSort: false,
        disableSortBy: true,
        disableClick: true,
        canCustomize: false,
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

      hooks.visibleColumns.push((columns: Column<T>[]) => [
        selectionColumn,
        ...filter(columns, (col) => col.hidden !== true),
      ]);
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
        hasCustomizableColumns,
        selectable,
        scrollable: isScrollable as boolean | undefined,
        setScrollable,
        sortable,
        sortableColumns: getSortableColumns(),
        instance: tableInstance,
        isCustomizingColumns,
        setIsCustomizingColumns,
        onReset,
        minimumNumberOfColumns,
        defaultColumns: defaultColumns as Column<IdType>[]
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
