import React from 'react';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import classNames from 'classnames';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { Column, IdType, Row, TableInstance } from './types/ReactTable';

export type Props<T extends IdType> = {
  id?: string;
  row: Row<T>;
  index: number;
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;

  AdditionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  scrollable?: boolean;
  instance: TableInstance<T>;

  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableRow = <T extends IdType>({
  row,
  index,
  onRowClick,
  onCellClick,
  instance,
  scrollable,
  AdditionalContent,
  additionalContentProps,
  children,
  ...rest
}: Props<T>): JSX.Element => {
  const { selectedFlatRows: selectedRows, visibleColumns } = instance as TableInstance<T>;
  const columns = visibleColumns as Column<T>[];
  const definedRowProps = {
    className: classNames(`av-grid-row-${index % 2 === 0 ? 'even' : 'odd'}`, {
      'fixed-width-tr': scrollable,
      selected: includes(
        selectedRows.map((row: Row<T>) => row.id),
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
        } as OnTableClickEvent<HTMLTableRowElement, T>);
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
        } as OnTableClickEvent<HTMLTableCellElement, T>);
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
            <AdditionalContent record={row.original} {...additionalContentProps} />
          </td>
          {isLastColumnSticky && <td className="sticky sticky-right" />}
        </tr>
      )}
    </>
  );
};

export default TableRow;
