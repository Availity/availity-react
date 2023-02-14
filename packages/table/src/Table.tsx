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
  useExpanded,
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
  /** This is a unique id that is prepended to the table and nested table elements. **/
  id?: string;
  /** Any DOM properties that should be passed onto the <table> element. **/
  tableProps?: React.HTMLAttributes<HTMLElement>;
  /** Any DOM properties that should be passed onto the <tbody> element. **/
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  /** This function provides any DOM properties that should be passed
   * onto the <td> elements. Optionally pass in the Cell object in order
   * to conditionally add DOM properties based on data of the cell. **/
  getCellProps?: (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>;
  /** This function provides any DOM properties that should be passed onto
   * the <tr> element. Optionally pass in the Row object in order to
   * conditionally add DOM properties based on the data of the row. **/
  getRowProps?: (row: Row<T>) => RowProps;

  /** This function is called whenever a cell on the row has been clicked. **/
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** This function is called whenever a row on the table has been clicked. **/
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** Event handler for when a row is selected. **/
  onRowSelected?: (event: OnRowSelectedEvent<T>) => void;
  /** Any DOM properties that should be passed onto the <thead> element.
   * A special boolean property sticky' is added here to allow for
   * designating the header as 'sticky' or not. **/
  headerProps?: HeaderProps;
  /** This function will be called whenever the table has been sorted. **/
  onSort?: (sortBy: TableSort[]) => void;

  /** This designates a Component that will be displayed in the table
   * row for the record. This content displays in an additional <tr>
   * with a colspan equal to the number of columns that are NOT sticky. **/
  additionalContent?: React.ElementType;
  /**  **/
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  footer?: boolean;
   * container. This will apply fixed column widths to force it to scroll
   * rather than minify the columns to fit in a set container. **/
  scrollable?: boolean;
  /** This determines whether the table is selectable or not. If it is set
   * to true, then the first column of the table will be a checkbox column
   * that will toggle selecting and deselecting the row. **/
  selectable?: boolean;
  useColumnWidths?: boolean;
  selectionColumnProps?: Partial<Column<T>>;
  /** This function determines if a row in a selectable table can be
   * selected. By default if no function is provided to this property,
   * all rows in the table are selectable. **/
  getCanSelectRow?: (record: T) => boolean;
  /**  **/
  sortable?: boolean;
  /** This boolean determines whether the table is paged or not. This
   * works with the usePagination hook that is documented in react-table.
   * This defaults to false. **/
  paged?: boolean;

  /** Custom plugin hooks that should be passed to the table. **/
  pluginHooks?: PluginHook<T>[];
  /** Children can be a react child. **/
  children?: React.ReactNode | React.ReactChild;
};

export type TableProps<T extends IdType> = {
  /** This is an array of column definitions based off of react-table Column. */
  columns: Column<T>[];
  /** This property holds the data for the table. */
  data: T[];
} & React.HTMLAttributes<HTMLElement> &
  CommonTableProps<T> &
  TableOptions<T>;

const Table = <T extends IdType>({
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
}: TableProps<T>): JSX.Element | null => {
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

export default Table;
