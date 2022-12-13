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
      <Badge color={badgeColor} pill data-testid="lgi-badge">
        {badgeText}
      </Badge>
    );
    title = (
      <div className="d-flex py-1 justify-content-between align-items-baseline" data-testid="lgi-content-wrapper">
        {titleContent}
        {useBadge}
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

ListItemStatus.propTypes = {
  /** The content that renders when the features are enabled. */
  children: PropTypes.node.isRequired,
  /** When present, adds a title on the same level as the badge. If of type `string` then defaults to using `<span>` tag. */
  titleContent: PropTypes.node,
  /** Set the color for the border and the badge. **Default:** `"info"`. */
  color: PropTypes.string,
  /** If a String, the text to render inside of the `<Badge />`. If an Object, expects `text` (String) and `color` (String) properties. `text` is the text to render inside the badge. `color` is the color of the badge. */
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
