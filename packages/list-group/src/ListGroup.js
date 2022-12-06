import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup as RsListGroup } from 'reactstrap';
import classNames from 'classnames';

const ListGroup = React.forwardRef(({ cards, selectable, className, ...props }, ref) => {
  const classes = classNames(className, { 'list-group-cards': cards, 'list-group-selectable': selectable });

  return <RsListGroup ref={ref} {...props} className={classes} />;
});

ListGroup.propTypes = {
  /** Triggers the items (children) to appear as cards. */
  cards: PropTypes.bool,
  /** Triggers the items (children) to appear as selectable when hovered over. */
  selectable: PropTypes.bool,
  /** The name for your class */
  className: PropTypes.string,
};

ListGroup.defaultProps = {
  cards: false,
  selectable: false,
};

export default ListGroup;
