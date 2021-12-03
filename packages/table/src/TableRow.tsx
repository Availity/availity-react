import React from 'react';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import classNames from 'classnames';
import { useTableContext } from './TableContext';
import { Column, OnTableClickEvent, Row, TableInstance } from '.';

export type Props = {
  id?: string;
  row: Row,
  index: number;
  onRowClick?: (event: OnTableClickEvent<HTMLElement>) => void;
  onCellClick?: (event: OnTableClickEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const TableRow = ({ row, index, onRowClick, onCellClick, children, ...rest }: Props) => {
  const { AdditionalContent, scrollable, instance } = useTableContext();
  const { selectedFlatRows: selectedRows, allColumns } = instance as TableInstance;

  const columns = allColumns as Column[];

  const definedRowProps = {
    className: classNames(`av-grid-row-${index % 2 === 0 ? 'even' : 'odd'}`, {
      'fixed-width-tr': scrollable,
      selected: includes(
        selectedRows.map((sr) => sr.id),
        row.id
      ),
      'cursor-pointer': !!onRowClick || !!onCellClick,
    }),
    onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (onRowClick) {
        onRowClick({
          ...event,
          data: row.original,
          index: row.index,
          row,
        } as OnTableClickEvent<HTMLTableRowElement>);
      }
    },
  };

  const definedCellProps = {
    onClick: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
      if (onCellClick) {
        onCellClick({
          ...event,
          data: row.original,
          index: row.index,
          row,
        } as OnTableClickEvent<HTMLTableCellElement>);
      }
    },
  };

  const isFirstColumnSticky = columns[0].stickyLeft === true;
  const isLastColumnSticky = columns.slice(-1)[0].stickyRight === true;

  const numberOfNonStickyColumns = filter(columns, (c) => !(c.stickyRight || c.stickyLeft)).length;

  return (
    <>
      <tr {...row.getRowProps()} {...definedRowProps} {...rest}>
        {children}
      </tr>
      {AdditionalContent && (
        <tr {...definedRowProps}>
          {isFirstColumnSticky && <td className="sticky sticky-left" />}
          <td colSpan={numberOfNonStickyColumns} style={{ borderTop: 0 }} {...definedCellProps}>
            <AdditionalContent record={row.original} />
          </td>
          {isLastColumnSticky && <td className="sticky sticky-right" />}
        </tr>
      )}
    </>
  );
};

export default TableRow;
