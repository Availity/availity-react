import React from 'react';

export type Props = {
  /** This is a unique id that is prepended to the element **/
  id?: string;
  /** This determines if the element is sticky or not **/
  sticky?: boolean;
  /** Children can be a react child. **/
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableHeader = ({ sticky, children, ...rest }: Props): JSX.Element => (
  <thead className={`av-grid-row-header${sticky ? ' sticky-header' : ''}`} {...rest}>
    {children}
  </thead>
);

export default TableHeader;
