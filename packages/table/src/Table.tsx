import React, { useEffect, useState } from 'react';
import filter from 'lodash/filter';
import {
  Hooks,
  useColumnOrder,
  useRowSelect,
  UseRowSelectInstanceProps,
  useSortBy,
  useTable,
  Column as RtColumn,
  usePagination,
  PluginHook,
  useRowState,
} from 'react-table';
import { TableSort } from './types/TableSort';
import {
  Cell,
  Column,
  IdType,
  Row,
  TableInstance,
  TableOptions,
  RowProps,
} from './types/ReactTable';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { OnRowSelectedEvent } from './types/OnRowSelectedEvent';
import { TableContext } from './TableContext';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { TableSortOption } from './types';

type HeaderProps = {
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type CommonTableProps<T extends IdType> = {
  id?: string;
  tableProps?: React.HTMLAttributes<HTMLElement>;
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  getCellProps?: (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>;
  getRowProps?: (row: Row<T>) => RowProps;

  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowSelected?: (event: OnRowSelectedEvent<T>) => void;
  headerProps?: HeaderProps;
  onSort?: (sortBy: TableSort[]) => void;
  onReset?: () => void;

  additionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;

  scrollable?: boolean;
  selectable?: boolean;
  getCanSelectRow?: (record: T) => boolean;
  sortable?: boolean;
  paged?: boolean;

  pluginHooks?: PluginHook<T>[];
  children?: React.ReactNode | React.ReactChild;
};

export type TableProps<T extends IdType> = {
  columns: Column<T>[];
  data: T[];
} & React.HTMLAttributes<HTMLElement> &
  CommonTableProps<T> &
  TableOptions<T>;

const Table = <T extends IdType>({
  additionalContent: AdditionalContent,
  additionalContentProps,
  columns,
  data,
  selectable,
  scrollable,
  sortable,
  onReset,
  id,
  tableProps,
  bodyProps,
  headerProps,
  onRowClick,
  onCellClick,
  onRowSelected,
  getCanSelectRow,
  getRowProps = () => ({} as RowProps),
  getCellProps = () => ({} as React.HTMLAttributes<HTMLTableCellElement>),
  onSort,
  paged = false,
  pluginHooks,
  children,
  ...rest
}: TableProps<T>): JSX.Element | null => {
  let selectionColumn: Column<T>;

  const [selectedTableRows, setSelectedTableRows] = useState<Row<T>[]>([]);
  const [sortableColumns] = useState<TableSortOption[]>(
    filter(columns, (column) => !column.disableSortBy && column.defaultCanSort).map((column) => {
      const col = column as Column<T>;
      return { value: col.accessor as string, label: col.Header as string };
    })
  );

  const cols = columns as RtColumn<T>[];

  const tableInstance = useTable<T>(
    {
      ...rest,
      columns: cols,
      data,
    } as TableOptions<T>,
    ...(pluginHooks || []),
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    useRowState,
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
        Cell: ({ row }: Cell<T>) => {
          const { getToggleRowSelectedProps, index, original } = row;
          return getCanSelectRow && !getCanSelectRow(original) ? null : (
            <div className="text-center">
              <IndeterminateCheckbox
                data-testid={`table_header_select_row_${index}`}
                aria-label="Select record"
                {...getToggleRowSelectedProps()}
              />
            </div>
          );
        },
      };

      hooks.visibleColumns.push((columns: Column<T>[]) => [
        selectionColumn,
        ...filter(columns, (col) => col.hidden !== true),
      ]);
    }
  ) as TableInstance<T>;

  const { selectedFlatRows, toggleHideColumn } = tableInstance;

  useEffect(() => {
    toggleHideColumn('selection', !selectable);
  }, [selectable, toggleHideColumn]);

  useEffect(() => {
    setSelectedTableRows(
      getCanSelectRow ? (selectedFlatRows.filter((row) => getCanSelectRow(row.original)) as Row<T>[]) : selectedFlatRows
    );
  }, [selectedFlatRows, getCanSelectRow]);

  useEffect(() => {
    if (onRowSelected) {
      onRowSelected({ selectedRows: selectedTableRows });
    }
  }, [selectedTableRows, onRowSelected]);

  return (
    <TableContext.Provider
      value={{
        id,
        instance: tableInstance,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        getCellProps: getCellProps as (cell: Cell<Record<string, any>>) => React.HTMLAttributes<HTMLTableCellElement>,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        getRowProps: getRowProps as (row: Row<Record<string, any>>) => RowProps,
        selectable,
        sortable,
        scrollable,
        sortableColumns,
        headerProps,
        bodyProps,
        AdditionalContent,
        additionalContentProps,
        paged,
        onRowClick,
        onCellClick,
        getCanSelectRow,
        onSort,
        onReset,
        onRowSelected,
        tableProps
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default Table;
