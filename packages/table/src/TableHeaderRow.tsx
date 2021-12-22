import React from 'react';
import { useTableContext } from './TableContext';
import { ExtendedTableHeader, TableSort } from './types';
import { IdType } from './types/ReactTable';

export type Props<T extends IdType> = {
  id?: string;
  headerGroup: ExtendedTableHeader<T>;
  onSort?: (sortBy: TableSort[]) => void;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderRow = <T extends IdType>({ headerGroup, children, ...rest }: Props<T>): JSX.Element => {
  const { scrollable } = useTableContext();

  return (
    <tr
      {...headerGroup.getHeaderGroupProps({
        className: scrollable ? 'fixed-width-tr' : '',
      })}
      {...rest}
    >
      {children}
    </tr>
  );
};

export default TableHeaderRow;
