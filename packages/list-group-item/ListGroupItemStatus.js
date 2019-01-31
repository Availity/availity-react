import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultColor = 'info';
const ListItemStatus = ({ color, titleContent, children, badge, ...props }) => {
  const borderColor = color || (badge && badge.color) || defaultColor;
  let title = titleContent;

  const badgeColor = (badge && badge.color) || borderColor;
  const badgeText = badge && (typeof badge === 'string' ? badge : badge.text);

  if (badgeText) {
    const useBadge = badgeColor && badgeText && (
      <Badge color={badgeColor} pill>
        {badgeText}
      </Badge>
    );
    title = (
      <div className="d-flex py-1 justify-content-between align-items-baseline">
        {titleContent}
        {useBadge}
      </div>
    );
  } else if (typeof title === 'string') {
    title = <div className="py-1">{titleContent}</div>;
  }

  return (
    <ListGroupItem {...props} borderColor={borderColor}>
      {title}
      {children}
    </ListGroupItem>
  );
};

ListItemStatus.propTypes = {
  titleContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  badge: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      text: PropTypes.string,
    }),
  ]),
};

ListItemStatus.defaultProps = {
  titleContent: <span />,
};

export default ListItemStatus;
