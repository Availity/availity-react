import React from 'react';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import classNames from 'classnames';
import { OnTableClickEvent } from './types/OnTableClickEvent';
import { Column, IdType, Row, RowProps, TableInstance } from './types/ReactTable';

export type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element */
  id?: string;
  /** The Row that is being displayed. */
  row: Row<T>;
  /** The index of the row that was clicked. */
  index: number;
  /** Callback function that will be called when the row is clicked if provided. */
  onRowClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;
  /** Callback function that will be called when the cell is clicked if provided. */
  onCellClick?: (event: OnTableClickEvent<HTMLElement, T>) => void;

  /** This designates a Component that will be displayed in the table row for the record. This content displays in an additional `<tr>` with a colspan equal to the number of columns that are NOT sticky. */
  AdditionalContent?: React.ElementType;
  /**  Additional Properties that should be added to the additional content component when it is rendered. */
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  /** Determines whether the table is contained in a set scrollable container. */
  scrollable?: boolean;
  /** The react-table table instance */
  instance?: TableInstance<T>;

  /** This function provides any DOM properties that should be passed onto the `<tr>` element. Optionally pass in the Row object in order to conditionally add DOM properties based on the data of the row. */
  getRowProps?: (row: Row<T>) => RowProps;

  /** Children can be a react child. */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableRow = <T extends IdType>({
  id,
  row,
  index,
  onRowClick,
  onCellClick,
  instance,
  scrollable,
  AdditionalContent,
  additionalContentProps,
  getRowProps,
  children,
  ...rest
}: Props<T>): JSX.Element => {
  const { selectedFlatRows: selectedRows, visibleColumns } = instance as TableInstance<T>;
  const columns = (visibleColumns || []) as Column<T>[];

  const rowClasses = classNames(`av-grid-row-${index % 2 === 0 ? 'even' : 'odd'}`, {
    'fixed-width-tr': scrollable,
    selected: includes(
      selectedRows.map((row: Row<T>) => row.id),
      row.id
    ),
    'cursor-pointer': !!onRowClick || !!onCellClick,
  });

  const definedRowProps = {
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

  const buildRowProps = () => {
    const props = getRowProps ? getRowProps(row) : {};
    props.className = classNames(rowClasses, props.className);
    return { ...props, ...definedRowProps, id, ...rest };
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
      <tr {...row.getRowProps(buildRowProps())}>{children}</tr>
      {AdditionalContent && (
        <tr {...buildRowProps()} id={`${id}_additional_content`}>
          {isFirstColumnSticky && <td className="sticky sticky-left" />}
          <td colSpan={numberOfNonStickyColumns} className="border-0" {...definedCellProps}>
            <AdditionalContent row={row} record={row.original} {...additionalContentProps} />
          </td>
          {isLastColumnSticky && <td className="sticky sticky-right" />}
        </tr>
      )}
    </>
  );
};

export default TableRow;
