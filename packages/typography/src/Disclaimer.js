import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Disclaimer = ({
  tag: Tag,
  className: classes,
  styled,
  children,
  ...rest
}) => (
  <Tag
    data-testid="disclaimer"
    className={classNames(
      classes,
      { disclaimer: styled },
      { 'disclaimer-unstyled': !styled }
    )}
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
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  styled: PropTypes.bool,
  children: PropTypes.node,
};

export default Disclaimer;
