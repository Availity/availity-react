import React, { useEffect } from 'react';
import { Table as RsTable } from 'reactstrap';
import Icon from '@availity/icon';
import TableHeader from './TableHeader';
import TableHeaderRow from './TableHeaderRow';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { useTableContext } from './TableContext';
import { OnRowSelectedEvent, OnTableClickEvent, ExtendedTableHeader, TableInstance, Row, Cell } from '.';

type HeaderProps = {
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type Props = {
  id?: string;
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  cellProps?: React.HTMLAttributes<HTMLElement>;
  onCellClick?: (event: OnTableClickEvent<HTMLElement>) => void;
  onRowClick?: (event: OnTableClickEvent<HTMLElement>) => void;
  onRowSelected?: (event: OnRowSelectedEvent) => void;
  headerProps?: HeaderProps;
  rowProps?: React.HTMLAttributes<HTMLElement>;
} & React.HTMLAttributes<HTMLElement>;

const Table = ({
  id,
  bodyProps,
  cellProps,
  headerProps,
  onRowClick,
  onCellClick,
  onRowSelected,
  rowProps,
  ...rest
}: Props) : JSX.Element => {

  const { sortable, selectable, instance } = useTableContext();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows: selectedRows,
    toggleHideColumn,
  } = instance as TableInstance;

  useEffect(() => {
    toggleHideColumn('selection', !selectable);
  }, [selectable, toggleHideColumn]);

  useEffect(() => {
    if (onRowSelected) {
      onRowSelected({ selectedRows: selectedRows?.map((selectedRow: any) => selectedRow.id) });
    }
  }, [selectedRows, onRowSelected]);

  const populateId = () => (id ? `${id}_` : '');

  return (
    <RsTable id={id} {...getTableProps({ className: 'av-grid' })} {...rest}>
      <TableHeader id={`${populateId()}table_header`} {...headerProps}>
        {headerGroups.map((headerGroup, rowIndex) => (
          <TableHeaderRow
            id={`${populateId()}table_header_row_${rowIndex}`}
            data-testid={`${populateId()}table_header_row_${rowIndex}`}
            key={rowIndex.toString()}
            headerGroup={headerGroup}
          >
            {headerGroup.headers.map((column, cellIndex) => {
              const header = column as ExtendedTableHeader;
              return (<TableHeaderCell
                id={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${header.id}`}
                data-testid={`${populateId()}table_header_row_${rowIndex}_cell_${cellIndex}_${header.id}`}
                key={header.id}
                column={header}
              >
                {header.render('Header')}
                {sortable && header.defaultCanSort && header.disableSortBy !== true ? (
                  <Icon
                    aria-hidden="true"
                    name={header.isSorted ? (header.isSortedDesc ? 'sort-down' : 'sort-up') : 'sort'}
                  />
                ) : null}
              </TableHeaderCell>)
            })}
          </TableHeaderRow>
        ))}
      </TableHeader>
      <tbody {...getTableBodyProps()} {...bodyProps}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <TableRow
              id={`${populateId()}table_row_${rowIndex}`}
              data-testid={`${populateId()}table_row_${rowIndex}`}
              key={`${populateId()}table_row_${rowIndex.toString()}`}
              index={rowIndex}
              row={row as Row}
              onRowClick={selectable ? undefined : onRowClick}
              onCellClick={selectable ? onRowClick : onCellClick}
              {...rowProps}
            >
              {row.cells.map((cell, cellIndex) => (
                <TableCell
                  id={`${populateId()}table_row_${rowIndex}_cell_${cellIndex}`}
                  data-testid={`${populateId()}table_row_${rowIndex}_cell_${cellIndex}`}
                  key={`${populateId()}table_row_${rowIndex.toString()}_cell_${cellIndex.toString()}`}
                  cell={cell as Cell}
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
    </RsTable >
  );
};

export default Table;
