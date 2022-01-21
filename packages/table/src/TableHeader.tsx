import React from 'react';

export type Props = {
  id?: string;
  sticky?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableHeader = ({ sticky, children, ...rest }: Props): JSX.Element => (
  <thead className={`av-grid-row-header${sticky ? ' sticky-header' : ''}`} {...rest}>
    {children}
  </thead>
);

export default TableHeader;
