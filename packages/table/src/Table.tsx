import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
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
  useRowState,
  useExpanded,
  PluginHook,
} from 'react-table';
import { TableSort } from './types/TableSort';
import { Cell, Column, IdType, Row, TableInstance, TableOptions, RowProps } from './types/ReactTable';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { OnRowSelectedEvent } from './types/OnRowSelectedEvent';
import { TableContext } from './TableContext';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { TableSortOption } from './types';
import TableContent from './TableContent';

type HeaderProps = {
  /** This makes the column sticky to the table. This works best when inside a scrollable container. Not supported in IE11. */
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type CommonTableProps<T extends IdType> = {
  /** The Id of the table, utilized to create ids for table rows, table cells, etc. */
  id?: string;
  /** Any DOM properties properties that should be passed to the `<table/>` element. */
  tableProps?: React.HTMLAttributes<HTMLElement>;
  /** Any DOM properties that should be passed onto the `<thead>` element. A special boolean property `sticky` is added here to allow for designating the header as 'sticky' or not. */
  headerProps?: HeaderProps;
  /** Any DOM properties that should be passed into the `<tbody/> component. */
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  /** This function provides any DOM properties that should be passed onto the `<td>` elements. Optionally pass in the Cell object in order to conditionally add DOM properties based on data of the cell. */
  getCellProps?: (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>;
  /** This function provides any DOM properties that should be passed onto the `<tr>` element. Optionally pass in the Row object in order to conditionally add DOM properties based on the data of the row. */
  getRowProps?: (row: Row<T>) => RowProps;
  /** This function is called whenever a cell is clicked. */
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** This function is called whenever a row on the table has been clicked. */
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** When a table is selectable, this event is called whenever a row is selected. */
  onRowSelected?: (event: OnRowSelectedEvent<T>) => void;
  /** The function that is called whenever the table is sorted. Sortable must be true and columns must be configured to allow for sorting. */
  onSort?: (sortBy: TableSort[]) => void;

  /** This designates a Component that will be displayed in the table row for the record. This content displays in an additional `<tr>` with a colspan equal to the number of columns that are NOT sticky. */
  additionalContent?: React.ElementType;
  /** Additional Properties that should be added to the additional content component when it is rendered. */
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;

  /** Determines whether a footer should be displayed. */
  footer?: boolean;
  /** Determines whether the table should be contained in a set scrollable container. */
  scrollable?: boolean;
  /** Determines whether the table should be selectable. When true, the first column will be a column of checkboxes to either select/deselect all records or individual records. */
  selectable?: boolean;
  /** When true, it will take the width as defined in the column configuration and apply it to the styles of each column. */
  useColumnWidths?: boolean;
  /** Because this component dynamically builds the selection column, this allows for any customization to be added to the Selection Column. */
  selectionColumnProps?: Partial<Column<T>>;
  /** If rows should be conditionally selected, use this function to indicate the conditions per record. */
  getCanSelectRow?: (record: T) => boolean;
  /** Determines whether the table should be scrollable. */
  sortable?: boolean;
  /** Determines if this is a paged table. Only set this to true if doing client side paging. */
  paged?: boolean;
  /** Custom plugin hooks that should be passed to the table. For more information on how to utilize and apply hooks, refer to the react-table documentation. */
  pluginHooks?: PluginHook<T>[];
  /** Any child elements that should be added underneath the table context. */
  children?: React.ReactNode | React.ReactChild;
};

export type TableRef<T extends IdType> = {
  instance: TableInstance<T>;
};

export type TableProps<T extends IdType> = {
  /** This is an array of column definitions based off of react-table Column. */
  columns: Column<T>[];
  /** This property holds the data for the table. */
  data: T[];
} & React.HTMLAttributes<HTMLElement> &
  CommonTableProps<T> &
  TableOptions<T>;

const TableComponent = <T extends IdType>(
  {
    additionalContent: AdditionalContent,
    additionalContentProps,
    columns,
    data,
    selectable = false,
    scrollable,
    sortable = false,
    footer = false,
    id,
    tableProps,
    bodyProps,
    headerProps,
    selectionColumnProps,
    useColumnWidths,
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
  }: TableProps<T>,
  ref: Ref<TableRef<T>>
): JSX.Element | null => {
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
    useExpanded,
    usePagination,
    useRowSelect,
    useColumnOrder,
    useRowState,
    (hooks: Hooks<T>) => {
      const selectionColumn = {
        id: 'selection',
        title: 'Select record(s)',
        defaultCanSort: false,
        disableSortBy: true,
        disableClick: true,
        hidden: selectable,
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
        ...selectionColumnProps,
      };

      hooks.visibleColumns.push((columns: Column<T>[]) => {
        const cols = [];
        if (selectable) {
          cols.push(selectionColumn);
        }
        cols.push(...filter(columns, (col) => col.hidden !== true));
        return cols;
      });
    }
  ) as TableInstance<T>;

  const { selectedFlatRows } = tableInstance;

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

  useImperativeHandle<TableRef<T>, TableRef<T>>(
    ref,
    () => ({
      instance: tableInstance,
    }),
    [tableInstance]
  );

  return (
    <TableContext.Provider
      value={{
        id,
        instance: tableInstance,
        /** eslint-disable @typescript-eslint/no-explicit-any */
        getCellProps: getCellProps as (cell: Cell<Record<string, any>>) => React.HTMLAttributes<HTMLTableCellElement>,
        /** eslint-disable @typescript-eslint/no-explicit-any */
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
        footer,
        onRowClick,
        onCellClick,
        getCanSelectRow,
        onSort,
        onRowSelected,
        tableProps,
        useColumnWidths,
      }}
    >
      {children || <TableContent />}
    </TableContext.Provider>
  );
};

const Table = forwardRef(TableComponent) as <T extends IdType>(
  p: TableProps<T> & { ref?: Ref<TableRef<T>> }
) => JSX.Element;
export default Table;
