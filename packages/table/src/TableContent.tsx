import React from 'react';
import { Table as RsTable } from 'reactstrap';
import Icon from '@availity/icon';
import TableHeader from './TableHeader';
import TableHeaderRow from './TableHeaderRow';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { Cell, ExtendedTableHeader, IdType, Row, TableInstance, RowProps } from './types/ReactTable';
import { useTableContext } from './TableContext';

const TableContent = <T extends IdType>(): JSX.Element | null => {
  const {
    instance: tableInstance,
    id,
    scrollable,
    sortable,
    tableProps,
    headerProps,
    onSort,
    bodyProps,
    paged,
    selectable,
    AdditionalContent,
    additionalContentProps,

    onRowClick,
    onCellClick,
    getCellProps,
    getRowProps,
  } = useTableContext();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, manualSortBy, page } =
    tableInstance as TableInstance<T>;

  const populateId = () => (id ? `${id}_` : '');

  return (
    <RsTable id={id} {...getTableProps({ className: 'av-grid' })} {...tableProps}>
      <TableHeader id={`${populateId()}table_header`} {...headerProps}>
        {headerGroups.map((headerGroup, rowIndex: number) => {
          const headerGroupEx = headerGroup as ExtendedTableHeader<T>;
          return (
            <TableHeaderRow
              id={`${populateId()}table_header_row_${rowIndex}`}
              data-testid={`${populateId()}table_header_row_${rowIndex}`}
              key={headerGroupEx.getHeaderGroupProps().key}
              headerGroup={headerGroupEx}
              scrollable={scrollable}
            >
              {headerGroup.headers.map((column, cellIndex: number) => {
                const header = column as ExtendedTableHeader<T>;
                return (
                  <TableHeaderCell
                    onSort={onSort}
                    id={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                    data-testid={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${column.id}`}
                    key={column.id}
                    scrollable={scrollable}
                    sortable={sortable}
                    manualSortBy={manualSortBy}
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
              id={`${populateId()}table_row_${row.id}`}
              data-testid={`${populateId()}table_row_${row.id}`}
              key={`${populateId()}table_row_${row.id}`}
              index={rowIndex}
              row={row as Row<T>}
              onRowClick={selectable ? undefined : onRowClick}
              onCellClick={selectable ? onRowClick : onCellClick}
              AdditionalContent={AdditionalContent}
              additionalContentProps={additionalContentProps}
              scrollable={scrollable}
              instance={tableInstance}
              getRowProps={getRowProps as (row: Row<T>) => RowProps}
            >
              {row.cells.map((cell, cellIndex: number) => (
                <TableCell<T>
                  id={`${populateId()}table_row_${row.id}_cell_${cellIndex}`}
                  data-testid={`${populateId()}table_row_${rowIndex}_cell_${cellIndex}`}
                  key={`${populateId()}table_row_${row.id}_cell_${cellIndex.toString()}`}
                  cell={cell as Cell<T>}
                  onCellClick={selectable ? onRowClick : onCellClick}
                  getCellProps={getCellProps as (cell: Cell<T>) => React.HTMLAttributes<HTMLTableCellElement>}
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

export default TableContent;
