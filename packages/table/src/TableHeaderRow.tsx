import React from 'react';
import { ExtendedTableHeader, TableSort } from './types';
import { IdType } from './types/ReactTable';

export type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element. */
  id?: string;
  /** The react-table header */
  headerGroup: ExtendedTableHeader<T>;
  /** This function will be called whenever the table has been sorted. */
  onSort?: (sortBy: TableSort[]) => void;
  /** This property is automatically set when it is wrapped in a
   * scrollable container. This will apply fixed column widths to force
   * it to scroll rather than minify the columns to fit in a set container. */
  scrollable?: boolean;
  /** Children can be a react child. */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderRow = <T extends IdType>({ headerGroup, scrollable, children, ...rest }: Props<T>): JSX.Element => (
  <tr
    {...headerGroup.getHeaderGroupProps({
      className: scrollable ? 'fixed-width-tr' : '',
    })}
    {...rest}
  >
    {children}
  </tr>
);

export default TableHeaderRow;
