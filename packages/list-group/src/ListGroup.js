import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup as RsListGroup } from 'reactstrap';
import classNames from 'classnames';

const ListGroup = React.forwardRef(({ cards, selectable, className, ...props }, ref) => {
  const classes = classNames(className, { 'list-group-cards': cards, 'list-group-selectable': selectable });

  return <RsListGroup ref={ref} {...props} className={classes} />;
});

ListGroup.propTypes = {
  cards: PropTypes.bool,
  selectable: PropTypes.bool,
  className: PropTypes.string,
};

export default ListGroup;
