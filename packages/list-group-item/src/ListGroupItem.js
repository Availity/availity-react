import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem as RsListGroupItem } from 'reactstrap';

const ListGroupItem = ({ borderColor, className, ...props }) => {
  const classname = [className, borderColor].filter((a) => a).join(' ');
  return <RsListGroupItem data-testid="list-group-item-id" {...props} className={classname} />;
};

ListGroupItem.propTypes = {
  borderColor: PropTypes.string,
  className: PropTypes.string,
};

export default ListGroupItem;
