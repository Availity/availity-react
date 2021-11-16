import React from 'react';
import { Badge } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

type Props = {
  badge?: string | { color: string; text: string };
  children: React.ReactNode;
  color?: string;
  titleContent?: React.ReactNode;
};

const ListItemStatus = ({ color = 'info', titleContent = <span />, children, badge, ...props }: Props): JSX.Element => {
  let title = titleContent;

  let borderColor = color;
  let badgeColor = borderColor;
  let badgeText = typeof badge === 'string' ? badge : '';

  if (badge && typeof badge === 'object') {
    borderColor = badge.color || color;
    badgeColor = badge.color || borderColor;
    badgeText = badge.text;
  }

  if (badgeText) {
    title = (
      <div className="d-flex py-1 justify-content-between align-items-baseline" data-testid="lgi-content-wrapper">
        {titleContent}
        {badgeColor && badgeText ? (
          <Badge color={badgeColor} pill data-testid="lgi-badge">
            {badgeText}
          </Badge>
        ) : null}
      </div>
    );
  } else if (typeof title === 'string') {
    title = (
      <div className="py-1" data-testid="lgi-title-content">
        {titleContent}
      </div>
    );
  }

  return (
    <ListGroupItem data-testid="list-group-item-status-id" {...props} borderColor={borderColor}>
      {title}
      {children}
    </ListGroupItem>
  );
};

export default ListItemStatus;
