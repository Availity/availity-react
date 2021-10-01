import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup as RsListGroup } from 'reactstrap';

const ListGroup = React.forwardRef(({ cards, selectable, className, ...props }, ref) => {
  const classname = [className, cards && 'list-group-cards', selectable && 'list-group-selectable']
    .filter((a) => a)
    .join(' ');

  return <RsListGroup ref={ref} {...props} className={classname} />;
});

ListGroup.propTypes = {
  cards: PropTypes.bool,
  selectable: PropTypes.bool,
  className: PropTypes.string,
};

export default ListGroup;
