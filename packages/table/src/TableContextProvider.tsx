import React, { useEffect, useState } from 'react';
import { useRowSelect, useSortBy, useTable, Hooks, UseRowSelectInstanceProps, Column as RtColumn } from 'react-table';
import filter from 'lodash/filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { Cell, Column, CurrentTableState, TableInstance, TableOptions } from './types/ReactTable';
import { TableSortOption } from './types/TableSortOption';
import { TableContext } from './TableContext';
import { TableRecord } from './types/TableRecord';

export type Props = {
  additionalContent?: React.ElementType;
  children: React.ReactChild | React.ReactChild[];
  columns: Column[];
  records: TableRecord[];
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  initialState?: Partial<CurrentTableState>;
};

const TableContextProvider = ({
  additionalContent: AdditionalContent,
  columns,
  records,
  selectable,
  scrollable,
  sortable,
  initialState,
  children,
}: Props): JSX.Element => {
  let selectionColumn: Column;
  const [isScrollable, setScrollable] = useState<boolean | undefined>(scrollable);

  const getSortableColumns = (): TableSortOption[] =>
    filter(columns, (column) => !column.disableSortBy && column.defaultCanSort).map((column) => {
      const col = column as Column;
      return { value: col.accessor as string, label: col.Header as string };
    });

  const cols = columns as RtColumn<TableRecord>[];

  const tableInstance = useTable(
    {
      columns: cols,
      data: records,
      initialState: initialState || {},
      autoResetSelectedRows: false,
    } as TableOptions,
    useSortBy,
    useRowSelect,
    (hooks: Hooks) => {
      selectionColumn = {
        id: 'selection',
        title: 'Select record(s)',
        className: 'fixed-width-selection',
        defaultCanSort: false,
        disableSortBy: true,
        disableClick: true,
        Header: ({ getToggleAllRowsSelectedProps }: UseRowSelectInstanceProps<TableRecord>) => (
          <div className="text-center">
            <IndeterminateCheckbox
              data-testid="table_header_select_all"
              aria-label="Select all records"
              {...getToggleAllRowsSelectedProps()}
            />
          </div>
        ),
        Cell: ({ row: { getToggleRowSelectedProps, index } }: Cell) => (
          <div className="text-center">
            <IndeterminateCheckbox
              data-testid={`table_header_select_row_${index}`}
              aria-label="Select record"
              {...getToggleRowSelectedProps()}
            />
          </div>
        ),
      };

      hooks.visibleColumns.push((columns: Column[]) => [selectionColumn, ...columns]);
    }
  ) as TableInstance;

  return (
    <TableContext.Provider
      value={{
        AdditionalContent,
        selectable,
        scrollable: isScrollable as boolean | undefined,
        setScrollable,
        sortable,
        initialState,
        sortOptions: getSortableColumns(),
        instance: tableInstance,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
