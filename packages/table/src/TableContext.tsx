/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { OnRowSelectedEvent, OnTableClickEvent, TableSort, TableSortOption } from './types';
import { Cell, Row, RowProps } from './types/ReactTable';

type HeaderProps = {
  /**  **/
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type AvTableContext = {
  /** This is a unique id that is prepended to the element */
  id?: string;
  /** Any DOM properties that should be passed onto the <table> element. **/
  tableProps?: React.HTMLAttributes<HTMLElement>;
  /** Any DOM properties that should be passed onto the <tbody> element. **/
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  /** Any DOM properties that should be passed onto the <thead> element.
   * A special boolean property sticky' is added here to allow for
   * designating the header as 'sticky' or not. **/
  headerProps?: HeaderProps;
  /** This function provides any DOM properties that should be passed
   * onto the <td> elements. Optionally pass in the Cell object in order
   * to conditionally add DOM properties based on data of the cell. **/
  getCellProps: (cell: Cell<Record<string, any>>) => React.HTMLAttributes<HTMLTableCellElement>;
  /** This function provides any DOM properties that should be passed onto
   * the <tr> element. Optionally pass in the Row object in order to
   * conditionally add DOM properties based on the data of the row. **/
  getRowProps: (row: Row<Record<string, any>>) => RowProps;
  /** This function is called whenever a cell on the row has been clicked. **/
  onCellClick?: (event: OnTableClickEvent<HTMLElement, any>) => void;
  /** This function is called whenever a row on the table has been clicked. **/
  onRowClick?: (event: OnTableClickEvent<HTMLElement, any>) => void;
  /** Event handler for when a row is selected. **/
  onRowSelected?: (event: OnRowSelectedEvent<any>) => void;
  /** This function will be called whenever the table has been sorted. **/
  onSort?: (sortBy: TableSort[]) => void;
  /** This function determines if a row in a selectable table can be
   * selected. By default if no function is provided to this property,
   * all rows in the table are selectable. **/
  getCanSelectRow?: (record: any) => boolean;
  /** This designates a Component that will be displayed in the table
   * row for the record. This content displays in an additional <tr>
   * with a colspan equal to the number of columns that are NOT sticky. **/
  AdditionalContent?: React.ElementType;
  /**  */
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  /** This property is automatically set when it is wrapped in a scrollable
   * container. This will apply fixed column widths to force it to scroll
   * rather than minify the columns to fit in a set container. **/
  scrollable?: boolean;
  /** This determines whether the table is selectable or not. If it is set
   * to true, then the first column of the table will be a checkbox column
   * that will toggle selecting and deselecting the row. **/
  selectable?: boolean;
  /** This determines whether the table is sortable or not. **/
  sortable?: boolean;
  footer?: boolean;
  /** This boolean determines whether the table is paged or not. This
   * works with the usePagination hook that is documented in react-table.
   * This defaults to false. **/
  paged?: boolean;
  /**  */
  sortableColumns?: TableSortOption[];
  /** The react-table Row instance that was clicked */
  instance?: any;
  /**  */
  setInstance?: React.Dispatch<React.SetStateAction<any>>;
};

export const TableContext = React.createContext<AvTableContext>({
  scrollable: false,
  sortable: false,
  footer: false,
  getRowProps: () => ({} as RowProps),
  getCellProps: () => ({} as React.HTMLAttributes<HTMLTableCellElement>),
});

export const useTableContext = (): AvTableContext => useContext(TableContext);
