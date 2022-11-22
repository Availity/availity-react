import React from 'react';
import { Badge } from 'reactstrap';
import type { BadgeProps } from 'reactstrap';
import Icon from '@availity/icon';

export type RemovableBadgeProps = {
  children: string;
  /** This is a unique value for the badge, which is passed up to the onRemove function to describe which badge is being removed. */
  value: string;
  /** This is the function that is called whenever the 'X' icon is clicked. It passes the value of the specified badge to the parent component. */
  onRemove: (value: string) => void;
} & BadgeProps;

const RemovableBadge = ({ children, value, onRemove, ...rest }: RemovableBadgeProps): JSX.Element => (
  <Badge data-testid="removable_badge" {...rest}>
    <Icon data-testid="removable_badge_remove" name="cancel" onClick={() => onRemove(value)} />
    {children}
  </Badge>
);

export default RemovableBadge;
