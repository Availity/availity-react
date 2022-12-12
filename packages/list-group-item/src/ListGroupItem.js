import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem as RsListGroupItem } from 'reactstrap';

const ListGroupItem = ({ borderColor, className, ...props }) => {
  const classname = [className, borderColor].filter((a) => a).join(' ');
  return <RsListGroupItem data-testid="list-group-item-id" {...props} className={classname} />;
};

ListGroupItem.propTypes = {
  /** The border color to display on the left of the item. Uses Availity UI Kit variants. Must be used within a `ListGroup` from `@availity/list-group` with the `cards` prop set to `true` */
  borderColor: PropTypes.string,
  /** The name of the class. */
  className: PropTypes.string,
};

export default ListGroupItem;
