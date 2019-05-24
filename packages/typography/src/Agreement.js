import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Agreement = ({ tag: Tag, className: classes, children, ...rest }) => (
  <Tag className={classNames(classes, 'agreement')} {...rest}>
    {children}
  </Tag>
);

Agreement.defaultProps = {
  tag: 'div',
};

Agreement.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Agreement;
