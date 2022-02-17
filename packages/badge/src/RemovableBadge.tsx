import React from 'react';
import { Badge, BadgeProps } from 'reactstrap';
import Icon from '@availity/icon';

export type RemovableBadgeProps = {
  children: string;
  value: string;
  onRemove: (value: string) => void;
} & BadgeProps;

const RemovableBadge = ({ children, value, onRemove, ...rest }: RemovableBadgeProps): JSX.Element => (
  <Badge data-testid="removable_badge" {...rest}>
    <Icon data-testid="removable_badge_remove" name="cancel" onClick={() => onRemove(value)} />
    {children}
  </Badge>
);

export default RemovableBadge;
