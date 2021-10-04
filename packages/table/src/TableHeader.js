import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ sticky, children, ...rest }) => (
  <thead className={`av-grid-row-header${sticky ? ' sticky-header' : ''}`} {...rest}>
    {children}
  </thead>
);

TableHeader.propTypes = {
  id: PropTypes.string,
  sticky: PropTypes.bool,
  children: PropTypes.node,
};

export default TableHeader;
