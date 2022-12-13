import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Disclaimer = ({ tag: Tag, className: classes, styled, children, ...rest }) => (
  <Tag
    data-testid="disclaimer"
    className={classNames(classes, { disclaimer: styled }, { 'disclaimer-unstyled': !styled })}
    {...rest}
  >
    {children}
  </Tag>
);

Disclaimer.defaultProps = {
  tag: 'div',
  styled: true,
};

Disclaimer.propTypes = {
  /** It can be one of type either string or function. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Additional classes that should be applied to Disclaimer.
      or Pass a string containing the class names as a prop. */
  className: PropTypes.string,
  /** Determine if a vertical bar is displayed to the left of the disclaimer. Default is true */
  styled: PropTypes.bool,
  /** Children can be react child or render prop. */
  children: PropTypes.node,
};

export default Disclaimer;
