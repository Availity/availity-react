import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const ScrollableContainer = ({ id, children, ...rest }) => (
  <div id={id} className="av-scrollable-table-wrapper" {...rest}>
    {cloneElement(children, { scrollable: true })}
  </div>
);

ScrollableContainer.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default ScrollableContainer;
