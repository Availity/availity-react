import React from 'react';
import classNames from 'classnames';
import { useTableContext } from './TableContext';
import { ExtendedTableHeader } from './types/ReactTable';

type Props = {
  id?: string;
  column: ExtendedTableHeader;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = ({ column, children, ...rest }: Props): JSX.Element => {
  const { scrollable, sortable } = useTableContext();

  const getHeaderColumnProps = (column: ExtendedTableHeader) => {
    const props = {
      className: classNames(column.className || '', {
        'fixed-width-text': scrollable && !column.className,
        sticky: column.stickyRight || column.stickyLeft,
        'sticky-right': column.stickyRight,
        'sticky-left': column.stickyLeft,
      }),
      title: column.label || typeof column.Header === 'string' ? column.Header?.toString() : undefined,
    };
    return sortable ? column.getSortByToggleProps(props) : props;
  };

  return (
    <th {...column.getHeaderProps(getHeaderColumnProps(column))} {...rest}>
      {children}
    </th>
  );
};

export default TableHeaderCell;
