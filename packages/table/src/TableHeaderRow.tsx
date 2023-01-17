import React from 'react';
import { ExtendedTableHeader, TableSort } from './types';
import { IdType } from './types/ReactTable';

export type Props<T extends IdType> = {
  id?: string;
  headerGroup: ExtendedTableHeader<T>;
  onSort?: (sortBy: TableSort[]) => void;
  scrollable?: boolean;
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
