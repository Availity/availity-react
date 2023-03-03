import React, { cloneElement, isValidElement } from 'react';

type Props = {
  /** This is a unique id that is prepended to the element **/
  id?: string;
  /** Children can be a react child. **/
  children?: React.ReactNode | React.ReactChild;
} & React.HTMLAttributes<HTMLElement>;

const ScrollableContainer = ({ id, children, ...rest }: Props): JSX.Element => (
  <div id={id} className="av-scrollable-table-wrapper" {...rest}>
    {Array.isArray(children) &&
      children.map((child, index) => cloneElement(child, { scrollable: 'true', key: index.toString() }))}

    {!Array.isArray(children) && isValidElement(children) && cloneElement(children, { scrollable: 'true' })}
  </div>
);

export default ScrollableContainer;
