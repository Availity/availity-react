import React from 'react';
import { useTableContext } from './TableContext';
import { HeaderGroup } from 'react-table';

export type Props = {
  id?: string;
  headerGroup: HeaderGroup,
  children?: React.ReactNode
};

const TableHeaderRow = ({ headerGroup, children, ...rest } : Props) : JSX.Element => {
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
