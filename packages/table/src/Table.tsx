import React, { useEffect } from 'react';
import { Table as RsTable } from 'reactstrap';
import Icon from '@availity/icon';
import TableHeader from './TableHeader';
import TableHeaderRow from './TableHeaderRow';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { TableSort } from './types/TableSort';
import { Cell, CurrentTableState, ExtendedTableHeader, IdType, Row, TableInstance } from './types/ReactTable';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { OnRowSelectedEvent } from './types/OnRowSelectedEvent';
import { useTableContext } from './TableContext';

type HeaderProps = {
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type Props<T extends IdType> = {
  id?: string;
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  cellProps?: React.HTMLAttributes<HTMLElement>;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onRowSelected?: (event: OnRowSelectedEvent) => void;
  headerProps?: HeaderProps;
  rowProps?: React.HTMLAttributes<HTMLElement>;
  scrollable?: boolean;
  onSort?: (sortBy: TableSort[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const Table = <T extends IdType>({
  id,
  bodyProps,
  cellProps,
  headerProps,
  onRowClick,
  onCellClick,
  onRowSelected,
  rowProps,
  scrollable,
  onSort,
  ...rest
}: Props<T>): JSX.Element => {
  const { sortable, selectable, instance, setScrollable } = useTableContext();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows: selectedRows,
    toggleHideColumn,
    state,
  } = instance as TableInstance<T>;

  const tableState = state as CurrentTableState;

  useEffect(() => {
    if (scrollable && setScrollable) {
      setScrollable(scrollable);
    }
  }, [scrollable, setScrollable]);

  useEffect(() => {
    if (sortable && onSort && tableState) {
      const { sortBy } = tableState;
      if (sortBy) {
        onSort(sortBy);
      }
    }
  }, [tableState, sortable, onSort]);

  useEffect(() => {
    toggleHideColumn('selection', !selectable);
  }, [selectable, toggleHideColumn]);

  useEffect(() => {
    if (onRowSelected) {
      onRowSelected({ selectedRows: selectedRows?.map((selectedRow: Row<T>) => selectedRow.id) });
    }
  }, [selectedRows, onRowSelected]);

  const populateId = () => (id ? `${id}_` : '');

  return (
    <RsTable id={id} {...getTableProps({ className: 'av-grid' })} {...rest}>
      <TableHeader id={`${populateId()}table_header`} {...headerProps}>
        {headerGroups.map((headerGroup, rowIndex: number) => {
          const headerGroupEx = headerGroup as ExtendedTableHeader<T>;
          return (
            <TableHeaderRow
              id={`${populateId()}table_header_row_${rowIndex}`}
              data-testid={`${populateId()}table_header_row_${rowIndex}`}
              key={rowIndex.toString()}
              headerGroup={headerGroupEx}
            >
              {headerGroup.headers.map((column, cellIndex: number) => {
                const header = column as ExtendedTableHeader<T>;
                return (
                  <TableHeaderCell
                    id={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                    data-testid={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                    key={column.id}
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
        {rows.map((row, rowIndex: number) => {
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
  );
};

export default Table;
