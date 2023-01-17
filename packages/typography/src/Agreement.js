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
  /** It can be one of type either string or function. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Additional classes that should be applied to agreement.
      or Pass a string containing the class names as a prop. */
  className: PropTypes.string,
  /** Children can be a react child or render pop. */
  children: PropTypes.node,
};

export default Agreement;
