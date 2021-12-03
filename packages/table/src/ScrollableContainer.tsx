import React, { cloneElement } from 'react';

type Props = {
  id?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const ScrollableContainer = ({ id, children, ...rest }: Props): JSX.Element => (
  <div id={id} className="av-scrollable-table-wrapper" {...rest}>
    {cloneElement(children as React.ReactElement<any>, { scrollable: true })}
  </div>
);

export default ScrollableContainer;
