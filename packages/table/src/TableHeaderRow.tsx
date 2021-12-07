import React from 'react';
import { HeaderGroup } from 'react-table';
import { useTableContext } from './TableContext';

export type Props = {
  id?: string;
  headerGroup: HeaderGroup;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderRow = ({ headerGroup, children, ...rest }: Props): JSX.Element => {
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
