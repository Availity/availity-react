import React from 'react';
import { ListGroupItem as RsListGroupItem, ListGroupItemProps } from 'reactstrap';

type Props = {
  borderColor?: string;
  className?: string;
} & ListGroupItemProps;

const ListGroupItem = ({ borderColor, className, ...props }: Props): JSX.Element => (
  <RsListGroupItem {...props} className={[className, borderColor].filter((item) => item).join(' ')} />
);

export default ListGroupItem;
