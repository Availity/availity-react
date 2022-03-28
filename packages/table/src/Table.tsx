import React, { useEffect, useState } from 'react';
import { Table as RsTable } from 'reactstrap';
import Icon from '@availity/icon';
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
} from 'react-table';
import TableHeader from './TableHeader';
import TableHeaderRow from './TableHeaderRow';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { TableSort } from './types/TableSort';
import { Cell, Column, ExtendedTableHeader, IdType, Row, TableInstance, TableOptions } from './types/ReactTable';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { OnRowSelectedEvent } from './types/OnRowSelectedEvent';
import { useTableContext } from './TableContext';
import IndeterminateCheckbox from './IndeterminateCheckbox';

type HeaderProps = {
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type CommonTableProps<T extends IdType> = {
  id?: string;
  tableProps?: React.HTMLAttributes<HTMLElement>;
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  cellProps?: React.HTMLAttributes<HTMLElement>;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowSelected?: (event: OnRowSelectedEvent) => void;
  headerProps?: HeaderProps;
  rowProps?: React.HTMLAttributes<HTMLElement>;
  onSort?: (sortBy: TableSort[]) => void;

  additionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;

  hasCustomizableColumns?: boolean;
  onColumnsCustomized?: (hiddenColumnIds: string[], visibleColumnIds: string[]) => void;
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  paged?: boolean;

  minimumNumberOfColumns?: number;
  defaultColumns?: Column<T>[];
  onReset?: () => void;

  pluginHooks?: PluginHook<T>[];
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
  hasCustomizableColumns,
  onColumnsCustomized,
  columns,
  data,
  selectable,
  scrollable,
  sortable,
  onReset,
  minimumNumberOfColumns = 3,
  defaultColumns,
  id,
  tableProps,
  bodyProps,
  cellProps,
  headerProps,
  onRowClick,
  onCellClick,
  onRowSelected,
  rowProps,
  onSort,
  paged = false,
  pluginHooks,
  ...rest
}: TableProps<T>): JSX.Element | null => {
  let selectionColumn: Column<T>;
  const { setInstance, setScrollable, setSortable, setSelectedRows, setSortableColumns, setSelectable } =
    useTableContext();

  const [isCustomizingColumns, setIsCustomizingColumns] = useState(false);

  const cols = columns as RtColumn<T>[];

  const tableInstance = useTable<T>(
    {
      ...rest,
      columns: cols,
      data,
    } as TableOptions<T>,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    ...(pluginHooks || []),
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows: selectedRows,
    toggleHideColumn,
    visibleColumns,
    manualSortBy,
    page,
  } = tableInstance;

  useEffect(() => {
    toggleHideColumn('selection', !selectable);
  }, [selectable, toggleHideColumn]);

  useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(selectedRows);
    }

    if (onRowSelected) {
      onRowSelected({ selectedRows: selectedRows?.map((selectedRow: Row<T>) => selectedRow.id) });
    }
  }, [selectedRows, onRowSelected, setSelectedRows]);

  useEffect(() => {
    if (tableInstance) {
      if (setInstance) {
        setInstance(tableInstance);
      }

      if (setSortableColumns) {
        setSortableColumns(filter(columns, (column) => !column.disableSortBy && column.defaultCanSort).map((column) => {
          const col = column as Column<T>;
          return { value: col.accessor as string, label: col.Header as string };
        }));
      }
    }
  }, [tableInstance, setInstance, setSortableColumns, columns]);

  useEffect(() => {
    if (scrollable && setScrollable) {
      setScrollable(scrollable);
    }
    if (sortable && setSortable) {
      setSortable(sortable);
    }
    if (selectable && setSelectable) {
      setSelectable(selectable);
    }
  }, [selectable, setSelectable, scrollable, setScrollable, sortable, setSortable]);

  const populateId = () => (id ? `${id}_` : '');

  const onColumnsCustomizing = (isCustomizing: boolean) => {
    setIsCustomizingColumns(isCustomizing);
  };

  return (
    <>
      {isCustomizingColumns ? <div className="overlay" /> : null}
      <RsTable id={id} {...getTableProps({ className: 'av-grid' })} {...tableProps}>
        <TableHeader id={`${populateId()}table_header`} {...headerProps}>
          {headerGroups.map((headerGroup, rowIndex: number) => {
            const headerGroupEx = headerGroup as ExtendedTableHeader<T>;
            return (
              <TableHeaderRow
                id={`${populateId()}table_header_row_${rowIndex}`}
                data-testid={`${populateId()}table_header_row_${rowIndex}`}
                key={rowIndex.toString()}
                headerGroup={headerGroupEx}
                scrollable={scrollable}
              >
                {headerGroup.headers.map((column, cellIndex: number) => {
                  const header = column as ExtendedTableHeader<T>;
                  return (
                    <TableHeaderCell
                      isLastColumn={cellIndex === visibleColumns.length - 1}
                      onSort={onSort}
                      id={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                      data-testid={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                      key={column.id}
                      scrollable={scrollable}
                      sortable={sortable}
                      hasCustomizableColumns={hasCustomizableColumns}
                      onColumnsCustomizing={onColumnsCustomizing}
                      onColumnsCustomized={onColumnsCustomized}
                      minimumNumberOfColumns={minimumNumberOfColumns}
                      defaultColumns={defaultColumns}
                      manualSortBy={manualSortBy}
                      instance={tableInstance}
                      onReset={onReset}
                      column={header}
                    >
                      {header.render('Header')}
                      {sortable && header.defaultCanSort && header.disableSortBy !== true ? (
                        <Icon
                          aria-hidden="true"
                          name={header.isSorted ? (header.isSortedDesc ? 'sort-down' : 'sort-up') : 'sort'}
                        />
                      ) : null}
                    </TableHeaderCell>
                  );
                })}
              </TableHeaderRow>
            );
          })}
        </TableHeader>
        <tbody {...getTableBodyProps()} {...bodyProps}>
          {(paged ? page : rows).map((row, rowIndex: number) => {
            prepareRow(row);
            return (
              <TableRow
                id={`${populateId()}table_row_${rowIndex}`}
                data-testid={`${populateId()}table_row_${rowIndex}`}
                key={`${populateId()}table_row_${rowIndex.toString()}`}
                index={rowIndex}
                row={row as Row<T>}
                onRowClick={selectable ? undefined : onRowClick}
                onCellClick={selectable ? onRowClick : onCellClick}
                AdditionalContent={AdditionalContent}
                additionalContentProps={additionalContentProps}
                scrollable={scrollable}
                instance={tableInstance}
                {...rowProps}
              >
                {row.cells.map((cell, cellIndex: number) => (
                  <TableCell
                    id={`${populateId()}table_row_${rowIndex}_cell_${cellIndex}`}
                    data-testid={`${populateId()}table_row_${rowIndex}_cell_${cellIndex}`}
                    key={`${populateId()}table_row_${rowIndex.toString()}_cell_${cellIndex.toString()}`}
                    cell={cell as Cell<T>}
                    onCellClick={selectable ? onRowClick : onCellClick}
                    {...cellProps}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </RsTable>
    </>
  );
};

export default Table;
