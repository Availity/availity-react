import React from 'react';
import { ListGroup as RsListGroup, ListGroupProps } from 'reactstrap';
import classNames from 'classnames';

type Props = {
  cards?: boolean;
  className?: string;
  selectable?: boolean;
} & ListGroupProps;

const ListGroup = React.forwardRef<RsListGroup, Props>(({ cards, selectable, className, ...props }, ref) => (
  <RsListGroup
    ref={ref}
    {...props}
    className={classNames(className, { 'list-group-cards': cards, 'list-group-selectable': selectable })}
  />
));

export default ListGroup;
